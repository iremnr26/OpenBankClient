import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from '../banks/banks.component';
import { RouterModule } from '@angular/router';
import path from 'path';



@NgModule({
  declarations: [
    BanksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: BanksComponent}
     ])
  ]
})
export class BanksModule { }
