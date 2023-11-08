import { IJobQueue } from '@core/types/infra/IQueue'

class ConsoleLogJob implements IJobQueue {
  public key = 'ConsoleLog'

  public options = {
    removeOnComplete: true,
    removeOnFail: false,
    attempts: 5,
    priority: 1
  }

  async handle ({ data }: any) {
    const maxTimeout = 60000 * 1
    const minTimeout = 5000

    const timeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1)) + minTimeout
    console.log('The job will take', Math.floor(timeout / 1000), 'seconds to process...')

    setTimeout(() => console.log('ConsoleLog:', data), timeout)
  }
}

export const consoleLogJob = new ConsoleLogJob()
