"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("parcours")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const tabs = [
    { id: "parcours", label: "Mon parcours" },
    { id: "demarche", label: "Ma démarche" },
    { id: "influences", label: "Mes influences" },
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
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl">À propos de Soecha</h1>
            <p className="font-cormorant max-w-[900px] text-gold/80 md:text-xl/relaxed italic">
              Candide Essis SOSSOU - Chef projet digital, Psychologue du travail et Écrivaine
            </p>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="flex border-b border-gold/20 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-2 px-4 font-cormorant text-lg transition-colors ${
                    activeTab === tab.id ? "text-gold" : "text-gold/50 hover:text-gold/70"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {activeTab === "parcours" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key="parcours"
                >
                  <h2 className="font-playfair text-2xl font-bold mb-4">Mon parcours</h2>
                  <p className="font-cormorant text-gold/90 leading-relaxed text-lg">
                    Née d'une passion pour les mots et d'une curiosité insatiable pour l'esprit humain, mon parcours est
                    à l'image de ma personnalité : diversifié et en constante évolution.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    Après des études en psychologie du travail, j'ai rapidement été attirée par le monde du digital, où
                    j'ai pu mettre à profit ma compréhension des comportements humains pour concevoir des expériences
                    utilisateur intuitives et engageantes.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    Parallèlement à ma carrière professionnelle, l'écriture a toujours été mon refuge, mon laboratoire
                    d'exploration des émotions et des questionnements existentiels qui nous habitent tous.
                  </p>
                </motion.div>
              )}

              {activeTab === "demarche" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key="demarche"
                >
                  <h2 className="font-playfair text-2xl font-bold mb-4">Ma démarche littéraire</h2>
                  <p className="font-cormorant text-gold/90 leading-relaxed text-lg">
                    Mon écriture se nourrit de mes observations quotidiennes, de mes rencontres, de mes lectures et de
                    ma formation en psychologie. J'aime explorer les zones d'ombre de l'âme humaine, les non-dits, les
                    silences éloquents.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    Chaque livre est pour moi une aventure, une plongée dans l'inconnu. Je ne sais jamais vraiment où
                    mes personnages vont me mener, et c'est précisément cette incertitude qui rend le processus créatif
                    si passionnant.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    J'écris pour questionner, pour explorer, pour comprendre. Mes livres sont des invitations au voyage
                    intérieur, des miroirs dans lesquels le lecteur peut se reconnaître et, peut-être, se découvrir
                    autrement.
                  </p>
                </motion.div>
              )}

              {activeTab === "influences" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key="influences"
                >
                  <h2 className="font-playfair text-2xl font-bold mb-4">Mes influences</h2>
                  <p className="font-cormorant text-gold/90 leading-relaxed text-lg">
                    Je puise mon inspiration dans des auteurs aussi divers que Marguerite Duras pour son écriture épurée
                    et puissante, Chimamanda Ngozi Adichie pour sa capacité à entrelacer l'intime et le politique, ou
                    encore Haruki Murakami pour son art de mêler réalisme et onirisme.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    La littérature africaine contemporaine, avec ses voix multiples et sa richesse narrative, occupe
                    également une place importante dans mon univers littéraire.
                  </p>
                  <p className="font-cormorant text-gold/90 leading-relaxed mt-4 text-lg">
                    Au-delà de la littérature, je m'inspire du cinéma, des arts visuels, de la musique – tout ce qui
                    raconte des histoires, tout ce qui éveille des émotions.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="mt-12">
              <Link href="/contact" passHref>
                <Button className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-6 text-lg font-cormorant">
                  Me contacter
                  <div className="ml-2 w-6 h-[1px] bg-gold"></div>
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <div className="sticky top-32 space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/20"></div>
                <div className="relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=800&width=600"
                    alt="Soecha - Candide Essis SOSSOU"
                    className="aspect-[3/4] object-cover w-full"
                    width={600}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-primary/20"></div>
                </div>
              </div>

              <div className="p-6 border border-gold/20">
                <h3 className="font-playfair text-xl font-bold mb-4">En quelques mots</h3>
                <ul className="space-y-3 font-cormorant">
                  <li className="flex items-center">
                    <span className="w-32 text-gold/60">Nom d'autrice:</span>
                    <span className="font-medium">Soecha</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 text-gold/60">Nom complet:</span>
                    <span className="font-medium">Candide Essis SOSSOU</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 text-gold/60">Profession:</span>
                    <span className="font-medium">Chef projet digital</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 text-gold/60">Formation:</span>
                    <span className="font-medium">Psychologue du travail</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 text-gold/60">Publications:</span>
                    <span className="font-medium">6 livres</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

