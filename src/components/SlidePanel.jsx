import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

function SidePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { value } = useContext(UserContext);
    const { userData } = value;
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate(); // Añadido para navegar

    const userLoginPremium = (userData === null || !userData) ? false : userData.isPremium && isAuthenticated ? true : !isAuthenticated ? false : true;

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    // Función que maneja la navegación a las páginas protegidas
    const handleNavigation = (path) => {
        if (isAuthenticated) {
            navigate(path); // Si está autenticado, navega al destino
        } else {
            loginWithRedirect(); // Si no está autenticado, redirige a la página de login
        }
    };

    return (
        <div>
            {/* Botón para abrir/cerrar el panel */}
            <button
                onClick={togglePanel}
                className={`fixed top-4 left-6 w-12 h-12 rounded-full z-50 bg-bold-green text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`}
            >
                ☰
            </button>

            {/* Panel lateral */}
            <div
                className={`fixed pt-28 top-0 left-0 h-full bg-soft-green shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 
                sm:w-full md:w-80`} // Usar w-full en pantallas pequeñas y w-80 en pantallas medianas y más grandes
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Encabezado del panel */}
                    <h2 className="text-2xl font-bold mb-8 text-white text-center">
                        Panel de Gestión
                    </h2>

                    {/* Enlaces del panel */}
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => handleNavigation('/Profile')}
                                className="block text-lg text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded transition duration-200 ease-in-out w-full text-left"
                            >
                                Perfil
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/Plan')}
                                className="block text-lg text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded transition duration-200 ease-in-out w-full text-left"
                            >
                                Planes
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/PremiumAccess')}
                                className="block text-lg text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded transition duration-200 ease-in-out w-full text-left"
                            >
                                Acceso Premium
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/Login')}
                                className="block text-lg text-white hover:bg-green-600 hover:text-white px-4 py-2 rounded transition duration-200 ease-in-out w-full text-left"
                            >
                                Acceso Rápido
                            </button>
                        </li>
                    </ul>

                    {/* Pie del panel */}
                    <div className="mt-auto text-center">
                        <p className="text-sm text-gray-200">
                            © 2024 Nutriplan. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidePanel;

