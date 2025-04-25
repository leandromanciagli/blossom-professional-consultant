import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { clearCart } from '@store/cart/cat.actions';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Observable } from 'rxjs';
import { CourseCardComponent } from '@components/courses/course-card/course-card.component';
import { NewsletterComponent } from '@components/newsletter/newsletter.component';
import { WorkshopsComponent } from '@components/workshops/workshops.component';
import { CoursesService } from '@services/courses/courses.service';
import { Course } from '@models/Course.model';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CourseCardComponent,
    WorkshopsComponent,
    NewsletterComponent,
  ],
  providers: [
    CoursesService,
    SweetAlertService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    'class': 'contents'
  }
})
export class HomeComponent {
  @ViewChild('lastCourses') miDiv!: ElementRef;

  scrollToLastCourses(): void {
    this.miDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  latestCourses: Course[][] = [];
  
  loading$: Observable<boolean>;

  payment: any = {
    id: null,
    status: null,
  }

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    public coursesService: CoursesService,
    private swal: SweetAlertService
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
  }

  async ngOnInit() {    
    await this.checkForPaid()
    this.loadLatestCourses()
  }

  async loadLatestCourses() {
    this.store.dispatch(showLoader());
    this.coursesService.getLatestCourses().subscribe(
      {
        next: (data) => {
          for (let i = 0; i < data.length; i += 4) {
            this.latestCourses.push(data.slice(i, i + 4));
          }
          this.store.dispatch(hideLoader());
        },
        error: async (e) => {
          console.log(e);
          this.store.dispatch(hideLoader());
        }
      }
    );
  }

  async checkForPaid() {
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/home/success')) {
      this.route.queryParams.subscribe(params => 
        {
          this.payment.id = params['payment_id'];
          this.payment.status = params['status'];
        }
      );
      // Si el estado es aprobado, limpiamos el carrito
      if (this.payment.status === 'approved') {
        this.store.dispatch(clearCart());
        await this.swal.displaySuccessMessage('¡Muchas gracias por tu compra!', 'Recibirás un email a tu casilla de correo a la brevedad.')
      }
    }
  }
}
