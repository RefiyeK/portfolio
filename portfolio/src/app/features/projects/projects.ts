import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class MyProjectsComponent {
  translationService = inject(TranslationService);
  activeTab = 0;
  
  projects = [
        {
      name: 'Join',
      technologiesText: 'Angular, TypeScript, Firebase, SCSS',
      duration: { de: '8 Wochen', en: '8 Weeks' },
      about: { 
        de: 'Ein Kanban-basiertes Projektmanagement-Tool für Teams. Aufgaben können erstellt, priorisiert und per Drag & Drop zwischen verschiedenen Status-Spalten verschoben werden.',
        en: 'A Kanban-based project management tool for teams. Tasks can be created, prioritized, and moved between different status columns via drag & drop.'
      },
      workProcess: { 
        de: 'Das Projekt wurde komponentenbasiert mit Angular entwickelt. Firebase dient als Backend für Authentifizierung und Echtzeit-Datenbank. Der Code folgt einer klaren Service-Architektur.',
        en: 'The project was developed component-based with Angular. Firebase serves as the backend for authentication and real-time database. The code follows a clear service architecture.'
      },
      groupExperience: { 
        de: 'In einem 4-köpfigen Team habe ich eng mit meinen Kollegen zusammengearbeitet. Wir haben Git für die Versionskontrolle genutzt und Aufgaben klar aufgeteilt.',
        en: 'In a team of 4, I worked closely with my colleagues. We used Git for version control and clearly divided tasks.'
      },
      technologies: [
        { name: 'Angular', icon: 'icon/angular-.svg' },
        { name: 'TypeScript', icon: 'icon/typescript-.svg' },
        { name: 'Firebase', icon: 'icon/firebase-.svg' },
        { name: 'CSS', icon: 'icon/css-.svg' }
      ],
      previewImage: 'img/join.png',
      liveUrl: 'https://join-refiye-41dba.web.app',
      githubUrl: 'https://github.com/RefiyeK/Join'
    },
    {
      name: 'El Pollo Loco',
      technologiesText: 'JavaScript, HTML, CSS',
      duration: { de: '3 Wochen', en: '3 Weeks' },
      about: { 
        de: 'Ein spannendes Jump-and-Run-Spiel, das in JavaScript entwickelt wurde. Der Spieler steuert den Charakter Pepe durch eine gefährliche Wüstenlandschaft, sammelt Münzen und Flaschen und kämpft gegen verrückte Hühner und den Endboss.',
        en: 'An exciting jump-and-run game developed in JavaScript. The player controls the character Pepe through a dangerous desert landscape, collects coins and bottles, and fights against crazy chickens and the final boss.'
      },
      workProcess: { 
        de: 'Ich habe das Projekt in wiederverwendbare Module und Klassen aufgeteilt. Der Code ist gut dokumentiert mit klaren Datei- und Variablennamen. Ich habe objektorientierte Programmierung (OOP) Prinzipien angewendet.',
        en: 'I divided the project into reusable modules and classes. The code is well documented with clear file and variable names. I applied object-oriented programming (OOP) principles.'
      },
      groupExperience: { 
        de: 'Dies war ein Einzelprojekt, bei dem ich alle Aspekte der Entwicklung selbstständig umgesetzt habe - von der Spiellogik über die Animationen bis hin zur Kollisionserkennung.',
        en: 'This was a solo project where I implemented all aspects of development independently - from game logic to animations to collision detection.'
      },
      technologies: [
        { name: 'Html', icon: 'icon/html-.svg' },
        { name: 'css', icon: 'icon/css-.svg' },
        { name: 'JavaScript', icon: 'icon/javascript-.svg' }
      ],
      previewImage: 'img/elpolloloco.png',
      liveUrl: 'https://refiyek.github.io/El-Pollo-Loco-Game/',
      githubUrl: 'https://github.com/RefiyeK/El-Pollo-Loco-Game'
    },
    {
      name: 'Pokedex',
      technologiesText: 'JavaScript, HTML, CSS, PokéAPI',
      duration: { de: '1 Woche', en: '1 Week' },
      about: { 
        de: 'Eine interaktive Pokémon-Enzyklopädie, die Daten von der PokéAPI abruft. Benutzer können durch verschiedene Pokémon blättern, Details anzeigen und nach bestimmten Pokémon suchen.',
        en: 'An interactive Pokémon encyclopedia that fetches data from the PokéAPI. Users can browse through different Pokémon, view details, and search for specific Pokémon.'
      },
      workProcess: { 
        de: 'Ich habe mit der PokéAPI gearbeitet und asynchrone JavaScript-Funktionen verwendet, um Daten abzurufen und dynamisch darzustellen. Der Code ist modular und gut strukturiert.',
        en: 'I worked with the PokéAPI and used asynchronous JavaScript functions to fetch and dynamically display data. The code is modular and well structured.'
      },
      groupExperience: { 
        de: 'Dies war ein Einzelprojekt, bei dem ich meine Kenntnisse in API-Integration und dynamischer DOM-Manipulation vertieft habe.',
        en: 'This was a solo project where I deepened my knowledge in API integration and dynamic DOM manipulation.'
      },
      technologies: [
        { name: 'Html', icon: '/icon/html-.svg' },
        { name: 'css', icon: '/icon/css-.svg' },
        { name: 'JavaScript', icon: '/icon/javascript-.svg' }
      ],
      previewImage: 'img/pokedex-.png',
      liveUrl: 'https://refiyek.github.io/pokedex/',
      githubUrl: 'https://github.com/RefiyeK/pokedex'
    }
  ];
  
  selectTab(index: number) {
    this.activeTab = index;
  }
  
  get currentProject() {
    return this.projects[this.activeTab];
  }

  get currentLang(): 'de' | 'en' {
    return this.translationService.currentLang();
  }
}
