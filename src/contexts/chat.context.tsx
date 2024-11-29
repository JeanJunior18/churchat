import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface IChatContext {
  peerId: string
  setPeerId: Dispatch<SetStateAction<string>>
  pageUrl: string
  isHost: boolean
}

export const ChatContext = createContext<IChatContext | null>(null)

export const ChatContextProvider = ({ children }) => {
  const [searchParams] = useSearchParams()
  const [peerId, setPeerId] = useState<string | null>(null)

  const remoteId = useMemo(() => searchParams.get('id'), [searchParams])
  const pageUrl = `${window.location.origin}/room?id=${peerId}`

  if (!ChatContext) return
  return (
    <ChatContext.Provider value={{ peerId, setPeerId, pageUrl, isHost: !remoteId }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext)
