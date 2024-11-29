import { QRCodeSVG } from 'qrcode.react'
import { useChatContext } from '../../contexts/chat.context'

interface AppBarProps {
  isConnected: boolean
}

export default function AppBar({ isConnected }: AppBarProps) {
  const { pageUrl, isHost, peerId } = useChatContext()
  return (
    <div className='header'>
      <div>{isConnected ? 'Conectado' : 'Não Conectado'}</div>
      <div>Churchat</div>
      {!peerId ? <div>Carregando...</div> : <div>{pageUrl}</div>}
      {isHost && peerId && <QRCodeSVG value={pageUrl} />}
    </div>
  )
}
