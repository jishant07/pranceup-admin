import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from './global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  token?:string; 
  httpHeader:any;
  isLoading:boolean = false;

  constructor(
      private http:HttpClient
      ,private globalservice:GlobalService) { }

  getToken(){
    this.token = localStorage.getItem('token')!;
  }
  setHeader(){
    this.getToken();
    this.httpHeader = {'token': this.token as string};
  }

  //Begin: Port
  addPort(data:any){  
      return this.http.post(environment.devURL+"/app/addPort", data, {headers: this.httpHeader});
      //output format = {status: 'success', message: 'RtxPHScrrWfKbKPl4ho1'}
  }
  getPorts(){
      return this.http.get(environment.devURL+"/app/getAllPorts",{headers: this.httpHeader});
      //{status: 'success', message: Array(9)}
  }
  //End: Port

  //Begin: Airport
  addAirport(data:any){  
    return this.http.post(environment.devURL+"/app/addAirport", data, {headers: this.httpHeader});
    //output format = {status: 'success', message: 'RtxPHScrrWfKbKPl4ho1'}
  }
  getAirports(){
      return this.http.get(environment.devURL+"/app/getAllAirports",{headers: this.httpHeader});
      //{status: 'success', message: Array(9)}
  }
  //End: Airport
}
