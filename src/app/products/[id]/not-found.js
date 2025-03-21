import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
      <main className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the product you&apos;re looking for doesn&apos;t exist or has
          been removed.
        </p>
        <Link
          href="/"
          className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
}
