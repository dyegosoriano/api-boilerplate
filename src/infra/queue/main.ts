import JobQueue from 'bull'

import config from '@core/config'
import { IQueue, IQueueClient } from '@core/infra/IQueue'

import * as jobs from './jobs'

class QueueClient implements IQueueClient {
  private queues: IQueue[]

  constructor () {
    this.init()
  }

  private init () {
    const queues = Object.values(jobs).map(job => ({
      bull: new JobQueue(job.key, {
        redis: {
          password: config.redis.password,
          host: config.redis.host,
          port: config.redis.port
        }
      }),
      options: job.options,
      handle: job.handle,
      name: job.key
    }))

    this.queues = queues

    console.log('Queue initialized successfully! 🚀 ')
  }

  public add (name: string, data: object) {
    const queue = this.queues.find((queue: IQueue) => queue.name === name)
    if (queue) queue.bull.add(data, queue.options)
  }

  public process () {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('error', (error: Error) => console.log('QueueClient ERROR:', error))

      queue.bull.on('failed', (job: JobQueue.Job, err: Error) => {
        console.log(`Job ${queue.name} failed: `, job.data)
        console.log(err)
      })
    })
  }
}

export const Queue = new QueueClient()
