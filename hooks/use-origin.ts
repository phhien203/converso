import React from 'react'

export function useOrigin() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  return origin
}
