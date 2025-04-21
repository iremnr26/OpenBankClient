import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object
) { }



identityCheck() {
  if (isPlatformBrowser(this.platformId)) {  // ✅ Sadece browser’da çalıştır
    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  } else {
    _isAuthenticated = false; // ❌ SSR veya test ortamında localStorage yok
  }
}

get isAuthenticated(): boolean {
  return _isAuthenticated;
}
}

export let _isAuthenticated: boolean;