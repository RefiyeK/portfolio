import { Component, HostListener, ElementRef, Renderer2, AfterViewInit, input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  readonly translationService = inject(TranslationService);

  readonly isStatic = input<boolean>(false);

  // Single source of truth — direkt vom Service abgeleitet, kein lokaler Desync möglich
  readonly currentLang = computed(() => this.translationService.currentLang());

  isScrolled = false;
  hoveredLang: 'de' | 'en' | null = null;
  mobileLangHoveredOn: 'de' | 'en' | null = null;
  mobileMenuOpen = false;

  // Einmalig gecacht — verhindert DOM-Query bei jedem Scroll-Event
  private headerEl: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.headerEl = this.el.nativeElement.querySelector('.header');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.innerWidth <= 768 || this.isStatic() || !this.headerEl) return;

    const shouldBeFixed = window.scrollY >= window.innerHeight - 140;
    if (shouldBeFixed === this.isScrolled) return;
    this.isScrolled = shouldBeFixed;
  }

  switchLanguage(lang: 'de' | 'en'): void {
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.renderer.setStyle(document.body, 'overflow', this.mobileMenuOpen ? 'hidden' : '');
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();

    const isOnHomePage = this.router.url === '/' || this.router.url.startsWith('/#');

    if (!isOnHomePage) {
      // 300ms: Wartezeit bis Angular Router + DOM die neue Route vollständig gerendert hat
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 300);
      });
    } else {
      setTimeout(() => this.scrollToElement(sectionId), 100);
    }
  }

  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const topPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
}