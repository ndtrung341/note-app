import { useAuth } from '~/context/AuthContext';
import { supabaseClient } from '~/services/SupabaseClient';

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <button onClick={() => supabaseClient.auth.signOut()}>Logout</button>
    </>
  );
};

export default Home;
