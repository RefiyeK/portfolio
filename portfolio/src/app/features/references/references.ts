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
      project: 'Join, Kochwelt',
      quote: {
      de: 'Refiye war ein wertvolles Teammitglied im Join-Projekt. Sie arbeitete sehr sorgfältig an der Implementierung des Angular-Frontends und legte großen Wert auf qualitativ hochwertigen Code. Bei der Integration von Firebase bewies sie ein starkes technisches Verständnis und einen lösungsorientierten Ansatz. Sie beteiligte sich aktiv an Diskussionen und kommunizierte teamintern stets transparent. Ihre zuverlässige Arbeitsweise hat maßgeblich zum Fortschritt des Projekts beigetragen.',        
      en: 'Refiye was a valuable team member in the Join project. She worked very carefully on the implementation of the Angular frontend and placed great emphasis on high-quality code. During the integration of Firebase, she demonstrated strong technical understanding and a solution-oriented approach. She actively participated in discussions and communicated transparently within the team. Her reliable way of working significantly contributed to the projects progress.'      
    },
      linkedIn: 'https://de.linkedin.com/in/philipp-alexander-biebert-55258737a',
      isHovered: false
    },
    {
      name: 'Amas Movsisyan',
      project: 'Join',
      quote: {
        de: 'Refiye zeichnet sich durch eine zuverlässige und engagierte Arbeitsweise aus. Sie übernimmt Aufgaben eigenverantwortlich und erledigt diese sorgfältig sowie termingerecht. Ihr Blick für Details hilft ihr dabei, präzise und gut durchdachte Lösungen zu entwickeln. Zudem ist sie eine freundliche und kooperative Teamplayerin, die sich schnell in neue Themen einarbeitet und ihr Fachwissen effektiv einsetzt. Ihre strukturierte Herangehensweise macht sie zu einer wertvollen Bereicherung für jedes Team.',
        en: 'Refiye is characterized by her reliable and dedicated work ethic. She independently takes on tasks and completes them carefully and on time. Her attention to detail helps her develop precise and well thought out solutions. She is also a friendly and cooperative team player who quickly adapts to new topics and applies her technical knowledge effectively. Her structured approach makes her a valuable asset to any team.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
    {
      name: 'Altin Torba',
      project: 'Kochwelt',
      quote: {
        de: 'Refiye ist sehr fleißig und zugleich äußerst gewissenhaft. Sie ist sehr verantwortungsbewusst in dem, was sie tut, und es ist eine Freude, mit ihr im Team zu arbeiten.',
        en: 'Refiye is very hardworking and, at the same time, extremely conscientious. She is highly responsible in everything she does, and it is a pleasure to have her as a teammate.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    }

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