import { Get, Route } from "tsoa";

interface KeyValue {
  key: string,
  value: string
}


interface EchoResponse {
  variables: Array<KeyValue>
}

@Route("echo")
export class EchoController {
  @Get("/")
  public async getVariables(): Promise<EchoResponse> {
    let variables = new Array<KeyValue>();
    variables.push({key: "key", value:"value"});
    variables.push({key: "key2", value:"value2"});

    return {
      variables
    };
  }
}
