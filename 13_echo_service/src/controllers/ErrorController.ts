import { Get, Controller, Route, Path } from "tsoa";
import os from "os";

interface ErrorResponse {
  message: string;
}

@Route("error")
export class ErrorController extends Controller {
  /**
   * Return a specified error code
   * @param errorcode The desired http status code
   * @returns A message detailing the desired http status code
   */
  @Get("/{errorcode}")
  public async getErrorCode(@Path() errorcode: number): Promise<ErrorResponse> {
    this.setStatus(errorcode); // set return status 201
    return {
      message: `Desired status ${errorcode}`,
    };
  }
}
