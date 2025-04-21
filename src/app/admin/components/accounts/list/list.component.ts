import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Account } from '../../../../contracts/List_Account';
import { AccountService } from '../../../../services/common/models/account.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id','userId', 'accountNumber', 'bankId', 'balance', 'currency',  'delete'];
  dataSource = new MatTableDataSource<List_Account>();

  totalCount: number = 0;
  pageSize: number = 5;
  currentPage: number = 0; // backend'in 0-based olduğunu varsayıyoruz

  constructor(
    spinner: NgxSpinnerService,
    private accountService: AccountService,
    private alertifyService: AlertifyService,
    private cdr: ChangeDetectorRef
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.loadAccounts();
  }

  async ngAfterViewInit() {
    // Sayfa değişikliği ve pageSize değişikliğini dinle
    this.paginator.page.subscribe(async (event: PageEvent) => {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      await this.loadAccounts();
    });
  }
  

  async loadAccounts() {
    this.showSpinner(spinnerType.BallFussion);

    try {
      const result = await this.accountService.read(this.currentPage, this.pageSize);

      if (!result.accounts.length && this.currentPage > 0) {
        this.currentPage--;
        return this.loadAccounts();
      }

      this.dataSource = new MatTableDataSource<List_Account>(result.accounts);
      this.totalCount = result.totalAccountCount;

      setTimeout(() => {
        if (this.paginator) {
          this.paginator.length = this.totalCount;
          this.paginator.pageSize = this.pageSize;
          this.paginator.pageIndex = this.currentPage;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        this.cdr.detectChanges();
      });

    } catch (error) {
      this.alertifyService.message("Hesaplar yüklenemedi!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    } finally {
      this.hideSpinner(spinnerType.BallFussion);
    }
  }

  async pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.loadAccounts();
  }
}
