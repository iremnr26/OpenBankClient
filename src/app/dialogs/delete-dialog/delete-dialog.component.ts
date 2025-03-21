import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
  imports: [CommonModule, MatDialogModule], // ✅ Gerekli modüller eklendi

})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // ❌ Kullanıcı iptal etti
  }

  onYesClick(): void {
    this.dialogRef.close(true); // ✅ Kullanıcı onayladı
  }
}
