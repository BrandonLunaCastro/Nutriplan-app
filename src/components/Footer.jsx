import React from 'react';

function Footer() {
    return (
        <footer className="bg-soft-green text-white py-6">
            <div className="container mx-auto text-center">
                {/* Logo o título */}
                <h3 className="text-xl font-bold mb-4">Nutriplan</h3>

                {/* Enlaces de redes sociales (si los tienes) */}
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
                        <i className="fab fa-facebook-f"></i> {/* Icono de Facebook */}
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
                        <i className="fab fa-twitter"></i> {/* Icono de Twitter */}
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
                        <i className="fab fa-instagram"></i> {/* Icono de Instagram */}
                    </a>
                </div>

                {/* Información de derechos reservados */}
                <p className="text-sm">
                    © 2024 Nutriplan. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

