import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';

/**
 * Contact section with form validation, email sending, and privacy checkbox.
 */
@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly translationService = inject(TranslationService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  /** Hover states for interactive icons */
  readonly emailHovered = signal(false);
  readonly phoneHovered = signal(false);
  readonly scrollHovered = signal(false);
  readonly checkboxHovered = signal(false);

  /** Form data bound via ngModel */
  formData = { name: '', email: '', message: '' };

  /** Validation state signals */
  readonly nameError = signal(false);
  readonly nameSuccess = signal(false);
  readonly emailError = signal(false);
  readonly emailSuccess = signal(false);
  readonly emailErrorType = signal<'required' | 'invalid' | null>(null);
  readonly messageError = signal(false);
  readonly messageSuccess = signal(false);
  readonly privacyAccepted = signal(false);
  readonly privacyError = signal(false);

  /** Form submission state signals */
  readonly messageSent = signal(false);
  readonly isSending = signal(false);
  readonly sendError = signal(false);

  /** Returns true when all fields are valid and privacy is accepted */
  readonly isFormValid = computed(() =>
    this.nameSuccess() && this.emailSuccess() &&
    this.messageSuccess() && this.privacyAccepted()
  );

  /** Returns the appropriate checkbox icon based on state */
  readonly checkboxIcon = computed(() => {
    if (this.privacyAccepted()) return 'icon/check_box_accept.svg';
    if (this.checkboxHovered()) return 'icon/check_box_hover.svg';
    return 'icon/check_box_.svg';
  });

  /** Validates the name field on blur */
  validateName(): void {
    const isValid = this.formData.name.trim().length > 0;
    this.nameError.set(!isValid);
    this.nameSuccess.set(isValid);
  }

  /** Validates the email field on blur — checks required and format */
  validateEmail(): void {
    const email = this.formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
      this.setEmailState(true, false, 'required');
    } else if (!emailRegex.test(email)) {
      this.setEmailState(true, false, 'invalid');
    } else {
      this.setEmailState(false, true, null);
    }
  }

  /** Sets all email validation signals at once */
  private setEmailState(
    error: boolean,
    success: boolean,
    type: 'required' | 'invalid' | null
  ): void {
    this.emailError.set(error);
    this.emailSuccess.set(success);
    this.emailErrorType.set(type);
  }

  /** Validates the message field on blur */
  validateMessage(): void {
    const isValid = this.formData.message.trim().length > 0;
    this.messageError.set(!isValid);
    this.messageSuccess.set(isValid);
  }

  /** Toggles the privacy checkbox and clears its error */
  togglePrivacy(): void {
    const next = !this.privacyAccepted();
    this.privacyAccepted.set(next);
    if (next) this.privacyError.set(false);
  }

  /** Validates all fields and sends the email if the form is valid */
  onSubmit(): void {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
    if (!this.privacyAccepted()) this.privacyError.set(true);
    if (this.isFormValid()) this.sendEmail();
  }

  /** Sends the form data to the backend via HTTP POST */
  private sendEmail(): void {
    this.isSending.set(true);
    this.sendError.set(false);

    this.http
      .post<{ success: boolean; message: string }>('/send-mail.php', this.formData)
      .subscribe({
        next: (res) => this.handleSendSuccess(res),
        error: (err) => this.handleSendError(err),
      });
  }

  /** Handles a successful server response */
  private handleSendSuccess(res: { success: boolean; message: string }): void {
    this.isSending.set(false);
    if (res.success) {
      this.messageSent.set(true);
      this.scheduleFormReset();
    } else {
      this.sendError.set(true);
    }
  }

  /** Handles a failed HTTP request */
  private handleSendError(error: unknown): void {
    console.error('Mail sending failed:', error);
    this.isSending.set(false);
    this.sendError.set(true);
  }

  /** Resets the form after 3 seconds — cleanup via DestroyRef */
  private scheduleFormReset(): void {
    const timer = setTimeout(() => {
      this.messageSent.set(false);
      this.resetForm();
    }, 3000);
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }

  /** Resets all form fields and validation states */
  private resetForm(): void {
    this.formData = { name: '', email: '', message: '' };
    this.nameError.set(false);      this.nameSuccess.set(false);
    this.emailError.set(false);     this.emailSuccess.set(false);
    this.emailErrorType.set(null);
    this.messageError.set(false);   this.messageSuccess.set(false);
    this.privacyAccepted.set(false);
    this.privacyError.set(false);   this.sendError.set(false);
  }

  /** Smooth scrolls to the hero section */
  scrollToHero(event: Event): void {
    event.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}