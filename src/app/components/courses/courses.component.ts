import { Component } from '@angular/core';
import { Course } from '@models/Course.model';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesService } from '@services/courses/courses.service';
import { CommonModule } from '@angular/common';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    CourseCardComponent,
  ],
  providers: [
    CoursesService,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  groupedCoursesByTopic: { [topicName: string]: Course[][] } = {};
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    public coursesService: CoursesService
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
  }

  ngOnInit(): void {
    this.loadCourses()
  }

  async loadCourses() {
    this.store.dispatch(showLoader());

    this.coursesService.getAll().subscribe({
      next: (data: Course[]) => {
        const temp: { [topicName: string]: Course[] } = {};

        // Agrupamos por nombre de temática
        for (const course of data) {
          const topicName = course.topic?.name || 'Otros';
          if (!temp[topicName]) {
            temp[topicName] = [];
          }
          temp[topicName].push(course);
        }

        // Dividimos cada temática en bloques de a 4
        for (const topicName in temp) {
          const courses = temp[topicName];
          this.groupedCoursesByTopic[topicName] = [];

          for (let i = 0; i < courses.length; i += 4) {
            this.groupedCoursesByTopic[topicName].push(courses.slice(i, i + 4));
          }
        }

        this.store.dispatch(hideLoader());
      },
      error: (e) => {
        console.error(e);
        this.store.dispatch(hideLoader());
      }
    });
  }

}
