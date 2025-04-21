import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']  
})

export class AppComponent  {
  title = 'OpenBankClient';

  constructor(public authService: AuthService,private toastrService: CustomToastrService, private router: Router){
    authService.identityCheck();

  }

  ngOnInit() {
    }

    signOut() {
      localStorage.removeItem("accessToken");
      this.authService.identityCheck();
      this.router.navigate([""]);
      this.toastrService.message("The session is closed!", "Logged Out", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
    }
}


