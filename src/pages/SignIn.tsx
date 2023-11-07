import React from 'react';
import { Provider } from '@supabase/supabase-js';
import { supabaseClient } from '~/services/SupabaseClient';
import { useSearchParams } from 'react-router-dom';
import googleLogo from '~/assets/google.svg';
import githubLogo from '~/assets/github.svg';
import '~/assets/styles/sign_in.css';

const SignIn: React.FC = () => {
  const [searchParams] = useSearchParams();

  const signInWith = async (provider: Provider) => {
    const from = searchParams.get('redirectTo');
    // eslint-disable-next-line @typescript-eslint/ban-types
    const options: { redirectTo?: string; scopes?: string; queryParams?: {} } = {
      redirectTo: location.origin + (from ?? null)
    };

    if (provider == 'google') {
      options.queryParams = {
        access_type: 'offline',
        prompt: 'consent'
      };
    }

    await supabaseClient.auth.signInWithOAuth({
      provider,
      options
    });
  };

  return (
    <div className='wrapper'>
      <h2>Sign in</h2>
      <div style={{ marginTop: '1.5rem' }}>
        <button
          className='btn btn-signin-social btn-signin-github'
          onClick={() => signInWith('github')}
        >
          <img src={githubLogo} width={32} height={32} />
          Continue with GitHub
        </button>
        <button
          className='btn btn-signin-social btn-signin-google'
          onClick={() => signInWith('google')}
        >
          <img src={googleLogo} width={32} height={32} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
