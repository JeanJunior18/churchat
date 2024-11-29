import { FormEvent, useRef } from 'react'

interface InputMessageProps {
  sendMessage: (text: string) => void
}

export default function InputMessage({ sendMessage }: InputMessageProps) {
  const messageRef = useRef(null)

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (messageRef.current.value) {
      sendMessage(messageRef.current.value)
      messageRef.current.value = ''
    }
  }

  return (
    <form className='input-container' onSubmit={handleSendMessage}>
      <input ref={messageRef} type='text' placeholder='Digite sua mensagem...' />
      <button className='botao-mensagem'>Enviar</button>
    </form>
  )
}
