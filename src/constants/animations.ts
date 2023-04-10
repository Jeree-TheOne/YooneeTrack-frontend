export const FADE = 'fade'

export const DEFAULT_ANIMATION_NAME = FADE

export default {
  [FADE]: {
    enter: { opacity: [ 0, 1 ], easing: 'easeOutQuart' },
    leave: { opacity: [ 1, 0 ], easing: 'easeInQuart' }
  }
}
