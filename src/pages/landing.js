// LandingPage.js

import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <img
            src="/windam_logo.png"
            alt="Windam Chat Logo"
            className="w-16 h-16 mb-4 mx-auto"
          />
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur Windam Chat</h1>
          <p className="text-lg mb-8">
            Connectez-vous et discutez avec vos amis en toute simplicité.
          </p>
          <Link href="/auth/login" className="bg-white text-blue-500 py-2 px-4 rounded-full font-bold hover:bg-blue-100">
              Commencez
         
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">À propos de Windam Chat</h2>
          <div className="container mx-auto text-center">
          <p className="text-lg mb-4">
            Windam Chat a été créé dans le cadre du développement des compétences
            et de l'expérimentation avec Firebase. Il n'est pas destiné à être
            publié et ne doit pas être utilisé pour des communications importantes.
          </p>
          <p className="text-lg mb-4">
            Veuillez noter que le système de messagerie de Windam Chat n'est pas
            sécurisé. Cependant, l'authentification des utilisateurs est bien gérée.
          </p>
        </div>
          <img
            src="/chat_image.png"
            alt="Chat Image"
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Buy Me Coffee Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Achetez-moi un café ☕</h2>
          <p className="text-lg mb-4">
            Si vous appréciez Windam Chat et souhaitez soutenir le développement,
            n'hésitez pas à m'{' '}
            <Link href="https://www.buymeacoffee.com/mouhamedbaba" className="text-yellow-500 hover:underline">acheter un café
            </Link>
             {" "}!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
          <p className="text-lg mb-4">
            Avez-vous des questions ou des commentaires ? N'hésitez pas à nous
            <Link href="/contact" a className="text-blue-500 hover:underline">contacter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Suivez-nous sur les réseaux sociaux</h2>
          <div className="flex justify-center space-x-4">
            <Link href="https://www.linkedin.com/in/mouhamedbaba" className="text-blue-500 hover:underline">LinkedIn
            </Link>
            <Link href="https://twitter.com/mouhamedbaba" className="text-blue-500 hover:underline">Twitter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Windam Chat. Tous droits réservés.</p>
          <p>
            <Link href="https://mouhamedbaba.dev" className="text-blue-500 hover:underline">Mouhamed Baba - Portfolio
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
