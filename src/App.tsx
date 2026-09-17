import { useState, useMemo } from 'react';
import { products, categories, Product } from './data/products';
import { Search, ShoppingCart, X, Plus, Minus, Coffee, Star, Filter, Check, ArrowLeft, Trash2 } from 'lucide-react';

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null as any;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const completeOrder = () => {
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => {
      setOrderComplete(false);
      setIsCheckout(false);
      setIsCartOpen(false);
    }, 3000);
  };

  const getRoastColor = (roast: string) => {
    switch (roast) {
      case 'Light': return 'bg-amber-100 text-amber-800';
      case 'Medium-Light': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Dark': return 'bg-stone-200 text-stone-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-espresso/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 sm:w-7 sm:h-7 text-caramel" />
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-espresso">
                Ember & Oak
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40" />
                <input
                  type="text"
                  placeholder="Search beans, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-dark rounded-full border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm transition-all"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-cream-dark transition-colors"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-espresso" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-caramel text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40" />
              <input
                type="text"
                placeholder="Search beans, origins, flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-dark rounded-full border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-espresso via-espresso-light to-mocha text-cream">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-caramel blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-latte blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-caramel-light font-medium text-sm tracking-wider uppercase mb-3">Specialty Coffee Roasters</p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Crafted with passion,<br />roasted to perfection
            </h2>
            <p className="text-cream/70 text-base sm:text-lg max-w-lg">
              Discover our curated selection of single-origin and artisanal blends, sourced from the world's finest coffee regions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-full border border-espresso/20 text-sm font-medium hover:bg-cream-dark transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <div className={`${mobileFiltersOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2`}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setMobileFiltersOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-espresso text-cream shadow-md'
                      : 'bg-cream-dark text-espresso/70 hover:bg-latte/50 hover:text-espresso'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <p className="hidden sm:block text-sm text-espresso/50">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-espresso/5 animate-fadeIn"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Product Image */}
              <div
                className="relative h-56 sm:h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRoastColor(product.roast)}`}>
                    {product.roast} Roast
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-espresso backdrop-blur-sm">
                    {product.weight}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-xs text-caramel font-medium uppercase tracking-wider mb-1">{product.origin}</p>
                    <h3
                      className="font-serif text-lg font-semibold text-espresso cursor-pointer hover:text-caramel transition-colors"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-caramel text-caramel" />
                    <span className="text-sm font-medium text-espresso/70">{product.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.notes.slice(0, 3).map(note => (
                    <span key={note} className="px-2 py-0.5 bg-cream rounded-full text-xs text-espresso/60">
                      {note}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-espresso">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-espresso text-cream rounded-full text-sm font-medium hover:bg-espresso-light transition-colors active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="w-12 h-12 text-espresso/20 mx-auto mb-4" />
            <p className="text-lg text-espresso/50 font-medium">No beans found</p>
            <p className="text-sm text-espresso/40 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-espresso text-cream/70 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="w-5 h-5 text-caramel" />
                <span className="font-serif text-lg font-bold text-cream">Ember & Oak</span>
              </div>
              <p className="text-sm leading-relaxed">
                Small-batch specialty coffee roasted with care. Sourced ethically from the world's finest growing regions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-cream mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-caramel cursor-pointer transition-colors">Our Story</span></li>
                <li><span className="hover:text-caramel cursor-pointer transition-colors">Brewing Guides</span></li>
                <li><span className="hover:text-caramel cursor-pointer transition-colors">Subscription</span></li>
                <li><span className="hover:text-caramel cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-cream mb-3">Free Shipping</h4>
              <p className="text-sm leading-relaxed">
                On all orders over $35. Roasted fresh and shipped within 24 hours.
              </p>
            </div>
          </div>
          <div className="border-t border-cream/10 mt-8 pt-8 text-center text-xs text-cream/40">
            © 2026 Ember & Oak Coffee Roasters. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-cream w-full sm:w-auto sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl animate-slideInUp">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-espresso" />
            </button>

            <div className="sm:flex">
              <div className="sm:w-1/2">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 sm:h-full object-cover sm:rounded-l-2xl"
                />
              </div>
              <div className="sm:w-1/2 p-6">
                <p className="text-xs text-caramel font-medium uppercase tracking-wider mb-1">{selectedProduct.origin}</p>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-2">{selectedProduct.name}</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-caramel text-caramel" />
                    <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoastColor(selectedProduct.roast)}`}>
                    {selectedProduct.roast}
                  </span>
                  <span className="text-xs text-espresso/50">{selectedProduct.weight}</span>
                </div>

                <p className="text-sm text-espresso/70 leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-medium text-espresso/50 uppercase tracking-wider mb-2">Tasting Notes</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.notes.map(note => (
                      <span key={note} className="px-3 py-1 bg-cream-dark rounded-full text-sm text-espresso/70">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-espresso/10">
                  <p className="text-2xl font-bold text-espresso">${selectedProduct.price.toFixed(2)}</p>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-espresso text-cream rounded-full font-medium hover:bg-espresso-light transition-colors active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} />
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-cream shadow-2xl animate-slideInRight flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-5 border-b border-espresso/10">
              {isCheckout && !orderComplete ? (
                <button onClick={() => setIsCheckout(false)} className="flex items-center gap-1 text-sm text-espresso/60 hover:text-espresso">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cart
                </button>
              ) : (
                <h2 className="font-serif text-xl font-bold text-espresso">
                  {isCheckout && orderComplete ? 'Order Confirmed' : 'Your Cart'}
                </h2>
              )}
              <button
                onClick={() => { setIsCartOpen(false); setIsCheckout(false); }}
                className="p-2 hover:bg-cream-dark rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-espresso" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {orderComplete ? (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-espresso mb-2">Thank you!</h3>
                  <p className="text-sm text-espresso/60">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
                </div>
              ) : isCheckout ? (
                <CheckoutForm cart={cart} total={cartTotal} onComplete={completeOrder} />
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-12 h-12 text-espresso/20 mb-4" />
                  <p className="text-lg font-medium text-espresso/50">Your cart is empty</p>
                  <p className="text-sm text-espresso/40 mt-1">Add some delicious coffee to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-3 bg-white rounded-xl p-3 border border-espresso/5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-espresso truncate">{item.product.name}</h4>
                        <p className="text-xs text-espresso/50">{item.product.origin} · {item.product.weight}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-cream-dark hover:bg-latte/50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-cream-dark hover:bg-latte/50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-espresso">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-espresso/30 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {!orderComplete && !isCheckout && cart.length > 0 && (
              <div className="border-t border-espresso/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-espresso/60">Subtotal</span>
                  <span className="text-lg font-bold text-espresso">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-espresso/40">Shipping calculated at checkout</p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-espresso text-cream rounded-full font-medium hover:bg-espresso-light transition-colors active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ cart, total, onComplete }: { cart: CartItem[]; total: number; onComplete: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const shipping = total >= 35 ? 0 : 5.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
      <div>
        <h3 className="font-serif text-lg font-bold text-espresso mb-4">Checkout</h3>
        
        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 border border-espresso/5 mb-5">
          <p className="text-xs font-medium text-espresso/50 uppercase tracking-wider mb-3">Order Summary</p>
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between text-sm py-1">
              <span className="text-espresso/70">{item.product.name} × {item.quantity}</span>
              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-espresso/10 mt-3 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-espresso/60">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-espresso/60">Shipping</span>
              <span>{shipping === 0 ? <span className="text-sage font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-espresso/60">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-espresso pt-2 border-t border-espresso/10">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-espresso/50 uppercase tracking-wider">Contact</p>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
          required
        />
      </div>

      {/* Shipping */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-espresso/50 uppercase tracking-wider">Shipping Address</p>
        <input
          type="text"
          placeholder="Street Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
            required
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={(e) => setFormData({...formData, zip: e.target.value})}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
            required
          />
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-espresso/50 uppercase tracking-wider">Payment</p>
        <input
          type="text"
          placeholder="Card Number (simulated)"
          value={formData.card}
          onChange={(e) => setFormData({...formData, card: e.target.value})}
          className="w-full px-4 py-2.5 bg-white rounded-xl border border-espresso/10 focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 text-sm"
          required
        />
        <p className="text-xs text-espresso/40 italic">This is a demo — no real payment is processed.</p>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-caramel text-white rounded-full font-medium hover:bg-caramel-light transition-colors active:scale-[0.98] shadow-lg shadow-caramel/20"
      >
        Place Order — ${grandTotal.toFixed(2)}
      </button>
    </form>
  );
}

export default App;
