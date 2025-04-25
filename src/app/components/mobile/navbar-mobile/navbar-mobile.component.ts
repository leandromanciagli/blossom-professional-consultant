import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '@store/cart/cart.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-mobile',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css'
})
export class NavbarMobileComponent {
  isOpen = false;

  cartCount$!: Observable<number>;

  constructor(private store: Store) {
    this.cartCount$ = this.store.select(selectCartCount);
  }

}
