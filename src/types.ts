import React from 'react';

export enum UserTier {
  FREE = 'FREE',
  VIP = 'VIP'
}

export type PageView = 'APP' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';

export type PaymentStatus = 'IDLE' | 'LOADING' | 'WAITING_PAYMENT' | 'APPROVED' | 'ERROR';

export interface PaymentData {
  qrCodeBase64: string;
  copyPasteCode: string;
  paymentId: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isVip: boolean;
  onClick: () => void;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Opportunity {
  id: number;
  title: string;
  value: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
}

export interface GeneratedOpportunity {
  title: string;
  description: string;
  price: string;
  platform: string; // e.g., "Workana", "99Freelas"
  postedAt: string; // e.g., "Há 15 min"
  category: string; // e.g., "Digitação", "Design"
  url: string; // Fake url to apply
}