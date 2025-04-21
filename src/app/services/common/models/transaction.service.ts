import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Transfer_Transaction } from '../../../contracts/Transfer_Transaction';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClientService: HttpClientService) {}

  async transfer(transaction: Transfer_Transaction): Promise<any> {
    const response = await firstValueFrom(
      this.httpClientService.post({
        controllers: "transactions"
      }, transaction)
    );

    return response;
  }
  async read(page: number = 1, pageSize: number = 5): Promise<{ totalCount: number; transactions: Transfer_Transaction[] }> {
    try {
      const url = `transactions?page=${page + 1}&pageSize=${pageSize}`;

      const response = await lastValueFrom(
        this.httpClientService.get<{ totalCount: number; transactions: Transfer_Transaction[] }>({
          controllers: url
        })
      );

      console.log("📦 Transaction API response:", response);

      if (!Array.isArray(response.transactions)) {
        console.error("⚠️ 'transactions' alanı bir dizi değil!", response);
        throw new Error("API response transactions field is not an array.");
      }

      return response;

    } catch (error) {
      console.error("❌ Error while fetching transactions:", error);
      throw error;
    }
  }


  async delete(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpClientService.delete({
          controllers: "transactions"
        }, id)
      );
  
      console.log("Delete successful", response); // response null bile olabilir
    } catch (error) {
      console.error("Delete failed:", error.message || error);
    }
  }
  
}
