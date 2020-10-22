import {directive} from 'lit-html'

/*
    <div ref=${ref(this, 'myDiv')}
 */

export const ref = directive((el, id) => (part) => {
    el.refs = el.refs || {}
    if (el.refs[id]) {
        if (!(el.refs[id] instanceof Array)) el.refs[id] = [el.refs[id]]
        el.refs[id].push(part.committer.element)
    } else {
        el.refs[id] = part.committer.element
    }
})
