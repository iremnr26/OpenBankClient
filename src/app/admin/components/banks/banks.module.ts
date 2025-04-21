import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from '../banks/banks.component';
import { RouterModule } from '@angular/router';
import path from 'path';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';




@NgModule({
  declarations: [
    BanksComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forChild([
      { path: "", component: BanksComponent}
     ])
  ]
})
export class BanksModule { }
