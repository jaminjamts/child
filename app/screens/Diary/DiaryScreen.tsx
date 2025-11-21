import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChatBubble } from '../../../components/ChatBubble';
import { Send, Star } from 'lucide-react-native';
import { DiaryMessage } from '../../../types';

type Message = DiaryMessage;

export function DiaryScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Өнөө өдөр сайн байлаа',
      timestamp: '09:30',
      isOwn: true,
    },
    {
      id: '2',
      text: 'Найзуудтайгаа тоглосон',
      timestamp: '10:15',
      isOwn: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        timestamp: new Date().toLocaleTimeString('mn-MN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerBadge}>
        <Star size={20} color="#FFD700" fill="#FFD700" />
        <Text style={styles.headerText}>Сайн уу?</Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            timestamp={msg.timestamp}
            isOwn={msg.isOwn}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Өнөөдөр хэр өдөр байвдаа..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          activeOpacity={0.7}
        >
          <Send size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F6E89A 100%)',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    backgroundColor: '#EEDC72',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3A73',
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A3A73',
    maxHeight: 100,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A8D8C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
