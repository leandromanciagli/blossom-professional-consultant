import { Component, Input } from '@angular/core';
import { Course } from '@models/Course.model';
import { CoursesService } from '@services/courses/courses.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { addToCart } from '@store/cart/cat.actions';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { Observable } from 'rxjs';
import { SafeUrlPipe } from '@pipes/safe-url.pipe';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';


@Component({
  selector: 'app-course-details',
  imports: [
    CommonModule,
    SafeUrlPipe,
  ],
  providers: [
    SweetAlertService,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  loading$: Observable<boolean>
  courseId!: any
  course!: Course
  previewVisible = false;

  constructor(
    public coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private swal: SweetAlertService,
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
  }
  
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.loadCourse()
  }

  async loadCourse() {
    this.store.dispatch(showLoader());
    this.coursesService.getCourseById(this.courseId).subscribe(
      {
        next: (data) => {
          this.course = data
          this.store.dispatch(hideLoader());
        },
        error: async (e) => {
          this.store.dispatch(hideLoader());
          console.log(e);
        }
      }
    );
  }

  async addToCart(redirect: boolean) {
    this.store.dispatch(addToCart({ course: this.course }));
    if (!redirect) {
      await this.swal.displaySuccessMessage('El curso se agregó al carrito')
    }
    if (redirect) {
      this.router.navigate(['/cart']);
    }
  }
}
