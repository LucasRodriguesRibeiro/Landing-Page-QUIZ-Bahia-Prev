import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TrackingService } from './services/tracking.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public readonly trackingService = inject(TrackingService);

  // Phone Configuration
  public readonly WHATSAPP_PHONE = '5574998072942';
  public readonly PHONE_DISPLAY = '(74) 99807-2942';

  // Form Signals
  public nome = signal<string>('');
  public whatsapp = signal<string>('');
  public email = signal<string>('');

  // UI State Signals
  public errorMessage = signal<string>('');
  public isSubmitting = signal<boolean>(false);
  public showSuccessModal = signal<boolean>(false);
  public showPrivacyModal = signal<boolean>(false);
  public lastGeneratedWhatsAppUrl = signal<string>('');

  // Computed Validation
  public isFormValid = computed<boolean>(() => {
    const rawDigits = this.whatsapp().replace(/\D/g, '');
    return this.nome().trim().length >= 2 && rawDigits.length >= 10;
  });

  ngOnInit(): void {
    const utms = this.trackingService.getUtms();
    if (Object.keys(utms).length > 0) {
      console.info('[Bahia Prev UTMs]', utms);
    }
  }

  // Format WhatsApp in real time: (XX) XXXXX-XXXX
  public onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');

    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }

    let formatted = '';
    if (digits.length > 0) {
      formatted = `(${digits.substring(0, 2)}`;
      if (digits.length > 2) {
        if (digits.length <= 6) {
          formatted += `) ${digits.substring(2)}`;
        } else if (digits.length <= 10) {
          formatted += `) ${digits.substring(2, 6)}-${digits.substring(6)}`;
        } else {
          formatted += `) ${digits.substring(2, 7)}-${digits.substring(7, 11)}`;
        }
      }
    }

    this.whatsapp.set(formatted);
    input.value = formatted;
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  public onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nome.set(input.value);
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  public onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  public submitLead(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const trimmedName = this.nome().trim();
    const rawDigits = this.whatsapp().replace(/\D/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      this.errorMessage.set('Por favor, digite seu nome completo.');
      return;
    }

    if (!rawDigits || rawDigits.length < 10) {
      this.errorMessage.set('Por favor, informe um número de WhatsApp válido com DDD.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    // Track Meta Pixel Lead Event
    try {
      if (typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
          content_name: 'Plano Funerário Familiar Bahia Prev',
          currency: 'BRL'
        });
      }
    } catch (e) {
      console.warn('Meta Pixel track error:', e);
    }

    // Track internally
    this.trackingService.trackEvent('lead_form_submitted', {
      name: trimmedName,
      hasEmail: !!this.email().trim()
    });

    // Build WhatsApp message
    let message = `Olá! Meu nome é *${trimmedName}*.\n`;
    message += `Gostaria de mais informações sobre o *Plano Funerário Familiar da Bahia Prev*.\n`;
    message += `Meu WhatsApp: ${this.whatsapp()}`;
    if (this.email().trim()) {
      message += `\nMeu E-mail: ${this.email().trim()}`;
    }

    // Attach UTMs if available
    const utms = this.trackingService.getUtms();
    if (utms['utm_source'] || utms['utm_campaign']) {
      message += `\n(Origem: ${utms['utm_source'] || 'direto'} / ${utms['utm_campaign'] || 'campanha'})`;
    }

    const waUrl = `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    this.lastGeneratedWhatsAppUrl.set(waUrl);

    // Redirect to WhatsApp
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showSuccessModal.set(true);

      // Attempt popup open
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        console.info('Popup blocked, fallback provided in modal');
      }
    }, 450);
  }

  public openDirectWhatsApp(): void {
    const url = this.lastGeneratedWhatsAppUrl() || `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre o Plano Funerário Familiar da Bahia Prev.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  public openHeaderContact(): void {
    const url = `https://wa.me/${this.WHATSAPP_PHONE}?text=${encodeURIComponent('Olá! Gostaria de falar com a Central de Vendas da Bahia Prev sobre os planos funerários.')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  public togglePrivacyModal(show: boolean): void {
    this.showPrivacyModal.set(show);
  }

  public closeSuccessModal(): void {
    this.showSuccessModal.set(false);
  }
}
