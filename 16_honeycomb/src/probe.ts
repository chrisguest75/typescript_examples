import { spawnSync } from "child_process";
import Papa from "papaparse";
import { logger } from "./logger";
import md5File from 'md5-file';
import fs = require("fs");

//ffprobe -v quiet -print_format json=compact=1 -show_streams /Volumes/videoshare/sintel/sintel-x264-5.1.mp4 
//ffprobe -v quiet -select_streams v -show_frames -of csv -show_entries frame=key_frame,pict_type,best_effort_timestamp_time -i /Volumes/videoshare/sintel/sintel-x264-5.1.mp4

export default class Probe {
    file = ""
    md5 = "" 
    size = 0

    constructor(file: string) {
        this.file = file
    }

    run(options: Array<string>): (string | null)[] {
        logger.info({ options: "ffprobe " + options.join(" ") });
        const spawnResult = spawnSync("ffprobe", options, {
            cwd: process.cwd(),
            env: process.env,
            stdio: "pipe",
            encoding: "utf-8",
        });
        //logger.info({"stdout":spawnResult.output});
        if (spawnResult.status !== 0) {
            throw new Error(`ffprobe exited with ${spawnResult.status}`);
        } else {
            return spawnResult.output || [""];
        }
    }

    async analyzeStreams(): Promise<string> {
        return new Promise((resolve, reject) => {
            let options = ["-v", "quiet", "-print_format", "json=compact=1", "-show_streams", this.file];

            try {
                let out = this.run(options);
                let realOut = "Error";
                if (out != null) {
                    realOut = out[1] || ""
                }
            
                resolve(realOut);
            } catch (ex) {
                logger.error(`Failed: ${this.file}`)
                reject(ex)    
            }
        
        });
    }    

    async analyzeGOP(): Promise<string> {
        return new Promise((resolve, reject) => {
            let options = ["-select_streams", "v", "-show_frames", "-of", "csv", "-show_entries", "frame=key_frame,pict_type,best_effort_timestamp_time", this.file];

            let out = this.run(options);
        
            let frames = "Error"
            if (out != null) {
                // extract the keyframes
                let results = Papa.parse(out[1] || "", {});
                frames = results.data.map((frame: any) => frame[3]).join("")
            } 
    
            resolve(frames);
        });
    }    

    async getFilesizeInBytes(file: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const stats = fs.statSync(file);
            resolve(stats.size);
        });
    }

    async analyze(includeGOP: boolean = false): Promise<string> {
        this.md5 = await md5File.sync(this.file)
        logger.info(`${this.md5} for ${this.file}`)
        this.size = await this.getFilesizeInBytes(this.file)
        let output = await this.analyzeStreams()
        let probedata = JSON.parse(output);

        // merge gop into video stream
        if (includeGOP) {
            let gop = await this.analyzeGOP()
            let video = probedata.streams.filter((stream: any) => stream.codec_type == "video")
            video[0]["gop"] = gop    
        }

        return new Promise((resolve, reject) => {    
            // merge md5 of the file
            let final = {
                file: this.file,
                md5: this.md5,
                size: this.size,
                ...probedata
            }
            logger.info(final)

            resolve(JSON.stringify(final, null, "\t"));
        });
    }

}