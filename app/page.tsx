'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/componentes/ProductCard';
import Navbar from '@/componentes/Navbar';
import CartModal from '@/componentes/CartModal';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Obtener lista única de categorías disponibles
  const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.category)))];

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <header className="mb-8 border-b pb-6 border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Catálogo de Productos
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Selecciona tus artículos y agrégalos al carrito de compras.
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm border border-blue-200 self-start md:self-auto">
            {filteredProducts.length} de {products.length} productos
          </div>
        </header>

        {/* Buscador y Filtros */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-500 font-medium">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
              }}
              className="mt-4 text-sm text-blue-600 hover:underline font-semibold"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}