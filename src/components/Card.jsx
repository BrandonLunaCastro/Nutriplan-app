import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//import 'react-slideshow-image/dist/styles.css';


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
        <div className="relative m-2">
            <figure
                className="bg-cover bg-center rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${imageUrl})`, height: '800px', width: '300px' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md" />
                <div className="relative p-4 flex flex-col justify-end h-full z-10">
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    <p className="text-lg font-semibold text-white mt-1">{description}</p>
                    <ul className="text-gray-300 mt-2">
                        {characteristics.map((el, index) => (
                            <li key={index} className="text-sm">{el}</li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 bg-soft-green text-white rounded py-2 hover:bg-bold-green transition duration-200 ease-in-out shadow-lg"
                        onClick={() => userClicked(name)}
                    >
                        Select
                    </button>
                </div>
            </figure>
        </div>
    );
}

export default Card;


