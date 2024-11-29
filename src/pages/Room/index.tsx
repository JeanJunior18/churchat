import { useState, useRef, useEffect, useMemo } from 'react'
import Peer, { DataConnection } from 'peerjs'
import { useSearchParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './styles.css'

import InputMessage from '../../components/InputMessage'
import AppBar from '../../components/AppBar'
import { MessageContainer } from '../../components/MessageContainer'
import IMessage from '../../interface/IMessage.interface'
import { AckEnum } from '../../enums/ack.enum'
import { useChatContext } from '../../contexts/chat.context'

export default function Room() {
  const { peerId, setPeerId } = useChatContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [messages, setMessages] = useState<IMessage[]>([])
  const peerInstance = useRef<Peer | null>(null) // Instância do peer
  const connRef = useRef<DataConnection | null>(null) // Conexão ativa
  const [isConnected, setIsConnected] = useState(false)

  const remoteId = useMemo(() => searchParams.get('id'), [searchParams])

  useEffect(() => {
    window.onbeforeunload = (ev) => {
      return ev
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    const peer = new Peer()

    peer.on('open', (id) => {
      console.log('Peer OPEN', id)
      setPeerId(id)

      if (remoteId) {
        connectToPeer(remoteId)
      }
      // else {
      //   const peer = window.prompt(
      //     'Insira o ID de outro usuário ou deixe o campo vazio para ser o HOST',
      //   )
      //   if (peer) {
      //     connectToPeer(peer)
      //   }
      // }
    })

    peer.on('connection', (conn) => {
      console.log('Peer connection')
      setIsConnected(true)
      conn.on('data', (data) => {
        console.log('Data', data)
        setMessages((prevChat) => [...prevChat, data as IMessage])
      })
      connRef.current = conn
    })

    peerInstance.current = peer
  }, [])

  // Função para se conectar ao peer remoto
  const connectToPeer = (id: string) => {
    const conn = peerInstance.current.connect(id)
    conn.on('open', () => {
      console.log('Connection success')
      setIsConnected(true)
      connRef.current = conn
      conn.on('data', (data) => {
        setMessages((prevChat) => [...prevChat, data as IMessage])
      })
    })

    conn.on('error', (err) => {
      console.log('Deu ruim eerror', err)
    })
    conn.on('close', () => {
      setIsConnected(false)
      setSearchParams({ id: peerId })
    })
  }

  const sendMessage = (text: string) => {
    const message: IMessage = {
      id: uuid(),
      text,
      senderId: peerId,
      senderName: 'Jean',
      timestamp: Date.now(),
      ack: AckEnum.waiting,
    }
    setMessages((oldMessages) => [...oldMessages, message])

    if (connRef.current && connRef.current.open) {
      connRef.current.send(message)
    }
  }

  return (
    <>
      <div className='mensagem-container'>
        <AppBar isConnected={isConnected} />

        <MessageContainer peerId={peerId} messages={messages} />

        <InputMessage sendMessage={sendMessage} />
      </div>

      {/* Modal para adicionar mensagem rápida */}
      <div className='modal' id='modal'>
        <div className='modal-content'>
          <h2>Nova Mensagem Rápida</h2>
          <input type='text' id='novaMensagem' placeholder='Digite a mensagem...' />
          <button>Adicionar</button>
        </div>
      </div>
      {/* Modal para exibir QR Code de cadastro */}
      <div className='modal' id='modalCadastro'>
        <div className='modal-content'>
          <h2>QR Code para Cadastro</h2>
          {/* <img
            src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://openai.com'
            alt='QR Code'
            style={{ width: '100%', height: 'auto' }}
          /> */}

          <button>Fechar</button>
        </div>
      </div>
    </>
  )
}
