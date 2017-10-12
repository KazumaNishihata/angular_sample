import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { MessageService } from './message.service';
import { Messages } from './messages-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * メッセージ表示用のデータ
   */
  messages: Messages;

  /**
   * 新規登録用のフォーム
   */
  public createForm = this.formBuilder.group({
    text: ['', Validators.required],
  });
  /**
   * 編集用のフォーム
   */
  public editForm = this.formBuilder.group({
    text: ['', Validators.required],
    id: ['', Validators.required],
  });
  constructor(
    private service: MessageService ,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setMessage();
  }
  setMessage(): void {
    this.service.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }
  createMessage(): void {
    if (!this.createForm.value.text) {
      return;
    }
    this.service.createMessage(this.createForm.value.text);
    this.createForm.controls['text'].setValue('');
  }
  changeEditMessage(id: number , text: string): void {
    this.editForm.controls['text'].setValue(text);
    this.editForm.controls['id'].setValue(id);
    this.service.changeEditMessage(id);
  }
  editMessage(): void {
    if (!this.editForm.value.text) {
      return;
    }
    this.service.editMessage(this.editForm.value.text, this.editForm.value.id);
  }
  deleteMessage(id: number): void {
    this.service.deleteMessage(id);
  }
}
