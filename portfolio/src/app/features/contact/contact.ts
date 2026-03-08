import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';

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

  // Hover states
  readonly emailHovered   = signal(false);
  readonly phoneHovered   = signal(false);
  readonly scrollHovered  = signal(false);
  readonly checkboxHovered = signal(false);

  // Form data — plain object, kein Signal nötig (ngModel schreibt direkt)
  formData = { name: '', email: '', message: '' };

  // Validation states
  readonly nameError       = signal(false);
  readonly nameSuccess     = signal(false);
  readonly emailError      = signal(false);
  readonly emailSuccess    = signal(false);
  readonly emailErrorType  = signal<'required' | 'invalid' | null>(null);
  readonly messageError    = signal(false);
  readonly messageSuccess  = signal(false);
  readonly privacyAccepted = signal(false);
  readonly privacyError    = signal(false);

  // Form state
  readonly messageSent = signal(false);
  readonly isSending   = signal(false);
  readonly sendError   = signal(false);

  // Abgeleitete Zustände — computed, nie manuell setzen
  readonly isFormValid = computed(() =>
    this.nameSuccess() && this.emailSuccess() &&
    this.messageSuccess() && this.privacyAccepted()
  );

  readonly checkboxIcon = computed(() => {
    if (this.privacyAccepted())   return 'icon/check_box_accept.svg';
    if (this.checkboxHovered())   return 'icon/check_box_hover.svg';
    return 'icon/check_box_.svg';
  });

  validateName(): void {
    const isValid = this.formData.name.trim().length > 0;
    this.nameError.set(!isValid);
    this.nameSuccess.set(isValid);
  }

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

  private setEmailState(
    error: boolean,
    success: boolean,
    type: 'required' | 'invalid' | null
  ): void {
    this.emailError.set(error);
    this.emailSuccess.set(success);
    this.emailErrorType.set(type);
  }

  validateMessage(): void {
    const isValid = this.formData.message.trim().length > 0;
    this.messageError.set(!isValid);
    this.messageSuccess.set(isValid);
  }

  togglePrivacy(): void {
    const next = !this.privacyAccepted();
    this.privacyAccepted.set(next);
    if (next) this.privacyError.set(false);
  }

  onSubmit(): void {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
    if (!this.privacyAccepted()) this.privacyError.set(true);
    if (this.isFormValid()) this.sendEmail();
  }

  private sendEmail(): void {
    this.isSending.set(true);
    this.sendError.set(false);

    this.http
      .post<{ success: boolean; message: string }>('/send-mail.php', this.formData)
      .subscribe({
        next:  (res)   => this.handleSendSuccess(res),
        error: (err)   => this.handleSendError(err),
      });
  }

  private handleSendSuccess(res: { success: boolean; message: string }): void {
    this.isSending.set(false);
    if (res.success) {
      this.messageSent.set(true);
      this.scheduleFormReset();
    } else {
      this.sendError.set(true);
    }
  }

  private handleSendError(error: unknown): void {
    console.error('Mail sending failed:', error);
    this.isSending.set(false);
    this.sendError.set(true);
  }

  // DestroyRef verhindert State-Update auf bereits zerstörter Komponente
  private scheduleFormReset(): void {
    const timer = setTimeout(() => {
      this.messageSent.set(false);
      this.resetForm();
    }, 3000);
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }

  private resetForm(): void {
    this.formData = { name: '', email: '', message: '' };
    this.nameError.set(false);      this.nameSuccess.set(false);
    this.emailError.set(false);     this.emailSuccess.set(false);
    this.emailErrorType.set(null);
    this.messageError.set(false);   this.messageSuccess.set(false);
    this.privacyAccepted.set(false);
    this.privacyError.set(false);   this.sendError.set(false);
  }

  scrollToHero(event: Event): void {
    event.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}