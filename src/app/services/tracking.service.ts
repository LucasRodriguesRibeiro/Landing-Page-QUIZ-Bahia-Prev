import { Injectable } from '@angular/core';
import { UtmParams } from '../models/quiz.model';

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private utmParams: UtmParams = {};

  constructor() {
    this.extractUtms();
  }

  private extractUtms(): void {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      this.utmParams = {
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
        utm_content: searchParams.get('utm_content') || undefined,
        utm_term: searchParams.get('utm_term') || undefined,
      };
      
      // Store in sessionStorage for session persistence
      if (Object.values(this.utmParams).some(Boolean)) {
        sessionStorage.setItem('bahia_prev_utms', JSON.stringify(this.utmParams));
      } else {
        const stored = sessionStorage.getItem('bahia_prev_utms');
        if (stored) {
          this.utmParams = JSON.parse(stored);
        }
      }
    } catch {
      // safe fallback
    }
  }

  public getUtms(): UtmParams {
    return { ...this.utmParams };
  }

  public trackEvent(eventName: string, payload?: Record<string, unknown>): void {
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...this.utmParams,
      ...payload
    };

    // Log for visibility in dev/production inspection
    console.info(`[Bahia Prev Event] ${eventName}`, eventData);

    // Meta Pixel (Facebook Ads) tracking
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('trackCustom', eventName, eventData);
      } catch (err) {
        console.warn('Meta Pixel dispatch error:', err);
      }
    }

    // Google Tag Manager / GTM dataLayer tracking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);

      // Custom window event for external listening
      window.dispatchEvent(new CustomEvent('bahia_prev_event', { detail: eventData }));
    }
  }
}
