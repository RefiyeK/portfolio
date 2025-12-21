import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /**
   * Gibt an, ob die Seite gescrollt wurde
   */
  isScrolled = false;

  /**
   * Hört auf Scroll-Events und aktualisiert den Header-Status
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Wenn mehr als 100px gescrollt wurde, Header nach oben
    this.isScrolled = window.scrollY > 100;
  }
}