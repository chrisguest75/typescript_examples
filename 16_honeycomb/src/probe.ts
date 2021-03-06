import { spawnSync } from 'child_process'
import Papa from 'papaparse'
import { logger } from './logger'
import md5File from 'md5-file'
import fs = require('fs')
import opentelemetry from '@opentelemetry/api'

//ffprobe -v quiet -print_format json=compact=1 -show_streams /Volumes/videoshare/sintel/sintel-x264-5.1.mp4
//ffprobe -v quiet -select_streams v -show_frames -of csv -show_entries frame=key_frame,pict_type,best_effort_timestamp_time -i /Volumes/videoshare/sintel/sintel-x264-5.1.mp4

export default class Probe {
  file = ''
  md5 = ''
  size = 0

  constructor(file: string) {
    this.file = file
  }

  run(options: Array<string>): (string | null)[] {
    logger.info({ options: 'ffprobe ' + options.join(' ') })
    const spawnResult = spawnSync('ffprobe', options, {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'pipe',
      encoding: 'utf-8',
    })
    //logger.info({"stdout":spawnResult.output});
    if (spawnResult.status !== 0) {
      throw new Error(`ffprobe exited with ${spawnResult.status}`)
    } else {
      return spawnResult.output || ['']
    }
  }

  async analyzeStreams(): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = ['-v', 'quiet', '-print_format', 'json=compact=1', '-show_streams', this.file]

      try {
        const out = this.run(options)
        let realOut = 'Error'
        if (out != null) {
          realOut = out[1] || ''
        }

        resolve(realOut)
      } catch (ex) {
        logger.error(`Failed: ${this.file}`)
        reject(ex)
      }
    })
  }

  async analyzeGOP(): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = [
        '-select_streams',
        'v',
        '-show_frames',
        '-of',
        'csv',
        '-show_entries',
        'frame=key_frame,pict_type,best_effort_timestamp_time',
        this.file,
      ]

      const out = this.run(options)

      let frames = 'Error'
      if (out != null) {
        // extract the keyframes
        const results = Papa.parse(out[1] || '', {})
        frames = results.data.map((frame: any) => frame[3]).join('')
      }

      resolve(frames)
    })
  }

  async getFilesizeInBytes(file: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const stats = fs.statSync(file)
      resolve(stats.size)
    })
  }

  async analyze(includeGOP = false, parentSpan: any): Promise<string> {
    const tracerName = process.env.HONEYCOMB_TRACERNAME ?? 'default'
    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan)

    this.size = await this.getFilesizeInBytes(this.file)

    const md5Span = opentelemetry.trace.getTracer(tracerName).startSpan('md5', undefined, ctx)
    this.md5 = await md5File.sync(this.file)
    logger.info(`${this.md5} for ${this.file}`)
    md5Span?.end()

    const probeSpan = opentelemetry.trace.getTracer(tracerName).startSpan('probe', undefined, ctx)
    const output = await this.analyzeStreams()
    const probedata = JSON.parse(output)
    probeSpan?.end()

    // merge gop into video stream
    if (includeGOP) {
      const gopSpan = opentelemetry.trace.getTracer(tracerName).startSpan('gopscan', undefined, ctx)
      const gop = await this.analyzeGOP()
      const video = probedata.streams.filter((stream: any) => stream.codec_type == 'video')
      video[0]['gop'] = gop
      gopSpan?.end()
    }

    return new Promise((resolve, reject) => {
      // merge md5 of the file
      const final = {
        file: this.file,
        md5: this.md5,
        size: this.size,
        ...probedata,
      }
      logger.info(final)

      resolve(JSON.stringify(final, null, '\t'))
    })
  }
}
