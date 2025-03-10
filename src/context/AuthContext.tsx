import { createContext, useState, useContext, ReactNode } from "react";

interface IAuthContext {
  token: string;
  setToken: (newToken: string) => void;
  removeToken: () => void;
}
const AuthContext = createContext<IAuthContext>({
  token: '',
  setToken: () => {},
  removeToken: () => {}
});

type AuthProviderProps = {
  children: ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem('token') || '');

  const setToken = (tok: string) => {
    setTokenState(tok);
    localStorage.setItem('token', tok)
  }

  const removeToken = () => {
    setTokenState('');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
