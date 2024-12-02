// storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar dados
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
  }
};

// Função para carregar dados
export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return null;
  }
};

// Função para remover dados
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Erro ao remover dados:", error);
  }
};
