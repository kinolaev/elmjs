import h from 'virtual-dom/h'
import set from 'lodash/fp/set'


const propsToObj = (obj, prop) => set(prop.name, prop.value, obj)

export const div = (props, children) => h('div', props.reduce(propsToObj, {}), children)
export const button = (props, children) => h('button', props.reduce(propsToObj, {}), children)
export const text = str => str
