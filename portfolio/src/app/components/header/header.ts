import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /**
   * Header wird sticky, sobald Hero-Section verlassen wird
   */
  isScrolled = false;
  currentLang: 'de' | 'en' = 'de';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const heroHeight = window.innerHeight;
    this.isScrolled = window.scrollY >= heroHeight;
  }

  switchLanguage(lang: 'de' | 'en') {
    this.currentLang = lang;
    console.log('Sprache:', lang);
  }
}