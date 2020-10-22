import {Component, html} from 'lib/component'
import {Renderer, Geometry, Mesh } from 'ogl'
import {ref} from 'lib/lit-ref'
import Ticker from 'lib/ticker'
import * as styles from './styles'
import RGBAMaterial from '../rgba-material'

const RENDER_SIZE = 1024

export default class TextureCombine extends Component {
    init() {
        this.onUpdate = this.onUpdate.bind(this)
        this.onFileLoaded = this.onFileLoaded.bind(this)
    }

    render() {
        const layers = [
            { channel: 'r', name: 'red'},
            { channel: 'g', name: 'green'},
            { channel: 'b', name: 'blue'},
            { channel: 'a', name: 'alpha'},
        ]

        return html`
            <div class=${styles.app}>
                <div class="layers">
                ${layers.map(layer => html`
                    <div class="layer layer--${layer.name}"
                    data-channel=${layer.channel}
                    @dragover=${this.onDragOver}
                    @drop=${this.onDrop}
                    @dragleave=${this.onDragLeave}
                    ></div>
                `)}
                </div>
                <canvas class="canvas" data-label="Result" ref=${ref(this, 'canvas')}></canvas>
            </div>    
        `
    }

    onRender() {
        this.initRenderer()

        window.addEventListener('drop', this.preventDefault)
        window.addEventListener('dragover', this.preventDefault)

        this.fileReader = new FileReader()
        this.fileReader.onload = this.onFileLoaded

        this.isBusy = false
        this.start()
    }

    initRenderer() {
        this.renderer = new Renderer({
            canvas: this.refs.canvas,
            alpha: true,
            dpr: 1,
            preserveDrawingBuffer: true,
            width: RENDER_SIZE,
            height: RENDER_SIZE,
        })
        const gl = this.renderer.gl
        const geometry = new Geometry(gl, {
            position: {size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3])},
            uv: {size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2])},
        })
        this.program = new RGBAMaterial(gl)
        this.mesh = new Mesh(gl, {geometry, program: this.program})
    }

    preventDefault(event) {
        event.preventDefault()
    }

    onDragOver(event) {
        event.preventDefault()
        if (this.isBusy) return
        event.target.classList.add('is-drop-hover')
    }

    onDrop(event) {
        event.preventDefault()
        if (this.isBusy) return

        let file = event.dataTransfer.files[0]
        if (!file) return

        this.isBusy = true
        this.currentLayer = event.target
        let url = this.fileReader.readAsDataURL(file)
    }

    onDragLeave(event) {
        event.preventDefault()
        event.target.classList.remove('is-drop-hover')
    }

    async onFileLoaded(event) {
        let url = event.currentTarget.result


        let canvas = document.createElement('canvas')
        canvas.width = RENDER_SIZE
        canvas.height = RENDER_SIZE
        let context = canvas.getContext('2d')
        let img = new Image()
        img.src = url
        img.onload = () => {
            context.drawImage(img, 0, 0, RENDER_SIZE, RENDER_SIZE)
            canvas.complete = true
            this.currentLayer.innerHTML = `<img src="${url}" />`
            this.updateResult(canvas)
            this.isBusy = false
            this.currentLayer = null
        }
    }

    updateResult(canvas) {
        let channel = this.currentLayer.getAttribute('data-channel')
        this.program.setChannel(channel, canvas)
    }

    start() {
        Ticker.add(this.onUpdate)
    }
    
    stop() {
        Ticker.remove(this.onUpdate)
    }

    onUpdate() {
        this.renderer.render({scene: this.mesh})
    }
}

customElements.define('texture-combine', TextureCombine)
