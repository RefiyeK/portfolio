import { Component, inject, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  translationService = inject(TranslationService);
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  isVisible = false;
  typedText = '';

  private observer!: IntersectionObserver;
  private typewriterTimeout!: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('.about');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (entry.isIntersecting) {
            this.startTypewriter();
          } else {
            this.resetTypewriter();
          }
          this.cdr.detectChanges();
        });
      },
      { threshold: 0.3 }
    );
    if (section) this.observer.observe(section);
  }

  getFullText(): string {
    const location = this.translationService.t('about.location');
    const city = this.translationService.t('about.locationCity');
    return `${location} ${city} |`;
  }

  private startTypewriter(): void {
    this.typedText = '';
    const fullText = this.getFullText();
    let index = 0;
    const type = () => {
      if (index < fullText.length) {
        this.typedText += fullText[index];
        index++;
        this.cdr.detectChanges();
        this.typewriterTimeout = setTimeout(type, 60);
      }
    };
    type();
  }

  private resetTypewriter(): void {
    clearTimeout(this.typewriterTimeout);
    this.typedText = '';
  }

  ngOnDestroy(): void {
    clearTimeout(this.typewriterTimeout);
    this.observer?.disconnect();
  }
}