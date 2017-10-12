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

  public messagesData: BehaviorSubject<Messages>
      = new BehaviorSubject<Messages>([]);

  constructor(
    private http: Http
  ) { }

  /**
   * メッセージを取得
   * 一度しか呼ばれない
   */
  getMessages(): Observable<Messages> {
    this.http
      .get('/api/messages')
      .subscribe(res => {
        this.messagesData.next(res.json().data.map( data => {
          data.edit = false;
          return data;
        }));
      });
    return this.messagesData;
  }
  /**
   * メッセージを作成
   */
  createMessage(text: string) {
    this.messagesData.value.push({
      id: this.messagesData.value.length + 1, // TODO: 削除機能ができたらID生成ロジックが必要
      edit: false,
      text
    });
    this.messagesData.next(this.messagesData.value);
  }
  /**
   * メッセージを編集状態にする
   */
  changeEditMessage(id: number) {
    const newMassages = this.messagesData.value.map( (message: Message) => {
      return Object.assign(message , {
        edit: id === message.id
      });
    });
    this.messagesData.next(newMassages);
  }
  /**
   * メッセージを編集
   */
  editMessage(text: string , id: number) {
    const newMassages = this.messagesData.value.map( (message: Message) => {
      if (id === message.id) {
        return {
          id ,
          edit: false,
          text
        };
      }
      return message;
    });
    this.messagesData.next(newMassages);
  }

  deleteMessage(id: number) {
    const newMassages = this.messagesData.value.filter( (message: Message) => {
      return id !== message.id;
    });
    this.messagesData.next(newMassages);
  }
}
