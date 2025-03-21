import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8 md:mb-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            DualThink Clothing
          </h1>
        </div>
      </header>

      <main className="container mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="aspect-[3/4] relative bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-sm">Product Image</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-600">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold text-gray-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-1">★</span>
                        <span className="text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* We should probably remove this section */}
        <section>
          <div className="bg-gray-50 p-6 md:p-10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Discover AI-Enhanced Shopping
            </h2>
            <p className="text-gray-600 mb-6">
              Our advanced AI helps you find the perfect outfit based on your
              style preferences, body type, and occasion. Try our virtual
              fitting room and style recommendations!
            </p>
            <Link
              href="/ai-stylist"
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Try AI Stylist
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-16 py-8 bg-gray-100 rounded-lg">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>© 2025 DualThink Clothing. All rights reserved.</p>
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
