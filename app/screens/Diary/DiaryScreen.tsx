import React, { useState, useRef, useEffect, Suspense } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Send, Star } from 'lucide-react-native';
import { DiaryMessage } from '../../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';

type Message = DiaryMessage;

export function DiaryScreen() {
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('diaryMessages');

      if (value !== null) {
        setMessages(JSON.parse(value));
      }
    } catch (e) {
      console.error('Failed to load messages.', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString('mn-MN', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: true,
    };

    const key = `diaryMessages-${selectedDate}`;
    const existing = await AsyncStorage.getItem(key);
    const messagesForDate = existing ? JSON.parse(existing) : [];

    const updatedMessages = [...messagesForDate, newMessage];
    await AsyncStorage.setItem(key, JSON.stringify(updatedMessages));

    setMessages(updatedMessages);
    setInputText('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleInputFocus = () => {
    // Scroll to bottom when input is focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const loadMessagesForDate = async (date: string) => {
    const value = await AsyncStorage.getItem(`diaryMessages-${date}`);
    setMessages(value ? JSON.parse(value) : []);
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F6E89A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <ScreenContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -insets.top : -10}
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
            <View>
              <Suspense fallback={<Text>Loading...</Text>}>
                {/* <Calendar
                  onDayPress={handleDayPress}
                  markedDates={markedDates}
                /> */}
              </Suspense>
            </View>
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
              onFocus={handleInputFocus}
              multiline
              returnKeyType="send"
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
      </ScreenContainer>
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

  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3A73',
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
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
