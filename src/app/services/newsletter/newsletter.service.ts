import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private apiUrl = `${environment.apiUrl}/newsletter/v2`;

  constructor(private http: HttpClient) { }

  subscribeToNewsletter(subscriptor: any): Observable<any> {
    const username = '5556e4fadaf517999a1fdff85a8f0e7790ac37e9';
    const password = '41014b615e75e8187e5dba11e9da6a4b6a9b2d89';
    const auth = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    });
    return this.http.post<any>(`${this.apiUrl}/subscriptions`, subscriptor, { headers: headers });
  }
}
