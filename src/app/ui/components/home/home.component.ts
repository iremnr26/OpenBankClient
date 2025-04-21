import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends BaseComponent implements OnInit {
  userName: string | null = null;

constructor(spinner: NgxSpinnerService,public authService: AuthService,alertifyService: AlertifyService){
    super(spinner);
    authService.identityCheck();

  }
  currentYear: number = new Date().getFullYear(); // 🔥 Dinamik yıl alma


  ngOnInit(): void {
    this.showSpinner(spinnerType.BallScaleMultiple);
    
  
  }
  

}
