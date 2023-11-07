import { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseClient } from '~/services/SupabaseClient';

export type AuthContext = {
  user: User | undefined | null;
};

const AuthContext = createContext<AuthContext>({
  user: null
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const getUser = async () => {
      const { data } = await supabaseClient.auth.getSession();
      const currentUser = data.session?.user;
      setUser(currentUser ?? null);
      setIsLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{!isLoading ? children : null}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
