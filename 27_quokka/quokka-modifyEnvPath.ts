



async function modifyEnvPath() {
  let testVar = process.env.LD_LIBRARY_PATH || '';
  //testVar=''
  console.log(testVar)

  const newPath = `${testVar.split(':').filter((path) => path !== '/opt/sox/libs/lib64').join(':')}:/opt/sox/libs/lib64`
  console.log(newPath)
  process.env.LD_LIBRARY_PATH=newPath

  console.log(process.env.LD_LIBRARY_PATH)

  /*process.env
  process.env['LD_LIBRARY_PATH'] =
    (process.env['LD_LIBRARY_PATH'] || '') + ':/opt/sox/libs/lib64';
  this.logger.info(process.env.LD_LIBRARY_PATH);*/
}

modifyEnvPath()
