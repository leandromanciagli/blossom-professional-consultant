import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Course } from '@models/Course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = `${environment.apiUrl}/wp/v2`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course`).pipe(
      map(data => data.map((item: any) => new Course(item)))
    );
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<any>(`${this.apiUrl}/course/${courseId}`).pipe(
      map(item => new Course(item))
    );
  }

  getLatestCourses(): Observable<Course[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course?per_page=4&orderby=date&order=desc`).pipe(
      map(data =>data.map(item => new Course(item)))
    );
  }
}
