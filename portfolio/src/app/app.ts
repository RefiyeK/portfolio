import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { MyProjectsComponent } from './features/projects/projects';
import { ReferencesComponent } from './features/references/references';
import { Contact } from './features/contact/contact';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Skills, MyProjectsComponent, ReferencesComponent, Contact, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private router: Router) {}

  isPrivacyPage(): boolean {
    return this.router.url === '/privacy-policy' || this.router.url === '/legal-notice';
  }
}