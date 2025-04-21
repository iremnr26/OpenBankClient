import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent  extends BaseComponent implements OnInit{
constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
  
  ngOnInit(): void {
  this.showSpinner(spinnerType.BallScaleMultiple)  
}
}
