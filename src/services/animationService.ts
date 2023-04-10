import ANIMATIONS from '@/constants/animations'
import anime from 'animejs'


import {
  AnimationName,
  AnimationConfig,
  AnimationTransitions
} from '@/models/animation'

export default function useAnimation(
  name: AnimationName,
  commonOptions = {}
): AnimationTransitions {
  const animationConfig = (ANIMATIONS as any)[name] as AnimationConfig

  const animationTransition = animationConfig
    ? Object.fromEntries(
      Object
        .entries(animationConfig)
        .map(([ name, defaultOptions ]) => [
          name,
          // TODO - Вынести в интерфейс
          ({ targets, options = {}, done }: { targets: HTMLElement | HTMLElement[], options?: Object, done?: Function }) => playAnimation({
            targets,
            options: {
              ...defaultOptions,
              ...commonOptions,
              ...options
            },
            done
          })
        ])
    )
    : {}

  return animationTransition
}

function playAnimation({ targets, done, options = {} }: {
    targets: HTMLElement | HTMLElement[]
    done?: Function,
    options: Object
  }) {
  anime({
    targets,
    ...options,

    complete() {
      if (done) done()
    }
  })
}
