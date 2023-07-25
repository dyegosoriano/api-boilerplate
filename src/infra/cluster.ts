import cluster from 'cluster'
import os from 'os'

const runPrimaryProcess = () => {
  const processesCount = os.cpus().length

  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking Server with ${processesCount} processes \n`)

  for (let index = 0; index < processesCount; index++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, _signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... scheduling another one!`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server')

  // const { default: server } = (await import('./server')) as any
  // server()
}

const isProduction = process.env.NODE_ENV === 'production'

cluster.isPrimary && isProduction ? runPrimaryProcess() : runWorkerProcess()
