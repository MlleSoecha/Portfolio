"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
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
  {
    id: "metamorphoses",
    title: "Métamorphoses",
    slug: "metamorphoses",
    cover: "/images/covers/metamorphoses.jpg",
    coverPlaceholder: "/placeholder.svg?height=400&width=300",
    excerpt: "Les transformations inévitables qui façonnent nos destins.",
    contentFile: null,
    status: "premium",
    externalLink: "https://exemple.com/livres/metamorphoses",
    publishedAt: "2023-08-05",
  },
]

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const results = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "excerpt" && book.status === "excerpt") ||
        (selectedCategory === "premium" && book.status === "premium")
      return matchesSearch && matchesCategory
    })
    setFilteredBooks(results)
  }, [searchTerm, selectedCategory])

  const categories = [
    { id: "all", name: "Tous" },
    { id: "excerpt", name: "Extraits gratuits" },
    { id: "premium", name: "Livres complets" },
  ]

  return (
    <div className="min-h-screen bg-primary text-gold pt-32 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl">Mes Livres</h1>
            <p className="font-cormorant max-w-[900px] text-gold-light md:text-xl/relaxed italic">
              Découvrez l'ensemble de mes œuvres littéraires
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/50 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher un livre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-transparent border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold/60 rounded-none"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-gold/10 text-gold border border-gold/30"
                      : "bg-transparent text-gold/60 border border-gold/10 hover:border-gold/30"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex justify-center"
              >
                <Link href={`/books/${book.slug}`}>
                  <div className="relative group">
                    {/* Book */}
                    <div className="relative w-[180px] h-[270px] md:w-[200px] md:h-[300px] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(202,174,109,0.2)] group-hover:translate-y-[-5px]">
                      {/* Book spine */}
                      <div
                        className="absolute left-0 top-0 w-[15px] h-full bg-gold/20 origin-left"
                        style={{ transform: "rotateY(90deg) translateX(-7.5px)" }}
                      ></div>

                      {/* Book cover */}
                      <div className="absolute inset-0 bg-primary border border-gold/30 overflow-hidden">
                        <img
                          src={book.coverPlaceholder || "/placeholder.svg"}
                          alt={book.title}
                          className="object-cover w-full h-full opacity-90 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/90"></div>

                        {/* Book content */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="w-12 h-[1px] bg-gold/50"></div>
                          <div>
                            <h3 className="font-playfair text-xl font-bold text-gold">{book.title}</h3>
                            <p className="font-cormorant text-gold-light text-sm mt-1 italic line-clamp-3">
                              {book.excerpt}
                            </p>
                            {book.status === "excerpt" && (
                              <div className="flex items-center mt-2 text-xs text-gold-light">
                                <BookOpen className="w-3 h-3 mr-1" />
                                <span>Extrait gratuit</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Book shadow */}
                    <div className="absolute bottom-[-10px] left-[10%] right-[10%] h-[10px] bg-black/20 blur-md rounded-full transition-all duration-300 group-hover:opacity-70 group-hover:bottom-[-15px]"></div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="font-cormorant text-gold/70 text-xl">Aucun livre ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

