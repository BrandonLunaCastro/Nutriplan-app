import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

function LogOutButton() {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() => logout()}
            className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition duration-200 ease-in-out"
        >
            Log Out
        </button>
    );
}

export default LogOutButton;