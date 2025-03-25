"use client";

import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="py-8 bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-center items-center gap-4">
            <img
              src="https://www.elcorteingles.es/recursos/informacioncorporativa/doc/portal/2017/07/06/eci-triangulo-logo.png"
              alt="El Corte Inglés logo"
              className="h-12"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 tracking-tight">
                El Corte Inglés
              </h1>
              <p className="mt-1 text-gray-600 text-sm">
                Descubre nuestras colecciones exclusivas y servicios personalizados
              </p>
            </div>
          </div>
        </div>
      </header>


      <main className="container mx-auto px-4">
        {/* Estilista virtual con IA */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              AI Dress
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Prueba nuestro avanzado sistema de IA que te permite probarte
              prendas de ropa para ver como te queda antes de comprarla.
            </p>
            <Link
              href="/ai-stylist"
              className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm hover:bg-green-800 transition"
            >
              Probar AI Dress
            </Link>
          </div>
        </section>
        {/* Productos destacados */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-green-700 mb-6">
            Productos Destacados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-700 group-hover:text-green-700 transition">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="font-semibold text-gray-800">
                        {product.price.toFixed(2)} €
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span>★</span>
                        <span className="text-xs text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 bg-white shadow-inner">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 El Corte Inglés. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="hover:underline">
              Sobre nosotros
            </Link>
            <Link href="/contact" className="hover:underline">
              Contacto
            </Link>
            <Link href="/privacy" className="hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
