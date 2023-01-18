import { SSMClient, GetParameterCommand, PutParameterCommand, GetParameterCommandInput, PuttParameterCommandInput } from "@aws-sdk/client-ssm";
import { fromIni } from '@aws-sdk/credential-providers'
import { promisify } from 'util'

const region = process.env.REGION || 'us-east-1'
const profile = process.env.AWS_PROFILE || 'default'

const credentials = fromIni({ profile })





async function PutVariable(region: string) {
  const client = new SSMClient({ region })

  const input: PutParameterCommandInput = {
    Name: 'christest',
    Value: 'test',
    Type: 'String',
    Overwrite: true,
  }
  const command = new PutParameterCommand(input);
  const response = await client.send(command);
  console.log(response)
}

async function GetVariable(region: string) {
  const client = new SSMClient({ region })
  const input: GetParameterCommandInput = {
    Name: 'test',
  }
  const command = new GetParameterCommand(input)
  const response = await client.send(command)
  console.log(response)
}

PutVariable(region)
