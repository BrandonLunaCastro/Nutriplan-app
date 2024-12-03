import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogOutButton from './LogOutButton';
import { UserContext } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
    const { value } = useContext(UserContext);
    const { userData } = value;

    const { loginWithRedirect } = useAuth0();  // Función para redirigir al usuario a Auth0
    const name = userData?.name || "nombre";
    const picture = userData?.picture || "logo.png";
    const plan = userData?.selectedPlan || "plan seleccionado";
    const isPremium = userData?.isPremium || false;
    const isAuthenticated = userData !== null; // Verifica si el usuario está autenticado

    const handlePremiumClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect();  // Redirige al flujo de login de Auth0 si el usuario no está autenticado
        } else {
            alert('Ya estás autenticado, accediendo al plan Premium...');
        }
    };

    return (
        <nav className="bg-soft-green p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row">
                {/* Sección para el nombre, plan y foto */}
                <div className="flex items-center space-x-8 sm:space-x-4">
                    {/* Caja del nombre y el plan */}
                    <div className="flex flex-col space-y-1 text-center sm:text-left">
                        <Link to="/Profile" className="text-white text-xl font-bold">
                            {name}
                        </Link>
                        <Link to="/Plan" className="text-white hover:text-gray-400 transition duration-200">
                            {plan}
                        </Link>
                    </div>
                    {/* Caja de la foto */}
                    <div className="flex items-center">
                        <Link to="/Profile">
                            <img src={picture} alt="user-logo" className="h-10 rounded-full" />
                        </Link>
                    </div>
                </div>

                {/* Botones de Inicio de Sesión y Logout */}
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    {/* Mostrar el botón solo si no es Premium */}
                    {!isPremium && (
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                            onClick={handlePremiumClick} // Llama a la función de redirección
                        >
                            ¡Quiero ser Premium!
                        </button>
                    )}
                    <LoginButton />
                    <LogOutButton />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
