// services/EventService.ts
import { Event } from '@/models/Event'; // Importe o tipo Event

import { saveData, loadData } from '@/storage'; // Importando as funções de storage

export const EventService = {
  // Salva um evento no AsyncStorage
  async saveEvent(event: Event): Promise<void> {
    let events: Event[] = await loadData('events');
    if (!events) events = [];

    events.push(event);
    await saveData('events', events);
  },

  // Recupera todos os eventos armazenados
  async getAllEvents(): Promise<Event[]> {
    const events = await loadData('events');
    return events || []; // Retorna um array vazio se não houver eventos
  },

  // Remove um evento específico
  async removeEvent(eventId: string): Promise<void> {
    let events: Event[] = await loadData('events');
    if (!events) return;

    events = events.filter(event => event.id !== eventId); // Remove o evento com o ID especificado
    await saveData('events', events);
  },
};
