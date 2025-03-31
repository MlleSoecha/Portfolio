import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                SOECHA
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Candide Essis SOSSOU
              <br />
              Chef projet digital · Psychologue du travail · Écrivaine
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-purple-400">
                Accueil
              </Link>
              <Link href="/books" className="text-sm text-gray-400 hover:text-purple-400">
                Livres
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-purple-400">
                À propos
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-purple-400">
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Légal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-purple-400">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-sm text-gray-400 hover:text-purple-400">
                Politique de confidentialité
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Suivez-moi</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Soecha (Candide Essis SOSSOU). Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}

