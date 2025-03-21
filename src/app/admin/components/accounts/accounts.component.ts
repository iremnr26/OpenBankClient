import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }
  
  ngOnInit(): void {
  this.showSpinner(spinnerType.BallScaleMultiple);
  //Get
  this.httpClientService.get({
    controllers: "accounts"
  }).subscribe(data => console.log(data));

  //Post
  /*this.httpClientService.post({
    controllers: "accounts"
  },{
    balance: "25.00",
    bankId: "1",
    userId: "2",
    currency: "deneme 1",
  }).subscribe(); */

  //Put
  /*this.httpClientService.put({
    controllers: "accounts"
  },{
    id:"1",
    balance: "9999",
    currency: "USD"
  }).subscribe();*/

//Delete
/*this.httpClientService.delete({
  controllers: "accounts"
},"16").subscribe(); */

}





}
