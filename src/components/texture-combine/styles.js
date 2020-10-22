import {css} from 'linaria'

export const app = css`
    .canvas {
        width: 200px !important;
        height: 200px !important;
        border: 10px solid #34495e;
        display: inline-block;
        margin: 100px;
    }

    .layers {
        display: inline-block;
        width: 500px;
        white-space: initial;
    }

    .layer {
        width: 200px;
        height: 200px;
        border: 1px solid white;
        overflow: hidden;

        display: inline-block;
        margin: 20px;

        position: relative;
        &:before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            right: 0;
            top: calc(50% - 10px);
            padding: 3px;
            background-color: rgba(black, 0.2);
            height: 20px;
            text-align: center;
            color: White;
            text-transform: uppercase;
        }

        &.is-drop-hover {
            background-color: #292929;
        }

        img {
            max-width: calc(200px - 20px);
            max-height: calc(200px - 20px);
        }
    }

    .layer--red {
        border-color: #c0392b;
    }

    .layer--green {
        border-color: #27ae60;
    }

    .layer--blue {
        border-color: #2980b9
    }

    .layer--alpha {
        border-color: #7f8c8d;
    }
`


