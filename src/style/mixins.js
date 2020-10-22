export const hover = (content) => {
    return `
        @media (any-hover: none) {
            &:active {
                ${content}
            }
        }
        @media (any-hover: hover) {
            &:hover {
                ${content}
            }
        }
    `
}

export const mobile = `@media (max-width: 800px), (max-height: 600px)`
export const isMobile = () => innerWidth < 800 || innerHeight < 600