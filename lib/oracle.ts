import messagesData from '@/data/messages.json';

export interface DailyMessage {
  id: number;
  message: string;
  theme: string;
  category: string;
}

// Función para generar un número pseudo-aleatorio basado en la fecha y hora
function getDateSeed(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = Math.floor(date.getMinutes() / 10); // Cambiar cada 10 minutos
  
  // Crear un seed único basado en la fecha y hora
  return (year * 100000000) + (month * 1000000) + (day * 10000) + (hour * 100) + minute;
}

// Función para generar múltiples números pseudo-aleatorios a partir de un seed
function seededRandom(seed: number, index: number = 0): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

export function getTodaysMessage(): DailyMessage {
  const today = new Date();
  const seed = getDateSeed(today);
  
  // Usar el seed para seleccionar un mensaje de forma determinística
  const messageIndex = Math.floor(seededRandom(seed) * messagesData.messages.length);
  
  return messagesData.messages[messageIndex];
}

// Nueva función: Mensaje con variación por momento del día
export function getMomentMessage(): DailyMessage {
  const now = new Date();
  const seed = getDateSeed(now);
  
  // Usar el seed completo con hora para más variación
  const messageIndex = Math.floor(seededRandom(seed) * messagesData.messages.length);
  
  return messagesData.messages[messageIndex];
}

// Nueva función: Mensaje con seed personalizado (para diferentes lecturas)
export function getPersonalizedMessage(personalSeed: string = ''): DailyMessage {
  const now = new Date();
  const baseSeed = getDateSeed(now);
  
  // Combinar seed de fecha con un factor personal
  let combinedSeed = baseSeed;
  if (personalSeed) {
    for (let i = 0; i < personalSeed.length; i++) {
      combinedSeed += personalSeed.charCodeAt(i);
    }
  }
  
  const messageIndex = Math.floor(seededRandom(combinedSeed) * messagesData.messages.length);
  
  return messagesData.messages[messageIndex];
}

// Función para obtener un mensaje específico por ID (útil para testing)
export function getMessageById(id: number): DailyMessage | undefined {
  return messagesData.messages.find(msg => msg.id === id);
}

// Función para obtener todos los mensajes (útil para administración)
export function getAllMessages(): DailyMessage[] {
  return messagesData.messages;
}

// Función para obtener mensajes por categoría
export function getMessagesByCategory(category: string): DailyMessage[] {
  return messagesData.messages.filter(msg => msg.category === category);
}

// Función para obtener un mensaje aleatorio diferente al actual (para refresh inteligente)
export function getAlternativeMessage(currentMessageId: number): DailyMessage {
  const today = new Date();
  const seed = getDateSeed(today);
  
  // Filtrar el mensaje actual
  const availableMessages = messagesData.messages.filter(msg => msg.id !== currentMessageId);
  
  // Si solo hay un mensaje, devolver el mismo
  if (availableMessages.length === 0) {
    return messagesData.messages[0];
  }
  
  // Usar un seed modificado para obtener un mensaje diferente
  const alternativeIndex = Math.floor(seededRandom(seed, 1) * availableMessages.length);
  
  return availableMessages[alternativeIndex];
}