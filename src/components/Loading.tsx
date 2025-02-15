import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import ReactPlayer from 'react-player';


import styles from '../styles.module.css'
import Card from './Card'

export default function Loading() {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([])
  const [items, set] = useState<string[]>([])
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { },
  })

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['Chúng tôi', 'yêu nhau', 'như thế nào']), 700))
    // ref.current.push(setTimeout(() => set(['Chúng tôi', 'Kiwis']), 5000))
    // ref.current.push(setTimeout(() => set(['Chúng tôi', 'Bananas', 'Kiwis']), 8000))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [])

  const [card, setCard] = useState(false);

  function toogleCard() {
    setCard(!card)
  }

  return (
    <div className={styles.container}>
        {/* <ReactPlayer url="/sound/love.mp3" playing /> */}
        { card ? <Card /> : (<div className={styles.main}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className={styles.transitionsItem} style={rest} onClick={reset}>
            <animated.div style={{  height: innerHeight }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>)}
      { !card ? <button className={styles.button} onClick={toogleCard}>Khám phá thôi</button> : null}
      
    </div>
  )
}
