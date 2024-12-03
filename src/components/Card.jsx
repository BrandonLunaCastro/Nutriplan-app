import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Card({ info }) {
    const { name, characteristics, description, imageUrl } = info;
    const { value } = useContext(UserContext);
    const { userFunction } = value;
    const { loginWithRedirect, user } = useAuth0();
    const navigate = useNavigate();

    const userClicked = (name) => {
        if (!user) {
            loginWithRedirect();
        } else {
            userFunction.saveSelectedPlan(name);
            navigate('/Login');
        }
    };

    return (
        <div className="relative m-4 w-72 h-96 rounded-lg overflow-hidden shadow-lg">
            <figure
                className="bg-cover bg-center w-full h-full"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* Overlay oscuro para el texto */}
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                
                {/* Contenido de la tarjeta */}
                <div className="relative p-4 flex flex-col justify-end h-full z-10">
                    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
                    <p className="text-sm text-gray-300">{description}</p>
                    <ul className="mt-2 space-y-1 text-gray-400">
                        {characteristics.map((el, index) => (
                            <li key={index} className="text-sm">{el}</li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600 transition duration-200 ease-in-out shadow-lg"
                        onClick={() => userClicked(name)}
                    >
                        Seleccionar
                    </button>
                </div>
            </figure>
        </div>
    );
}

export default Card;
