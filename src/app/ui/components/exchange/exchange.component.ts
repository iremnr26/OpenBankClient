import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../../services/common/models/exchange.service';
import { ExchangeRateItem, ExchangeRateResponse } from '../../../contracts/ExchangeRateResponse';
// Bu yukarıya eklenebilir
interface ExchangeRateViewModel {
  Tarih: string;
  buying: string;
  selling: string;
  isIncreased: boolean;
}
@Component({
  selector: 'app-exchange',
  standalone: false,
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.css'
})
export class ExchangeComponent implements OnInit {
  currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AED', 'AUD', 'AZN', 'BGN', 'CNY', 'DKK', 'KRW',
    'SEK', 'CHF', 'CAD', 'QAR', 'KWD', 'NOK', 'PKR', 'RON', 'RUB', 'SAR', 'XDR'
  ];
  currencyNames: { [key: string]: string } = {
    USD: '🇺🇸 US Dollar',
    EUR: '🇪🇺 Euro',
    GBP: '🇬🇧 British Pound',
    JPY: '🇯🇵 Japanese Yen',
    AED: '🇦🇪 UAE Dirham',
    AUD: '🇦🇺 Australian Dollar',
    AZN: '🇦🇿 Azerbaijani Manat',
    BGN: '🇧🇬 Bulgarian Lev',
    CNY: '🇨🇳 Chinese Yuan',
    DKK: '🇩🇰 Danish Krone',
    KRW: '🇰🇷 South Korean Won',
    SEK: '🇸🇪 Swedish Krona',
    CHF: '🇨🇭 Swiss Franc',
    CAD: '🇨🇦 Canadian Dollar',
    QAR: '🇶🇦 Qatari Riyal',
    KWD: '🇰🇼 Kuwaiti Dinar',
    NOK: '🇳🇴 Norwegian Krone',
    PKR: '🇵🇰 Pakistani Rupee',
    RON: '🇷🇴 Romanian Leu',
    RUB: '🇷🇺 Russian Ruble',
    SAR: '🇸🇦 Saudi Riyal',
    XDR: '🌐 Special Drawing Rights'
  };
  
  
  //rateKey = ''; // örn: 'TP_DK_USD_A'

  
  selectedCurrency = 'USD';
  ///exchangeResult: ExchangeRateItem[] = [];
  rateKey = '';

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.getExchange();
  }

  exchangeResult: ExchangeRateViewModel[] = [];

getExchange() {
  this.rateKey = `TP_DK_${this.selectedCurrency}_A`;
  this.exchangeService.getExchangeRate(this.selectedCurrency).subscribe({
    next: (res: ExchangeRateResponse) => {
      const items = res.items.filter(item => {
        const val = item[this.rateKey];
        return typeof val === 'string' && val !== null;
      }) as Array<{ [key: string]: string }>;

      this.exchangeResult = items.map((item, index, arr) => {
        const buying = item[this.rateKey];
        const selling = (parseFloat(buying) * 1.005).toFixed(4);
        const prev = index > 0 ? parseFloat(arr[index - 1][this.rateKey]) : null;
        const isIncreased = prev !== null ? parseFloat(buying) > prev : false;

        return {
          Tarih: item['Tarih'],
          buying,
          selling,
          isIncreased
        };
      }).reverse();
    },
    error: (err) => {
      console.error('Exchange rate fetch failed', err);
    }
  });
}

  getSelling(buying: string | null): string {
    if (!buying) return 'N/A';
    const value = parseFloat(buying);
    return (value * 1.005).toFixed(4);
  }
  

  hasIncreased(index: number): boolean {
    if (index === 0) return false;
    const current = parseFloat(this.exchangeResult[index][this.rateKey] as string);
    const prev = parseFloat(this.exchangeResult[index - 1][this.rateKey] as string);
    return current > prev;
  }  

}
