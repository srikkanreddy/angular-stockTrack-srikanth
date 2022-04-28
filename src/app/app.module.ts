import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockViewComponent } from './components/stock-view/stock-view.component';
import { StockService } from './services/stock.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AddStockComponent,
    StocksListComponent,
    StockViewComponent,
  ],
  bootstrap: [AppComponent],
  providers: [StockService],
})
export class AppModule {}
