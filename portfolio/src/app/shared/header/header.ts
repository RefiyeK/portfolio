import { Component, HostListener, ElementRef, Renderer2, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  translationService = inject(TranslationService);
  
  @Input() isStatic: boolean = false;
  isScrolled = false;
  currentLang: 'de' | 'en' = 'de';
  langHovered = false;
  hoveredLang: 'de' | 'en' | null = null;
  mobileLangHoveredOn: 'de' | 'en' | null = null;
  mobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.innerWidth <= 768) return;
    if (this.isStatic) return;

    const heroHeight = window.innerHeight;
    const headerHeight = 140;
    const scrollPosition = window.scrollY;
    
    const header = this.el.nativeElement.querySelector('.header');
    if (!header) return;

    if (scrollPosition >= (heroHeight - headerHeight)) {
      this.isScrolled = true;
      this.renderer.setStyle(header, 'position', 'fixed');
      this.renderer.setStyle(header, 'top', '0');
      this.renderer.setStyle(header, 'bottom', 'auto');
    } else {
      this.isScrolled = false;
      this.renderer.setStyle(header, 'position', 'absolute');
      this.renderer.setStyle(header, 'bottom', '0');
      this.renderer.setStyle(header, 'top', 'auto');
    }
  }

  switchLanguage(lang: 'de' | 'en') {
    this.currentLang = lang;
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
