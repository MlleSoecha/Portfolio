"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { Book } from "@/lib/books"

// Simuler le chargement des livres depuis l'API
// Dans une vraie application, cela serait fait côté serveur
const books: Book[] = [
  {
    id: "eveil-des-ombres",
    title: "L'Éveil des Ombres",
    slug: "eveil-des-ombres",
    cover: "/images/covers/eveil-des-ombres.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Un voyage introspectif à travers les méandres de l'âme humaine.",
    contentFile: "/content/eveil-des-ombres.md",
    status: "excerpt",
    externalLink: "https://exemple.com/livres/eveil-des-ombres",
    publishedAt: "2023-05-15",
  },
  {
    id: "echos-du-silence",
    title: "Échos du Silence",
    slug: "echos-du-silence",
    cover: "/images/covers/echos-du-silence.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Quand les non-dits deviennent plus éloquents que les mots.",
    contentFile: null,
    status: "premium",
    externalLink: "https://exemple.com/livres/echos-du-silence",
    publishedAt: "2022-11-03",
  },
  {
    id: "fragments-eternite",
    title: "Fragments d'Éternité",
    slug: "fragments-eternite",
    cover: "/images/covers/fragments-eternite.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Une collection de pensées sur le temps et la mémoire collective.",
    contentFile: "/content/fragments-eternite.md",
    status: "excerpt",
    externalLink: "https://exemple.com/livres/fragments-eternite",
    publishedAt: "2023-02-20",
  },
  {
    id: "sentiers-oublies",
    title: "Les Sentiers Oubliés",
    slug: "sentiers-oublies",
    cover: "/images/covers/sentiers-oublies.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Une exploration des chemins moins empruntés de l'existence.",
    contentFile: null,
    status: "premium",
    externalLink: "https://exemple.com/livres/sentiers-oublies",
    publishedAt: "2021-09-12",
  },
  {
    id: "resonances",
    title: "Résonances",
    slug: "resonances",
    cover: "/images/covers/resonances.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Comment nos actions créent des ondes qui transforment notre entourage.",
    contentFile: "/content/resonances.md",
    status: "excerpt",
    externalLink: "https://exemple.com/livres/resonances",
    publishedAt: "2022-06-30",
  },
]

