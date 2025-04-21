// src/app/services/common/models/exchange.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeRateResponse } from '../../../contracts/ExchangeRateResponse';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
    private baseUrl = 'https://localhost:7246/api/exchange'; // 🔥 BACKEND URL'İN

    constructor(private http: HttpClient) {}
  
    getExchangeRate(currencyCode: string) {
      return this.http.get(`${this.baseUrl}/${currencyCode}`);
    }
}
