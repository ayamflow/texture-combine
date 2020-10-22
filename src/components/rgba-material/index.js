import {Program, Texture} from 'ogl'
const glslify = require('glslify')

const CHANNELS = {
    RED: 'r',
    GREEN: 'g',
    BLUE: 'b',
    ALPHA: 'a'
}

export default class RGBAMaterial extends Program {
    constructor(gl) {
        super(gl, {
            uniforms: {
                r: {
                    value: new Texture(gl)
                },
                g: {
                    value: new Texture(gl)
                },
                b: {
                    value: new Texture(gl)
                },
                a: {
                    value: new Texture(gl)
                },
                useAlpha: {
                    value: 0.0
                }
            },
            vertex: glslify('./rgba.vert'),
            fragment: glslify('./rgba.frag'),
            transparent: true
        })
    }

    setChannel(channel, image) {
        let texture = this.uniforms[channel].value
        texture.image = image
        texture.needsUpdate = true
        console.log('setChannel', channel, image, this.uniforms[channel]);
    }

    toggleAlpha(value) {
        this.uniforms.useAlpha = value === true ? 1.0 : 0.0;
    }

    set r(image) {
        this.setChannel(CHANNELS.RED, image)
    }

    set g(image) {
        this.setChannel(CHANNELS.GREEN, image)
    }

    set b(image) {
        this.setChannel(CHANNELS.BLUE, image)
    }

    set a(image) {
        this.setChannel(CHANNELS.ALPHA, image)
    }
}
