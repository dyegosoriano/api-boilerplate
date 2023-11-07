import Bull from 'bull'

export interface IQueueClient {
  add(name: string, data: object, jobOptions?: Bull.JobOptions): void
  process(): void
}

export interface IQueue {
  bull: Bull.Queue<any>
  options: Bull.JobOptions
  handle: (job: Bull.Job, done: Bull.DoneCallback) => Promise<void>
  name: string
}

export interface IJobQueue {
  handle: (job: Bull.Job, done: Bull.DoneCallback) => Promise<void>
  options: Bull.JobOptions
  key: string
}
