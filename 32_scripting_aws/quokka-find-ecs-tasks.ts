import { ECSClient, ListClustersCommand, ListTasksCommand, DescribeTasksCommand } from '@aws-sdk/client-ecs'
import { fromIni } from '@aws-sdk/credential-providers'
import { promisify } from 'util'

const region = process.env.REGION || 'us-east-1'
const clusterName = process.env.CLUSTERNAME || 'default'
const profile = process.env.AWS_PROFILE || 'default'

const credentials = fromIni({ profile })

async function allClusters(region: string) {
  const client = new ECSClient({ region: region })
  const clusterCommand = new ListClustersCommand({})
  const clusterResponse = await client.send(clusterCommand)
  return new Promise((resolve, reject) => {
    resolve(clusterResponse)
  })
}

async function allTasks(region: string, clusterName: string): Promise<string[]> {
  const client = new ECSClient({ region: region })
  let tasksCommand = new ListTasksCommand({ cluster: clusterName })
  let tasksResponse = await client.send(tasksCommand)

  // list all tasks in the cluster
  const allTasks: string[] = []
  allTasks.push(...tasksResponse.taskArns)
  while (tasksResponse.nextToken !== undefined) {
    tasksCommand = new ListTasksCommand({ cluster: clusterName, nextToken: tasksResponse.nextToken })
    tasksResponse = await client.send(tasksCommand)
    allTasks.push(...tasksResponse.taskArns)
  }
  console.log(allTasks.length)
  return new Promise((resolve, reject) => {
    resolve(allTasks)
  })
}

async function test() {
  const clusters = await allClusters(region)
  console.log(clusters)

  const tasks = await allTasks(region, clusterName)
  console.log(tasks)
  const client = new ECSClient({ region: region })
  const describeCommand = new DescribeTasksCommand({ tasks: tasks, cluster: clusterName })
  const describeResponse = await client.send(describeCommand)
  console.log(describeResponse.tasks?.length)
}

test()
