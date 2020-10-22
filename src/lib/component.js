import {LitElement} from 'lit-element'
import size from 'size'

export class Component extends LitElement {
    createRenderRoot() {
        return this
    }

    constructor(options = {}) {
        super()
        this.options = Object.assign({
            autoDestroy: true,
            autoEnter: false,
        }, options)
        this.init(options)
    }

    init(options = {}) {}

    async firstUpdated() {
        await 0
        this.onRender()
        
        this.onResize = this.onResize.bind(this)
        size.addListener(this.onResize)
        this.onResize(size.width, size.height)
        
        await 0
        this.dispatchEvent(new Event('ready'))
        if (this.options.autoEnter) this.enter()
    }

    onRender() {}

    onResize(width, height) {}

    enter(params = {}) {
        return new Promise((resolve, reject) => {
            return this.animateIn(params, () => {
                this._afterEnter()
                resolve()
            })
        })
    }

    animateIn(params, done) {
        done()
    }

    _afterEnter() {
        this.dispatchEvent(new Event('afterEnter'))
    }

    leave(params = {}) {
        return new Promise((resolve, reject) => {
            this.animateOut(params, () => {
                this._afterLeave()
                resolve()
            })
        })
    }

    animateOut(params, done) {
        done()
    }

    _afterLeave() {
        this.dispatchEvent(new Event('afterLeave'))
        if (this.options.autoDestroy) this.destroy()
    }

    onDestroy() {}

    destroy() {
        size.removeListener(this.onResize)
        this.onDestroy()
        this.remove()
    }
}

export {html} from 'lit-element'
