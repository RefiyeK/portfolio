import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<'de' | 'en'>('de');

  private translations: { [key: string]: { de: string; en: string } } = {
    // Header
    'header.about': { de: 'Über mich', en: 'About me' },
    'header.skills': { de: 'Kenntnisse', en: 'Skills' },
    'header.projects': { de: 'Projekte', en: 'Projects' },
    'header.contact': { de: 'Kontakt', en: 'Contact' },

    // Hero
    'hero.title': { de: 'FULLSTACK DEVELOPER', en: 'FULLSTACK DEVELOPER' },

    // Projects
    'projects.mainTitle': { de: 'Meine Projekte', en: 'My Projects' },
    'projects.aboutProject': { de: 'Über das Projekt', en: 'About the project' },
    'projects.duration': { de: 'Dauer', en: 'Duration' },
    'projects.workProcess': { de: 'Wie ich meinen Arbeitsprozess organisiert habe', en: 'How I organized my work process' },
    'projects.groupExperience': { de: 'Meine Erfahrung mit Gruppenarbeit', en: 'My experience with group work' },
    'projects.technologies': { de: 'Technologien', en: 'Technologies' },

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
    'legal.imprint': { de: 'Impressum', en: 'Imprint' },
    'legal.address': { de: 'Musterstraße 123', en: 'Sample Street 123' },
    'legal.city': { de: '12345 Berlin, Deutschland', en: '12345 Berlin, Germany' },
    'legal.acceptance': { de: 'Akzeptanz der Bedingungen', en: 'Acceptance of Terms' },
    'legal.acceptanceText': { 
      de: 'Durch den Zugriff auf und die Nutzung von Portfolio (Produkt) erkennen Sie die folgenden Geschäftsbedingungen sowie alle Richtlinien, Leitlinien oder Änderungen an, die Ihnen von Zeit zu Zeit vorgelegt werden können. Wir, die aufgeführten Studenten, können die Geschäftsbedingungen von Zeit zu Zeit ohne Vorankündigung aktualisieren oder ändern.',
      en: 'By accessing and using Portfolio (Product), you acknowledge the following terms and conditions as well as all policies, guidelines, or amendments that may be presented to you from time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.'
    },
    'legal.scope': { de: 'Umfang und Eigentum des Produkts', en: 'Scope and Ownership of the Product' },
    'legal.scopeText1': { 
      de: 'Portfolio wurde im Rahmen eines Studenten-Gruppenprojekts in einem Webentwicklungs-Bootcamp bei der Developer Akademie GmbH entwickelt. Es dient Bildungszwecken und ist nicht für umfangreiche persönliche oder geschäftliche Nutzung vorgesehen. Daher können wir keine konsistente Verfügbarkeit, Zuverlässigkeit, Genauigkeit oder andere Qualitätsaspekte dieses Produkts garantieren.',
      en: 'Portfolio was developed as part of a student group project in a web development bootcamp at Developer Akademie GmbH. It serves educational purposes and is not intended for extensive personal or business use. Therefore, we cannot guarantee consistent availability, reliability, accuracy, or other quality aspects of this product.'
    },
    'legal.scopeText2': { 
      de: 'Das Design von Portfolio ist Eigentum der Developer Akademie GmbH. Die unbefugte Nutzung, Vervielfältigung, Modifikation, Verbreitung oder Replikation des Designs ist strengstens untersagt.',
      en: 'The design of Portfolio is the property of Developer Akademie GmbH. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.'
    },
    'legal.proprietary': { de: 'Eigentumsrechte', en: 'Proprietary Rights' },
    'legal.proprietaryText': { 
      de: 'Abgesehen vom Design, das der Developer Akademie GmbH gehört, behalten wir, die aufgeführten Studenten, alle Eigentumsrechte an Portfolio, einschließlich aller zugehörigen urheberrechtlich geschützten Materialien, Marken und anderen geschützten Informationen.',
      en: 'Apart from the design, which belongs to Developer Akademie GmbH, we, the listed students, retain all proprietary rights to Portfolio, including all related copyrighted materials, trademarks, and other protected information.'
    },
    'legal.use': { de: 'Nutzung des Produkts', en: 'Use of the Product' },
    'legal.useText': { 
      de: 'Portfolio ist nur für rechtmäßige Zwecke in Übereinstimmung mit allen geltenden Gesetzen und Vorschriften zu verwenden. Jede Nutzung von Portfolio für illegale Aktivitäten oder um eine andere Person zu belästigen, zu schädigen, zu bedrohen oder einzuschüchtern, ist strengstens untersagt. Sie sind allein verantwortlich für Ihre Interaktionen mit anderen Nutzern von Portfolio.',
      en: 'Portfolio is to be used only for lawful purposes in compliance with all applicable laws and regulations. Any use of Portfolio for illegal activities or to harass, harm, threaten, or intimidate another person is strictly prohibited. You are solely responsible for your interactions with other users of Portfolio.'
    },
    'legal.disclaimer': { de: 'Haftungsausschluss und Haftungsbeschränkung', en: 'Disclaimer and Limitation of Liability' },
    'legal.disclaimerText': { 
      de: 'Portfolio wird ohne jegliche ausdrückliche oder stillschweigende Gewährleistung bereitgestellt, einschließlich, aber nicht beschränkt auf die stillschweigenden Gewährleistungen der Marktgängigkeit, Eignung für einen bestimmten Zweck und Nichtverletzung. In keinem Fall haften wir, die aufgeführten Studenten, oder die Developer Akademie für direkte, indirekte, zufällige, besondere, Folge- oder exemplarische Schäden, einschließlich, aber nicht beschränkt auf Schäden durch entgangenen Gewinn, Goodwill, Nutzung, Daten oder andere immaterielle Verluste, selbst wenn wir auf die Möglichkeit solcher Schäden hingewiesen wurden, die aus oder in Verbindung mit der Nutzung oder Leistung von Portfolio entstehen.',
      en: 'Portfolio is provided without any express or implied warranty, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall we, the listed students, or Developer Akademie be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection with the use or performance of Portfolio.'
    },
    'legal.indemnity': { de: 'Freistellung', en: 'Indemnity' },
    'legal.indemnityText': { 
      de: 'Sie erklären sich damit einverstanden, uns, die aufgeführten Studenten, die Developer Akademie und unsere verbundenen Unternehmen, Partner, leitenden Angestellten, Direktoren, Vertreter und Mitarbeiter von allen Ansprüchen, Forderungen, Verlusten, Schäden, Kosten oder Haftungen (einschließlich angemessener Anwaltskosten) freizustellen und schadlos zu halten, die aus oder in Verbindung mit Ihrer Nutzung von Portfolio und/oder Ihrem Verstoß gegen dieses Impressum entstehen.',
      en: 'You agree to indemnify and hold harmless us, the listed students, Developer Akademie, and our affiliates, partners, officers, directors, agents, and employees from any claims, demands, losses, damages, costs, or liabilities (including reasonable attorney fees) arising out of or in connection with your use of Portfolio and/or your violation of this Legal Notice.'
    },
    'legal.contactText': { 
      de: 'Bei Fragen oder Anmerkungen kontaktieren Sie uns bitte unter',
      en: 'For questions or comments, please contact us at'
    },
    'legal.date': { de: 'Datum', en: 'Date' },
  
    'about.title': { de: 'Über mich', en: 'About me' },
    'about.location': { de: 'Ich wohne', en: 'I live' },
    'about.locationCity': { de: 'in Köln...', en: 'in Cologne...' },
    'about.description': { 
      de: 'Als leidenschaftliche Webentwicklerin verbinde ich analytisches Denken mit Kreativität. Ich bringe Ausdauer, Teamfähigkeit und eine lösungsorientierte Denkweise mit, um Ihre Projekte erfolgreich umzusetzen.',
      en: 'As a passionate web developer, I combine analytical thinking with creativity. I bring perseverance, teamwork skills, and a solution-oriented mindset to successfully implement your projects.'
    },
    'about.cta': { de: 'Lass uns reden', en: "Let's talk" },

    'references.title': { de: 'Brauchen Sie einen Teamplayer?', en: 'Need a team player?' },
    'references.subtitle': { de: 'Das sagen meine Kollegen über mich', en: 'What my colleagues say about me' },
    'references.linkedIn': { de: 'LinkedIn Profil', en: 'LinkedIn Profile' },
    'references.project': { de: 'Projekt', en: 'Project' },

    'skills.title': { de: 'Meine Kenntnisse', en: 'My Skills' },
    'skills.learning': { de: 'Das lerne ich gerade', en: 'Currently learning' },
    'skills.learningText': { 
      de: 'Ich bin motiviert, meine Fähigkeiten kontinuierlich zu verbessern, innovative Lösungen umzusetzen und mit neuen Technologien auf dem Laufenden zu bleiben.',
      en: 'I am motivated to continuously improve my skills, implement innovative solutions, and stay up to date with new technologies.'
    },
    'skills.cta': { de: 'Lass uns reden', en: "Let's talk" },
  };

  setLanguage(lang: 'de' | 'en') {
    this.currentLang.set(lang);
  }

  t(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.currentLang()];
  }
}