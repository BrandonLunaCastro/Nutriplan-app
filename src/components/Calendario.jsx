import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchDiet } from '../functions/fetchDiet';
import { UserContext } from '../context/UserContext';

Modal.setAppElement('#root');

function Calendario({ events, addEvent, removeEvent, setActualDiet }) {
    const { value } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [allDiet, setDiet] = useState(null);
    const [actualDiet, setLocalActualDiet] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { userData } = value;

    useEffect(() => {
        const loadData = async () => {
            try {
                const info = await fetchDiet();
                setDiet(info);
                console.log('Dieta cargada:', info);
            } catch (error) {
                console.error('Error loading diet data:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (allDiet) {
            const selectedPlan = value.userData.selectedPlan;
            const selectedDiet = allDiet.find(diet => diet.name === selectedPlan);

            if (selectedDiet) {
                setLocalActualDiet(selectedDiet);
                setActualDiet(selectedDiet); // Enviar dieta actualizada al componente padre
                console.log('Dieta seleccionada:', selectedDiet);
            }
        }
    }, [allDiet, value.userData.selectedPlan]);

    const handleDateSelect = (info) => {
        console.log('Fecha seleccionada:', info.startStr);
        setSelectedDate(info.startStr);
        setIsModalOpen(true);
    };

    const handleEventClick = (info) => {
        const eventId = info.event.id;
        removeEvent(eventId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRecipeSelect = (recipe) => {
        const newEvent = {
            id: `${selectedDate}-${recipe.name}`,
            title: recipe.name,
            start: selectedDate,
            ingredients: recipe.ingredients
        };
        addEvent(newEvent);
        console.log('Evento añadido:', newEvent);
        setIsModalOpen(false);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                height="auto"
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                buttonText={{
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día'
                }}
                eventDisplay="block"
                contentHeight="auto"
                themeSystem="bootstrap"
                eventTextColor="#000000"
                dayMaxEventRows={2}
            />

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
                        width: '90%',
                        maxWidth: '300px',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        zIndex: '1000',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: '1000',
                    },
                }}
            >
                <h2 className="text-lg font-bold">Selecciona una receta para el {selectedDate}</h2>
                <div className="mt-2">
                    {(actualDiet && userData.isPremium) ? 
                        <>
                            <h3>Recetas:</h3>
                            {actualDiet.genericRecipes.map((recipe, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRecipeSelect(recipe)}
                                    className="block w-full py-1 px-2 mb-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {recipe.name}
                                </button>
                            ))}
                            <h3 className="mt-2">Recetas premium:</h3>
                            {actualDiet.premiumRecipes.map((recipe, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRecipeSelect(recipe)}
                                    className="block w-full py-1 px-2 mb-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {recipe.name}
                                </button>
                            ))}
                        </>
                    : (actualDiet && !userData.isPremium) && 
                        <>
                            <h3>Recetas:</h3>
                            {actualDiet.genericRecipes.map((recipe, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRecipeSelect(recipe)}
                                    className="block w-full py-1 px-2 mb-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {recipe.name}
                                </button>
                            ))}
                        </>
                    }
                </div>
                <button
                    onClick={closeModal}
                    className="mt-2 py-1 px-2 bg-gray-500 text-white rounded"
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
}

export default Calendario;

