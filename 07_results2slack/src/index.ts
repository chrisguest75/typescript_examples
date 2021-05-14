import minimist from 'minimist';
import { readFileSync } from 'fs';
import * as xml2js from 'xml2js';
import * as util from 'util';
import * as dotenv from 'dotenv';
import * as axios from 'axios';
import * as ejs from 'ejs';

/*
main
*/
async function main(args: minimist.ParsedArgs) 
{
    console.log('enter main:'+ args._);
    dotenv.config();
    let environment = process.env.ENVIRONMENT ?? '';
    let xml_file = process.env.XML_FILE ?? '';
    let slack_post = process.env.SLACK_POST ?? '';
    let slack_channel = process.env.SLACK_CHANNEL ?? '';

    console.log("environment " + environment);
    console.log("xml_file " + xml_file);
    console.log("slack_post " + slack_post);
    console.log("slack_channel " + slack_channel);

    console.log('results2slack')

    // load xml file
    const file = readFileSync(xml_file, 'utf-8');
    // parse the results 
    try {
        const XML:string = file;
        xml2js.parseString(XML, {trim: true}, function (err, result) {
            if(err) console.log(err);
            console.log(util.inspect(result, false, null))            
            console.log(result); 
        });
    } catch (e) {
        console.log(e);
    }

    // build a message
    const template = readFileSync('./post.json', 'utf-8');
    let details = `Environment:${environment}`
    let results = `:x: core:coredns\n:x: core-namespaces:lighthouse\n:x: helm-tenant-app:test-service`;
    let post = ejs.render(template, {details: details, channel: slack_channel, results: results});    
    console.log(post);    

    // post to slack
    axios.default.post(slack_post, post).then(res  => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
          });
    console.log('exit main');  

    return new Promise((resolve, reject) => {
    });         
}    

/*
Entrypoint
*/
let args: minimist.ParsedArgs = minimist(process.argv.slice(2));
main(args).then(() => {
    process.exit(0)
}).catch((e) => {
    console.log(e);
    process.exit(1);
});