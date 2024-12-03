import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';  // Acceso al contexto de usuario
import { fetchObjetives } from '../functions/fetchObjetives';  // Función para obtener los objetivos desde el JSON

function Objetivos() {
  const { value } = useContext(UserContext);  // Accede al contexto de usuario
  const { userData } = value;  // Extrae los datos del usuario (dieta, etc.)
  
  const [objetivos, setObjetivos] = useState([]);  // Estado para almacenar los objetivos de la dieta seleccionada
  const [selectedObjectives, setSelectedObjectives] = useState([]);  // Estado para los checkboxes
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Manejo de errores

  // Llamada a la función fetchObjetives para obtener las dietas y los objetivos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos del archivo JSON
        const response = await fetchObjetives();
        const dietas = response.dietas;  // Asegúrate de que la respuesta tenga la propiedad "dietas"
        
        // Buscar la dieta del usuario comparando el nombre con las dietas disponibles
        const dietaUsuario = dietas.find(dieta => dieta.name === userData.selectedPlan);

        if (dietaUsuario) {
          setObjetivos(dietaUsuario.objetivos);  // Asignar los objetivos de la dieta del usuario
          setSelectedObjectives(dietaUsuario.objetivos.map(() => false));  // Inicializar los checkboxes como no seleccionados
        } else {
          throw new Error('No se encontró la dieta del usuario.');
        }
      } catch (err) {
        console.error(err);
        setError('Hubo un error al obtener los objetivos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData.dieta]);  // El efecto depende del nombre de la dieta del usuario

  // Función para manejar el cambio en los checkboxes
  const handleCheckboxChange = (index) => {
    const updatedSelectedObjectives = [...selectedObjectives];
    updatedSelectedObjectives[index] = !updatedSelectedObjectives[index];  // Cambiar el estado del checkbox
    setSelectedObjectives(updatedSelectedObjectives);
  };

  if (loading) return <div className="text-center text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-bold-green mb-6 text-center">Objetivos</h2>

        {/* Mostrar los objetivos */}
        <div className="space-y-4">
          {objetivos.map((objetivo, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`objetivo-${index}`}
                checked={selectedObjectives[index]}  // Si está seleccionado o no
                onChange={() => handleCheckboxChange(index)}  // Cambiar el estado cuando se haga clic
                className="mr-2"
              />
              <label htmlFor={`objetivo-${index}`} className="text-bold-green">{objetivo}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Objetivos;
