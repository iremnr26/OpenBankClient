import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { spinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService) 
  {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(spinnerType.BallFussion);
    //const token: string = localStorage.getItem("accessToken");

    ////const decodeToken = this.jwtHelper.decodeToken(token);
    ////const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    //let expired: boolean;
    //try {
    //  expired = this.jwtHelper.isTokenExpired(token);
    //} catch {
    //  expired = true;
    //}

    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("You need to login!", "Unauthorized Access!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }


    this.spinner.hide(spinnerType.BallFussion);

    return true;
  }

}