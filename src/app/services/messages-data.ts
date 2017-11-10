import { InMemoryDbService } from 'angular-in-memory-web-api';

export interface Message {
  id: number;
  text: string;
}
export type Messages = Message[];

export class MessagesData implements InMemoryDbService {
  createDb() {
    const messages: Messages = [
      {
        id: 1,
        text: 'やること1'
      } ,
      {
        id: 2,
        text: 'やること2'
      } ,
      {
        id: 3,
        text: 'やること3'
      } ,
      {
        id: 4,
        text: 'やること4'
      }
    ];
    return { messages };
  }
}
