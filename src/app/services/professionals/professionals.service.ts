import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Professional } from '@models/Professional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  private apiUrl = `${environment.apiUrl}/wp/v2`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professional[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professional`).pipe(
      map(data => data.map((item: any) => new Professional(item)))
    );
  }
}
