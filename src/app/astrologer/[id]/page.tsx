// src/app/astrologer/[id]/page.tsx
import AstrologerBookingClient from './AstrologerBookingClient';

// Since we're using static export, we'll provide fallback params
// or remove static export if you need dynamic API calls
export async function generateStaticParams() {
  // For static export, we provide a reasonable set of fallback IDs
  // You can update this list based on your most common astrologer IDs
  const commonAstrologerIds = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
  ];
  
  return commonAstrologerIds.map(id => ({ id }));
}

// Enable dynamic params for astrologers not in the static list
export const dynamicParams = true;

export default function AstrologerDetailPage({ params }: { params: { id: string } }) {
  return <AstrologerBookingClient astrologerId={params.id} />;
}