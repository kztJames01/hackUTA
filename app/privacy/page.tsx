import Link from 'next/link'

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-24 font-semibold text-slate-900">Privacy</h1>
        <p className="mt-2 text-14 text-slate-600">
          Privacy controls and policy details will appear here.
        </p>
        <Link
          href="/feed"
          className="mt-6 inline-flex rounded-md bg-green-600 px-4 py-2 text-14 font-medium text-white hover:bg-green-700"
        >
          Back to Feed
        </Link>
      </div>
    </main>
  )
}

export default PrivacyPage
