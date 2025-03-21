import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Account } from '../../../../contracts/List_Account';
import { AccountService } from '../../../../services/common/models/account.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
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

  displayedColumns: string[] = ['id','userId', 'accountNumber', 'bankId', 'balance', 'currency', 'edit', 'delete'];
  dataSource = new MatTableDataSource<List_Account>();

  totalCount: number = 0; // API’den gelen toplam kayıt sayısı
  pageSize: number = 5; // Varsayılan sayfa boyutu
  currentPage: number = 1; // Varsayılan olarak ilk sayfa

  constructor(
    spinner: NgxSpinnerService,
    private accountService: AccountService,
    private alertify: AlertifyService,
    private cdr: ChangeDetectorRef // 🔥 UI Güncellemek için ekledik

  ) {
    super(spinner);
  }

  async ngOnInit() {
    this.showSpinner(spinnerType.BallFussion);
    await this.loadAccounts(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    setTimeout(() => {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator; // 🔥 `MatPaginator`'ı `dataSource` ile bağla
            this.paginator.page.subscribe((event) => {
                this.onPageChange(event);
            });
        }
    });
}


async loadAccounts(page: number, pageSize: number) {
  console.log("📢 `loadAccounts()` çağrıldı! Gelen Sayfa:", page, "Gelen Sayfa Boyutu:", pageSize);

  try {
      const response = await this.accountService.read(page, pageSize);
      console.log("✅ Gelen API Verisi:", response);

      if (!response || response.data.length === 0) {
          console.warn("🚨 API boş veri döndürdü!");
          
          // Eğer silme sonrası sayfa boşaldıysa önceki sayfaya dön
          if (this.currentPage > 1) {
              this.currentPage--;
              return this.loadAccounts(this.currentPage, pageSize);
          }
      }

      this.dataSource.data = response.data;
      this.totalCount = response.totalCount;

      console.log("📢 Güncellenen Toplam Kayıt Sayısı:", this.totalCount);
      console.log("📢 Güncellenen Sayfa İndeksi:", this.currentPage - 1);

      setTimeout(() => {
          if (this.paginator) {
              console.log("🔄 Paginator Güncelleniyor...");
              this.paginator.length = this.totalCount;
              this.paginator.pageSize = pageSize;
              this.paginator.pageIndex = this.currentPage - 1;
              this.dataSource.paginator = this.paginator;
          }

          if (this.sort) {
              console.log("🔄 Sort Güncelleniyor...");
              this.dataSource.sort = this.sort;
          }
      });

  } catch (error) {
      console.error("🚨 `loadAccounts()` sırasında hata oluştu:", error);
  }
}


onPageChange(event: any) {
  console.log("📢 Sayfa değişti! Yeni sayfa:", event.pageIndex + 1, "Page Size:", event.pageSize);

  this.currentPage = event.pageIndex + 1; 
  this.pageSize = event.pageSize; 

  this.loadAccounts(this.currentPage, this.pageSize).then(() => {
      setTimeout(() => {
          if (this.paginator) {
              console.log("✅ `paginator.pageIndex` Ayarlanıyor:", this.currentPage - 1);
              this.paginator.pageIndex = this.currentPage - 1;
          }
      });
  });
}





 
}
