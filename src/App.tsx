import { initializeAuth } from '@features/auth/authSlice';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import Footer from './components/common/Footer';
import Header from './components/common/Header';

const CartPage = lazy(() => import('@components/CartPage/CartPage'));
const WishlistPage = lazy(
  () => import('@components/WishlistPage/WishlistPage')
);
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage/LoginPage'));
const ProductPage = lazy(() => import('./components/ProductPage/ProductPage'));
const RegisterPage = lazy(
  () => import('./components/RegisterPage/RegisterPage')
);
const SearchPage = lazy(() => import('./components/SearchPage/SearchPage'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}
