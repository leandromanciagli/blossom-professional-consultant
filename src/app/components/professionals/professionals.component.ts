import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professional } from '@models/Professional.model';
import { ProfessionalCardComponent } from './professional-card/professional-card.component';
import { ProfessionalsService } from '@services/professionals/professionals.service';
import { showLoader, hideLoader } from '@components/loader/loader.actions';
import { Store, select } from '@ngrx/store';
import { loaderSelector } from '@components/loader/loader.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-professionals',
  imports: [
    CommonModule,
    ProfessionalCardComponent,
  ],
  providers: [
    ProfessionalsService,
  ],
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.css'
})
export class ProfessionalsComponent {

  groupedProfessionals: Professional[][] = [];

  loading$: Observable<boolean>;
  
  constructor(
    private store: Store,
    public professionalsService: ProfessionalsService
  ) {
    this.loading$ = this.store.pipe(select(loaderSelector));
  }
  
  ngOnInit(): void {
    this.loadProfessionals()
  }

  async loadProfessionals() {
    this.store.dispatch(showLoader());
    this.professionalsService.getAll().subscribe(
      {
        next: (data) => {
          for (let i = 0; i < data.length; i += 3) {
            this.groupedProfessionals.push(data.slice(i, i + 3));
          }
          this.store.dispatch(hideLoader());
        },
        error: async (e) => {
          this.store.dispatch(hideLoader());
          console.log(e);
        }
      }
    );
  }
}
