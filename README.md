# React E-commerce Application

A complete e-commerce frontend application built with React, Bootstrap 5, and Axios, fetching product data from the DummyJSON API.

## 🚀 Features

- **Modern UI**: Clean, responsive design using Bootstrap 5
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Product Listing**: Display products in a responsive grid layout
- **Product Details**: Detailed product pages with image galleries
- **Search Functionality**: Search products by name
- **Responsive Design**: Mobile-first approach that works on all devices
- **API Integration**: Fetch real product data from DummyJSON API

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Bootstrap 5 (CDN)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **API**: DummyJSON API
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProductCard.jsx # Product card component
├── context/            # React context providers
│   └── ThemeContext.jsx # Theme management
├── pages/              # Page components
│   ├── Home.jsx        # Home page with featured products
│   └── ProductDetails.jsx # Individual product page
├── services/           # API services
│   └── api.js          # DummyJSON API integration
├── App.jsx             # Main app component with routing
├── main.jsx            # Application entry point
└── index.css           # Custom styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Navigation
- **Home**: Browse featured products and site features
- **Products**: View all products (placeholder page)
- **Product Details**: Click on any product to view detailed information
- **Search**: Use the search bar in the header to find products

### Features
- **Theme Toggle**: Click the sun/moon icon in the header to switch themes
- **Responsive Design**: The site adapts to mobile, tablet, and desktop screens
- **Product Gallery**: View multiple product images on detail pages
- **Rating Display**: Star ratings for products
- **Price Information**: Current prices with discount badges

## 🎨 Components

### Header Component
- Logo and navigation links
- Search functionality
- Theme toggle button
- Shopping cart indicator

### ProductCard Component
- Product image with hover effects
- Title, description, and pricing
- Rating display with stars
- Add to cart button
- Discount badges

### Home Page
- Hero section with call-to-action
- Featured products grid
- Features section
- Newsletter signup

### Product Details Page
- Image gallery with thumbnails
- Detailed product information
- Pricing and availability
- Customer reviews
- Add to cart/wishlist buttons

## 🔧 API Integration

The application fetches data from [DummyJSON API](https://dummyjson.com/):

- **Products**: `/products` endpoint
- **Product Details**: `/products/{id}` endpoint
- **Search**: `/products/search` endpoint
- **Categories**: `/products/categories` endpoint

## 🎨 Customization

### Theme Colors
Modify the theme colors in `src/index.css`:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  /* ... other color variables */
}
```

### Bootstrap Customization
The app uses Bootstrap CDN. To customize Bootstrap, you can:
1. Download Bootstrap source
2. Modify SCSS variables
3. Build custom CSS
4. Replace the CDN link

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 991px

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing sample product data
- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [React](https://reactjs.org/) for the frontend library
- [Vite](https://vitejs.dev/) for the build tool

---

Built with ❤️ using React, Bootstrap, and DummyJSON API