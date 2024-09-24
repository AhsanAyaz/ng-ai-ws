import { InjectionToken } from '@angular/core';
import { NgGCConfig } from '../types';

export const NGGC_API_CONFIG = new InjectionToken<NgGCConfig>(
  'NGGC_API_CONFIG'
);
