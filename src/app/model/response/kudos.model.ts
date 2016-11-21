export class KudosResponse {
  amount: number;
  date: string;
  message: string;
  receiverFullName: string;
  receiverId: string;
  senderFullName: string;
  senderId: string;
  type: string;

  constructor(response: any) {
    this.amount = response.amount;
    this.date = response.date;
    this.message = response.message;
    this.receiverFullName = response.receiverFullName;
    this.receiverId = response.receiverId;
    this.senderFullName = response.senderFullName;
    this.senderId = response.senderId;
    this.type = response.type;
  }
}
