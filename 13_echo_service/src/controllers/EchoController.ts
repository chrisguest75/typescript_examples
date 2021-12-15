import * as express from "express";
import { Get, Route, Controller, Request } from "tsoa";
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
  private get_request_details(request: express.Request): Array<KeyValue> {
    let variables = new Array<KeyValue>();
    variables.push({key:"path", value:request.path})
    variables.push({key:"protocol", value:request.protocol})
    variables.push({key:"method", value:request.method})
    variables.push({key:"httpVersion", value:request.httpVersion})
    variables.push({key:"hostname", value:request.hostname})
    variables.push({key:"host", value:request.host})
    variables.push({key:"ip", value:request.ip})
    variables.push({key:"body", value:request.body})
    variables.push({key:"os.platform", value:os.platform()})
    variables.push({key:"os.release", value:os.release()})

    if (request.cookies != undefined) { 
      Object.keys(request.cookies).forEach(function(key) {
        variables.push({ key:"cookie." + key, value:request.cookies[key]});
      });
    };
  
    Object.keys(request.query).forEach(function(key) {
      variables.push({ key:"param." + key, value:(request.query as any)[key]});
    });
  
    Object.keys(request.headers).forEach(function(key) {
      variables.push({ key:"header." + key, value:(request.headers as any)[key]});
    });
   
    return variables;
  }

  private get_process_details(): Array<KeyValue> {
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
  public async getVariables(
    @Request() request: express.Request
  ): Promise<EchoResponse> {
    let variables = new Array<KeyValue>();
    variables = variables.concat(this.get_request_details(request))
    variables = variables.concat(this.get_process_details())
    return {
      variables
    };
  }
}
