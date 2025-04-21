
import { Component, OnInit } from '@angular/core';
import { List_Account } from '../../../contracts/List_Account';
import { AccountService } from '../../../services/common/models/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../base/base.component';


@Component({
  selector: 'app-banks',
  standalone: false,
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css'
})
export class BanksComponent extends BaseComponent implements OnInit {
  groupedAccounts: { [bankName: string]: List_Account[] } = {};

  constructor(private accountService: AccountService,spinner: NgxSpinnerService) {
    super(spinner);
  }

  async ngOnInit() {
    const result = await this.accountService.read(0, 100); // tüm hesapları çek
    this.showSpinner(spinnerType.BallSpinClockwise);
    this.groupedAccounts = this.groupByBankId(result.accounts); // 🔁 bankId'ye göre gruplandı
    this.hideSpinner(spinnerType.BallFussion);

  }
  getBankClass(bankName: string): string {
    const normalized = bankName.toLowerCase();
  
    if (normalized.includes("ziraat")) return "ziraat";
    if (normalized.includes("vakıf")) return "vakifbank";
    if (normalized.includes("yapı")) return "yapikredi";
    if (normalized.includes("halk")) return "halkbank";
    if (normalized.includes("iş")) return "isbank";
    if (normalized.includes("garanti")) return "garanti";
    if (normalized.includes("akbank")) return "akbank";
    if (normalized.includes("qnb")) return "qnb";
    if (normalized.includes("teb")) return "teb";
    if (normalized.includes("ing")) return "ing";
  
    return "bilinmeyen";
  }
  

  groupByBankId(accounts: List_Account[]): { [bankName: string]: List_Account[] } {
    const grouped: { [bankName: string]: List_Account[] } = {};
  
    const bankNames: { [key: number]: string } = {
      1: "Ziraat Bankası",
      2: "Vakıfbank",
      3: "Yapı Kredi",
      4: "Halkbank",
      5: "İş Bankası",
      6: "Garanti BBVA",
      7: "Akbank",
      8: "QNB Finansbank",
      9: "TEB",
      10: "ING"
    };
  
    for (const acc of accounts) {
      const bankName = bankNames[acc.bankId] || `Bilinmeyen Banka (${acc.bankId})`;
      if (!grouped[bankName]) {
        grouped[bankName] = [];
      }
      grouped[bankName].push(acc);
    }
  
    return grouped;
  }
  
  
}