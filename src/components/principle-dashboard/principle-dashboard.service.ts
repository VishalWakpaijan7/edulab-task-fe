import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipleDashboardService {

  constructor(private http: HttpClient) { }
  apiUrl: string = 'http://localhost:8080/api/';

  public generatePDF(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url);
  }
  public downloadPDF(url: string): Observable<Blob> {
    return this.http.get(this.apiUrl + url, { responseType: 'blob', headers: new HttpHeaders({ 'Accept': 'application/octet-stream' }) });
  }
}
