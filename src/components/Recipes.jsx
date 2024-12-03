import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Recipes({ actualDiet }) {
    const { value } = useContext(UserContext);
    const { userData } = value;

    if (!actualDiet) {
        return <p className="text-center text-gray-500">No hay un plan alimenticio seleccionado.</p>;
    }

    const recipesToShow = userData.isPremium ? 
        actualDiet.genericRecipes.concat(actualDiet.premiumRecipes) : 
        actualDiet.genericRecipes;

    return (
        <div className="flex justify-center items-center min-h-screen00 py-6">
            <div className="w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white">
                <h3 className="text-lg font-bold text-bold-green mb-4 text-center">Ingredientes de las Recetas</h3>
                {recipesToShow.map((recipe, index) => (
                    <div key={index} className="mt-4">
                        <h4 className="font-semibold text-bold-green">{recipe.name}</h4>
                        <ul className="list-disc list-inside pl-5">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recipes;
