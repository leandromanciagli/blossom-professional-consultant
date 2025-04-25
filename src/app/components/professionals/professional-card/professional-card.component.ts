import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-professional-card',
  imports: [],
  templateUrl: './professional-card.component.html',
  styleUrl: './professional-card.component.css',
  host: {
    'class': 'contents'
  }
})
export class ProfessionalCardComponent {
  @Input() professional: any;
}
