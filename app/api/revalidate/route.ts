import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Cette route permet de revalider le cache lorsque les données des livres sont mises à jour
export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()

    // Vérifier le secret pour sécuriser l'endpoint
    // Dans un environnement de production, utilisez une variable d'environnement
    const expectedSecret = process.env.REVALIDATE_SECRET || "votre-secret-temporaire"

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Secret invalide" }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ error: "Le chemin à revalider est requis" }, { status: 400 })
    }

    // Revalider le chemin spécifié
    revalidatePath(path)

    return NextResponse.json({ revalidated: true, path }, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la revalidation:", error)
    return NextResponse.json({ error: "Erreur lors de la revalidation" }, { status: 500 })
  }
}

