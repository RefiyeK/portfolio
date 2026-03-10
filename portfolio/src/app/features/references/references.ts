import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

/**
 * Displays colleague references/testimonials for the portfolio owner.
 *
 * Hover effects are suppressed on mobile to avoid sticky-hover issues
 * that occur on touch devices without a true mouseleave event.
 */
@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.html',
  styleUrls: ['./references.scss']
})
export class ReferencesComponent {

  /** Provides the active language and translation lookup. */
  translationService = inject(TranslationService);

  /**
   * Tracks whether the viewport is in mobile range (≤ 768 px).
   * Initialised eagerly so the template has the correct value on first render,
   * before any resize event fires.
   */
  isMobile = window.innerWidth <= 768;

  /**
   * Static list of colleague references shown in the section.
   * Each entry holds bilingual quote text so no async translation call is needed.
   */
  references = [
    {
      name: 'Sahra Mueller',
      project: 'El Pollo Loco',
      quote: {
        de: 'Refiye hat Inhalte in Zusammenarbeit mit den Teammitgliedern entwickelt, formatiert und geliefert. Sie ist eine zuverlässige und freundliche Person.',
        en: 'Refiye developed, formatted, and delivered content in collaboration with team members. She is a reliable and friendly person.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
    {
      name: 'James Rugman',
      project: 'Pokedex',
      quote: {
        de: 'Refiye ist eine zuverlässige und freundliche Person. Sie arbeitet strukturiert und schreibt sauberen Code. Ich empfehle sie als Kollegin.',
        en: 'Refiye is a reliable and friendly person. She works in a structured way and writes clean code. I recommend her as a colleague.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
  ];

  /**
   * Returns the currently active language code.
   * Exposed as a getter so the template can use it without calling the service directly.
   */
  get currentLang(): 'de' | 'en' {
    return this.translationService.currentLang();
  }

  /**
   * Keeps `isMobile` in sync when the browser window is resized.
   * Uses `@HostListener` instead of a manual subscription to avoid memory-leak risk.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * Toggles the hovered state of a reference card.
   * No-op on mobile — touch devices don't support true hover
   * and would otherwise leave cards permanently in the hovered state.
   *
   * @param ref       - The reference object whose hover state should be updated.
   * @param isHovered - `true` when the cursor enters the card, `false` when it leaves.
   */
  onHover(ref: any, isHovered: boolean): void {
    if (!this.isMobile) {
      ref.isHovered = isHovered;
    }
  }

  /**
   * Returns the correct circle icon path for a reference card.
   * On mobile a single static asset is always used because hover is disabled.
   * On desktop the hover variant is swapped in to provide visual feedback.
   *
   * @param ref - The reference object whose hover state is checked.
   * @returns   Path to the appropriate SVG icon asset.
   */
  getCircleImage(ref: any): string {
    if (this.isMobile) {
      return 'icon/ellipse25.svg';
    }
    return ref.isHovered ? 'icon/ellipse25-hover.svg' : 'icon/ellipse25.svg';
  }
}