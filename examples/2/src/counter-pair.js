import set from 'lodash/fp/set' 

import { type, union, caseof } from 'elm/core/basics'
import { forwardTo } from 'elm/core/signal'
import { div, text, button } from 'elm/html'
import { onClick } from 'elm/html/events'

import * as Counter from './counter'


const Top = type('Top', Counter.Action)
const Bottom = type('Bottom', Counter.Action)
const Reset = type('Reset')
const Action = union('Action', Top, Bottom, Reset)

const init = (top, bottom) =>
  ({ top, bottom })
  
const update = (action, model) =>
  caseof(action,
    Top, action =>
      set('top', Counter.update(action, model.top), model),
    Bottom, action =>
      set('bottom', Counter.update(action, model.bottom), model),
    Reset, () => init(0, 0)
  )

const view = (address, model) =>
  div([], [
    Counter.view(forwardTo(address, Top), model.top),
    Counter.view(forwardTo(address, Bottom), model.bottom),
    button([ onClick(address, Reset()) ], [ text('RESET') ])
  ])


export { Action, init, update, view }
