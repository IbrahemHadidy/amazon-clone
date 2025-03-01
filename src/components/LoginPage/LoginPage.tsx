import { useAppDispatch, useAppSelector } from '@app/hooks';
import logo from '@assets/amazon.png';
import { login } from '@features/auth/authThunks';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

// Types
import type { ChangeEvent } from 'react';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //---------------------------- State ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (!isInitialized) {
      if (isUserLoggedIn) {
        toast.info('You are already logged in!');
        navigate('/');
      }

      setIsInitialized(true);
    }
  }, [isInitialized, isUserLoggedIn, navigate]);

  //------------------------- Event Handlers ------------------------//
  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(login({ identifier, password, navigate }));
  };

  const isLoginDisabled = !identifier || !password;

  return (
    <main className="my-7">
      <div className="bg-Text">
        <Link
          to="/"
          className="m-auto flex h-10 items-center justify-center px-6"
        >
          <img src={logo} width={130} height={50} alt="Amazon Logo" />
        </Link>

        <div className="m-auto mt-5 max-w-[350px] rounded-lg border border-solid border-[#c5c2c2] px-6 py-5 text-left font-sans">
          {/* Title */}
          <h1 className="text-2xl font-semibold">Sign in</h1>

          {/* Identifier Input */}
          <label className="mt-5 block text-sm font-medium">
            Email or mobile number
          </label>
          <input
            className="mt-1 h-8 w-full rounded border border-[#a0a0a0] px-2 text-sm"
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
          />

          {/* Password Input */}
          <label className="mt-5 block text-sm font-medium">Password</label>
          <input
            className="mt-1 h-8 w-full rounded border border-[#a0a0a0] px-2 text-sm"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          {/* Login Button */}
          <button
            className={`my-4 h-8 w-full rounded-lg bg-[#ffd814] hover:bg-[#ebc712] ${
              isLoginDisabled
                ? 'opacity-50 hover:bg-[#ffd814]'
                : 'cursor-pointer'
            }`}
            onClick={handleLogin}
            disabled={isLoginDisabled}
          >
            Sign in
          </button>

          {/* Privacy Notice */}
          <p className="text-sm leading-tight">
            By continuing, you agree to Amazon&apos;s{' '}
            <span className="text-[#0066c0] underline">Conditions of Use</span>{' '}
            and <span className="text-[#0066c0] underline">Privacy Notice</span>
            .
          </p>

          {/* Help */}
          <p className="mt-4 cursor-pointer text-sm text-[#0066c0]">
            &#9656; Need help?
          </p>

          <hr className="my-4 border-t border-[#d4d4d4]" />

          {/* Business Option */}
          <h4 className="text-sm font-semibold">Buying for work?</h4>
          <p className="cursor-pointer text-sm text-[#0066c0]">
            Shop on Amazon Business
          </p>
        </div>

        {/* Sign Up Section */}
        <div className="mx-auto my-5 flex items-center justify-center gap-2 text-sm text-[#737373]">
          <hr className="h-px w-24 border-none bg-[#d4d4d4]" />
          <p>New to Amazon?</p>
          <hr className="h-px w-24 border-none bg-[#d4d4d4]" />
        </div>

        <Link
          to="/register"
          className="mx-auto mt-3 flex h-8 w-[350px] items-center justify-center rounded border border-[#2b2929] bg-white text-sm hover:bg-[#f1f1f1]"
        >
          <span className="text-[#111]">Create your Amazon account</span>
        </Link>

        {/* Footer */}
        <footer className="mt-5 max-h-48 w-full border-t border-[#ededed] bg-gradient-to-b from-[#f4f4f4] to-[#fff] py-5 text-sm">
          <div className="mb-5 flex justify-center gap-4">
            <Link className="text-[#0066c0]" to="#">
              Conditions of Use
            </Link>
            <Link className="text-[#0066c0]" to="#">
              Privacy
            </Link>
            <Link className="text-[#0066c0]" to="#">
              Help
            </Link>
          </div>
          <p className="text-center text-[#555]">
            © 1996-2024, Amazon, Inc. or its affiliates
          </p>
        </footer>
      </div>
    </main>
  );
}
