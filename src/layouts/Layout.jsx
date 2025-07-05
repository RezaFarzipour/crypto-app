import React from 'react'
import styles from './layout.module.css'
const Layout = ({children}) => {
  return (
    <>
  <header>
    <h1>Crypto App</h1>
   
  </header>
  {children}
  <footer>
    <p>Developed by Reza with❤️</p>
  </footer>
  </>
  )
}

export default Layout