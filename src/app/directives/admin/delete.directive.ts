import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { AccountService } from '../../services/common/models/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
declare var $: any;
@Directive({
  selector: '[appDelete]',
  standalone: false
})
export class DeleteDirective {
  @Input() id: string;
  @Input() currentPage: number; // 🔥 Mevcut sayfa numarası
  @Input() pageSize: number; // 🔥 Sayfa boyutu
  @Output() callback: EventEmitter<{ page: number; pageSize: number }> = new EventEmitter();

  constructor(private element : ElementRef,
    private renderer: Renderer2,
    private accountService: AccountService,
    public dialog :MatDialog,
    private httpClientService :HttpClientService

  ) {
    const icon = this.renderer.createElement('mat-icon'); // 🔥 Mat-Icon oluştur
    
    this.renderer.addClass(icon, 'material-icons'); // Angular Material için gerekli class
    this.renderer.setProperty(icon, 'textContent', 'delete_outline'); // 🔥 Yalnızca ikon ekle
    this.renderer.setStyle(icon, 'cursor', 'pointer'); // 🔥 Tıklanabilir yapı
    this.renderer.setStyle(icon, 'font-size', '24px'); // 🔥 Boyut ayarla

    this.renderer.appendChild(this.element.nativeElement, icon); // 🔥 İkonu HTML'e ekle

  }

  
  @HostListener('click') async onClick() {
    if (!this.id) {
      console.error("🚨 ERROR: `id` is undefined!");
      return;
    }

    // 🔥 Onay diyaloğunu aç
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { id: this.id }
    });

    // 🔥 Kullanıcının yanıtını bekle
    dialogRef.afterClosed().subscribe(async result => {
      if (result) { // Eğer "Evet" denildiyse
        console.log("✅ Silme onaylandı, ID:", this.id);

        try {
          await this.accountService.delete(this.id);
          console.log("✅ Silme işlemi başarılı.");

            $(this.element.nativeElement.parentElement).fadeOut(500, () => {
            console.log("📢 `callback.emit()` çağrıldı!");
            console.log("📢 Gönderilen Sayfa:", this.currentPage);
            console.log("📢 Gönderilen Sayfa Boyutu:", this.pageSize);

            this.callback.emit({ page: this.currentPage, pageSize: this.pageSize }); // 🔥 Güncellenmiş sayfa bilgilerini gönder
          });

        } catch (error) {
          console.error("🚨 Silme başarısız:", error);
        }
      } else {
        console.log("❌ Silme işlemi iptal edildi.");
      }
    });
  }


}
 