import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '../components/Card';
import { fetchDiet } from '../functions/fetchDiet';

function PlanScreen() {
    const [diet, setDiet] = useState([]);
    const swiperRef = useRef(null); // Referencia para controlar el slider

    useEffect(() => {
        fetchDiet().then((info) => {
            setDiet(info);
        });
    }, []);

    // Autoplay manual usando setInterval
    useEffect(() => {
        const interval = setInterval(() => {
            if (swiperRef.current) {
                swiperRef.current.swiper.slideNext(); // Cambia al siguiente slide
            }
        }, 3000); // Cambia cada 3 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    return (
        <section className="pt-20 h-[calc(100vh-64px)] overflow-y-auto">
            {/* Slider de Planes Alimenticios */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-6">
                    Para empezar, seleccionemos un Plan alimenticio
                </h1>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={20} // Espacio entre tarjetas
                    slidesPerView={1} // Muestra 1 tarjeta por vista en pantallas pequeñas
                    breakpoints={{
                        640: {
                            slidesPerView: 2, // 2 slides por vista en pantallas medianas
                        },
                        1024: {
                            slidesPerView: 3, // 3 slides por vista en pantallas grandes
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="w-full max-w-6xl mx-auto"
                >
                    {diet.length > 0 ? (
                        diet.map((object) => (
                            <SwiperSlide key={object.id}>
                                <Card info={object} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <p className="text-center">Cargando planes alimenticios...</p>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Propuesta de Valor */}
            <div
                className="relative bg-cover bg-center h-96 flex items-center justify-center"
                style={{
                    backgroundImage: 'url(public/images/valor.jpg)', // Cambia esta ruta por la imagen que desees
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative text-center text-white px-6">
                    <h2 className="text-4xl font-bold mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <p className="text-lg">
                        Ofrecemos planes alimenticios personalizados, diseñados
                        para ayudarte a alcanzar tus objetivos de salud.
                    </p>
                </div>
            </div>

            {/* Sección de Contacto */}
            <div className="mt-10 px-6 text-center">
                <h3 className="text-3xl font-bold mb-4">
                    ¿Sos proveedor de alimentos?
                </h3>
                <p className="mb-6">
                    Nos encantaría incluir tus ofertas dentro de nuestra aplicación.
                    Completa el formulario para ponerte en contacto con nosotros.
                </p>
                <form className="max-w-lg mx-auto bg-gray-100 p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-left font-medium mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Ingresa tu nombre"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            placeholder="Ingresa tu email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-medium mb-2">
                            Mensaje
                        </label>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="4"
                            placeholder="Escribe tu mensaje"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PlanScreen;
