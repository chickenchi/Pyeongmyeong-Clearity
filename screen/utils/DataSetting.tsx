import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const getData = async (key: string): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? parseInt(value, 10) : 0;
  } catch (error) {
    console.error('Error retrieving data', error);
    return 0;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};
