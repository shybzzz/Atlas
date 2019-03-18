import { AppSettings } from './../../model/app-settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasApiService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>('assets/messages.json');
  }

  getAppSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>('assets/appsettings.json');
  }
}
