// screens/HomeScreenEvents.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { EventService } from '@/services/EventService'; 
import { Event } from '@/models/Event';  

export default function HomeScreenEvents() {
  const [events, setEvents] = useState<Event[]>([]); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [date, setDate] = useState(''); 

  useEffect(() => {
    async function fetchData() {
      const data = await EventService.getAllEvents(); 
      setEvents(data); 
    }
    fetchData();
  }, []);

  // Função para adicionar um evento
  const handleAddEvent = async () => {
    if (name && description && location && date) {
      const newEvent: Event = {
        id: new Date().toISOString(),
        name,
        description,
        location,
        date,
      };
      
      await EventService.saveEvent(newEvent); 
      setName(''); 
      setDescription(''); 
      setLocation(''); 
      setDate(''); 
      setModalVisible(false); 
      const updatedEvents = await EventService.getAllEvents(); 
      setEvents(updatedEvents); 
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Evento</Text>
      </TouchableOpacity>

      <FlatList
        data={events}  // Passa os eventos carregados para o FlatList
        keyExtractor={item => item.id.toString()}  // A chave única para cada item (evento)
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      {/* Modal para adicionar evento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Evento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do evento"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Localização"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Data (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
              <Text style={styles.saveButtonText}>Salvar Evento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
