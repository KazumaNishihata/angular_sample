import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MessageService } from './services/message.service';
import { MessagesData } from './services/messages-data';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ObservableTodoComponent } from './pages/observable-todo/observable-todo.component';

import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'observable-todo', component: ObservableTodoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ObservableTodoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MessagesData),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
