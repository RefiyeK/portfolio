import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  scrollDownActive = false;

  constructor(public translationService: TranslationService) {}

  scrollToAbout(event: Event) {
    event.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}