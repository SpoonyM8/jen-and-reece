import { createContext, useState, useContext, ReactNode } from "react";

interface IAuthContext {
  token: string;
  setToken: (newToken: string) => void;
}
const AuthContext = createContext<IAuthContext>({
  token: '',
  setToken: () => {}
});

type AuthProviderProps = {
  children: ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState('');
  console.log(token)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
