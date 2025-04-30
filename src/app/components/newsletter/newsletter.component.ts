import { Component } from '@angular/core';
import { NewsletterService } from '@services/newsletter/newsletter.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { Observable } from 'rxjs';
import { SweetAlertService } from '@services/sweet-alert/sweet-alert.service';


@Component({
  selector: 'app-newsletter',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    SweetAlertService,
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {

  loading$: Observable<boolean>;
  
  subscriptionForm = new FormGroup({
    subscriberEmail: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });

  subscriber: any = {}

  constructor(
    public newsletterService: NewsletterService,
    private store: Store,
    private swal: SweetAlertService,
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
  }

  subscribeToNewsletter() {
    this.store.dispatch(showLoader());
    this.subscriber = {
      email: this.subscriptionForm.value.subscriberEmail!,
      optin: "single",
    };
    this.newsletterService.subscribeToNewsletter(this.subscriber).subscribe(
      {
        next: async (data) => {
          this.store.dispatch(hideLoader());
          this.subscriber = {}
          this.subscriptionForm = new FormGroup({
            subscriberEmail: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
          });
          await this.swal.displaySuccessMessage('Suscripción exitosa', '¡Te suscribiste con éxito! Revisá tu casilla de correo.')
        },
        error: async (e) => {
          console.log(e)
          this.store.dispatch(hideLoader());
          await this.swal.displayErrorMessage('Upss..', 'Lo sentimos, ocurrió un error al registrarte como suscriptor. Por favor, intentá nuevamente.')
        }
      }
    );
  }

  get subscriberEmail() {
    return this.subscriptionForm.get('subscriberEmail')!;
  }

}
