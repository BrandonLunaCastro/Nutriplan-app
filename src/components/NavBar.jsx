import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogOutButton from './LogOutButton';
import { UserContext } from '../context/UserContext';

function NavBar() {
    const { value } = useContext(UserContext);
    const { userData } = value;
    let name;
    let picture;
    let plan;

    if (userData) {
        name = userData.name;
        picture = userData.picture;
        plan = userData.selectedPlan;
    } else {
        name = "nombre";
        picture = "logo.png";
        plan = "plan seleccionado";
    }

    return (
        <nav className="bg-soft-green p-4 shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Sección para el nombre, plan y foto */}
                <div className="flex items-center space-x-8">
                    {/* Caja del nombre y el plan */}
                    <div className="flex flex-col space-y-1">
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
                <div className="flex items-center space-x-4">
                    <LoginButton />
                    <LogOutButton />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
