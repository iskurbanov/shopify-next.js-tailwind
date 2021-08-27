import React from 'react'
import Nav from './Nav'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Nav />

      <main>
        {children}
      </main>
      
      <footer>
        Footer
      </footer>
    </div>
  )
}
