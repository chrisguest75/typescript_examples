import { Get, Route, Controller } from "tsoa";
import os from 'os';

interface KeyValue {
  key: string,
  value: string
}


interface EchoResponse {
  variables: Array<KeyValue>
}

@Route("echo")
export class EchoController extends Controller {
  /*private process_request(req) {
    request_values = [
      {request_key:"path", request_value:req.path},
      {request_key:"protocol", request_value:req.protocol},
      {request_key:"method", request_value:req.method},
      {request_key:"httpVersion", request_value:req.httpVersion},
      {request_key:"hostname", request_value:req.hostname},
      {request_key:"host", request_value:req.host},
      {request_key:"ip", request_value:req.ip},
      {request_key:"startTime", request_value:req._startTime},
      {request_key:"body", request_value:JSON.stringify(req.body)},
      {request_key:"os.platform", request_value:os.platform()},
      {request_key:"os.release", request_value:os.release()}
    ]

    if (req.cookies != undefined) { 
      Object.keys(req.cookies).forEach(function(key) {
        request_values.push({ request_key:"cookie." + key, request_value:req.cookies[key]});
      });
    };
  
    Object.keys(req.query).forEach(function(key) {
      request_values.push({ request_key:"param." + key, request_value:req.query[key]});
    });
  
    Object.keys(req.headers).forEach(function(key) {
      request_values.push({ request_key:"header." + key, request_value:req.headers[key]});
    });
   
  }*/

  private get_process_details() : Array<KeyValue> {
    let variables = new Array<KeyValue>();
    var memUsage = process.memoryUsage()
    Object.keys(memUsage).forEach(function(key) {      
      variables.push({ key:"process." + key, value: (memUsage as any)[key]});
    });
  
    try {
      var resourceUsage = process.resourceUsage()
      Object.keys(resourceUsage).forEach(function(key) {
        variables.push({ key:"process." + key, value: (resourceUsage as any)[key]});
      });
    } catch(ex) {
    }

    Object.keys(process.versions).forEach(function(key) {
      variables.push({ key:"versions." + key, value: process.versions[key] || ""});
    });
  
    Object.keys(process.env).forEach(function(key) {
      variables.push({ key: "env." + key, value: process.env[key] || ""});
    });
    
    Object.keys(os.userInfo()).forEach(function(key) {
      //os.userInfo()[key]
      variables.push({ key:"userInfo." + key, value: key});
    });
    
    return variables;
  }


  @Get("/")
  public async getVariables(): Promise<EchoResponse> {
    let variables = new Array<KeyValue>();
    variables = variables.concat(this.get_process_details())

    return {
      variables
    };
  }
}
