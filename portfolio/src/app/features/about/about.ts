import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

/**
 * Displays the "About Me" section with location info and a short biography.
 */
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  translationService = inject(TranslationService);
}