import curryN from 'lodash/fp/curryN'
import curry from 'lodash/fp/curry'
import set from 'lodash/fp/set'


const curryIfNeeded = (arity, fn) => arity === 0 ? fn : curryN(arity, fn)


export const caseof = (value, ...cases) => {
  for (let i = 0, l = cases.length; i < l; i += 2) {
    if (cases[i] === value.constructor) {
      return cases[i + 1](...value)
    }
  }
  throw new Error('no match')
}

export const toString = value => String(value)


const defineHiddenProperties = (obj, props) =>
  Object.defineProperties(
    obj,
    Object.entries(props).reduce(entriesToDescriptors, {})
  )

const entriesToDescriptors = (descriptors, entry) => set(entry[0], {
  value: entry[1],
  writable: false,
  configurable: false,
  enumerable: false
}, descriptors)

export const type = (type, ...types) => {
  const constructor = curryIfNeeded(
    types.length,
    (...params) => defineHiddenProperties(params, { constructor, type })
  )
  return constructor
}

function Union() {}

export const union = (type, ...types) => defineHiddenProperties(types, { constructor: Union, type })

function Alias() {}

export const alias = (type, shape) => defineHiddenProperties(shape, { constructor: Alias, type })


export const infixr = curry((p0, fn, p1) => fn(p0, p1))
