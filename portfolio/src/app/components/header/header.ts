import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /**
   * Header wird sticky, sobald Hero-Section verlassen wird
   */
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Hero = 100vh
    const heroHeight = window.innerHeight;
    
    // Wenn Hero verlassen wurde, wird Header sticky
    this.isScrolled = window.scrollY >= heroHeight;
  }
}