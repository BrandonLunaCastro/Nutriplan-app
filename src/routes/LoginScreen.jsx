// LoginScreen.js
import React, { useState } from 'react';
import Calendario from '../components/Calendario';

function LoginScreen() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [events, setEvents] = useState([]); // Mueve el estado de los eventos aquí

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Función para agregar eventos
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 min-h-screen pt-16">
      <div className="col-span-1 bg-soft-green p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Panel de Gestión</h1>
        <p className="text-white mt-4">Aquí puedes gestionar tus opciones</p>
      </div>

      <div className="col-span-4 bg-bold-green p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Acceso Rápido</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-4 rounded-md border-2 border-solid border-blue-400 bg-white text-bold-green font-semibold hover:bg-gray-100"
            onClick={toggleCalendarVisibility}
          >
            {isCalendarVisible ? 'Ocultar Calendario' : 'Ver Calendario'}
          </button>
          <button className="p-4 rounded-md border-2 border-solid border-blue-400 bg-white text-bold-green font-semibold hover:bg-gray-100">
            Recetas
          </button>
          <button className="p-4 rounded-md border-2 border-solid border-blue-400 bg-white text-bold-green font-semibold hover:bg-gray-100">
            Objetivo
          </button>
          <button className="p-4 rounded-md border-2 border-solid border-blue-400 bg-white text-bold-green font-semibold hover:bg-gray-100">
            Insignia
          </button>
        </div>

        {isCalendarVisible && (
          <div className="mt-6">
            <Calendario events={events} addEvent={addEvent} />
          </div>
        )}
      </div>
    </section>
  );
}

export default LoginScreen;
