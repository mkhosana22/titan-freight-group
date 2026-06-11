
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  bestFor: string;
  icon: React.ReactNode;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
}
