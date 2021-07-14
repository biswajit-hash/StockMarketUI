import { Component, OnInit, ElementRef } from '@angular/core';
import { Company } from '../models/Company';
import { Comparison } from '../models/Comparison';
import { StockPrice } from '../models/StockPrice';
import { CompanyService } from '../services/company.service';
import { StockPriceService } from '../services/stock-price.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart: any = [];
  companies:  Company[];
  stockPrices: StockPrice[];
  submitted: boolean;
  minStockPrice: number;
  avgStockPrice: number;
  maxStockPrice: number;

  comparison: Comparison = {
    code: '',
    fromPeriod: '',
    toPeriod: ''
  }

  constructor(private companyService: CompanyService, private stockPriceService: StockPriceService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
        response => {
        this.companies = response.companyDtos;
        console.log(this.companies);
      } 
    );
  }

  onSubmit({value, valid}: {value: Comparison, valid: boolean}) {
    if(!valid) {
      this.submitted = false;
    }
    else {
      console.log(value);
      this.stockPriceService.getCompanyStockPrices(value)
        .subscribe(response => {
          console.log(response);
          this.stockPrices = response.stockDtos;
          this.findMinMaxAvgStockPrice(this.stockPrices);
         this.submitted = true;
        });
          console.log(this.chart);
    }
  }
  findMinMaxAvgStockPrice(stockPrices: StockPrice[]) {
    let stockPrice = [];
    stockPrices.forEach(data=> stockPrice.push(data.price));
    this.minStockPrice = stockPrice.reduce((a, b) => Math.min(a, b));
    this.avgStockPrice = stockPrice.reduce((a, b) => a+b, 0)/stockPrice.length;
    this.maxStockPrice = stockPrice.reduce((a, b) => Math.max(a, b));
  }

}
