import { Get, Route, Path } from "tsoa";
import os from "os";

interface WaitResponse {
  message: string;
}

@Route("wait")
export class WaitController {
  /**
   * Wait for a specified period of time
   * @param time Time in seconds to wait for
   * @returns A message detailing how long the function waited
   */
  @Get("/{time}")
  public async getWait(@Path() time: number): Promise<WaitResponse> {
    await new Promise(resolve => setTimeout(resolve, time * 1000));
    return {
      message: `waited ${time}`,
    };
  }
}
