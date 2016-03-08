import curry from 'lodash/fp/curry'

import { send } from '../core/signal'
import { perform } from '../core/task'


const handle = curry((name, address, action) => ({
  name: 'on' + name,
  value: event => {
    event.preventDefault()
    event.stopPropagation()
    perform(send(address, action))
  }
}))


export const onClick = handle('click')
