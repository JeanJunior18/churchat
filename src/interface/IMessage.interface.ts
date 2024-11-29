import { AckEnum } from '../enums/ack.enum'

export default interface IMessage {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: number
  ack: AckEnum
}
