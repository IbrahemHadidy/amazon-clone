import { useRef } from 'react';

import makeStore from './store';
import { Provider } from 'react-redux';

import type { ReactNode } from 'react';
import type { AppStore } from './store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) storeRef.current = makeStore();
  return (
    storeRef.current && <Provider store={storeRef.current}>{children}</Provider>
  );
}
