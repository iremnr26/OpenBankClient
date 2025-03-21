import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent extends BaseComponent implements OnInit{
 constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
  
  ngOnInit(): void {
  this.showSpinner(spinnerType.BallScaleMultiple)  
}
}
