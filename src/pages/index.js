import { AuthContext } from "@/context/authContext";
import { Seo } from "@/ui/components/seo/seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

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
        
        <div className="bg-gray-100 font-sans ">
          {/* Hero Section */}
          <section className="text-white py-16 bg-lime-800  ">
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
                Connectez-vous et discutez avec vos amis en toute simplicité.
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
          <section className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                À propos de Windam Chat
              </h2>
              <div className="container mx-auto text-center">
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
          <section className="bg-gray-200 py-16 px-3">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                Achetez-moi un café ☕
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
          <section className="bg-gray-200 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
              <p className="text-lg mb-4">
                Avez-vous des questions ou des commentaires ? N'hésitez pas à
                nous
                <Link
                  href="/contact"
                  a
                  className="text-blue-500 hover:underline"
                >
                  contacter
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Social Links Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                Suivez-nous sur les réseaux sociaux
              </h2>
              <div className="flex justify-center space-x-4">
                <Link
                  href="https://www.linkedin.com/in/mouhamedbaba"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://twitter.com/mouhamedbaba"
                  className="text-blue-500 hover:underline"
                >
                  Twitter
                </Link>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Windam Chat. Tous droits réservés.</p>
              <p>
                <Link
                  href="https://mouhamedbaba.dev"
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
