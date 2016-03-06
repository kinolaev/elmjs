import { start } from 'elm/start-app/simple'

import { init, update, view } from './counter-pair'


export default start({
  model: init(0, 0),
  update: update,
  view: view
})
