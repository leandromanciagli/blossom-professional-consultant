import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaidsService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  paidCart(payer: Object, items: Object[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-preference`, { payer: payer, items: items }).pipe();
  }

  checkPaymentStatus(preferenceId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment-status`, { preferenceId: preferenceId }).pipe();
  }

}
