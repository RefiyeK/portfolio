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
      name: 'Philipp Biebert',
      project: 'Join',
      quote: {
      de: 'Refiye war ein wertvolles Teammitglied im Join-Projekt. Sie arbeitete sehr sorgfältig an der Implementierung des Angular-Frontends und legte großen Wert auf qualitativ hochwertigen Code. Bei der Integration von Firebase bewies sie ein starkes technisches Verständnis und einen lösungsorientierten Ansatz. Sie beteiligte sich aktiv an Diskussionen und kommunizierte teamintern stets transparent. Ihre zuverlässige Arbeitsweise hat maßgeblich zum Fortschritt des Projekts beigetragen.',        
      en: 'Refiye was a valuable team member in the Join project. She worked very carefully on the implementation of the Angular frontend and placed great emphasis on high-quality code. During the integration of Firebase, she demonstrated strong technical understanding and a solution-oriented approach. She actively participated in discussions and communicated transparently within the team. Her reliable way of working significantly contributed to the projects progress.'      
    },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
    {
      name: 'Leon Fischer',
      project: 'Pokedex',
      quote: {
        de: 'Refiye hat uns bei der Entwicklung der Pokedex-App tatkräftig unterstützt. Sie zeigte eine gute Auffassungsgabe bei der Umsetzung der UI-Komponenten mit HTML und CSS. Besonders hervorzuheben ist ihre Fähigkeit, Feedback konstruktiv umzusetzen und sich schnell in neue Aufgabenbereiche einzuarbeiten. Sie war eine freundliche Kollegin, die ihre Aufgaben stets pflichtbewusst und termingerecht erledigte. Ihre strukturierte Arbeitsweise war eine Bereicherung für unser kleines Team und wir schätzen ihren Einsatz sehr.',
        en: 'Refiye actively supported us during the development of the Pokedex app. She showed a good understanding of implementing UI components using HTML and CSS. Particularly noteworthy is her ability to implement feedback constructively and to quickly adapt to new areas of responsibility. She was a friendly colleague who always completed her tasks conscientiously and on time. Her structured way of working was an enrichment for our small team, and we greatly appreciate her commitment.'
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