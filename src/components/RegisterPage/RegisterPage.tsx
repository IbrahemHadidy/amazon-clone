import { useAppDispatch, useAppSelector } from '@app/hooks';
import logo from '@assets/amazon.png';
import { register } from '@features/auth/authThunks';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

// Types
import type { ChangeEvent } from 'react';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //---------------------------- State ---------------------------//
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
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
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    dispatch(register({ name: username, identifier, password, navigate }));
  };

  const isRegisterDisabled = !username || !identifier || !password;

  return (
    <main className="my-7">
      <Link
        to="/"
        className="m-auto flex h-10 items-center justify-center px-6"
      >
        <img src={logo} width={130} height={50} alt="Amazon Logo" />
      </Link>

      {/* SignUp-container */}
      <div className="bg-Text m-auto mt-5 max-w-[350px] rounded-lg border border-solid border-[#c5c2c2] px-6 py-5 text-left font-serif">
        {/* SignUp-title */}
        <h1 className="font-serif text-2xl md:text-3xl">Create Account</h1>

        {/* Input - Username */}
        <label className="mt-5 block text-sm">Your name</label>
        <input
          className="mt-2 h-[38px] w-full rounded border border-[#a0a0a0] px-2 py-1 text-base"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        {/* Input - Email or Mobile Number */}
        <label className="mt-5 block text-sm">Email or Mobile number</label>
        <input
          className="mt-2 h-[38px] w-full rounded border border-[#a0a0a0] px-2 py-1 text-base"
          type="text"
          value={identifier}
          onChange={handleIdentifierChange}
        />

        {/* Input - Password */}
        <label className="mt-5 block text-sm">Password</label>
        <input
          className="mt-2 h-[38px] w-full rounded border border-[#a0a0a0] px-2 py-1 text-base"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* SignUp Button */}
        <button
          className={`my-4 h-9 w-full rounded-lg border-none bg-[#ffd814] text-sm transition hover:bg-[#ebc712] md:text-base ${isRegisterDisabled ? 'opacity-50 hover:bg-[#ffd814]' : 'cursor-pointer'}`}
          onClick={isRegisterDisabled ? () => {} : handleRegister}
        >
          Register
        </button>

        <hr className="my-3 h-[1px] border-none bg-[#d4d4d4]" />
        <h4 className="text-sm">Buying for work?</h4>
        <p className="text-sm max-md:text-base">
          <span className="text-[#0066c0]">Create a free Business Account</span>
        </p>

        {/* Sign In */}
        <p className="my-5 text-sm">
          Already have an account?&nbsp;
          <Link className="text-[#0066c0]" to="/login">
            Sign in
          </Link>{' '}
          &#9656;
        </p>

        {/* Terms & Privacy */}
        <p className="text-sm max-md:text-base">
          By continuing, you agree to Amazon&apos;s&nbsp;
          <span className="cursor-pointer text-sm text-[#0066c0] underline">
            Conditions of Use
          </span>
          &nbsp;and&nbsp;
          <span className="cursor-pointer text-sm text-[#0066c0] underline">
            Privacy Notice
          </span>
          .
        </p>
      </div>
    </main>
  );
}
