import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

/**
 * Hero section with profile image, name, social links, and scroll-down button.
 */
@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly translationService = inject(TranslationService);

  /** Smooth scrolls to the about section */
  scrollToAbout(event: Event): void {
    event.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}