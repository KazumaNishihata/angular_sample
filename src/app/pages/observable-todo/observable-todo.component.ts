import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { MessageService } from '../../services/message.service';
import { Messages } from '../../services/messages-data';

@Component({
  selector: 'app-observable-todo',
  templateUrl: './observable-todo.component.html'
})
export class ObservableTodoComponent implements OnInit {

  /**
   * メッセージ表示用のデータ
   */
  public messages: Observable<Messages|null> = null;
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
    // テンプレート一覧
    this.messages = this.service.messages;
    this.service.getMessages();
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
