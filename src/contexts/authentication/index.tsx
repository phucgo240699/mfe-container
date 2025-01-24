import React, { createContext } from 'react';

export interface AuthenticationContextType {
  accessToken?: string;
  isAuthenticated: boolean;
  changeAccessToken: (accessToken: string) => void;
  reset: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  changeAccessToken: function (): void {
    throw new Error('Function not implemented.');
  },
  reset: function (): void {
    throw new Error('Function not implemented.');
  },
});

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = React.useState<string | undefined>(
    localStorage.getItem('accessToken')?.toString()
  );

  const handleChangeAccessToken = (token: string): void => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        accessToken,
        changeAccessToken: handleChangeAccessToken,
        isAuthenticated: !!accessToken,
        reset: () => {
          setAccessToken(undefined);
          localStorage.removeItem('accessToken');
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const AuthenticationConsumer = AuthenticationContext.Consumer;
