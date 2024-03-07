import React from 'react'

import styles from './styles.module.css'
import Loading from './components/Loading'

export default function App() {

  return (
    <div className={styles.container}>
      <Loading></Loading>
      {/* <Deck /> */}
    </div>
  )
}
