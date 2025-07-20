// src/app/astrologers/page.tsx
import AstrologersClient from './AstrologersClient';

export const metadata = {
  title: 'All Astrologers - Vedanta Astro',
  description: 'Browse all our expert astrologers and book consultations',
};

export default function AstrologersPage() {
  return <AstrologersClient />;
}