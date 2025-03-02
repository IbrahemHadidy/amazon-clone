import { useAppDispatch, useAppSelector } from '@app/hooks';
import { logout } from '@features/auth/authThunks';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ConfirmModal } from './modals/ConfirmModal';

import logo from '@assets/amazon-white.png';
import icon2 from '@assets/arrow.png';
import flag from '@assets/egypt.jpg';
import menuIcon from '@assets/icons8-menu-bar-50.png';
import locationIcon from '@assets/location-pin.png';
import searchIcon from '@assets/loupe.png';
import cartIcon from '@assets/shopping-cart.png';
import wishlistIcon from '@assets/wishlist.png';
import products from '@services/products';

// Types
import type Product from '@interfaces/product';

const NAV_ITEMS = [
  'Amazon mini TV',
  'Sell',
  'Best Sellers',
  "Today's Deals",
  'Mobiles',
  'Customer Services',
  'Electronics',
  'Fashion',
  'New Releases',
  'Home & Kitchen',
  'Amazon Pay'
];

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //-------------------------- State ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  //-------------------------- Search ---------------------------//
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await products.getByFilter({ title: searchValue });
        setSuggestions(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    };

    const debounceFetch = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  //-------------------------- Event Handlers ---------------------------//
  const handleSearchClick = () => {
    navigate(`/search?q=${searchValue}`);
  };

  const handleSignOut = () => {
    setIsSignOutModalOpen(false);
    dispatch(logout());
  };

  return (
    <>
      <ConfirmModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        message="Are you sure you want to sign out?"
        onConfirm={handleSignOut}
      />
      <header className="relative z-50 font-sans">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-[#131921] px-5 py-2 text-white">
          <div className="flex items-center gap-4">
            <button
              className="block lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img src={menuIcon} width={30} alt="Menu Icon" />
            </button>
            <Link to="/" className="no-underline">
              <img src={logo} width={100} alt="Logo" />
            </Link>
          </div>

          <div className="ml-4 hidden items-center text-xs lg:flex">
            <a href="/" target="_blank">
              <img src={locationIcon} width={22} alt="Location Icon" />
            </a>
            <div>
              <p>Delivering to Egypt, Cairo</p>
              <h1 className="text-sm">Update Location</h1>
            </div>
          </div>

          {/* Search Bar with Dropdown */}
          <div ref={searchRef} className="relative ml-4 max-w-[1000px] flex-1">
            <div className="flex items-center rounded-md bg-white text-gray-500">
              <input
                className="w-full rounded-md border-none py-2 pl-5 outline-none"
                type="text"
                placeholder="Search Amazon"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              <button
                className="max-w-[44px] cursor-pointer rounded-r-md bg-[#ffd64f] p-2"
                onClick={handleSearchClick}
              >
                <img src={searchIcon} alt="Search Icon" />
              </button>
            </div>

            {isFocused && searchValue && suggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-md bg-white text-black shadow-md">
                {suggestions.map((item) => (
                  <Link
                    to={`/product/${item.id}`}
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-100"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-12 w-12 object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ml-4 hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-1">
              <img src={flag} width={30} alt="Country Flag" />
              <p className="text-lg">EN</p>
              <img src={icon2} width={8} alt="Dropdown Icon" />
            </div>
            {currentUserData ? (
              <Link
                to="#"
                className="flex items-center gap-1"
                onClick={() => setIsSignOutModalOpen(true)}
              >
                <p>Hello, {currentUserData.name}</p>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <p>Sign In</p>
              </Link>
            )}
            <Link to="/wishlist" className="flex items-center gap-1">
              <img src={wishlistIcon} width={30} alt="Wishlist Icon" />
              <p>Wishlist</p>
            </Link>
            <Link to="/cart" className="flex items-center gap-1">
              <img src={cartIcon} width={30} alt="Cart Icon" />
              <p>Cart</p>
            </Link>
          </div>
        </nav>

        {/* Navbar Bottom */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } cursor-pointer items-center gap-5 bg-[#232f3e] px-5 py-2 text-sm text-white lg:flex`}
        >
          <div className="mb-3 flex flex-row gap-3 lg:hidden">
            {currentUserData ? (
              <Link
                to="#"
                className="flex items-center gap-2 p-1 hover:bg-gray-700"
                onClick={() => setIsSignOutModalOpen(true)}
              >
                <p>Hello, {currentUserData.name}</p>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 p-1 hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <p>Sign In</p>
              </Link>
            )}

            <Link
              to="/wishlist"
              className="flex items-center gap-2 p-1 hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <img src={wishlistIcon} width={24} alt="Wishlist Icon" />
              <p>Wishlist</p>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 p-1 hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <img src={cartIcon} width={24} alt="Cart Icon" />
              <p>Cart</p>
            </Link>
          </div>
          {NAV_ITEMS.map((item, index) => (
            <p
              key={index}
              className="p-1 hover:bg-gray-700 lg:py-0"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </p>
          ))}
        </div>
      </header>
    </>
  );
}
