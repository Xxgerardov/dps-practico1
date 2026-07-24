import { products } from '@/data/products';
import ProductCard from '@/componentes/productcard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado del E-commerce */}
        <header className="mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center border-b pb-6 border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              E-Commerce Store
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Explora nuestro catálogo con los mejores componentes y accesorios.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm border border-blue-200">
            {products.length} Productos disponibles
          </div>
        </header>

        {/* Cuadrícula de Productos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}