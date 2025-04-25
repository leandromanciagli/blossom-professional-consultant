import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, firstValueFrom } from 'rxjs';
import { selectCartItems, selectCartTotal } from '@store/cart/cart.selector';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { PaidsService } from '@services/paids/paids.service';
import { environment } from '@environments/environment';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

declare const MercadoPago: any;

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [
    SweetAlertService,
    PaidsService,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cartItems$: Observable<any[]>;
  cartTotal$: Observable<number>;
  loading$: Observable<boolean>;

  payerForm = new FormGroup({
    payerName: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
    payerSurname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
    payerEmail: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });

  mp: any;
  preference: any = {
    id: null,
    init_point: null,
  };

  constructor(
    private store: Store,
    private router: Router,
    private swal: SweetAlertService,
    private paidsService: PaidsService,
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    // Inicializa el SDK de Mercado Pago
    this.mp = new MercadoPago(environment.publicKey);
  }

  async paidCart() {
    this.store.dispatch(showLoader());
    const cartItems = await firstValueFrom(this.cartItems$)
    const payer = { 
      name: this.payerForm.value.payerName,
      surname: this.payerForm.value.payerSurname,
      email: this.payerForm.value.payerEmail,
    }
    this.paidsService.paidCart(payer, cartItems).subscribe(
      {
        next: (preference) => {
          this.preference = preference;
          this.store.dispatch(hideLoader());
          if (this.preference.id) {
            this.mp.checkout({
              preference: {
                id: this.preference.id
              },
              autoOpen: true,
            });
          }
        },
        error: async (e) => {
          this.store.dispatch(hideLoader());
          console.log(e);
        }
      }
    );
  }

  get payerName() {
    return this.payerForm.get('payerName')!;
  }
  
  get payerSurname() {
    return this.payerForm.get('payerSurname')!;
  }

  get payerEmail() {
    return this.payerForm.get('payerEmail')!;
  }
}
