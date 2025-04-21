import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit {
  frm!: FormGroup;

  constructor(private userAuthService: UserAuthService,private authService: AuthService,private fb: FormBuilder, spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) {
    super(spinner)
    
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(spinnerType.BallFussion);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(spinnerType.BallFussion);
          })
          break;
       /* case "FACEBOOK":
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(spinnerType.BallFussion);
          })
          break;*/
      }
    });
  }

ngOnInit(): void {

}


  async onSubmit() {
    if (this.frm.invalid) {
      this.frm.markAllAsTouched();
      return;
    }

    const loginData = this.frm.value;
    console.log("Login form data:", loginData);
    // Giriş işlemini burada yap
  } 

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(spinnerType.BallFussion);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.router.navigate([""]);
      this.hideSpinner(spinnerType.BallFussion);
    });
  }


}


