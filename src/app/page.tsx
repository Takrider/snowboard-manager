import dynamic from 'next/dynamic'

// Dynamically import the main client component with SSR turned off
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
)

export default function Page() {
  return <SnowboardManagerClient />
}
