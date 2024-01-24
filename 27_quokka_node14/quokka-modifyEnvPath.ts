



async function modifyEnvPath() {
  let testVar = process.env.LD_LIBRARY_PATH || '';
  //testVar=''
  console.log(testVar)

  // filter and add the path
  const newPath = `${testVar.split(':').filter((path) => path !== '/opt/sox/libs/lib64').join(':')}:/opt/sox/libs/lib64`
  console.log(newPath)
  process.env.LD_LIBRARY_PATH=newPath

  console.log(process.env.LD_LIBRARY_PATH)
}

modifyEnvPath()
