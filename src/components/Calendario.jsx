import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Importar el plugin de interacción
import { fetchDiet } from '../functions/fetchDiet';
import { UserContext } from '../context/UserContext';

Modal.setAppElement('#root'); // Para accesibilidad

function Calendario({ events, addEvent }) { // Recibe eventos y función para agregar eventos como props
    const { value } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [allDiet, setDiet] = useState(null);
    const [actualDiet, setActualDiet] = useState(null);

    // Cargar la información de las dietas
    useEffect(() => {
        const loadData = async () => {
            try {
                const info = await fetchDiet();
                setDiet(info);
                console.log('Dieta cargada:', info); // Verificar que la dieta se carga correctamente
            } catch (error) {
                console.error('Error loading diet data:', error);
            }
        };

        loadData();
    }, []);

    // Filtrar las recetas según el plan seleccionado por el usuario
    useEffect(() => {
        if (allDiet) {
            const selectedPlan = value.userData.selectedPlan;
            const selectedDiet = allDiet.find(diet => diet.name === selectedPlan);

            if (selectedDiet) {
                setActualDiet(selectedDiet); // Establece las recetas de este plan
                console.log('Dieta seleccionada:', selectedDiet); // Verificar la dieta seleccionada
            }
        }
    }, [allDiet, value.userData.selectedPlan]);

    // Función para abrir el modal al seleccionar una fecha
    const handleDateSelect = (info) => {
        console.log('Fecha seleccionada:', info.startStr); // Verificar que se selecciona una fecha
        setSelectedDate(info.startStr);
        setIsModalOpen(true); // Abrir el modal
    };

    // Cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Función para seleccionar la receta
    const handleRecipeSelect = (recipe) => {
        const newEvent = {
            title: recipe,  // Título del evento (nombre de la receta)
            start: selectedDate,   // Fecha seleccionada
        };

        // Agregar evento al estado
        addEvent(newEvent); // Usar la función pasada como prop para agregar el evento
        console.log('Evento añadido:', newEvent);
        setIsModalOpen(false); // Cerrar el modal después de seleccionar la receta
    };

    return (
        <div>
            {/* Calendario */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]} // Añadir el plugin de interacción
                initialView="dayGridMonth"
                events={events}  // Mostrar los eventos en el calendario
                selectable={true}  // Permitir selección de fechas
                select={handleDateSelect}  // Acción al seleccionar una fecha
            />

            {/* Modal para seleccionar la receta */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '400px',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        zIndex: '1000', // Asegurarse de que el modal esté sobre el calendario
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Aumentar la opacidad para un efecto más fuerte
                        zIndex: '1000', // Asegurarse de que la superposición esté sobre el calendario
                    },
                }}
            >
                <h2 className="text-xl font-bold">Selecciona una receta para el {selectedDate}</h2>
                <div className="mt-4">
                    {actualDiet ? (
                        <>
                            <h3>Recetas generales:</h3>
                            {actualDiet.genericRecipes.map((recipe, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRecipeSelect(recipe)}
                                    className="block w-full py-2 px-4 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {recipe}
                                </button>
                            ))}
                            <h3 className="mt-4">Recetas premium:</h3>
                            {actualDiet.premiumRecipes.map((recipe, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRecipeSelect(recipe)}
                                    className="block w-full py-2 px-4 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {recipe}
                                </button>
                            ))}
                        </>
                    ) : (
                        <p>No hay recetas disponibles para este plan.</p>
                    )}
                </div>
                <button
                    onClick={closeModal}
                    className="mt-4 py-2 px-4 bg-gray-500 text-white rounded"
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
}

export default Calendario;
