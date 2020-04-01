import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';


import { Injector, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');
declare var webkitSpeechRecognition: any;



@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
 
  chat1 :   ChatService;
  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .pipe(
        scan((acc, val) => acc.concat(val))
      )
  }
 

  constructor(public chat: ChatService,private injector: Injector,
    private state : TransferState,
    @Inject(PLATFORM_ID) private platformid: Object,
    private renderer: Renderer2 ) {
      this.title = 'Voice Search Demo';
      if(isPlatformServer(this.platformid)){
        const envJson = this.injector.get('CONFIG')? this.injector.get('CONFIG'): {};
        this.state.set(configKey, envJson as any);
   }
  }


  public title : string;
  public title1 : string;
  self=this;

  @ViewChild('gSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;
  messages: Observable<Message[]>;
  formValue: string;
  voiceValue: string;
  public voiceSearch(){
    this.chat1 =new ChatService();

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        const voiceSearchForm = this.formSearch.nativeElement;
        const voiceHandler = this.hiddenSearchHandler.nativeElement;
        console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          console.log(voiceSearchForm);
          voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
            console.log(voiceHandler);
 
      //     voiceSearchForm.submit();
      //this.sendMessage1(voiceHandler.value);
      //this.chat.converse(voiceHandler.value);
      this.voiceValue=voiceHandler.value;
   //this.sendMessage1();
    }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }
    } else {
      console.log(this.state.get(configKey, undefined as any));
      }
  }
  
  sendMessage() {

  this.chat.converse((this.formValue != undefined )? this.formValue : this.voiceValue );
    this.formValue = '';
    this.voiceValue = undefined;
  }
  
  sendMessage1() {

   // this.chat.converse();
      //this.formValue = '';
    }
  
  

}
