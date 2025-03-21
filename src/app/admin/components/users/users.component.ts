import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent extends BaseComponent implements OnInit {
 constructor(spinner: NgxSpinnerService){
    super(spinner);
  }
  
  ngOnInit(): void {
  this.showSpinner(spinnerType.BallScaleMultiple)  
}
}
