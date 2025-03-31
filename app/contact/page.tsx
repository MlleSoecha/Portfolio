"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

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
            <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl">Contact</h1>
            <p className="font-cormorant max-w-[900px] text-gold/80 md:text-xl/relaxed italic">
              N'hésitez pas à me contacter pour toute question ou proposition
            </p>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold">Informations de contact</h2>
              <div className="w-20 h-[1px] bg-gold/50"></div>
              <p className="font-cormorant text-gold/80 text-lg">
                Vous pouvez me contacter directement ou utiliser le formulaire ci-contre.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-gold mt-0.5" />
                <div>
                  <h3 className="font-playfair font-medium">Email</h3>
                  <p className="font-cormorant text-gold/80">contact@soecha-autrice.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-gold mt-0.5" />
                <div>
                  <h3 className="font-playfair font-medium">Téléphone</h3>
                  <p className="font-cormorant text-gold/80">+33 (0)1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-gold mt-0.5" />
                <div>
                  <h3 className="font-playfair font-medium">Adresse</h3>
                  <p className="font-cormorant text-gold/80">Paris, France</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 border border-gold/20"></div>
              <div className="relative p-6">
                <h3 className="font-playfair text-xl font-bold mb-4">Pour les professionnels</h3>
                <p className="font-cormorant text-gold/90 mb-4 text-lg">
                  Si vous êtes un éditeur, un journaliste ou un organisateur d'événements littéraires, n'hésitez pas à
                  me contacter pour :
                </p>
                <ul className="space-y-2 text-gold/80 font-cormorant">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold mr-3"></div>
                    Demandes d'interviews
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold mr-3"></div>
                    Invitations à des salons du livre
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold mr-3"></div>
                    Propositions de collaboration
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold mr-3"></div>
                    Demandes de manuscrits
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-gold/20"></div>
            <div className="relative p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full text-center p-8"
                >
                  <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                    <Mail className="h-8 w-8 text-gold" />
                  </div>
                  <h2 className="font-playfair text-2xl font-bold mb-4">Message envoyé !</h2>
                  <p className="font-cormorant text-gold/80 mb-8 text-lg">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-4 text-lg font-cormorant"
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-playfair">
                      Nom
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Votre nom"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold/60 rounded-none font-cormorant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-playfair">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold/60 rounded-none font-cormorant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-playfair">
                      Sujet
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Sujet de votre message"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-transparent border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold/60 rounded-none font-cormorant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-playfair">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Votre message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[150px] bg-transparent border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold/60 rounded-none font-cormorant"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-transparent border border-gold text-gold hover:bg-gold/10 rounded-none px-8 py-4 text-lg font-cormorant"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

