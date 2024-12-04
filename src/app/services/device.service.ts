import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = environment.back;

  constructor(private http: HttpClient) {}

  sendDeviceInfo(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
