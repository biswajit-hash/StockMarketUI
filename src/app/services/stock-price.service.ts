import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../models/Company';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StockPrice } from '../models/StockPrice';
import { Comparison } from '../models/Comparison';
import { StockLookupReponse } from '../models/StockLookupReponse';

const BACKEND_URL = environment.apiUrl + '/api/v1.0/market/stock/get';

@Injectable({providedIn: 'root'})
export class StockPriceService {

  url: string;

  constructor(private http: HttpClient, private router: Router) {
   // this.url = 'http://stockpriceservice-env.eba-ivrhmdf7.ap-south-1.elasticbeanstalk.com/stockPrices';
  }


  getCompanyStockPrices(comparsion: Comparison) {
    return this.http.get<StockLookupReponse>(BACKEND_URL + "/"+comparsion.code+"/"+comparsion.fromPeriod+"/"+comparsion.toPeriod);
  }
}

