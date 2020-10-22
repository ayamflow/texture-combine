import {css} from 'linaria'

css`
    :global() {
        @import '~css-reset/index.css';

        html, body {
            width: 100%;
            height: 100%;
        }

        html {
            background-color: #fafbfc;
        }

        body {
            overscroll-behavior: none;
            & > main {
                height: 100%;
            }
        }

        .u-hidden {
            visibility: hidden;
            pointer-events: none;
        }

        .u-inactive {
            pointer-events: none;
        }

        .u-disabled {
            display: none;
        }

        .u-loading {
            cursor: wait;
        }
    }
`
