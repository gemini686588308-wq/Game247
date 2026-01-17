
import React from 'react';

export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  backgroundImage?: string;
  theme: 'dark' | 'light' | 'accent';
}

export interface PitchContext {
  slideTitle: string;
  slideSubtitle?: string;
  keyPoints: string[];
}