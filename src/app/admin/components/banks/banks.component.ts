import { Component, OnInit } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-banks',
  standalone: false,
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css'
})
export class BanksComponent extends BaseComponent  implements OnInit{
  constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
  ngOnInit(): void {
     this.showSpinner(spinnerType.BallScaleMultiple)  
   
  
  }
}
