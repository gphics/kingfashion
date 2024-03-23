import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <main className="not-found-page">
      <h2>Page not found !</h2>
      <Link href="/">Back Home</Link>
    </main>
  )
}

export default NotFound