import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private apiUrl = `${environment.apiUrl}/api/newsletter`;

  constructor(private http: HttpClient) { }

  subscribeToNewsletter(subscriptor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-subscriptor`, subscriptor);
  }
}
