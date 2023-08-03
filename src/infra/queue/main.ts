import JobQueue, { Job } from 'bull'

import config from '@core/config'
import { IQueue } from '@core/infra/queue'

import * as jobs from './jobs'

class QueueClient {
  private queues: IQueue[]

  constructor () {
    this.init()
  }

  private init () {
    const queues = Object.values(jobs).map(job => ({
      bull: new JobQueue(job.key, { redis: config.redis.url }),
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

      queue.bull.on('failed', (job: Job, err: Error) => {
        console.log(`Job ${queue.name} failed: `, job.data)
        console.log(err)
      })
    })
  }
}

export const Queue = new QueueClient()
