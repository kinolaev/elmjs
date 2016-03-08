import curry from 'lodash/fp/curry'

import { type } from './basics'


export const Task = type('Task', Function)

export const task = fn => Task(() => new Promise(fn))

export const succeed = value => Task(() => Promise.resolve(value))

export const fail = error => Task(() => Promise.reject(error))

export const andThen = curry(([ run ], fn) => Task(() => run().then(fn)))

export const onError = curry(([ run ], fn) => Task(() => run().catch(fn)))

export const perform = ([ run ]) => run()

export default {
  Task,
  task,
  succeed,
  fail,
  andThen,
  onError,
  perform
}
