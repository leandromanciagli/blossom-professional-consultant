import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '@store/cart/cart.selector';
import { removeItemFromCart } from '@store/cart/cat.actions';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { PaidsService } from '@services/paids/paids.service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [
    SweetAlertService,
    PaidsService,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems$: Observable<any[]>;
  cartTotal$: Observable<number>;
  loading$: Observable<boolean>;
  

  constructor(
    private store: Store, 
    private swal: SweetAlertService,
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);    
  }

  async removeItem(itemId: string): Promise<void> {
    await this.swal.displaySuccessMessage('El elemento se eliminó del carrito')
    this.store.dispatch(removeItemFromCart({ itemId }));
  }

}
