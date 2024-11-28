export const fetchDiet = async () => {
    try {
        const response = await fetch("/data/diet.json");
        const info = await response.json();
        return info;
    } catch (error) {
        console.error("Error al obtener la dieta:", error);
        throw error; // Lanza el error para que pueda ser manejado en el lugar donde se llame la función
    }
};