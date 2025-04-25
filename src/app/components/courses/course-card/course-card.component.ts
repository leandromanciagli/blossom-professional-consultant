import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollOnOverflowDirective } from '@directives/scroll-on-overflow.directive';
import { addToCart } from '@store/cart/cat.actions';
import { Store } from '@ngrx/store';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';


@Component({
  selector: 'app-course-card',
  imports: [
    RouterLink, 
    RouterLinkActive,
    ScrollOnOverflowDirective,
  ],
  providers: [
    SweetAlertService,
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  host: {
    'class': 'contents'
  }
})
export class CourseCardComponent {
  @Input() course: any;

  constructor(private store: Store, private swal: SweetAlertService) {}

  async addToCart() {
    this.store.dispatch(addToCart({ course: this.course }));
    await this.swal.displaySuccessMessage('El curso se agregó al carrito')
  }
}