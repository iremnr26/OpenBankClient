import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from '../accounts/accounts.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // ✅ MatPaginatorModule EKLENDİ
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [
    AccountsComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"" , component: AccountsComponent}
      //başka component varsa burda belirticez yine birden fazla oluyor büyük projelerde
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    DeleteDialogComponent
  ]
})
export class AccountsModule { }
