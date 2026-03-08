import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly translationService = inject(TranslationService);

  scrollToAbout(event: Event): void {
    event.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}