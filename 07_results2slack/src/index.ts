import minimist from 'minimist';
import { readFileSync } from 'fs';
import * as xml2js from 'xml2js';
import * as util from 'util';
import * as dotenv from 'dotenv';
import * as axios from 'axios';
import * as ejs from 'ejs';

async function load_results(xml_file: string) {
    const file = readFileSync(xml_file, 'utf-8');
    const XML:string = file; 
    return new Promise((resolve, reject) => {
        xml2js.parseString(XML, {trim: true}, function (err, result) {
            if(err) {
                console.log(err);
                reject(err);
            }
            //console.log(util.inspect(result, false, null));        
            resolve(result);
        })
    })    
}

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
    let post_to_slack = process.env.POST_TO_SLACK == 'true' ?? false;

    console.log("environment " + environment);
    console.log("xml_file " + xml_file);
    console.log("slack_post " + slack_post);
    console.log("slack_channel " + slack_channel);
    console.log("post_to_slack " + post_to_slack);

    console.log('results2slack')

    // load xml file
    let promise = load_results(xml_file);
    let results:any = await promise;
    console.log(util.inspect(results, false, null)); 

    // parse the results and build a message
    let failed_results = "";
    for(let i = 0; i < results.testsuites.testsuite.length; i++) {
        let testsuite = results.testsuites.testsuite[i];
        for(let j = 0; j < testsuite.testcase.length; j++) {
            let testcase = testsuite.testcase[j];
            let name = testsuite.$.name + "." +  testcase.$.name;
            console.log(name + " = " + !testcase.hasOwnProperty("failure"))        
            if ( testcase.hasOwnProperty("failure") ) {
                failed_results += ":x: " + name + "\n"
            }
        }
    }

    const template = readFileSync('./post.json', 'utf-8');
    let tests=results.testsuites.$.tests;
    let failures=results.testsuites.$.failures;
    let time=results.testsuites.$.time;
    let details = `Environment:${environment}\nTests:${tests}\nFailures:${failures}\nTime:${time}`
    let post = ejs.render(template, {details: details, channel: slack_channel, results: failed_results});    
    console.log(post);    

    // post to slack
    if (post_to_slack == true) {
        console.log("Posting to Slack")
        axios.default.post(slack_post, post).then(res  => {
            console.log(`statusCode: ${res.status}`)
            console.log(res);
          });
    } else {
        console.log("Skipping posting to Slack")
        console.log(post);
    }

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