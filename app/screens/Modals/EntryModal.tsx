import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formattedDate } from '../../../utils/formatedDate';
import { DiaryEntry } from '../../../types';

type EntryModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function EntryModal({ visible, onClose }: EntryModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const selectedDate = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return onClose();

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      title,
      content,
      date: selectedDate,
      timestamp: new Date().toLocaleTimeString('mn-MN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const existing = await AsyncStorage.getItem('diaryMessages');
    const oldEntries: DiaryEntry[] = existing ? JSON.parse(existing) : [];
    const updated = [...oldEntries, newEntry];

    await AsyncStorage.setItem('diaryMessages', JSON.stringify(updated));

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.icon}>🔖</Text>
          </TouchableOpacity>

          <Text style={styles.date}>{formattedDate(new Date())}</Text>

          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.done}>Болсон</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <TextInput
          placeholder="Гарчиг"
          placeholderTextColor="#6B6B6B"
          value={title}
          onChangeText={setTitle}
          style={styles.title}
        />

        {/* Body */}
        <TextInput
          placeholder="Бичиж эхлэх..."
          placeholderTextColor="#555"
          value={content}
          onChangeText={setContent}
          style={styles.body}
          multiline
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111113',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    fontSize: 22,
    color: '#8A7BFF',
    marginRight: 10,
  },
  done: {
    color: '#8A7BFF',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 15,
  },
  body: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'top',
  },
});
