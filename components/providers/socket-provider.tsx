'use client'

import React from 'react'
import { io as ClientIO } from 'socket.io-client'

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

const socketContext = React.createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return React.useContext(socketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState(null)
  const [isConnected, setIsConnected] = React.useState(false)

  React.useState(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: `/api/socket/io`,
        addTrailingSlash: false,
      },
    )

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <socketContext.Provider value={{ socket, isConnected }}>
      {children}
    </socketContext.Provider>
  )
}
