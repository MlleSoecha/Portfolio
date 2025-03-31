"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Book } from "@/lib/books"

export default function BookCarousel({ books }: { books: Book[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Visible books calculation
  const visibleBooks = 3
  const totalBooks = books.length

  // Calculate indices for visible books
  const indices = Array.from({ length: visibleBooks }, (_, i) => {
    const index = (currentIndex + i) % totalBooks
    return index
  })

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBooks)
    }, 5000)
  }

  useEffect(() => {
    if (isAutoplay) startAutoplay()

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isAutoplay, totalBooks])

  const handleNext = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setIsAutoplay(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBooks)
  }

  const handlePrev = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setIsAutoplay(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalBooks) % totalBooks)
  }

  const handleMouseEnter = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }

  const handleMouseLeave = () => {
    if (isAutoplay) startAutoplay()
  }

  return (
    <div
      className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[300px] h-[300px] border border-gold/10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate-slow"></div>
        <div
          className="absolute w-[400px] h-[400px] border border-gold/5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-rotate-slow"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-gold/30 rounded-full bg-primary-light backdrop-blur-sm hover:bg-gold/10 transition-colors"
        aria-label="Previous book"
      >
        <ChevronLeft className="w-6 h-6 text-gold" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-gold/30 rounded-full bg-primary-light backdrop-blur-sm hover:bg-gold/10 transition-colors"
        aria-label="Next book"
      >
        <ChevronRight className="w-6 h-6 text-gold" />
      </button>

      {/* Books display */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {indices.map((bookIndex, i) => {
            const book = books[bookIndex]
            // Calculate position and z-index based on position in carousel
            const isCenter = i === Math.floor(visibleBooks / 2)
            const position = i - Math.floor(visibleBooks / 2)

            return (
              <motion.div
                key={`${book.slug}-${i}`}
                custom={direction}
                initial={
                  i === 0
                    ? {
                        x: direction > 0 ? 1000 : -1000,
                        opacity: 0,
                        scale: 0.8,
                        rotateY: direction > 0 ? 45 : -45,
                      }
                    : {}
                }
                animate={{
                  x: position * 300,
                  opacity: isCenter ? 1 : 0.7,
                  scale: isCenter ? 1 : 0.8,
                  rotateY: position * 15,
                  zIndex: isCenter ? 10 : 5 - Math.abs(position),
                }}
                exit={
                  i === visibleBooks - 1
                    ? {
                        x: direction > 0 ? -1000 : 1000,
                        opacity: 0,
                        scale: 0.8,
                        rotateY: direction > 0 ? -45 : 45,
                      }
                    : {}
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute"
                style={{ perspective: 1000 }}
              >
                <Link
                  href={`/books/${book.slug}`}
                  className={`block ${isCenter ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <div className="relative group">
                    {/* Book */}
                    <div
                      className={`relative w-[250px] h-[400px] transition-all duration-300 ${
                        isCenter ? "shadow-[0_0_30px_rgba(202,174,109,0.2)]" : ""
                      }`}
                    >
                      {/* Book spine */}
                      <div
                        className="absolute left-0 top-0 w-[20px] h-full bg-gold/20 origin-left"
                        style={{ transform: "rotateY(90deg) translateX(-10px)" }}
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
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                          <div className="w-12 h-[1px] bg-gold/50"></div>
                          <div>
                            <h3 className="font-playfair text-2xl font-bold text-gold">{book.title}</h3>
                            <p className="font-cormorant text-gold-light text-lg mt-2 italic line-clamp-3">
                              {book.excerpt}
                            </p>
                            {book.status === "excerpt" && (
                              <div className="flex items-center mt-4 text-sm text-gold-light">
                                <BookOpen className="w-4 h-4 mr-2" />
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
                    <div
                      className={`absolute bottom-[-20px] left-[10%] right-[10%] h-[20px] bg-black/20 blur-md rounded-full transition-all duration-300 ${
                        isCenter ? "opacity-70" : "opacity-40"
                      }`}
                    ></div>

                    {/* Center book indicator */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute -bottom-16 left-0 right-0 text-center"
                      >
                        <div className="w-[1px] h-8 bg-gold/30 mx-auto mb-2"></div>
                        <span className="font-cormorant text-gold-light text-sm">Découvrir ce livre</span>
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (autoplayRef.current) clearInterval(autoplayRef.current)
              setIsAutoplay(false)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-gold" : "bg-gold/30"
            }`}
            aria-label={`Go to book ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

