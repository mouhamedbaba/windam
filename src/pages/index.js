import { AuthContext } from "@/context/authContext";
import { Seo } from "@/ui/components/seo/seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faInstagramSquare, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // You can add an API call or any other handling as needed
  };

  const handleSelect = async () => {
    setIsLoading(false);
    await currentUser;
    if (currentUser) {
      router.push("/chat");
    } else {
      router.push("auth/login");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Seo title="Acceuil" description="messaging app" />

      <main>
        
        <div className="bg-gray-100 ">
          {/* Hero Section */}
          <section className="text-white py-16 bg-lime-600  ">
            <div className="container  mx-auto text-center">
              <img
                src="/assets/logos/logo.png"
                alt="Windam Chat Logo"
                className="w-16 h-16 mb-4 mx-auto"
              />
              <h1 className="text-4xl font-bold mb-4">
                Bienvenue sur Windam Chat
              </h1>
              <p className="text-lg mb-8">
                Connectez-vous et essayez le chat ! 
              </p>
              <button
                onClick={handleSelect}
                className="bg-white text-blue-500 py-2 px-4 h-10 w-40 rounded-full font-bold hover:bg-blue-100"
              >
              {isLoading ? "Get Started" :(
                <svg
                  className="fill-slate-800 dark:fill-slate-50 h-full w-full animate-spin"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" />
                  </g>
                </svg>
            )}
              </button>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                À propos de Windam Chat
              </h2>
              <div className="container font-semibold  px-4 mx-auto border-l-4 border-lime-600 text-start">
                <p className="text-lg mb-4">
                  Windam Chat a été créé dans le cadre du développement des
                  compétences et de l'expérimentation avec Firebase. Il n'est
                  pas destiné à être publié et ne doit pas être utilisé pour des
                  communications importantes.
                </p>
                <p className="text-lg mb-4">
                  Veuillez noter que le système de messagerie de Windam Chat
                  n'est pas sécurisé. Cependant, l'authentification des
                  utilisateurs est bien gérée.
                </p>
              </div>
                <video autoPlay muted loop className="w-full h-auto rounded-lg">
                  <source src="/assets/videos/chat.mp4" type="video/mp4" />
                </video>
            </div>
          </section>

          {/* Buy Me Coffee Section */}
          <section className="bg-lime-200 py-16 mb-8">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 ">
                Buy Me a Coffee ☕
              </h2>
              <p className="text-lg mb-4">
                Si vous appréciez Windam Chat et souhaitez soutenir le
                développement, n'hésitez pas à m'{" "}
                <Link
                  href="https://www.buymeacoffee.com/mouhamedbaba"
                  className="text-yellow-500 hover:underline"
                >
                  acheter un café
                </Link>{" "}
                !
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-200 py-16 px-4  text-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center  ">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-lg mb-4">Feel free to reach out to us:</p>
            <p className="text-gray-600 text-start ">Email: mouhamedlamotte.dev@gmail.com</p>
            <p className="text-gray-600 text-start">Phone: +221 77 093-42-13</p>
            <p className="text-gray-600 text-start">Address: Mariste, Dakar</p>
            <p className="mt-6">
              Need assistance?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Get in Touch
              </a>
            </p>
          </div>
            {/* Column for Input Fields */}
            <div className="text-start">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={message}
                    onChange={handleMessageChange}
                    className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 w-full bg-lime-500 font-bold text-white rounded-md hover:shadow-lg focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
    
            {/* Column for Contact Information */}
          </div>
        </section>

          {/* Social Links Section */}
          <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Follow us on social media
            </h2>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/mouhamed-baba-lamotte-876291252/"
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
               
              </a>
              <a
                href="https://twitter.com/MouhamedLamotly"
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
                
              </a>
              <a
                href="https://www.facebook.com/mohamedbabalamotte/"
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
                
              </a>
              <a
                href="https://www.instagram.com/_mouhamed_baba/"
                className="text-blue-500 hover:underline"
              >
                <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
                
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </section>

          {/* Footer Section */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Windam Chat. Tous droits réservés.</p>
              <p>
                <Link
                  href="#"
                  className="text-blue-500 hover:underline"
                >
                  Mouhamed Baba - Portfolio
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
