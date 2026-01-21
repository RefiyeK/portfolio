import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy';
import { LegalNotice } from './pages/legal-notice/legal-notice';

export const routes: Routes = [
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNotice }
];
