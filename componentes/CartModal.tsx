'use client';

import { useCart } from '@/context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        {/* Cabecera */}
        <div>
          <div className="flex justify-between items-center border-b pb-4 border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Carrito de Compras ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Lista de Ítems */}
          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                El carrito está vacío 🛒
              </p>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4 border-gray-100 gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ${product.price.toFixed(2)} c/u
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pie del Carrito con Totales */}
        {cart.length > 0 && (
          <div className="border-t pt-4 border-gray-200 space-y-3">
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Total:</span>
              <span className="text-xl text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert('¡Compra procesada con éxito!')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-sm"
            >
              Finalizar Compra
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 rounded-lg transition-colors text-xs"
            >
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}