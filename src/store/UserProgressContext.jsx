import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  progress: '',
  showCart() {},
  hideCart() {},
  showChekout() {},
  hideChekout() {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }

  function showChekout() {
    setUserProgress('checkout');
  }

  function hideChekout() {
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showChekout,
    hideChekout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
