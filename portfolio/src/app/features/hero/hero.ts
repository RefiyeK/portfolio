import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  translationService = inject(TranslationService);
  scrollDownActive = signal(false);

  scrollToAbout(event: Event) {
    event.preventDefault();
    const element = document.getElementById('about');
    if (element) {
    //   const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
    // window.scrollTo({ top: yOffset, behavior: 'smooth' });
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setScrollActive(state: boolean) {
    this.scrollDownActive.set(state);
  }
}
