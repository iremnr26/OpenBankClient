import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsModule } from './accounts/accounts.module';
import { HomeModule } from './home/home.module';
import { TransactionsModule } from './transactions/transactions.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccountsModule,
    HomeModule,
    TransactionsModule,
    RegisterModule
    
  ]
})
export class ComponentsModule { }
