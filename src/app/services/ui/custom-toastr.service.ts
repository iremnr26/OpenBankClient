import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
  /* bu şekilde kullanıcaz 
  constructor(private toastrService : CustomToastrService){
    this.toastrService.message("Merhaba", "İrem", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopCenter
    }); 
  }*/

export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>) {
    const type = toastrOptions.messageType ?? ToastrMessageType.Info;
    const position = toastrOptions.position ?? ToastrPosition.TopRight;
 
  
    this.toastr[type](message, title, {
      positionClass: position,
   
    });
  }
  
  
}

export class ToastrOptions {
  messageType!: ToastrMessageType;
  position!: ToastrPosition;
    
}


export enum ToastrMessageType{
  Success="success",
  Info="info",
  Warning="warning",
  Error="error"
}
export enum ToastrPosition{
  TopRight="toast-top-right",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  TopLeft="toast-top-left",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width",
  TopCenter="toast-top-center",
  BottomCenter="toast-bottom-center"
  

}