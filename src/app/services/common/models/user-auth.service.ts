//import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
    constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }
  

    
    async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
      const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
        controllers: "auth",
        action: "login"
      }, { userNameOrEmail, password })
  
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
  
      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
  
        this.toastrService.message("User login has been provided successfully.", "Login Successful", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
  
      callBackFunction();
    }
  
    
    async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
      const observable: Observable<any | TokenResponse> = this.httpClientService.post({
        action: "refreshtokenlogin",
        controllers: "auth"
      }, { refreshToken: refreshToken });
  
      try {
        const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
  
        if (tokenResponse) {
          localStorage.setItem("accessToken", tokenResponse.token.accessToken);
          localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
        }
  
        callBackFunction(tokenResponse ? true : false);
      } catch {
        callBackFunction(false);
      }
    }
  
    async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
      const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
        action: "google-login",
        controllers: "auth"
      }, user);
  
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
  
      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
  
        this.toastrService.message("Login via Google has been successfully achieved.", "Login Successful", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }
  
      callBackFunction();
    }
  /*
    async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
      const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
        controller: "auth",
        action: "facebook-login"
      }, user);
  
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
  
      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
  
        this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
  
      callBackFunction();
    }
  */
    async passwordReset(email: string, callBackFunction?: () => void) {
      const observable: Observable<any> = this.httpClientService.post({
        controllers: "auth",
        action: "password-reset"
      }, { email: email });
  
      await firstValueFrom(observable);
      callBackFunction();
    }
  
    async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void): Promise<boolean> {
      const observable: Observable<any> = this.httpClientService.post({
        controllers: "auth",
        action: "verify-reset-token"
      }, {
        resetToken: resetToken,
        userId: userId
      });
  
      const state: boolean = await firstValueFrom(observable);
      callBackFunction();
      return state;
    }
  }