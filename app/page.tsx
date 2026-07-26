'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/componentes/ProductCard';
import Navbar from '@/componentes/Navbar';
import CartModal from '@/componentes/CartModal';

export default function Home() {
  const [buscar, setBuscar] = useState('');
  const [cat, setCat] = useState('Todas');
  const [verCarrito, setVerCarrito] = useState(false);



  const categorias = ['Todas'];
  products.forEach(p => {
    if (!categorias.includes(p.category)) {
      categorias.push(p.category);
    }
  });


  const listaProds = products.filter(p => {
    const txt = buscar.toLowerCase();
    const coincideNombre = p.name.toLowerCase().includes(txt) || p.description.toLowerCase().includes(txt);
    const coincideCat = cat === 'Todas' || p.category === cat;

    return coincideNombre && coincideCat;
  });

  const resetear = () => {
    setBuscar('');
    setCat('Todas');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar onOpenCart={() => setVerCarrito(true)} />
      <CartModal isOpen={verCarrito} onClose={() => setVerCarrito(false)} />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <header className="mb-8 border-b pb-6 border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
              Catalogo de Productos
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Selecciona tus articulos y agregalos al carrito de compras.
            </p>
          </div>

          <div className="bg-purple-950 text-purple-300 font-semibold px-4 py-2 rounded-lg text-sm border border-purple-800 self-start md:self-auto">
            {listaProds.length} de {products.length} productos
          </div>
        </header>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={buscar}
              onChange={e => setBuscar(e.target.value)}
              className="w-full px-4 py-2 border border-purple-900 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categorias.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  cat === c
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                    : 'bg-purple-950 text-purple-200 hover:bg-purple-900 border-purple-800/60'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {listaProds.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listaProds.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </section>
        ) : (
          <div className="text-center py-16 bg-gray-900 rounded-xl border border-purple-900">
            <p className="text-lg text-gray-400 font-medium">
              No se encontraron productos para tu busqueda.
            </p>
            <button
              onClick={resetear}
              className="mt-4 text-sm text-purple-400 hover:underline font-semibold"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}