import JobQueue from 'bull'

export interface IQueueClient {
  add(name: string, data: object): void
  process(): void
}

export interface IQueue {
  bull: JobQueue.Queue<any>
  options: {
    removeOnComplete: boolean
    removeOnFail: boolean
    attempts: number
    priority: number
  }
  handle: ({ data }: any) => Promise<void>
  name: string
}

export interface IJobQueue {
  handle: (data: any) => Promise<void>
  options: unknown
  key: string
}
