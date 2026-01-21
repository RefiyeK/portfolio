import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.html',
  styleUrls: ['./references.scss']
})
export class ReferencesComponent {
  isMobile = window.innerWidth <= 768;

  constructor(public translationService: TranslationService) {}

  references = [
    {
      name: 'Sahra Mueller',
      project: 'El Pollo Loco',
      quote: { 
        de: 'Refiye hat Inhalte in Zusammenarbeit mit den Teammitgliedern entwickelt, formatiert und geliefert. Sie ist eine zuverlässige und freundliche Person.',
        en: 'Refiye developed, formatted, and delivered content in collaboration with team members. She is a reliable and friendly person.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
    {
      name: 'James Rugman',
      project: 'Pokedex',
      quote: { 
        de: 'Refiye ist eine zuverlässige und freundliche Person. Sie arbeitet strukturiert und schreibt sauberen Code. Ich empfehle sie als Kollegin.',
        en: 'Refiye is a reliable and friendly person. She works in a structured way and writes clean code. I recommend her as a colleague.'
      },
      linkedIn: 'https://linkedin.com/',
      isHovered: false
    },
  ];

  get currentLang(): 'de' | 'en' {
    return this.translationService.currentLang();
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onHover(ref: any, isHovered: boolean) {
    if (!this.isMobile) {
      ref.isHovered = isHovered;
    }
  }

  getCircleImage(ref: any): string {
    if (this.isMobile) {
      return 'icon/ellipse25.svg';
    }
    return ref.isHovered ? 'icon/ellipse25-hover.svg' : 'icon/ellipse25.svg';
  }
}