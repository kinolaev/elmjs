import { mailbox, map, foldp } from '../core/signal'


export const start = ({ model, update, view }) => {
  const { address, signal } = mailbox()
  return map(model => view(address, model), foldp(update, model, signal))
}
