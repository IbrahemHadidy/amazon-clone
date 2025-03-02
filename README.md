# Amazon Clone

Amazon Clone is a modern e-commerce web application built with Vite, React, TypeScript, and Redux Toolkit. It fetches product data from the DummyJSON API and provides a seamless shopping experience with features like infinite scroll, toasts for notifications, and a slick carousel.

## Features

- **Vite** for fast and optimized development.
- **React & TypeScript** for a scalable and maintainable codebase.
- **Redux Toolkit** for state management.
- **Infinite Scroll** on the search page for a smooth user experience.
- **Toast Notifications** for user feedback.
- **Slick Carousel** for an interactive product display.
- **Modular Folder Structure** for clean and organized code.
- **Lazy Loading** for optimized performance.

## Folder Structure

```
src/
│── assets/            # Static assets (images, icons, etc.)
│── components/        # Reusable components & pages
│── styles/            # CSS modules for styling
│── services/          # API services & localStorage utilities
│── features/          # Redux Toolkit slices, thunks, and listeners for state management
│── utils/             # Reusable utility functions
│── hooks/             # Custom React hooks
│── app/               # Redux store configuration
│── interfaces/        # TypeScript interfaces
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/IbrahemHadidy/amazon-clone.git
   ```
2. Navigate to the project folder:
   ```sh
   cd amazon-clone
   ```
3. Install dependencies using PNPM:
   ```sh
   pnpm install
   ```
4. Start the development server:
   ```sh
   pnpm dev
   ```

## Development & Code Quality

This project follows modern best practices to ensure clean, maintainable, and high-quality code.

- **Vite**: Fast and optimized development environment.
- **TypeScript**: Strongly typed codebase for better maintainability.
- **Redux Toolkit**: Efficient and scalable state management.
- **ESLint**: Enforces consistent code quality and best practices.
- **Prettier**: Ensures uniform code formatting across the project.

## Usage

- Browse products fetched from the DummyJSON API.
- Search for products with infinite scrolling.
- Add products to the cart and wishlist.
- View product details in a dedicated page.

## Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules, Tailwind
- **API**: DummyJSON
- **Libraries**: React Router, Slick Carousel, React Toastify
