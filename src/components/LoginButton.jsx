import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  
  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200 ease-in-out"
    >
      Login
    </button>
  );
}

export default LoginButton;
