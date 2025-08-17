'use client';

import dynamic from 'next/dynamic';

// This component is a client component that dynamically imports the main app
// with SSR turned off.
const SnowboardManagerClient = dynamic(
  () => import('@/components/SnowboardManagerClient'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Loading Manager...</p>
      </div>
    ),
  }
);

export default function DynamicClientLoader() {
  return <SnowboardManagerClient />;
}
