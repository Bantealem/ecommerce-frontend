import React, { useState } from 'react';
import { useCart } from '../context';

const ProductDetails = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    if (!product || (product.stock || 0) === 0) return;

    setIsLoading(true);
    try {
      addToCart(product);
      setQuantity(1);
      // Could add toast notification here instead of alert
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  if (!product) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📦</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Product not found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          The product you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    );
  }

  const currentImage = product.images?.[selectedImage] || product.thumbnail;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-8xl">
                🛍️
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageLoaded(false);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-blue-500 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {product.title || 'Product Title'}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
                <span className="text-yellow-500 text-lg mr-2">⭐</span>
                <span className="text-yellow-700 dark:text-yellow-300 font-semibold">
                  {product.rating?.toFixed(1) || '0.0'}
                </span>
              </div>

              <div className="text-gray-500 dark:text-gray-400">
                •
              </div>

              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {product.brand || 'Brand'}
              </span>

              <div className="text-gray-500 dark:text-gray-400">
                •
              </div>

              <span className="text-gray-600 dark:text-gray-400 capitalize">
                {product.category || 'Category'}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {product.description || 'Product description goes here...'}
            </p>
          </div>

          {/* Price Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
                {product.discountPercentage && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-green-600 dark:text-green-400 font-semibold">
                      {product.discountPercentage}% off
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  (product.stock || 0) > 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {(product.stock || 0) > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.stock || 0} available
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="text-gray-700 dark:text-gray-300 font-semibold text-lg min-w-fit">
              Quantity:
            </label>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-bold text-xl"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-6 py-3 text-gray-900 dark:text-white font-bold text-xl min-w-[60px] text-center bg-gray-50 dark:bg-gray-800">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={(product.stock || 0) === 0 || isLoading}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-lg hover:shadow-xl ${
              (product.stock || 0) > 0 && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding to Cart...
              </div>
            ) : (product.stock || 0) > 0 ? (
              'Add to Cart'
            ) : (
              'Out of Stock'
            )}
          </button>

          {/* Additional Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">Category:</span>
                <span className="text-gray-900 dark:text-white capitalize">
                  {product.category || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">Weight:</span>
                <span className="text-gray-900 dark:text-white">
                  {product.weight ? `${product.weight}g` : 'N/A'}
                </span>
              </div>
              {product.dimensions && (
                <>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Dimensions:</span>
                    <span className="text-gray-900 dark:text-white">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
