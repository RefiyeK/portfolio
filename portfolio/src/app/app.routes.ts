import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent) 
  },
  { 
    path: 'legal-notice', 
    loadComponent: () => import('./pages/legal-notice/legal-notice').then(m => m.LegalNotice) 
  }
];