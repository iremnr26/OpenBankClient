import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Transfer_Transaction } from '../../../contracts/Transfer_Transaction';
import { TransactionService } from '../../../services/common/models/transaction.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { AccountService } from '../../../services/common/models/account.service';
import { List_Account } from '../../../contracts/List_Account';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'fromAccountId',
    'toAccountId',
    'fromAccountNumber',
    'toAccountNumber',
    'amount',
    'description',
    'transactionDate',
    'delete'
  ];
  dataSource = new MatTableDataSource<Transfer_Transaction>();

  totalCount: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  accounts: List_Account[] = [];

  constructor(
    spinner: NgxSpinnerService,
    private transactionService: TransactionService,
    private alertifyService: AlertifyService,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
  ) {
    super(spinner);
  }

  async ngOnInit() {
    const result = await this.accountService.read(0, 100);
  this.accounts = result.accounts;
    this.showSpinner(spinnerType.BallScaleMultiple);
    await this.loadTransactions();
    this.hideSpinner(spinnerType.BallScaleMultiple);
  }

  async ngAfterViewInit() {
    this.paginator.page.subscribe(async (event: PageEvent) => {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      await this.loadTransactions();
    });
  }

  async loadTransactions() {
    try {
      const result = await this.transactionService.read(this.currentPage, this.pageSize);
  
      const mappedTransactions = result.transactions.map(tx => {
        const from = this.accounts.find(a => a.id === tx.fromAccountId);
        const to = this.accounts.find(a => a.id === tx.toAccountId);
  
        return {
          ...tx,
          fromAccountNumber: from?.accountNumber ?? 'Unknown',
          toAccountNumber: to?.accountNumber ?? 'Unknown'
        };
      });
  
      // 🔥 İşte burada mappedTransactions'ı kullanıyorsun!
      this.dataSource = new MatTableDataSource<Transfer_Transaction>(mappedTransactions);
      this.totalCount = result.totalCount;
  
      setTimeout(() => {
        if (this.paginator) {
          this.paginator.length = this.totalCount;
          this.paginator.pageSize = this.pageSize;
          this.paginator.pageIndex = this.currentPage;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    } catch (error) {
      this.alertifyService.message("Transactions could not be loaded.", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  

  async deleteTransaction(id: string) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      this.showSpinner(spinnerType.BallFussion);

      try {
        await this.transactionService.delete(id);

        this.alertifyService.message("Transaction deleted successfully.", {
          messageType: MessageType.Success,
          position: Position.TopRight
        });

        await this.loadTransactions();
      } catch (error) {
        this.alertifyService.message("Transaction could not be deleted.", {
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      } finally {
        this.hideSpinner(spinnerType.BallFussion);
      }
    }
  }
  async pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.loadTransactions();
  }
}
