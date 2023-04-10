import ANIMATIONS from '@/constants/animations'

const animations = Object.keys(ANIMATIONS)

export type AnimationName = typeof animations[number]

export type AnimationConfig = { [x: AnimationName]: Object }

export type AnimationTransitions = { [x: AnimationName]: Function }