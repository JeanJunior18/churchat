import IMessage from '../../interface/IMessage.interface'
import ChatMessage from '../../components/ChatMessage'
import { ChatMessageType } from '../../enums/chat-message-type.enum'
import { useEffect, useRef } from 'react'

interface MessageContainerProps {
  messages: IMessage[]
  peerId: string
}

export function MessageContainer({ messages, peerId }: MessageContainerProps) {
  const endMessageRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    endMessageRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='chat'>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={{
            ...message,
            type: message.senderId === peerId ? ChatMessageType.SENT : ChatMessageType.RECEIVED,
          }}
        />
      ))}
      <div ref={endMessageRef} />
    </div>
  )
}
