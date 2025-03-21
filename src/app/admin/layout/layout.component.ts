import { Component, OnInit } from '@angular/core';
//import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: false
})
export class LayoutComponent implements OnInit{

  constructor(/*private alertify: AlertifyService*/){ }

  ngOnInit(): void{
      //this.alertify.message("Merhaba",{messageType: MessageType.Success,...})
      //this.alertify.message("Merhaba",MessageType.Error, Position.TopCenter,15)
  }

}
