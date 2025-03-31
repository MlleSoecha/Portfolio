"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import BookCarousel from "@/components/book-carousel"
import type { Book } from "@/lib/books"

// Simuler le chargement des livres depuis l'API
// Dans une vraie application, cela serait fait côté serveur
const featuredBooks: Book[] = [
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

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const [ref1, inView1] = useInView({ threshold: 0.5 })
  const [ref2, inView2] = useInView({ threshold: 0.5 })
  const [ref3, inView3] = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView1) setActiveSection(0)
    else if (inView2) setActiveSection(1)
    else if (inView3) setActiveSection(2)
  }, [inView1, inView2, inView3])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-primary text-gold overflow-hidden">
      {/* Interactive background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gold/10 blur-3xl -top-[400px] -right-[400px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl -bottom-[300px] -left-[300px]"></div>

        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-gold/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 3 + 1}px rgba(202, 174, 109, 0.3)`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="fixed w-[150px] h-[150px] rounded-full bg-gold/5 blur-xl pointer-events-none z-0"
        style={{
          left: `${mousePosition.x - 75}px`,
          top: `${mousePosition.y - 75}px`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>

      {/* Navigation indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => {
              const sections = document.querySelectorAll("section")
              sections[i].scrollIntoView({ behavior: "smooth" })
            }}
            className={`w-3 h-12 rounded-full transition-all duration-300 ${
              activeSection === i ? "bg-gold" : "bg-gold/30"
            }`}
            aria-label={`Scroll to section ${i + 1}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={ref1} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="font-playfair text-6xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none">
                  <span className="text-gold">SOECHA</span>
                </h1>
                <p className="font-cormorant max-w-[600px] text-gold-light md:text-2xl italic">Candide Essi SOSSOU</p>
                <p className="font-cormorant max-w-[600px] text-soft md:text-xl mt-4">
                  Chef projet digital · Psychologue du travail · Écrivaine
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
                <Link href="/books" passHref>
                  <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-6 text-lg font-cormorant">
                    Découvrir mes livres
                    <div className="ml-2 w-6 h-[1px] bg-gold"></div>
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center relative"
            >
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                <div className="absolute inset-0 border border-gold/30 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-2 border border-gold/20 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute inset-4 border border-gold/10 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-2 border-gold/50">
                    <img
                      src="/placeholder.svg?height=400&width=400"
                      alt="Soecha - Candide Essis SOSSOU"
                      className="object-cover w-full h-full"
                      width={400}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/40"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <p className="text-gold-light font-cormorant mb-2">Découvrir</p>
            <div className="w-[1px] h-12 bg-gold/40 animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* Books Section */}
      <section
        ref={ref2}
        className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start py-20"
      >
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="space-y-2">
              <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-gold">Mes Œuvres</span>
              </h2>
              <p className="font-cormorant max-w-[900px] text-gold-light md:text-xl/relaxed italic">
                Plongez dans mon univers littéraire
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <BookCarousel books={featuredBooks} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link href="/books" passHref>
              <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-6 text-lg font-cormorant">
                Voir tous les livres
                <div className="ml-2 w-6 h-[1px] bg-gold"></div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={ref3}
        className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start py-20"
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="text-gold">Qui est Soecha?</span>
                </h2>
                <div className="w-20 h-[1px] bg-gold/50"></div>
                <p className="font-cormorant max-w-[600px] text-soft md:text-xl leading-relaxed">
                  Chef projet digital, psychologue du travail et écrivaine passionnée, je partage mon univers à travers
                  mes écrits.
                </p>
                <p className="font-cormorant max-w-[600px] text-gold-light md:text-xl leading-relaxed">
                  Mon écriture se nourrit de mes observations quotidiennes, de mes rencontres, de mes lectures et de ma
                  formation en psychologie. J'aime explorer les zones d'ombre de l'âme humaine, les non-dits, les
                  silences éloquents.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
                <Link href="/about" passHref>
                  <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-6 text-lg font-cormorant">
                    En savoir plus
                    <div className="ml-2 w-6 h-[1px] bg-gold"></div>
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/20"></div>
                <div className="relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Soecha - Candide Essis SOSSOU"
                    className="aspect-[4/3] object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/60"></div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            <Link href="/contact" passHref>
              <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-6 text-lg font-cormorant">
                Me contacter
                <div className="ml-2 w-6 h-[1px] bg-gold"></div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

