import { Observable } from 'rxjs/Observable'
import { map as _map } from 'rxjs/operator/map'
import { scan as _scan } from 'rxjs/operator/scan'
import { startWith as _startWith } from 'rxjs/operator/startWith'
import curry from 'lodash/fp/curry'

import { type } from './basics'


export const Address = type('Address', Function)

export const mailbox = message => {
  let initial = message
  const observers = []
  return {
    address: Address(message => {
      initial = message
      observers.forEach(observer => observer.next(message))
    }),
    signal: new Observable(observer => {
      observers.push(observer)
      if (initial !== undefined) {
        observer.next(initial)
      }
      return () => {
        observers.splice(observers.indexOf(observer), 1)
      }
    })
  }
}
  
export const send = curry(([ send ], message) => {
  return send(message)
})
  
export const map = curry((fn, signal) => _map.call(signal, fn))

export const foldp = curry((fn, initial, signal) => _startWith.call(_scan.call(signal, (acc, value) => fn(value, acc), initial), initial))

export const forwardTo = curry(([ send ], fn) => Address(message => send(fn(message))))


export default {
  mailbox,
  send,
  map,
  forwardTo
}