// Simuler le chargement du contenu depuis l'API
// Dans une vraie application, cela serait fait côté serveur
const bookContents: Record<string, string> = {
  "eveil-des-ombres": `# L'Éveil des Ombres

## Chapitre 1: Le commencement

La nuit était tombée sur la ville, enveloppant les rues d'un manteau d'obscurité. Les lampadaires projetaient une lueur fantomatique sur les trottoirs déserts. C'est dans ce décor que tout a commencé.

## L'appel

Le téléphone sonna, brisant le silence de l'appartement. Une voix familière, mais teintée d'une urgence inhabituelle. *"Il est temps"*, dit-elle simplement avant de raccrocher.

Ces trois mots allaient changer le cours de mon existence. Je ne le savais pas encore, mais j'étais sur le point de plonger dans un monde dont j'ignorais tout.

> "Le destin ne frappe pas toujours à la porte. Parfois, il appelle."

### La décision

Je me suis levé lentement, contemplant les options qui s'offraient à moi. Rester dans le confort de mon quotidien ou répondre à cet appel mystérieux ? La curiosité l'emporta sur la prudence.

En quelques minutes, j'avais rassemblé l'essentiel : un carnet, un stylo, et cette vieille photographie que je gardais toujours près de moi. Je ne savais pas où j'allais, mais j'étais certain que ces objets me seraient utiles.

## Chapitre 2: La rencontre

La pluie commençait à tomber quand j'arrivai au point de rendez-vous. Un café presque vide, à l'angle d'une rue peu fréquentée. L'endroit idéal pour une rencontre discrète.

Elle était là, assise dans un coin, son visage à moitié dissimulé par l'ombre. Nos regards se croisèrent, et je sus immédiatement que ma vie ne serait plus jamais la même.`,
  "fragments-eternite": `# Fragments d'Éternité

## Préface

*Comment capturer l'infini dans un instant ? Comment saisir l'éternité dans un fragment de temps ?*

Ce recueil est né d'une quête impossible : celle de figer l'impermanence, de donner forme à l'insaisissable. Chaque texte est une tentative de préserver un moment, une pensée, une émotion qui, sans cela, se serait diluée dans le flot incessant du temps.

## Fragment I: Mémoire

La mémoire est un océan capricieux. Certains souvenirs flottent à sa surface, toujours accessibles, tandis que d'autres plongent dans ses profondeurs, attendant le moment propice pour remonter.

Je me souviens d'un après-midi d'été, la lumière dorée filtrant à travers les feuilles d'un tilleul. Une brise légère, le chant distant d'un oiseau. Un moment ordinaire, sans importance apparente, et pourtant gravé dans ma mémoire avec une précision déconcertante.

D'autres instants, que j'aurais voulu préserver à tout prix, se sont évanouis. Des visages aimés dont les contours s'estompent, des voix chères dont le timbre s'affadit.

> "La mémoire est l'artiste la plus subjective qui soit. Elle peint non pas ce qui fut, mais ce qui résonne."

## Fragment II: Temps

Le temps n'existe pas. Ou plutôt, il existe différemment pour chacun de nous. Une heure d'ennui s'étire à l'infini, tandis qu'une journée de bonheur s'évapore en un instant.

Nous sommes prisonniers d'une illusion collective, celle d'un temps linéaire, mesurable, identique pour tous. Mais notre expérience intime du temps raconte une tout autre histoire.

Dans les moments de grâce, le temps suspend son vol. Dans la douleur, il se fait tortionnaire. Dans l'amour, il devient complice.

## Fragment III: Éternité

L'éternité n'est pas une ligne infinie qui s'étend devant et derrière nous. Elle est là, contenue dans chaque instant vécu pleinement.

Un enfant qui découvre le monde avec émerveillement vit l'éternité. Deux amants qui se regardent, oublieux du monde extérieur, vivent l'éternité. Un artiste absorbé dans sa création vit l'éternité.

Ces moments où le temps chronologique cesse d'exercer sa tyrannie sont des fragments d'éternité à notre portée.`,
  resonances: `# Résonances

## Prologue: L'onde initiale

Tout commence par un mouvement, si infime soit-il. Une pierre jetée dans l'eau calme d'un étang. Un mot prononcé dans le silence. Un geste esquissé dans l'immobilité.

Et soudain, des cercles concentriques se forment, s'élargissent, se propagent. C'est la loi de la résonance : rien ne reste isolé, tout se répercute, tout se transforme.

## Chapitre 1: Échos

Maria n'avait pas prévu de changer de vie ce jour-là. Elle s'était levée comme d'habitude, avait préparé son café, s'était habillée pour aller travailler. Rien dans sa routine matinale ne laissait présager le bouleversement à venir.

C'est en traversant le parc qu'elle aperçut cette femme âgée, assise seule sur un banc, le regard perdu dans le vague. Quelque chose dans son expression – une tristesse résignée, peut-être – toucha Maria. Au lieu de poursuivre son chemin, elle s'arrêta.

"Puis-je m'asseoir un moment ?" demanda-t-elle.

La femme leva les yeux, surprise. "Bien sûr," répondit-elle avec un léger sourire.

Cette conversation impromptue dura vingt minutes. Vingt minutes qui allaient changer le cours de deux existences.

> "Les rencontres les plus significatives sont souvent celles que l'on n'a pas planifiées."

La femme s'appelait Élise. Elle venait de perdre son mari après cinquante ans de vie commune et se sentait désespérément seule. Maria lui parla de son travail dans une maison d'édition, de son amour pour la littérature.

Avant de se quitter, elles échangèrent leurs numéros. Un petit geste, presque anodin. Une onde lancée dans l'univers.

## Chapitre 2: Vibrations

Élise possédait une collection impressionnante de manuscrits inédits. Son mari, écrivain dans l'ombre, avait passé sa vie à écrire sans jamais chercher à être publié.

"Il écrivait pour lui-même, pour le plaisir des mots," expliqua Élise lors de leur deuxième rencontre, en montrant à Maria des cartons remplis de cahiers soigneusement calligraphiés.

Par curiosité professionnelle, Maria demanda si elle pouvait en emporter quelques-uns pour les lire. Élise accepta avec gratitude, heureuse que quelqu'un s'intéresse à l'œuvre de son défunt mari.

Ce soir-là, Maria fut transportée par la beauté et la profondeur des textes qu'elle découvrait. Une voix authentique, puissante, qui méritait d'être entendue.

Le lendemain, elle parla de sa découverte à son directeur éditorial. Sceptique au début, il finit par accepter de jeter un œil aux manuscrits.

Trois mois plus tard, la maison d'édition décidait de publier une anthologie des écrits d'Henri, le mari d'Élise.`,
}

