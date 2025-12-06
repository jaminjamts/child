import React, { useState, useRef, useEffect, Suspense } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatBubble } from '../../../components/ChatBubble';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlusIcon, Send, Star } from 'lucide-react-native';
import { ScreenContainer } from '../../../components/ScreenContainer';
import EntryModal from '../Modals/EntryModal';
import { DiaryEntry } from '../../../types';

export function DiaryScreen() {
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>(null);
  const [open, setOpen] = useState(false);
  const [dairy, setDairy] = useState<DiaryEntry[]>([]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('diaryMessages');

      if (value !== null) {
        setDairy(JSON.parse(value));
      }
    } catch (e) {
      console.error('Failed to load messages.', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteAsyncStroge = async () => {
    try {
      await AsyncStorage.removeItem('diaryMessages');
      console.log('AsyncStorage item deleted successfully');
    } catch (error) {
      console.error('Error deleting AsyncStorage item:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [dairy]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F6E89A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <ScreenContainer>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <View>
            <Suspense fallback={<Text>Loading...</Text>}></Suspense>
          </View>
          {/* <View>
            <Button onPress={() => deleteAsyncStroge()} title="Clear" />
          </View> */}

          {dairy.map((data) => (
            <View key={data.id}>
              <ChatBubble
                id={data.id}
                title={data.title}
                content={data.content}
                date={data.date}
                timestamp={data.timestamp}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.inputContainer}
        >
          <PlusIcon />
        </TouchableOpacity>
        <EntryModal visible={open} onClose={() => setOpen(false)} />
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
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: '#888',
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
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

export default DiaryScreen;
