export interface ExchangeRateItem {
    Tarih: string;
    
    [key: string]: string | { $numberLong: string } | null; // TP_DK_USD_A gibi dinamik key'leri kapsar
  }
  
  export interface ExchangeRateResponse {
    items: ExchangeRateItem[];
    series: string[];
  }
