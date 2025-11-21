import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

export function ChatBubble({ message, timestamp, isOwn = true }: ChatBubbleProps) {
  return (
    <View style={[styles.container, isOwn && styles.ownContainer]}>
      <View
        style={[
          styles.bubble,
          isOwn ? styles.ownBubble : styles.otherBubble,
        ]}>
        <Text style={[styles.text, isOwn && styles.ownText]}>
          {message}
        </Text>
      </View>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  ownBubble: {
    backgroundColor: '#A8D8C5',
  },
  otherBubble: {
    backgroundColor: '#E9E9E9',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  ownText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginHorizontal: 12,
  },
});
