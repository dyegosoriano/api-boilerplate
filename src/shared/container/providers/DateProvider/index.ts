import { container } from 'tsyringe'

import { NodeDateProvider } from './implementations/NodeDateProvider'
import type { IDateProvider } from './models/IDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', NodeDateProvider)
