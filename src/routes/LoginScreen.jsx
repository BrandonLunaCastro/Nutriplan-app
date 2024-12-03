import { useContext, useState, useEffect } from 'react';
import Calendario from '../components/Calendario';
import Recipes from '../components/Recipes';
import Objetivos from '../components/Objetivos';  // Asegúrate de importar el componente Objetivos
import Modal from 'react-modal';
import { UserContext } from '../context/UserContext';

Modal.setAppElement('#root');

function LoginScreen() {
  const [events, setEvents] = useState([]);
  const [actualDiet, setActualDiet] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // Nuevo estado para manejar el componente activo
  const { value } = useContext(UserContext);
  const { userData } = value;

  console.log(userData);

  // Cargar eventos desde Local Storage al iniciar
  useEffect(() => {
    const storedEvents = localStorage.getItem(`events-${userData.id}`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [userData.id]);

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem(`events-${userData.id}`, JSON.stringify(updatedEvents));
  };

  const toggleCalendarVisibility = () => {
    setActiveComponent(activeComponent === 'calendar' ? null : 'calendar'); // Alternar visibilidad del calendario
  };

  const toggleRecipesVisibility = () => {
    setActiveComponent(activeComponent === 'recipes' ? null : 'recipes'); // Alternar visibilidad de recetas
  };

  const toggleObjetivosVisibility = () => {
    setActiveComponent(activeComponent === 'objetivos' ? null : 'objetivos'); // Alternar visibilidad de objetivos
  };

  // Función para agregar eventos
  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  // Función para eliminar eventos
  const removeEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  // Función para obtener las recetas del día actual
  const getRecipesForToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.start === today);
  };

  const recipesForToday = getRecipesForToday();

  // Función para generar un plan alimenticio semanal
  const generateWeeklyPlan = () => {
    if (!actualDiet) {
      console.log('No hay dieta actual disponible.');
      return;
    }

    const newEvents = [];
    const today = new Date();
    const recipes = userData.isPremium ? actualDiet.genericRecipes.concat(actualDiet.premiumRecipes) : actualDiet.genericRecipes;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = date.toISOString().split('T')[0];
      const dailyRecipes = [];

      for (let j = 0; j < 3; j++) {
        const recipeIndex = (i * 3 + j) % recipes.length;
        dailyRecipes.push(recipes[recipeIndex]);
      }

      dailyRecipes.forEach((recipe, index) => {
        newEvents.push({
          id: `${formattedDate}-${recipe.name}-${index}`,
          title: recipe.name,
          start: formattedDate,
          ingredients: recipe.ingredients
        });
      });
    }

    const updatedEvents = [...events, ...newEvents];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  // Función para borrar todo el plan
  const clearAllEvents = () => {
    setEvents([]);
    localStorage.removeItem(`events-${userData.id}`);
    closeConfirmationModal();
  };

  // Función para abrir el modal de confirmación
  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  // Función para cerrar el modal de confirmación
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-between bg-bold-green p-6 flex-grow">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Acceso Rápido</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
          <button
            className="p-4 rounded-md border-2 border-solid border-bold-green bg-white text-bold-green font-semibold hover:bg-gray-100 shadow-2xl"
            onClick={toggleCalendarVisibility}
          >
            {activeComponent === 'calendar' ? 'Ocultar Calendario' : 'Ver Calendario'}
          </button>
          <button
            className="p-4 rounded-md border-2 border-solid border-bold-green bg-white text-bold-green font-semibold hover:bg-gray-100 shadow-2xl"
            onClick={toggleRecipesVisibility}
          >
            {activeComponent === 'recipes' ? 'Ocultar Ingredientes' : 'Ver Ingredientes'}
          </button>
          <button
            className="p-4 rounded-md border-2 border-solid border-bold-green bg-white text-bold-green font-semibold hover:bg-gray-100 shadow-2xl"
            onClick={toggleObjetivosVisibility}
          >
            {activeComponent === 'objetivos' ? 'Ocultar Objetivos' : 'Ver Objetivos'}
          </button>
        </div>

        {activeComponent === 'calendar' && (
          <div className="flex space-x-4 mt-4">
            <button
              className="p-4 rounded-md border-2 border-solid border-bold-green bg-white text-bold-green font-semibold hover:bg-gray-100 shadow-2xl"
              onClick={generateWeeklyPlan}
            >
              Generar Plan Semanal
            </button>
            <button
              className="p-4 rounded-md border-2 border-solid border-red-500 bg-white text-red-500 font-semibold hover:bg-gray-100 shadow-2xl"
              onClick={openConfirmationModal}
            >
              Borrar Todo el Plan
            </button>
          </div>
        )}

        {activeComponent === 'calendar' && (
          <div className="mt-6 w-full max-h-[70vh] overflow-auto flex-grow">
            <Calendario
              events={events}
              addEvent={addEvent}
              removeEvent={removeEvent}
              setActualDiet={setActualDiet}
            />
          </div>
        )}

        {activeComponent === 'recipes' && (
          <div className="mt-6 w-full flex-grow">
            <Recipes actualDiet={actualDiet} />
          </div>
        )}

        {activeComponent === 'objetivos' && (
          <div className="mt-6 w-full flex-grow">
            <Objetivos /> {/* Mostrar el componente Objetivos cuando esté activo */}
          </div>
        )}

        {/* Mostrar las recetas del día actual en una tabla */}
        <div className="mt-6 w-full max-w-xl bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold text-bold-green mb-4">Recetas para hoy</h3>
          {recipesForToday.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Receta</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Ingredientes</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recipesForToday.map((event, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{event.title}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <ul>
                        {event.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => removeEvent(event.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-bold-green">No hay recetas planificadas para hoy.</p>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onRequestClose={closeConfirmationModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '400px',
            padding: '20px',
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
        <h2 className="text-lg font-bold text-bold-green mb-4">¿Está seguro de que desea borrar todo el plan?</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={clearAllEvents}
          >
            Sí, borrar todo
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={closeConfirmationModal}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </section>
  );
}

export default LoginScreen;
