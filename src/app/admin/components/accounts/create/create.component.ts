import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/common/models/account.service';
import { Create_Account } from '../../../../contracts/Create_Account';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent extends BaseComponent implements OnInit {
  selectedBankId: string = '';
  selectedCurrency: string = '';
  createdAccountNumber: string | null = null;

  constructor(
    spinner: NgxSpinnerService,
    private accountService: AccountService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  create(txtUserId: HTMLInputElement) {
    const userId = parseInt(txtUserId.value);

    if (!this.selectedBankId || !this.selectedCurrency || isNaN(userId)) {
    
    }
      this.showSpinner(spinnerType.BallFussion);


    const create_account: Create_Account = {
      UserId: userId.toString(),
      BankId: this.selectedBankId,
      Currency: this.selectedCurrency,
    };

    this.accountService.create(
      create_account,
      () => {
        this.hideSpinner(spinnerType.BallFussion);
        this.alertify.message('Account Created Successfully :)', {
          dissmissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}
