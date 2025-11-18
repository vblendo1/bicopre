import React from 'react';

export enum UserTier {
  FREE = 'FREE',
  VIP = 'VIP'
}

export type PageView = 'APP' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';

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
  category: string;
  estimatedEarnings?: string;
  price?: string;
  difficulty?: string;
  actionStep?: string;
  platform?: string;
  postedAt?: string;
  url?: string;
}