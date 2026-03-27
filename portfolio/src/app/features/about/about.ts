import { Component, inject, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  translationService = inject(TranslationService);
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  isVisible = false;

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.about');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          this.cdr.detectChanges();
        });
      },
      { threshold: 0.1 }
    );

    if (section) observer.observe(section);
  }
}