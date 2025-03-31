"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

interface BookCoverProps {
  title: string
  coverImage: string
  excerpt: string
  isFree: boolean
}

export default function BookCover({ title, coverImage, excerpt, isFree }: BookCoverProps) {
  return (
    <motion.div
      className="relative group"
      whileHover={{ rotateY: 10, rotateX: 5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="w-[180px] h-[270px] md:w-[200px] md:h-[300px] relative shadow-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Book spine */}
        <div
          className="absolute left-0 top-0 w-[15px] h-full bg-gold/20 origin-left"
          style={{ transform: "rotateY(90deg) translateX(-7.5px)" }}
        ></div>

        {/* Book cover */}
        <div className="absolute inset-0 bg-primary border border-gold/30 overflow-hidden">
          <img
            src={coverImage || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full opacity-80 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/80"></div>
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="w-12 h-[1px] bg-gold/50"></div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-gold">{title}</h3>
              <p className="font-cormorant text-gold/70 text-sm mt-1 italic">{excerpt}</p>
              {isFree && (
                <div className="flex items-center mt-2 text-xs text-gold/90">
                  <BookOpen className="w-3 h-3 mr-1" />
                  <span>Extrait gratuit</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute -inset-2 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </motion.div>
  )
}

