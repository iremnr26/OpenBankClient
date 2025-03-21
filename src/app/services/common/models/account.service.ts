import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Account } from '../../../contracts/Create_Account';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Account } from '../../../contracts/List_Account';
import { first, firstValueFrom, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private totalCount: number = 0; // 🔥 API'den gelen toplam veri sayısını saklayacağız

  constructor(private httpClientService: HttpClientService) {}
//veritabanı işlemlerini burda yapıcaz hepsini 
  create(account: Create_Account, successCallBack?: () => void, errorCallBack?: (message: string) => void) {
    this.httpClientService
      .post({ controllers: 'accounts' }, account)
      .subscribe({
        next: () => {
          if (successCallBack) successCallBack();
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorCallBack) {
            let errorMessage = '\n';

            // Eğer hata modeli FluentValidation hatasıysa
            if (errorResponse.error.errors) {
              Object.entries(errorResponse.error.errors).forEach(([key, messages]) => {
                errorMessage += `\n- ${messages}\n`;
              });
            } else {
              errorMessage += 'Unknown Error Occurred';
            }

            errorCallBack(errorMessage);
          }
        },
      });
  }
  // ✅ **Toplam kayıt sayısını döndür**
  getTotalCount(): number {
    return this.totalCount;
  }

  async read(
    page: number = 1,
    pageSize: number = 5
  ): Promise<{ totalCount: number; data: List_Account[] }> {
    try {
      const url = `accounts?page=${page}&pageSize=${pageSize}`; // ✅ URL’ye parametreleri ekle
  
      const response = await lastValueFrom(
        this.httpClientService.get<{ totalCount: number; data: List_Account[] }>({
          controllers: url // `params` yerine doğrudan URL stringi kullanılıyor
        })
      );
  
      console.log("✅ API'den gelen yanıt:", response);
  
      if (!Array.isArray(response.data)) {
        console.error("🚨 HATA: API 'data' alanı bir dizi değil! Gelen veri:", response);
        throw new Error("API response data field is not an array.");
      }
  
      return response; // 🔥 Toplam kayıt sayısı ve verileri birlikte döndür
    } catch (error) {
      console.error("Error while fetching accounts:", error);
      throw error;
    }
  }
  
  


 async delete(id: string) {
    const obs: Observable<any> = this.httpClientService.delete({
      controllers: "accounts"
    }, id);
  
   await firstValueFrom(obs)
      .then(() => {
        console.log("Delete successful");
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  }
}
