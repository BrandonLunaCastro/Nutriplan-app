import React from 'react'
import { Link } from 'react-router-dom';

function PopUp({close}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
        {/* Imagen destacada */}
        <img 
            src="./public/images/preamiun.jpg" 
            alt="Plan Premium"
            className="mb-4 w-full rounded-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Lleva tu experiencia al siguiente nivel!
        </h2>
        <p className="text-gray-600">
            Descubre las ventajas del <span className="font-semibold">Plan Premium</span>:
            <ul className="list-disc list-inside mt-2 text-left">
                <li>Recetas personalizadas por nutricionistas.</li>
                <li>Análisis avanzado de objetivos de salud.</li>
                <li>Acceso a una amplia biblioteca de recetas.</li>
            </ul>
        </p>
        <p className="mt-4 font-semibold text-lg text-gray-800">
            💡 ¡Prueba gratis durante 30 días!
        </p>
        <div className="mt-6 flex justify-between">
            <Link to="/Pay">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    onClick={() => {
                        alert('Redirigiendo al plan Premium...');
                    }}
                >
                    ¡Quiero ser Premium!
                </button>
            </Link>
            <button
                className="text-gray-500 hover:underline"
                onClick={close}
            >
                No, gracias
            </button>
        </div>
    </div>
</div>
  )
}

export default PopUp