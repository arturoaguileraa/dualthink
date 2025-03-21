import Link from "next/link";

export default function AIStylistPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8">
        <div className="container mx-auto">
          <Link
            href="/"
            className="text-blue-600 hover:underline inline-flex items-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">AI Style Assistant</h1>
          <p className="text-gray-600 mt-2">
            Let our AI help you find your perfect style
          </p>
        </div>
      </header>

      <main className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* AI Feature Section */}
            <div className="w-full md:w-2/3 p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Discover Your Style
              </h2>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800">
                  Our AI analyzes thousands of fashion trends, body types, and
                  personal preferences to provide you with personalized style
                  recommendations.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Tell us about yourself:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Style Preference
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option>Casual</option>
                      <option>Formal</option>
                      <option>Streetwear</option>
                      <option>Minimalist</option>
                      <option>Vintage</option>
                      <option>Athletic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occasion
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option>Everyday</option>
                      <option>Work</option>
                      <option>Date Night</option>
                      <option>Party</option>
                      <option>Outdoor Activity</option>
                      <option>Special Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Favorite Colors
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option>Neutrals (Black, White, Gray)</option>
                      <option>Earth Tones</option>
                      <option>Bold & Bright</option>
                      <option>Pastels</option>
                      <option>Monochrome</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option>Budget-Friendly</option>
                      <option>Mid-Range</option>
                      <option>Premium</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Upload a photo (optional):</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop an image, or click to select
                  </p>
                  <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Select Image
                  </button>
                </div>
              </div>

              <button className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors w-full md:w-auto">
                Get Personalized Recommendations
              </button>
            </div>

            {/* AI Features Sidebar */}
            <div className="w-full md:w-1/3 bg-gray-50 p-6">
              <h3 className="text-xl font-semibold mb-4">AI Style Features</h3>

              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h4 className="ml-3 text-lg font-medium">
                      Virtual Outfit Creator
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Mix and match items to create the perfect outfit with our
                    AI-powered style recommendation system.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                    </div>
                    <h4 className="ml-3 text-lg font-medium">Style Analysis</h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Our AI analyzes your preferences, past purchases, and
                    current trends to understand your unique style.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                        />
                      </svg>
                    </div>
                    <h4 className="ml-3 text-lg font-medium">Size Finder</h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Get accurate size recommendations for each garment based on
                    your measurements and fit preferences.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>
                    <h4 className="ml-3 text-lg font-medium">
                      Gift Recommender
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Perfect for finding gifts! Describe the recipient and
                    we&apos;ll suggest ideal fashion gifts for them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-gray-100">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>© 2023 DualThink Clothing. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
