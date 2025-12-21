import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isScrolled = false;
  currentLang: 'de' | 'en' = 'de';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  
  @HostListener('window:scroll', [])
onWindowScroll() {
  const heroHeight = window.innerHeight;
  const headerHeight = 140; // Header yüksekliği (yaklaşık)
  const scrollPosition = window.scrollY;
  
  const header = this.el.nativeElement.querySelector('.header');
  if (!header) return;

  // Header TAM kaybolunca fixed olsun
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
  }
}