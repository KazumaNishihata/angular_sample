import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Message as MessageBase } from './messages-data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface Message extends MessageBase {
  edit?: boolean;
}
type Messages = Message[];

@Injectable()
export class MessageService {

  public messages: BehaviorSubject<Messages|null> = new BehaviorSubject(null);

  constructor(
    private http: Http
  ) { }

  /**
   * メッセージを取得
   */
  getMessages() {
    this.http
      .get('/api/messages')
      .subscribe(res => {
        this.messages.next(res.json().data.map( data => {
          data.edit = false;
          return data;
        }));
      });
  }
  /**
   * メッセージを作成
   */
  createMessage(text: string) {
    this.messages.value.push({
      id: this.messages.value.length + 1, // TODO: 削除機能ができたらID生成ロジックが必要
      edit: false,
      text
    });
    this.messages.next(this.messages.value);
  }
  /**
   * メッセージを編集状態にする
   */
  changeEditMessage(id: number) {
    const newMassages = this.messages.value.map( (message: Message) => {
      return Object.assign(message , {
        edit: id === message.id
      });
    });
    this.messages.next(newMassages);
  }
  /**
   * メッセージを編集
   */
  editMessage(text: string , id: number) {
    const newMassages = this.messages.value.map( (message: Message) => {
      if (id === message.id) {
        return {
          id ,
          edit: false,
          text
        };
      }
      return message;
    });
    this.messages.next(newMassages);
  }

  deleteMessage(id: number) {
    const newMassages = this.messages.value.filter( (message: Message) => {
      return id !== message.id;
    });
    this.messages.next(newMassages);
  }
}
