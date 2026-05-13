'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, History, Scroll, ShieldAlert, Award, Star, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// Characters/System Prompt based on user instructions
const ATATURK_SYSTEM_PROMPT = `Sen Mustafa Kemal Atatürk'sün. Öğrencilerle Kurtuluş Savaşı dönemi hakkında konuşuyorsun.
ROLÜN:
- Öğrencilerin "Basınç" ünitesini tekrar etmesine değil, "Kurtuluş Savaşı" dönemini anlamasına yardım ediyorsun. (Not: Kullanıcı talimatında bir "Basınç" ünitesi hatası var gibi görünüyor ama asıl istenen Atatürk karakteri olduğu için Kurtuluş Savaşı'na odaklan).
- Sadece 1919-1923 dönemiyle ilgili bilgiler veriyorsun.
- Birinci şahıs ağzından konuşuyorsun ("Ben Samsun'a çıktığımda...", "Bizim amacımız bağımsızlıktı...").
- Tarihsel olarak %100 doğru bilgiler veriyorsun.
- Dönemin ruhunu, duygularını ve azmini yansıtıyorsun.

DAVRANIŞIN:
- Öğrencilere karşı sabırlı, bir öğretmen edasıyla öğretici ol.
- Karmaşık konuları (Amasya Genelgesi, Erzurum Kongresi, TBMM'nin açılışı vb.) basit ve anlaşılır anlat.
- Öğrencileri düşünmeye teşvik et.
- Her yanıtın sonunda öğrenciye mutlaka bir soru sor.

SINIRLAR:
- Sadece Kurtuluş Savaşı dönemiyle ilgili (1919-1923) konuşabilirsin.
- Konu dışı sorularda (gelecekle ilgili, modern siyaset, teknoloji vb.) şu cümleyi kullan: "Bu dönemde henüz o konuyla ilgilenmedim. Bana Kurtuluş Savaşı hakkında soru sorabilirsin."
- Tartışmalı veya siyasi konularda tarafsız kal, sadece milli mücadele idealini savun.
- MEB müfredatına (8. Sınıf İnkılap Tarihi ve Atatürkçülük) uygun bilgiler ver.

FORMAT:
- Dönemin dilini (az da olsa eski kelimeler ekleyerek ama anlaşılır kalarak) kullan.
- Önemli tarihleri (19 Mayıs 1919, 23 Nisan 1920, 30 Ağustos 1922 vb.) vurgula.
- Olayları mümkün olduğunca kronolojik bir akış içinde anlat.
- Yanıtlarını kısa ve öz tut (maksimum 3 paragraf).
- Önemli kavramları **kalın** yaz.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: ATATURK_SYSTEM_PROMPT,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMsg });
      const responseText = result.text || 'Üzgünüm, şu an bir sorun oluştu.';
      
      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', text: "Göklerdeki şimşekler kadar hızlı olsa da zihnimiz, bazen engellerle karşılaşabiliriz. Tekrar denemenizi rica ederim evlat." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Samsun'a neden çıktınız?",
    "Amasya Genelgesi neden önemli?",
    "Sakarya Meydan Muharebesi'ni anlatır mısınız?",
    "Cumhuriyet düşü ne zaman kuruldu?"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D2A26] font-sans selection:bg-[#9A1C1F]/10">
      {/* Header */}
      <header className="h-20 border-b border-[#D1CCC0] flex items-center justify-between px-6 md:px-10 bg-[#F5F2ED] z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#9A1C1F] flex items-center justify-center text-white font-bold text-xl rounded-sm">M</div>
          <h1 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#5A554D] hidden sm:block">
            Tarih Bilinci: Kurtuluş Savaşı Serisi
          </h1>
        </div>
        <div className="flex gap-4 md:gap-8 text-[9px] md:text-[11px] uppercase tracking-widest font-sans text-[#8E887E]">
          <span className="hidden md:inline">1919 - 1923 Kronolojisi</span>
          <span>Milli Mücadele Ruhu</span>
          <span className="hidden sm:inline">Gazi Mustafa Kemal</span>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Desktop Only Layout Pattern */}
        <aside className="hidden lg:flex w-[350px] border-r border-[#D1CCC0] p-10 flex-col justify-between bg-[#F9F6F2]">
          <div>
            <div className="w-full aspect-[3/4] border-4 border-double border-[#D1CCC0] p-2 mb-8 bg-white shadow-sm">
              <div className="w-full h-full bg-[#E5E1D9] flex items-center justify-center overflow-hidden grayscale contrast-125 opacity-90 relative">
                <div className="text-center px-4">
                  <div className="text-5xl mb-4 opacity-40">⚔️</div>
                  <div className="text-[10px] font-sans italic opacity-60 uppercase tracking-tighter">Temsili Arşiv Görseli: Milli Mücadele Hazırlık Safhası</div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-display font-bold mb-3 border-b border-[#9A1C1F] pb-3 text-[#1A1A1A]">Gazi Paşa ile Sohbet</h2>
            <p className="text-sm leading-relaxed opacity-80 mb-6 font-display italic">
              &quot;Ey yükselen yeni nesil, istikbal sizindir. Cumhuriyeti biz kurduk, onu yükseltecek ve yaşatacak sizsiniz.&quot;
            </p>
            <button 
              onClick={() => setMessages([])}
              className="w-full py-3 border border-[#D1CCC0] text-[10px] uppercase tracking-widest font-bold text-[#5A554D] hover:bg-[#9A1C1F] hover:text-white hover:border-[#9A1C1F] transition-all flex items-center justify-center gap-2"
            >
              <History className="w-4 h-4" /> Sohbeti Yenile
            </button>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-[#EAE5DD] border-l-4 border-[#9A1C1F] shelf-shadow transition-all hover:bg-[#e2dcd2]">
              <div className="text-[10px] font-sans uppercase font-bold text-[#9A1C1F] mb-1">Güncel Konu</div>
              <div className="text-sm font-display italic leading-tight">Millî Mücadele ve Bağımsızlık İradesi</div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-sans uppercase tracking-widest opacity-50">
              <span>Sürüm 1.9.23</span>
              <span>© 1923 Türkiye</span>
            </div>
          </div>
        </aside>

        {/* Chat Section */}
        <section className="flex-1 flex flex-col relative parchment-texture">
          <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none text-[20vw] font-bold select-none leading-none">1923</div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-8 md:p-12 space-y-12 scroll-smooth"
          >
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center"
              >
                <div className="mb-8 p-4 border border-[#D1CCC0] rounded-full">
                  <BookOpen className="w-8 h-8 text-[#9A1C1F]" />
                </div>
                <h3 className="text-3xl font-display mb-4 text-[#1A1A1A]">İstiklal Mücadelesine Hoş Geldiniz</h3>
                <p className="text-lg leading-relaxed text-[#5A554D] font-display italic mb-10 max-w-lg">
                  Ben Mustafa Kemal. Türk milletinin bağımsızlık aşkını, o zorlu ama şerefli günleri birlikte konuşalım. Hazırsan başlayalım evladım.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(s)}
                      className="px-6 py-3 bg-[#F5F2ED] border border-[#D1CCC0] text-[11px] uppercase font-sans tracking-widest font-bold text-[#5A554D] hover:bg-[#9A1C1F] hover:text-white hover:border-[#9A1C1F] transition-all text-center"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] md:max-w-xl pb-8 group ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`text-[10px] uppercase font-sans font-bold tracking-[0.2em] mb-3 flex items-center gap-2 ${
                      m.role === 'user' ? 'justify-end text-[#8E887E]' : 'text-[#9A1C1F]'
                    }`}>
                      {m.role === 'user' ? 'Siz' : <><Scroll className="w-3 h-3" /> M. Kemal Atatürk</>}
                    </div>
                    <div className={`relative ${
                      m.role === 'model' 
                        ? 'text-xl md:text-2xl font-display leading-relaxed text-[#1A1A1A] font-medium' 
                        : 'text-lg font-display italic text-[#5A554D]'
                    }`}>
                      {m.role === 'model' && i === messages.length - 1 && (
                        <span className="absolute -left-10 -top-6 text-7xl text-[#9A1C1F] opacity-10 italic pointer-events-none select-none">“</span>
                      )}
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                    {m.role === 'model' && <div className="h-[1px] w-24 bg-[#D1CCC0] mt-8"></div>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex justify-start pb-8">
                <div className="flex space-x-3 opacity-30">
                  <div className="w-2 h-2 bg-[#9A1C1F] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#9A1C1F] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 bg-[#9A1C1F] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Area */}
          <footer className="h-28 bg-white border-t border-[#D1CCC0] flex items-center px-6 md:px-12 gap-4 md:gap-8 shrink-0 z-10">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Fikrini buraya yaz evladım..."
                className="w-full h-14 border border-[#D1CCC0] rounded-full px-8 text-[#2D2A26] placeholder:text-[#8E887E] italic text-sm md:text-base bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#9A1C1F] transition-all shadow-inner"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-14 px-10 bg-[#1A1A1A] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#9A1C1F] disabled:opacity-30 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Yanıtla
            </button>
          </footer>
        </section>
      </main>
      
      {/* Visual Accent */}
      <div className="h-1.5 bg-gradient-to-r from-[#9A1C1F] via-[#D1CCC0] to-[#9A1C1F]"></div>
    </div>
  );
}
