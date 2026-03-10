import { Component, HostListener, ElementRef, Renderer2, AfterViewInit, input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

/**
 * Site-wide header component.
 *
 * Responsibilities:
 * - Renders the logo, desktop navigation, language switcher, and hamburger menu.
 * - Switches between a transparent and a fixed/scrolled style based on scroll position.
 * - Provides smooth-scroll navigation to named sections, including cross-route support.
 * - Locks body scroll while the mobile menu overlay is open.
 *
 * The `isStatic` input disables all scroll-driven behaviour for pages (e.g. legal
 * notice, privacy policy) where a fixed header would obscure static content.
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {

  /** Host element reference — used once in `ngAfterViewInit` to cache the inner header node. */
  private readonly el = inject(ElementRef);

  /**
   * Angular Renderer2 — used instead of direct DOM manipulation so the component
   * stays compatible with server-side rendering and Web Workers.
   */
  private readonly renderer = inject(Renderer2);

  /** Router — needed to detect the current route and navigate before scrolling. */
  private readonly router = inject(Router);

  /** Provides active language state and the `t()` translation lookup used in the template. */
  readonly translationService = inject(TranslationService);

  /**
   * When `true`, scroll-driven class toggling is disabled and the header renders
   * in its static (non-sticky) state. Intended for standalone legal/policy pages.
   */
  readonly isStatic = input<boolean>(false);

  /**
   * Derived from the service signal so there is a single source of truth.
   * A local copy would risk going out of sync with the service state.
   */
  readonly currentLang = computed(() => this.translationService.currentLang());

  /** Whether the header has crossed the scroll threshold and should appear fixed. */
  isScrolled = false;

  /**
   * Tracks which language option the desktop switcher is currently hovering over.
   * `null` when no option is hovered.
   */
  hoveredLang: 'de' | 'en' | null = null;

  /**
   * Tracks which language option the mobile switcher is currently hovering over.
   * Kept separate from `hoveredLang` to avoid cross-contamination between the
   * desktop and mobile switcher states.
   */
  mobileLangHoveredOn: 'de' | 'en' | null = null;

  /** Controls the visibility of the full-screen mobile navigation overlay. */
  mobileMenuOpen = false;

  /**
   * Cached reference to the inner `.header` DOM element.
   * Queried once in `ngAfterViewInit` to avoid a live DOM query on every scroll event,
   * which would be costly at 60 fps.
   */
  private headerEl: HTMLElement | null = null;

  /**
   * Queries and caches the inner header element after the view has been initialised.
   * Must run post-init because the element does not exist during construction.
   */
  ngAfterViewInit(): void {
    this.headerEl = this.el.nativeElement.querySelector('.header');
  }

  /**
   * Responds to window scroll events and toggles the `isScrolled` flag.
   *
   * Early-return conditions (in order):
   * 1. Mobile viewport — the header is always static on small screens.
   * 2. `isStatic` input is `true` — scroll behaviour is explicitly disabled.
   * 3. `headerEl` is not yet available — guard against race conditions.
   *
   * The threshold of `window.innerHeight - 140` matches the point where the hero
   * section has scrolled sufficiently out of view.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.innerWidth <= 768 || this.isStatic() || !this.headerEl) return;
    const shouldBeFixed = window.scrollY >= window.innerHeight - 140;
    if (shouldBeFixed === this.isScrolled) return;
    this.isScrolled = shouldBeFixed;
  }

  /**
   * Delegates the language change to the translation service,
   * which persists the selection to `localStorage`.
   *
   * @param lang - The language code to activate (`'de'` or `'en'`).
   */
  switchLanguage(lang: 'de' | 'en'): void {
    this.translationService.setLanguage(lang);
  }

  /**
   * Opens or closes the mobile navigation overlay.
   *
   * Body scroll is locked while the overlay is open to prevent the background
   * page from scrolling through the transparent overlay on iOS Safari.
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.renderer.setStyle(document.body, 'overflow', this.mobileMenuOpen ? 'hidden' : '');
  }

  /**
   * Closes the mobile navigation overlay and restores body scroll.
   * Called both by internal navigation actions and by clicking the backdrop.
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  /**
   * Navigates to a named section, handling both same-page and cross-route scenarios.
   *
   * When called from a sub-page (e.g. `/privacy-policy`), the router first navigates
   * to `/`, then waits 300 ms for Angular's router and the DOM to finish rendering
   * before attempting the scroll. A shorter delay risks querying a section element
   * that does not yet exist in the DOM.
   *
   * @param sectionId - The `id` attribute of the target section element.
   * @param event     - The originating click event; prevented to suppress default anchor behaviour.
   */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    const isOnHomePage = this.router.url === '/' || this.router.url.startsWith('/#');
    if (!isOnHomePage) {
      // 300 ms: minimum safe delay for Angular Router + DOM to complete rendering the home route
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 300);
      });
    } else {
      setTimeout(() => this.scrollToElement(sectionId), 100);
    }
  }

  /**
   * Performs the actual smooth scroll to a section element.
   *
   * The 80 px offset compensates for the fixed header height so the section
   * heading is not hidden underneath the header after scrolling.
   *
   * @param sectionId - The `id` attribute of the target section element.
   */
  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const topPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
}