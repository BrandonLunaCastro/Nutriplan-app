import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "../context/UserContext";
/* import { db } from "../firebase"; // Asegúrate de tener la conexión a Firebase
import { doc, setDoc } from "firebase/firestore"; */

function Profile() {
  const { user } = useAuth0(); // Usamos la información del usuario de Auth0
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editedData, setEditedData] = useState(null);

  const {value} = useContext(UserContext)
  const {userData} = value ;
  const {userFunction} = value ;

  console.log(userData);
  console.log(userFunction)
  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name || "",
        email: userData.email || "",
        picture: userData.picture || user.picture || "",
        age: userData.age || "",
        weight: userData.weight || "",
        height: userData.height || "",
      });
  
      setEditedData({
        name: userData.name || "",
        email: userData.email || "",
        picture: userData.picture || user.picture || "",
        age: userData.age || "",
        weight: userData.weight || "",
        height: userData.height || "",
      });
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (user) {
      const userDoc = doc(db, "users", user.sub); 
      await setDoc(userDoc, {
        name: editedData.name,
        email: editedData.email,
        age: editedData.age,
        weight: editedData.weight,
        height: editedData.height,
      }, { merge: true });
      userFunction.setUserData({ ...userData, ...editedData });
  
      setProfileData(editedData); // Actualizamos los datos visuales
      setIsEditing(false); // Dejamos de editar
    }
  };

  const handleCancel = () => {
    setEditedData(profileData); // Restauramos los datos originales
    setIsEditing(false); // Dejamos de editar
  };

  if (!profileData) return <p>Cargando...</p>; // Aseguramos que los datos están cargados antes de renderizar

  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-6">
    <div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <img
          src={profileData.picture}
          alt="Perfil"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Editar
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Nombre</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            />
          ) : (
            <p>{profileData.name}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Correo</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            />
          ) : (
            <p>{profileData.email}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Edad</label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={editedData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            />
          ) : (
            <p>{profileData.age}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Peso (kg)</label>
          {isEditing ? (
            <input
              type="number"
              name="weight"
              value={editedData.weight}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            />
          ) : (
            <p>{profileData.weight}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Altura (cm)</label>
          {isEditing ? (
            <input
              type="number"
              name="height"
              value={editedData.height}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            />
          ) : (
            <p>{profileData.height}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  </section>
  );
}

export default Profile;
