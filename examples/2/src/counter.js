import { type, union, caseof, toString } from 'elm/core/basics'
import { div, button, text } from 'elm/html'
import { onClick } from 'elm/html/events'


const Increment = type('Increment')
const Decrement = type('Decrement')
const Action = union('Action', Increment, Decrement)

const init = model => model

const update = (action, model) => 
  caseof(action,
    Increment, () => model + 1,
    Decrement, () => model - 1
  )

const view = (address, model) =>
  div([], [
    button([ onClick(address, Decrement()) ], text('-')),
    text(toString(model)),
    button([ onClick(address, Increment()) ], text('+'))
  ])


export { Action, init, update, view }
