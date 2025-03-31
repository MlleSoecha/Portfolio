import fs from "fs"
import path from "path"
import { cache } from "react"

export interface Book {
  id: string
  title: string
  slug: string
  cover: string
  coverPlaceholder: string
  excerpt: string
  contentFile: string | null
  status: "full" | "excerpt" | "premium"
  externalLink: string
  publishedAt: string
}

export interface BookCollection {
  books: Book[]
}

// Utilisation de cache() pour mémoriser les résultats et éviter des lectures répétées
export const getBooks = cache(async (): Promise<Book[]> => {
  try {
    // Lire le fichier JSON
    const filePath = path.join(process.cwd(), "data", "collection.json")
    const fileContents = fs.readFileSync(filePath, "utf8")

    // Analyser le JSON
    const data: BookCollection = JSON.parse(fileContents)

    return data.books
  } catch (error) {
    console.error("Erreur lors du chargement des livres:", error)
    return []
  }
})

export const getBookBySlug = cache(async (slug: string): Promise<Book | null> => {
  const books = await getBooks()
  return books.find((book) => book.slug === slug) || null
})

export const getBookContent = cache(async (contentFile: string | null): Promise<string> => {
  if (!contentFile) return ""

  try {
    // Retirer le slash initial si présent pour obtenir le chemin relatif correct
    const relativePath = contentFile.startsWith("/") ? contentFile.slice(1) : contentFile
    const filePath = path.join(process.cwd(), "public", relativePath)

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.error(`Le fichier ${filePath} n'existe pas`)
      return ""
    }

    // Lire le contenu du fichier
    const content = fs.readFileSync(filePath, "utf8")
    return content
  } catch (error) {
    console.error("Erreur lors de la lecture du contenu du livre:", error)
    return ""
  }
})

// Fonction pour obtenir les livres mis en avant (pour la page d'accueil)
export const getFeaturedBooks = cache(async (limit = 5): Promise<Book[]> => {
  const books = await getBooks()
  return books.slice(0, limit)
})

