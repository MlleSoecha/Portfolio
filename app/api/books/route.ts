import { NextResponse } from "next/server"
import { getBooks, getBookBySlug, getBookContent } from "@/lib/books"

// Récupérer tous les livres
export async function GET() {
  try {
    const books = await getBooks()
    return NextResponse.json(books, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des livres" }, { status: 500 })
  }
}

// Endpoint pour récupérer un livre spécifique
export async function POST(request: Request) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: "Le slug du livre est requis" }, { status: 400 })
    }

    const book = await getBookBySlug(slug)

    if (!book) {
      return NextResponse.json({ error: "Livre non trouvé" }, { status: 404 })
    }

    // Si le livre a un fichier de contenu, récupérer le contenu
    let content = null
    if (book.contentFile) {
      content = await getBookContent(book.contentFile)
    }

    return NextResponse.json({ book, content }, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la récupération du livre:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du livre" }, { status: 500 })
  }
}

