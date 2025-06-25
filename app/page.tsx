'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Moon, Star, Gem, RefreshCw } from 'lucide-react';
import { getTodaysMessage, getAlternativeMessage, type DailyMessage } from '@/lib/oracle';
import { TypewriterText } from '@/components/TypewriterText';
import { CosmicBackground } from '@/components/CosmicBackground';

export default function Home() {
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Evitar error de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const dailyMessage = getTodaysMessage();
        setMessage(dailyMessage);
      } catch (error) {
        console.error('Error loading message:', error);
        // Fallback al primer mensaje si hay error
        setMessage({
          id: 1,
          message: "La energía del universo conspira a tu favor hoy. Cada obstáculo es una oportunidad disfrazada para crecer y expandir tu conciencia hacia nuevos horizontes de posibilidad.",
          theme: "Crecimiento Espiritual",
          category: "manifestacion"
        });
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, []);

  const handleRefresh = () => {
    if (!message || refreshing) return;
    
    setRefreshing(true);
    
    // Simular un pequeño delay para la experiencia de usuario
    setTimeout(() => {
      const alternativeMessage = getAlternativeMessage(message.id);
      setMessage(alternativeMessage);
      setHasRefreshed(true);
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      {/* Terminal Header */}
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-t-lg p-3 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-purple-400 text-sm font-mono">
                  oracle@cosmic:~$ ./tu-oraculo-de-confianza
                </span>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Obtener mensaje alternativo"
              >
                <RefreshCw className={`w-4 h-4 text-purple-400 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="text-purple-400 text-sm font-mono">
                  {refreshing ? 'Consultando...' : 'Nuevo mensaje'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Main Terminal Content */}
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-b-lg p-8 min-h-[80vh]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-400 mr-2 float-animation" />
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400">
                  Tu Oráculo de Confianza
                </h1>
                <Sparkles className="w-8 h-8 text-purple-400 ml-2 float-animation" style={{ animationDelay: '2s' }} />
              </div>
              <p className="text-purple-300 font-mono">
                {"> "}{refreshing ? 'Canalizando nueva sabiduría...' : 'Conectando con la sabiduría universal...'}
              </p>
            </div>

            {/* Date and Time Display */}
            <div className="cosmic-border mb-8">
              <div className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Moon className="w-5 h-5 text-cyan-400 mr-2" />
                  <span className="text-cyan-400 font-mono text-lg">
                    {formatDate(currentTime)}
                  </span>
                  <Star className="w-5 h-5 text-yellow-400 ml-2" />
                </div>
                <div className="text-purple-300 font-mono">
                  {isClient ? formatTime(currentTime) : '--:--:--'}
                </div>
                {hasRefreshed && (
                  <div className="text-xs text-purple-400/70 font-mono mt-2">
                    {"> "}Mensaje alternativo canalizado
                  </div>
                )}
              </div>
            </div>

            {/* Message Display */}
            <div className="cosmic-border">
              <div className="p-8">
                {loading || refreshing ? (
                  <div className="text-center">
                    <Gem className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                    <TypewriterText 
                      text={refreshing ? "Consultando los registros akáshicos para un nuevo mensaje..." : "Consultando las estrellas y decodificando los mensajes cósmicos..."} 
                      className="text-purple-300 font-mono"
                    />
                  </div>
                ) : message ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-purple-300 font-mono text-sm">
                          {message.theme}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <TypewriterText 
                        text={message.message}
                        className="text-xl leading-relaxed text-gray-100 font-light"
                        speed={50}
                        key={message.id} // Forzar re-render del typewriter
                      />
                    </div>
                    
                    <div className="text-center mt-8">
                      <div className="inline-flex items-center text-purple-400 font-mono text-sm">
                        <Star className="w-4 h-4 mr-2" />
                        Mensaje #{message.id} • {formatDate(currentTime)}
                        <Star className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-red-400 font-mono">
                    {"> "}Error: No se pudo conectar con el cosmos hoy. Intenta más tarde.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-8 border-t border-purple-500/30">
              <p className="text-purple-400 font-mono text-sm">
                {"> "}La sabiduría del universo se renueva con cada consulta
              </p>
              <div className="flex items-center justify-center mt-2 space-x-4 text-purple-300/60 text-xs font-mono">
                <span>Astrología</span>
                <Star className="w-3 h-3" />
                <span>Diseño Humano</span>
                <Star className="w-3 h-3" />
                <span>Espiritualidad</span>
              </div>
              {message && (
                <div className="mt-2 text-purple-300/40 text-xs font-mono">
                  Categoría: {message.category.replace('_', ' ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}