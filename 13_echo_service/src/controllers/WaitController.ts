import { Get, Route, Path } from "tsoa";
import os from "os";

interface WaitResponse {
  message: string;
}

@Route("wait")
export class WaitController {
  @Get("/{time}")
  public async getWait(@Path() time: number): Promise<WaitResponse> {
    await new Promise(resolve => setTimeout(resolve, time * 1000));
    return {
      message: `waited ${time}`,
    };
  }
}
