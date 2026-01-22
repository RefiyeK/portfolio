import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  translationService = inject(TranslationService);
  
  // Hover states
  emailHovered = false;
  phoneHovered = false;
  scrollHovered = false;
  checkboxHovered = false;
  scrollTopActive = false;

  // Form data
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Validation states
  nameError = false;
  nameSuccess = false;
  emailError = false;
  emailSuccess = false;
  messageError = false;
  messageSuccess = false;
  privacyAccepted = false;
  privacyError = false;

  // Form state
  messageSent = false;

  validateName() {
    if (this.formData.name.trim().length > 0) {
      this.nameError = false;
      this.nameSuccess = true;
    } else {
      this.nameError = true;
      this.nameSuccess = false;
    }
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.formData.email)) {
      this.emailError = false;
      this.emailSuccess = true;
    } else {
      this.emailError = true;
      this.emailSuccess = false;
    }
  }

  validateMessage() {
    if (this.formData.message.trim().length > 0) {
      this.messageError = false;
      this.messageSuccess = true;
    } else {
      this.messageError = true;
      this.messageSuccess = false;
    }
  }

  togglePrivacy() {
    this.privacyAccepted = !this.privacyAccepted;
    if (this.privacyAccepted) {
      this.privacyError = false;
    }
  }

  getCheckboxIcon(): string {
    if (this.privacyAccepted) {
      return 'icon/check_box_accept.svg';
    }
    if (this.checkboxHovered) {
      return 'icon/check_box_hover.svg';
    }
    return 'icon/check_box_.svg';
  }

  isFormValid(): boolean {
    return this.nameSuccess && this.emailSuccess && this.messageSuccess && this.privacyAccepted;
  }

  onSubmit() {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
    
    if (!this.privacyAccepted) {
      this.privacyError = true;
    }

    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      this.messageSent = true;
      
      setTimeout(() => {
        this.messageSent = false;
        this.resetForm();
      }, 3000);
    }
  }

  resetForm() {
    this.formData = { name: '', email: '', message: '' };
    this.nameError = false;
    this.nameSuccess = false;
    this.emailError = false;
    this.emailSuccess = false;
    this.messageError = false;
    this.messageSuccess = false;
    this.privacyAccepted = false;
    this.privacyError = false;
  }

  scrollToHero(event: Event) {
    event.preventDefault();
    const element = document.getElementById('hero');
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
