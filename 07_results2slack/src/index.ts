import minimist from 'minimist';
import { readFileSync } from 'fs';
import * as xml2js from 'xml2js';
import * as util from 'util';
import * as dotenv from 'dotenv';

/*
main
*/
async function main(args: minimist.ParsedArgs) 
{
    console.log('enter main:'+ args._);
    dotenv.config();
    let xml_file = process.env.XML_FILE ?? '';
    let slack_post = process.env.SLACK_POST ?? '';
    let slack_channel = process.env.SLACK_CHANNEL ?? '';

    console.log("xml_file " + xml_file);
    console.log("slack_post " + slack_post);
    console.log("slack_channel " + slack_channel);

    console.log('results2slack')


    // load xml file
    const file = readFileSync('./kuttl-test.xml', 'utf-8');
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

    // post to slack


    
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