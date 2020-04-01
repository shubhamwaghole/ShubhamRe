import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { SpeechComponent } from './speech/speech.component';


@NgModule({
  declarations: [
    AppComponent,
    SpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
