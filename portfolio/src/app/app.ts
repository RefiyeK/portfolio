import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { MyProjectsComponent } from './components/projects/projects';
import { ReferencesComponent } from './components/references/references';
import { Contact } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

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