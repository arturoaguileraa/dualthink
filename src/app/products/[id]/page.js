import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

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
            Back to Products
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">DualThink Clothing</h1>
        </div>
      </header>

      <main className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Images Section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400">Product Image Placeholder</div>
              </div>

              {/* Thumbnail images */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

              <div className="flex items-center mb-4">
                <div className="flex text-amber-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-2xl font-semibold mb-4">
                ${product.price.toFixed(2)}
              </p>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Description:</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Material:</h3>
                <p className="text-gray-600">{product.material}</p>
              </div>

              {/* Color options */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Colors:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: color.includes("-")
                          ? color.split("-")[1]
                          : color,
                      }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size options */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sizes:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border border-gray-300 rounded hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart button */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors flex-1">
                  Add to Cart
                </button>
                <button className="border border-black py-3 px-6 rounded-full hover:bg-gray-100 transition-colors flex-1">
                  Add to Wishlist
                </button>
              </div>

              {/* AI features */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">AI Features</h3>
                <div className="flex flex-col gap-2">
                  <button className="text-left flex items-center text-blue-700 hover:text-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    See how it looks on you
                  </button>
                  <button className="text-left flex items-center text-blue-700 hover:text-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Get sizing recommendations
                  </button>
                  <button className="text-left flex items-center text-blue-700 hover:text-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                    Discover outfit combinations
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}
          <div className="p-6 border-t">
            <h3 className="text-xl font-semibold mb-4">You may also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    key={relatedProduct.id}
                    className="group"
                  >
                    <div className="bg-gray-100 aspect-square rounded-lg mb-2"></div>
                    <h4 className="font-medium group-hover:text-blue-600 truncate">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-gray-600">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </Link>
                ))}
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
