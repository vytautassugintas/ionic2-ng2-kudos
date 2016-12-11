import {Error} from "./error";
export class KudosForm {
  receiverEmail: string;
  amount: number;
  message: string;
  endorsement: string;

  constructor(receiverEmail: string, amount: number, message: string, endorsement: string) {
    this.receiverEmail = receiverEmail;
    this.amount = amount;
    this.message = message;
    this.endorsement = endorsement;
  }

  validate(userKudosAmount): Error {

    if (this.receiverEmail.length <= 0){
      return new Error("receiver_email", "Field cannot be empty");
    }

    if (this.amount <= 0){
      return new Error("amount", "Please enter amount");
    }

    if (this.amount > userKudosAmount){
      return new Error("amount", "Not enough kudos points");
    }

    return new Error("", "");
  }
}
