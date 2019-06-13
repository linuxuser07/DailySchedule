import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable()
export class ScheduleService {

  //setting the Api Url 
  private facilityAPi = 'http://scadevjobs.com/api/';

  constructor(private _http: HttpClient) { }


  //getting the facilities, default no parameters 
  getFacilities(): Observable<any>{
    return this._http.get(this.facilityAPi + 'Locations');
  }
  //getting the Schedules based on Facility ID, and Day
  getSchedules(facilityId: string, day: string): Observable<any>{
    return this._http.get(this.facilityAPi + 'Schedules' + '/' + facilityId + '/' + day);
  }

}
