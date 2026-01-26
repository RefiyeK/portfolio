import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<'de' | 'en'>(this.getInitialLang());

  private translations: { [key: string]: { de: string; en: string } } = {
    // Header
    'header.about': { de: 'Über mich', en: 'About me' },
    'header.skills': { de: 'Kenntnisse', en: 'Skills' },
    'header.projects': { de: 'Projekte', en: 'Projects' },
    'header.contact': { de: 'Kontakt', en: 'Contact' },

    // Hero
    'hero.title': { de: 'FRONTEND DEVELOPER', en: 'FRONTEND DEVELOPER' },

    // Projects
    'projects.mainTitle': { de: 'Meine Projekte', en: 'My Projects' },
    'projects.aboutProject': { de: 'Über das Projekt', en: 'About the project' },
    'projects.duration': { de: 'Dauer', en: 'Duration' },
    'projects.workProcess': { de: 'Wie ich meinen Arbeitsprozess organisiert habe', en: 'How I organized my work process' },
    'projects.groupExperience': { de: 'Meine Erfahrung mit Gruppenarbeit', en: 'My experience with group work' },
    'projects.technologies': { de: 'Technologien', en: 'Technologies' },
    'projects.project': { de: 'Projekt', en: 'Project' },

    // Contact
    'contact.title': { de: 'Kontaktiere mich', en: 'Contact me' },
    'contact.cta': { de: 'Lass uns zusammenarbeiten!', en: "Let's work together!" },
    'contact.description1': { 
      de: 'Ich freue mich über neue Herausforderungen und spannende Projekte. Als Webentwicklerin bringe ich frische Ideen und technisches Know-how in Ihr Team ein.', 
      en: 'I look forward to new challenges and exciting projects. As a web developer, I bring fresh ideas and technical know-how to your team.' 
    },
    'contact.description2': { 
      de: 'Kontaktieren Sie mich gerne bei Jobangeboten, Projektanfragen oder Kooperationsmöglichkeiten.', 
      en: 'Feel free to contact me for job offers, project inquiries or collaboration opportunities.' 
    },
    'contact.name': { de: 'Ihr Name', en: 'Your Name' },
    'contact.email': { de: 'Ihre E-Mail', en: 'Your Email' },
    'contact.message': { de: 'Ihre Nachricht', en: 'Your Message' },
    'contact.nameRequired': { de: 'Ihr Name ist erforderlich', en: 'Your name is required' },
    'contact.emailRequired': { de: 'Ihre E-Mail ist erforderlich', en: 'Your email is required' },
    'contact.emailInvalid': { de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein', en: 'Please enter a valid email address' },
    'contact.messageRequired': { de: 'Ihre Nachricht ist erforderlich', en: 'Your message is required' },
    'contact.privacyStart': { de: 'Ich habe die', en: 'I have read the' },
    'contact.privacyLink': { de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    'contact.privacyEnd': { de: 'gelesen und stimme der Verarbeitung meiner Daten zu.', en: 'and agree to the processing of my data.' },
    'contact.privacyRequired': { de: 'Bitte akzeptieren Sie die Datenschutzerklärung', en: 'Please accept the privacy policy' },
    'contact.send': { de: 'Senden', en: 'Send' },
    'contact.success': { de: 'Ihre Nachricht wurde erfolgreich gesendet!', en: 'Your message has been sent successfully!' },
    'contact.phone': { de: 'Tel', en: 'Phone' },

    // Footer
    'footer.legalNotice': { de: 'Impressum', en: 'Legal Notice' },
    'footer.developer': { de: 'Entwicklerin', en: 'Developer' },

    // Privacy Page
    'privacy.title': { de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    'privacy.intro': { de: 'Einleitung', en: 'Introduction' },
    'privacy.introText': { 
      de: 'Diese Datenschutzerklärung erläutert, wie Ihre personenbezogenen Daten bei der Nutzung dieser Portfolio-Website und des Kontaktformulars erhoben, verwendet und geschützt werden.', 
      en: 'This privacy policy explains how your personal data is collected, used, and protected when you use this portfolio website and contact form.' 
    },
    'privacy.dataCollection': { de: 'Datenerhebung', en: 'Data Collection' },
    'privacy.dataCollectionText': { de: 'Bei der Nutzung des Kontaktformulars werden folgende Daten erhoben:', en: 'When you use the contact form, the following data is collected:' },
    'privacy.dataName': { de: 'Ihr Name', en: 'Your name' },
    'privacy.dataEmail': { de: 'Ihre E-Mail-Adresse', en: 'Your email address' },
    'privacy.dataMessage': { de: 'Ihr Nachrichteninhalt', en: 'Your message content' },
    'privacy.dataCollectionPurpose': { de: 'Diese Daten werden ausschließlich zur Beantwortung Ihrer Anfrage erhoben.', en: 'This data is collected solely for the purpose of responding to your inquiry.' },
    'privacy.dataUsage': { de: 'Verwendung der Daten', en: 'Use of Data' },
    'privacy.dataUsageText': { de: 'Ihre personenbezogenen Daten werden nur verwendet, um:', en: 'Your personal data will only be used to:' },
    'privacy.dataUsage1': { de: 'Ihre Kontaktanfrage zu beantworten', en: 'Respond to your contact request' },
    'privacy.dataUsage2': { de: 'Bezüglich potenzieller Jobangebote oder Kooperationen zu kommunizieren', en: 'Communicate regarding potential job opportunities or collaborations' },
    'privacy.dataUsageNote': { de: 'Ihre Daten werden nicht an Dritte weitergegeben oder für Marketingzwecke verwendet.', en: 'Your data will not be shared with third parties or used for marketing purposes.' },
    'privacy.dataStorage': { de: 'Datenspeicherung', en: 'Data Storage' },
    'privacy.dataStorageText': { 
      de: 'Ihre Daten werden sicher gespeichert und nach Erfüllung des Kommunikationszwecks gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.', 
      en: 'Your data is stored securely and will be deleted after the purpose of communication has been fulfilled, unless legal retention periods require otherwise.' 
    },
    'privacy.yourRights': { de: 'Ihre Rechte', en: 'Your Rights' },
    'privacy.yourRightsText': { de: 'Gemäß der DSGVO haben Sie folgende Rechte:', en: 'Under GDPR, you have the following rights:' },
    'privacy.right1': { de: 'Recht auf Auskunft über Ihre personenbezogenen Daten', en: 'Right to access your personal data' },
    'privacy.right2': { de: 'Recht auf Berichtigung unrichtiger Daten', en: 'Right to rectification of inaccurate data' },
    'privacy.right3': { de: 'Recht auf Löschung (Recht auf Vergessenwerden)', en: 'Right to erasure (right to be forgotten)' },
    'privacy.right4': { de: 'Recht auf Einschränkung der Verarbeitung', en: 'Right to restrict processing' },
    'privacy.right5': { de: 'Recht auf Datenübertragbarkeit', en: 'Right to data portability' },
    'privacy.right6': { de: 'Recht auf Widerspruch gegen die Verarbeitung', en: 'Right to object to processing' },
    'privacy.contactTitle': { de: 'Kontakt', en: 'Contact' },
    'privacy.contactText': { de: 'Bei Fragen oder Anliegen zu Ihren personenbezogenen Daten wenden Sie sich bitte an:', en: 'For any questions or requests regarding your personal data, please contact:' },
    'privacy.date': { de: 'Stand', en: 'Date' },
    'privacy.backBtn': { de: 'Zurück zum Kontakt', en: 'Back to Contact' },

    // Legal Notice
    'legal.title': { de: 'Impressum', en: 'Legal Notice' },
    'legal.imprint': { de: 'Kontakt', en: 'Contact' },
    'legal.address': { de: 'Frankfurter Str. 28', en: 'Frankfurter Str. 28' },
    'legal.city': { de: '51065 Köln, Deutschland', en: '51065 Cologne, Germany' },
    'legal.acceptance': { de: 'Nutzungsbedingungen', en: 'Terms of Use' },
    'legal.acceptanceText': { 
      de: 'Mit der Nutzung dieser Website akzeptieren Sie die folgenden Bedingungen. Diese können jederzeit ohne Vorankündigung geändert werden.', 
      en: 'By using this website, you accept the following terms. These may be changed at any time without notice.' 
    },
    'legal.scope': { de: 'Projektrahmen', en: 'Project Scope' },
    'legal.scopeText1': { 
      de: 'Diese Portfolio-Website dient der Präsentation meiner Arbeit als Frontend-Entwicklerin.', 
      en: 'This portfolio website serves to showcase my work as a frontend developer.' 
    },
    'legal.scopeText2': { 
      de: 'Alle Inhalte und das Design sind urheberrechtlich geschützt. Eine unbefugte Nutzung ist untersagt.', 
      en: 'All content and design are protected by copyright. Unauthorized use is prohibited.' 
    },
    'legal.proprietary': { de: 'Urheberrecht', en: 'Copyright' },
    'legal.proprietaryText': { 
      de: 'Alle Inhalte dieser Website, einschließlich Texte, Bilder und Code, sind mein geistiges Eigentum.', 
      en: 'All content on this website, including text, images and code, is my intellectual property.' 
    },
    'legal.use': { de: 'Nutzung', en: 'Usage' },
    'legal.useText': { 
      de: 'Diese Website darf nur für rechtmäßige Zwecke genutzt werden. Jede missbräuchliche Nutzung ist untersagt.', 
      en: 'This website may only be used for lawful purposes. Any misuse is prohibited.' 
    },
    'legal.disclaimer': { de: 'Haftungsausschluss', en: 'Disclaimer' },
    'legal.disclaimerText': { 
      de: 'Diese Website wird ohne Gewährleistung bereitgestellt. Ich hafte nicht für Schäden, die durch die Nutzung entstehen.', 
      en: 'This website is provided without warranty. I am not liable for any damages arising from its use.' 
    },
    'legal.indemnity': { de: 'Freistellung', en: 'Indemnity' },
    'legal.indemnityText': { 
      de: 'Sie erklären sich bereit, mich von allen Ansprüchen freizustellen, die aus Ihrer Nutzung dieser Website entstehen.', 
      en: 'You agree to indemnify me against any claims arising from your use of this website.' 
    },
    'legal.contactText': { 
      de: 'Bei Fragen kontaktieren Sie mich unter',
      en: 'For questions, contact me at'
    },
    'legal.date': { de: 'Stand', en: 'Date' },
    'legal.dateValue': { de: '22. Januar 2026', en: '22 January 2026' },
  
    'about.title': { de: 'Über mich', en: 'About me' },
    'about.location': { de: 'Ich wohne', en: 'I live' },
    'about.locationCity': { de: 'in Köln...', en: 'in Cologne...' },
    'about.description': { 
      de: 'Als leidenschaftliche Webentwicklerin verbinde ich analytisches Denken mit Kreativität. Ich bringe Ausdauer, Teamfähigkeit und eine lösungsorientierte Denkweise mit, um Ihre Projekte erfolgreich umzusetzen.',
      en: 'As a passionate web developer, I combine analytical thinking with creativity. I bring perseverance, teamwork skills, and a solution-oriented mindset to successfully implement your projects.'
    },
    'about.cta': { de: 'Lass uns reden', en: "Let's talk" },

    'references.title': { de: 'Brauchen Sie einen Teamplayer? Das sagen meine Kollegen über mich', en: "Need a team player? Here's what my colleagues say about me" },
    'references.subtitle': { de: 'Das sagen meine Kollegen über mich', en: 'What my colleagues say about me' },
    'references.linkedIn': { de: 'LinkedIn Profil', en: 'LinkedIn Profile' },
    'references.project': { de: 'Projekt', en: 'Project' },

    'skills.title': { de: 'Meine Kenntnisse', en: 'My Skills' },
    'skills.learning': { de: 'Das lerne ich gerade', en: 'I am currently learning' },
    'skills.learningText': { 
      de: 'Ich bin motiviert, meine Fähigkeiten kontinuierlich zu verbessern, innovative Lösungen umzusetzen und mit neuen Technologien auf dem Laufenden zu bleiben.',
      en: 'I am motivated to continuously improve my skills, implement innovative solutions, and stay up to date with new technologies.'
    },
    'skills.cta': { de: 'Lass uns reden', en: "Let's talk" },
  };

  private getInitialLang(): 'de' | 'en' {
    const saved = localStorage.getItem('lang');
    if (saved === 'de' || saved === 'en') {
      return saved;
    }
    return 'de';
  }

  setLanguage(lang: 'de' | 'en') {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
  }

  t(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      return key;
    }
    return translation[this.currentLang()];
  }
}