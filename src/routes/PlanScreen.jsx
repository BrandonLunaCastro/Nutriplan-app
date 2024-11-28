import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { fetchDiet } from '../functions/fetchDiet';

function PlanScreen() {    
    const [diet, setDiet] = useState();

    
    useEffect(() => {
            fetchDiet()
                .then(info => {
                    setDiet(info)
                })
    }, []);

    return (
        <section 
            className="pt-20 pr-64 pl-4 h-[calc(100vh-64px)] overflow-y-auto"
        >
            <h1 className="text-3xl font-bold text-center mb-4">
                Para empezar vamos a seleccionar un Plan alimenticio
            </h1>
            <div className="flex flex-row flex-wrap justify-center gap-4">
                { 
                    diet ? 
                    diet.map((object) => (
                        <Card key={object.id} info={object} />
                    )) 
                    : 
                    <p>Cargando planes alimenticios...</p>
                }
            </div>
        </section>
    );
}

export default PlanScreen;

