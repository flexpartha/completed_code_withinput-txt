import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const _datalocation = './assets/data/sectorList.json';
const _datalocation1 = './assets/data/yeardatamonth.json';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private _httpCl:HttpClient) { }

  getSectorListdata():Observable<any>{
    return this._httpCl.get<any>(_datalocation);
  }

  getyearSectorListdata():Observable<any>{
    return this._httpCl.get<any>(_datalocation1);
  }
}