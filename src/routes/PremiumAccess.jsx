import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fakeData, setFakeData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    dni: "",
    receipt: "",
  });
  const {user} = useAuth0()
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const {value} = userContext;
  const {userData} = value 
  const {userFunction} = value

  console.log(userData);


  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFakeData({ ...fakeData, [name]: value });
  };

  const handleRedirect = () => {
      navigate("/Login")
  }

  const handlePaymentSubmit = async () => {
    if (paymentMethod === "local") {
      setFakeData({ ...fakeData, receipt: "Comprobante: #12345XYZ" });
    }
    
    setShowModal(false);
    alert("¡Pago realizado exitosamente!");
    
    try {
      // Actualizar en Firebase
      if (user) {
        const userDoc = doc(db, "users", user.sub);
        await setDoc(userDoc, { isPremium: true }, { merge: true });
        userFunction.setUserData({...userData, isPremium: true})
        handleRedirect();
      }
    } catch (error) {
      console.error("Error al actualizar el estado de Premium:", error);
    }
  };
  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Plan Premium</h1>
      <p className="mb-4">Disfruta de todas las funcionalidades exclusivas.</p>
      <p className="mb-4" >Por solo $10 al mes</p>
      <button
        onClick={() => handlePaymentMethodSelect("creditCard")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
      >
        Pagar con Tarjeta de Crédito
      </button>

      <button
        onClick={() => handlePaymentMethodSelect("local")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Pagar con Medio Local
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {paymentMethod === "creditCard"
                ? "Ingrese los datos de la tarjeta"
                : "Comprobante de Pago Local"}
            </h2>

            {paymentMethod === "creditCard" ? (
              <div>
                <label className="block mb-2">Número de Tarjeta</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={fakeData.cardNumber}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded mb-4"
                  placeholder="1234 5678 9012 3456"
                />

                <label className="block mb-2">Nombre del Titular</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={fakeData.cardHolder}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded mb-4"
                  placeholder="Juan Pérez"
                />

                <label className="block mb-2">Fecha de Vencimiento</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={fakeData.expiryDate}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded mb-4"
                  placeholder="MM/AA"
                />

                <label className="block mb-2">Código de Seguridad (CVV)</label>
                <input
                  type="text"
                  name="cvv"
                  value={fakeData.cvv}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded mb-4"
                  placeholder="123"
                />

                <label className="block mb-2">DNI del Titular</label>
                <input
                  type="text"
                  name="dni"
                  value={fakeData.dni}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded mb-4"
                  placeholder="12345678"
                />
              </div>
            ) : (
              <p className="mb-4">
                Paga en el comercio local y guarda este comprobante:
              </p>
            )}

            {paymentMethod === "local" && (
              <p className="bg-gray-100 p-4 rounded mb-4">
                {fakeData.receipt || "Comprobante: #12345XYZ"}
              </p>
            )}

            <button
              onClick={handlePaymentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Confirmar Pago
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
