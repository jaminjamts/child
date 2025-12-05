import { View, Text, StyleSheet } from 'react-native';
import { DiaryEntry } from '../types';
import { formattedDate } from '../utils/formatedDate';

export function ChatBubble({ title, content, date, timestamp }: DiaryEntry) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardBody}>{title}</Text>
        <Text style={styles.cardBody}>{content}</Text>

        <Text style={styles.sectionTitle}>{formattedDate(new Date(date))}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#1A3A73',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBody: { color: '#333', fontSize: 14, lineHeight: 20 },
});
