import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';



@NgModule({
  declarations: [
    ExchangeComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective,
    RouterModule.forChild([
      { path: "exchange", component: ExchangeComponent}
     ]),
     FormsModule
  ]
})
export class ExchangeModule { }