export default function BookPage() {
  const params = useParams()
  const slug = params.slug as string
  const [book, setBook] = useState<Book | null>(null)
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [reachedEnd, setReachedEnd] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // Find the book based on the slug
    const foundBook = books.find((b) => b.slug === slug)
    setBook(foundBook || null)

    // Simulate loading the book content
    setLoading(true)
    setTimeout(() => {
      if (foundBook && foundBook.status === "excerpt") {
        setContent(bookContents[slug] || "")
      }
      setLoading(false)
    }, 800)
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current

        // Calcul plus stable de la progression
        const progress = scrollHeight <= clientHeight ? 1 : scrollTop / (scrollHeight - clientHeight)
        setScrollProgress(Math.min(progress, 1))

        // Marge plus généreuse pour détecter la fin (100px au lieu de 50px)
        // et vérification que le contenu est suffisamment grand pour défiler
        const hasReachedEnd = scrollHeight > clientHeight && scrollHeight - scrollTop - clientHeight < 100

        // Seulement mettre à jour l'état si la valeur change réellement
        if (hasReachedEnd !== reachedEnd) {
          setReachedEnd(hasReachedEnd)
        }
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)

      // Appel initial pour gérer le cas où le contenu est trop court pour défiler
      handleScroll()

      return () => contentElement.removeEventListener("scroll", handleScroll)
    }
    // Retirez reachedEnd des dépendances pour éviter la boucle infinie
  }, [content])

  if (!book) {
    return (
      <div className="min-h-screen bg-primary text-gold pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4">Livre non trouvé</h1>
          <p className="font-cormorant text-gold/80 mb-6">Le livre que vous recherchez n'existe pas.</p>
          <Link href="/books" passHref>
            <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-6 py-3 font-cormorant">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux livres
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary text-gold pt-32 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link href="/books" className="inline-flex items-center text-sm text-gold/60 hover:text-gold mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux livres
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-32">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/20"></div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.coverPlaceholder || "/placeholder.svg"}
                    alt={book.title}
                    className="object-cover w-full h-full"
                    width={300}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-primary/20"></div>
                </div>
              </div>
              <h1 className="font-playfair text-2xl font-bold mt-6">{book.title}</h1>
              <p className="font-cormorant text-gold/80 mt-2 italic">{book.excerpt}</p>

              {book.status === "premium" && (
                <div className="mt-8">
                  <Link href={book.externalLink} target="_blank" passHref>
                    <Button className="w-full bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-6 py-3 font-cormorant">
                      Lire le livre complet
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-gold/50 mt-2 text-center font-cormorant">
                    Vous serez redirigé vers un site externe
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {book.status === "excerpt" ? (
              <>
                {/* Reading progress bar */}
                <div className="h-[2px] bg-gold/20 mb-8 sticky top-20 z-10">
                  <div
                    className="h-full bg-gold transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                </div>

                <div
                  ref={contentRef}
                  className="prose prose-invert max-w-none max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar"
                  style={{
                    scrollBehavior: "smooth",
                    overscrollBehavior: "contain", // Empêche le rebond sur certains navigateurs
                  }}
                >
                  {loading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-6 bg-gold/10 rounded w-3/4"></div>
                      <div className="h-6 bg-gold/10 rounded w-1/2"></div>
                      <div className="h-6 bg-gold/10 rounded w-5/6"></div>
                      <div className="h-6 bg-gold/10 rounded w-2/3"></div>
                      <div className="h-6 bg-gold/10 rounded w-4/5"></div>
                      <div className="h-6 bg-gold/10 rounded w-3/5"></div>
                    </div>
                  ) : (
                    <>
                      <ReactMarkdown>{content}</ReactMarkdown>

                      {/* Notification for end of excerpt */}
                      {reachedEnd && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.5 }}
                          className="mt-12 p-8 border border-gold/20 text-center"
                          style={{ position: "relative" }} // Assure un positionnement stable
                        >
                          <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ExternalLink className="h-8 w-8 text-gold/70" />
                          </div>
                          <h2 className="font-playfair text-2xl font-bold mb-4">Fin de l'extrait</h2>
                          <p className="font-cormorant text-gold/80 mb-8 max-w-md mx-auto">
                            Vous avez atteint la fin de l'extrait gratuit. Pour continuer votre lecture, accédez au
                            livre complet sur notre plateforme partenaire externe.
                          </p>
                          <Link href={book.externalLink} target="_blank" passHref>
                            <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-4 text-lg font-cormorant">
                              Lire la suite sur le site externe
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                {/* Scroll indicator - only show if not at the end */}
                {!reachedEnd && (
                  <div className="flex justify-center mt-8 animate-bounce">
                    <ChevronDown className="h-6 w-6 text-gold/50" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 border border-gold/20">
                <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                  <ExternalLink className="h-8 w-8 text-gold/70" />
                </div>
                <h2 className="font-playfair text-2xl font-bold mb-4">Contenu Premium</h2>
                <p className="font-cormorant text-gold/80 mb-8 max-w-md">
                  Ce livre n'est pas disponible en lecture gratuite sur ce site. Accédez au livre complet sur notre
                  plateforme partenaire.
                </p>
                <Link href={book.externalLink} target="_blank" passHref>
                  <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-4 text-lg font-cormorant">
                    Accéder au livre complet
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

