import { ChatMessageType } from '../../enums/chat-message-type.enum'
import './styles.css'

interface ChatMessageProps {
  message: {
    text: string
    type: ChatMessageType
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={message.type === ChatMessageType.SENT ? 'mensagem enviada' : 'mensagem recebida'}
    >
      {message.text}
    </div>
  )
}
