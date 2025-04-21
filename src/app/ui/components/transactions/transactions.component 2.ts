import { Component, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionService } from '../../../services/common/models/transaction.service';
import { Transfer_Transaction } from '../../../contracts/Transfer_Transaction';
import { List_Account } from '../../../contracts/List_Account';
import { AccountService } from '../../../services/common/models/account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTransactionComponent } from '../../../components/dialogs/confirm-transaction/confirm-transaction.component';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent extends BaseComponent implements OnInit {
  model: Transfer_Transaction = {
    fromAccountNumber: '',
    toAccountNumber: '',
    amount: 0,
    description: ''
  };
  features = [
    {
      icon: '🔐',
      title: 'Secure Transfers',
      text: 'All your transactions are protected with bank-grade encryption and secure authorization protocols.'
    },
    {
      icon: '⚡',
      title: 'Instant Processing',
      text: 'Send money in seconds between your accounts or to other users — no delays, no stress.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      text: 'Easily initiate transfers on-the-go using our modern, responsive interface.'
    },
    {
      icon: '📄',
      title: 'Transaction History',
      text: 'Keep track of all your transfers in a detailed and searchable activity log.'
    }
  ];
  
  faqs = [
    {
      question: 'How secure is the transaction feature?',
      answer: 'We use OAuth 2.0 and end-to-end encryption to ensure each transaction is fully protected.'
    },
    {
      question: 'Can I transfer to accounts from other banks?',
      answer: 'Currently, transfers are available between linked accounts. External transfers will be available soon.'
    },
    {
      question: 'Is there a transaction fee?',
      answer: 'No. All internal transfers between your linked accounts are completely free of charge.'
    }
  ];
  
  responseMessage: string = '';
  accounts: List_Account[] = [];

  constructor(
    spinner: NgxSpinnerService,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private alertifyService: AlertifyService,
    public authService: AuthService
  ) {
    super(spinner);
    authService.identityCheck();

  }

  async ngOnInit(): Promise<void> {
    this.showSpinner(spinnerType.BallScaleMultiple);
    try {
      const response = await this.accountService.read(0, 100);
      this.accounts = response.accounts;
    } catch (error) {
      this.alertifyService.message("Accounts could not be loaded!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    this.hideSpinner(spinnerType.BallScaleMultiple);
  }

  async transfer() {
    const dialogRef = this.dialog.open(ConfirmTransactionComponent, {
      width: '400px',
      data: this.model
    });

    const confirmed = await dialogRef.afterClosed().toPromise();

    if (confirmed) {
      try {
        this.showSpinner(spinnerType.BallFussion);
        const response = await this.transactionService.transfer(this.model);
        this.responseMessage = "Transaction successful!";
        this.alertifyService.message("The transaction was completed successfully.", {
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      } catch (error) {
        this.responseMessage = "Transaction failed!";
        this.alertifyService.message("Transaction failed!", {
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.error(error);
      } finally {
        this.hideSpinner(spinnerType.BallScaleMultiple);
      }
    } else {
      this.alertifyService.message("Transaction cancelled.", {
        messageType: MessageType.Warning,
        position: Position.TopRight
      });
    }
  }
}
