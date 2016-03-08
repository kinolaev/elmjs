import { Observable } from 'rxjs/Observable'
import { map as _map } from 'rxjs/operator/map'
import { scan as _scan } from 'rxjs/operator/scan'
import { skip as _skip } from 'rxjs/operator/skip'
import { startWith as _startWith } from 'rxjs/operator/startWith'
import curry from 'lodash/fp/curry'

import { type, infixr } from './basics'
import { task, onError, succeed } from './task'


export const Address = type('Address', Function)

export const mailbox = message => {
  let initial = message
  const observers = []
  return {
    address: Address(message => task(succeed => {
      initial = message
      observers.forEach(observer => observer.next(message))
      succeed()
    })),
    signal: new Observable(observer => {
      observers.push(observer)
      observer.next(initial)
      return () => {
        observers.splice(observers.indexOf(observer), 1)
      }
    })
  }
}
  
export const send = curry(([ send ], message) => infixr(send(message), onError, () => succeed()))
  
export const map = curry((fn, signal) => _map.call(signal, fn))

export const foldp = curry((fn, initial, signal) => _startWith.call(_scan.call(_skip.call(signal, 1), (acc, value) => fn(value, acc), initial), initial))

export const forwardTo = curry(([ send ], fn) => Address(message => send(fn(message))))


export default {
  mailbox,
  send,
  map,
  foldp,
  forwardTo
}
