import { Injectable } from '@angular/core';
declare var alertify: any;
  /*  bu şekilde kullanıcaz 
    constructor(private alertify: AlertifyService){ }

    ngOnInit(): void{
      //this.alertify.message("Merhaba",{messageType: MessageType.Success,...})
      //this.alertify.message("Merhaba",MessageType.Error, Position.TopCenter,15)
  }
  */

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  //message(message: string, messageType : MessageType, position : Position, _delay: number=3,dismissOthers:boolean = false){
  message(message: string,options : Partial<AlertifyOptions>){ 
  alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msj = alertify[options.messageType ?? MessageType.Message](message);
    if(options.dissmissOthers){
      msj.dismissOthers();
    }
  }

  dismissall(){
    alertify.dismissall();
  }
  
}

export class AlertifyOptions{
  messageType : MessageType = MessageType.Message;
  position : Position = Position.TopLeft;
  delay: number = 3;
  dissmissOthers: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}
