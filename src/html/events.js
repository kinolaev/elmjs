import { send } from '../core/signal'


export const onClick = (address, action) => ({
  name: 'onclick',
  value: event => {
    event.preventDefault()
    event.stopPropagation()
    send(address, action)
  }
})
