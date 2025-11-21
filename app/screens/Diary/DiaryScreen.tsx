import { useState, useRef } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatBubble } from '../../../components/ChatBubble';
import { Send, Star } from 'lucide-react-native';
import { DiaryMessage } from '../../../types';

type Message = DiaryMessage;

export function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
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
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleInputFocus = () => {
    // Scroll to bottom when input is focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F6E89A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}>
      <View style={[styles.headerBadge, { paddingTop: insets.top + 16 }]}>
        <Star size={20} color="#FFD700" fill="#FFD700" />
        <Text style={styles.headerText}>Сайн уу?</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -(insets.top + 60) : -10}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
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

        <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
          <TextInput
            style={styles.input}
            placeholder="Өнөөдөр хэр өдөр байвдаа..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onFocus={handleInputFocus}
            multiline
            returnKeyType="send"
            blurOnSubmit={false}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
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
    paddingTop: 16,
    paddingBottom: 16,
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

// Default export for Expo Router
export default DiaryScreen;
