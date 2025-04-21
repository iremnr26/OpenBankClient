import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Bank } from '../../../contracts/List_Bank';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(private httpClientService: HttpClientService) {}



  // ✅ Bankaları Getir
  async read(page: number = 1, pageSize: number = 5): Promise<{ totalBankCount: number; banks: List_Bank[] }> {
    try {
      const url = `banks?page=${page + 1}&pageSize=${pageSize}`;

      const response = await lastValueFrom(
        this.httpClientService.get<{ totalBankCount: number; banks: List_Bank[] }>({
          controllers: url
        })
      );

      console.log('✅ API’den gelen bankalar:', response);

      if (!Array.isArray(response.banks)) {
        throw new Error('API response banks field is not an array.');
      }

      return response;
    } catch (error) {
      console.error('Bankalar alınamadı:', error);
      throw error;
    }
  }

  // ✅ Banka Sil
  async delete(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpClientService.delete({
          controllers: 'banks'
        }, id)
      );

      console.log('✅ Banka silindi:', response);
    } catch (error) {
      console.error('❌ Silme işlemi başarısız:', error.message || error);
    }
  }
}
