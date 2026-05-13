'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, ChevronRight, ScrollText } from 'lucide-react';
import { MILI_MUCADELE_EVENTS, HistoricalEvent } from '@/lib/events';
import Image from 'next/image';

interface TimelineProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Timeline({ isOpen, onClose }: TimelineProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-[#2D2A26]/80 backdrop-blur-sm"
          id="timeline-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-5xl h-full max-h-[90vh] bg-[#FDFBF7] archival-border flex flex-col relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D1CCC0] bg-[#F5F2ED]">
              <div className="flex items-center gap-3">
                <ScrollText className="w-6 h-6 text-[#9A1C1F]" />
                <h2 className="text-2xl font-display font-bold text-[#1A1A1A] tracking-tight">Milli Mücadele Kronolojisi</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#EAE5DD] transition-colors rounded-full"
                id="close-timeline"
              >
                <X className="w-6 h-6 text-[#5A554D]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto parchment-texture p-6 md:p-12">
              <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D1CCC0] -translate-x-1/2 hidden md:block" />

                {MILI_MUCADELE_EVENTS.map((event, index) => (
                  <TimelineItem 
                    key={index} 
                    event={event} 
                    isLeft={index % 2 === 0} 
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#D1CCC0] bg-[#F5F2ED] text-center text-[10px] uppercase tracking-widest text-[#8E887E]">
              Bağımsızlık Yolunda Atılan Adımlar — 1919 • 1923
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TimelineItem({ event, isLeft, index }: { event: HistoricalEvent; isLeft: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative mb-16 md:mb-24 flex items-center w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Circle Icon */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#9A1C1F] border-4 border-[#FDFBF7] -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="bg-white archival-border p-5 shelf-shadow transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-2 text-[#9A1C1F] mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-sans font-bold uppercase tracking-widest">{event.date}</span>
          </div>
          <h3 className="text-xl font-display font-bold mb-3 text-[#1A1A1A]">{event.title}</h3>
          
          <div className="relative aspect-video mb-4 overflow-hidden border border-[#D1CCC0]">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <p className="text-sm font-display leading-relaxed text-[#5A554D] italic">
            {event.description}
          </p>
          
          <div className="mt-4 flex justify-end">
            <div className="text-[10px] uppercase font-bold text-[#9A1C1F] flex items-center gap-1 opacity-60">
              Devamını Oku <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacing for layout */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
}
