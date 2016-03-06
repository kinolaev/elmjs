import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'


if (typeof Object.entries !== 'function') {
  Object.entries = object => Object.keys(object).map(key => [ key, object[key] ])
}


export const fullscreen = signal => {
  let root
  let tree

  const next = nextTree => {
    if (root) {
      root = patch(root, diff(tree, nextTree))
    } else {
      root = document.body.insertBefore(createElement(nextTree), document.body.firstChild)
    }
    tree = nextTree
  }

  return signal.subscribe({ next })
}
