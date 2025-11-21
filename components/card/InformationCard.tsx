import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

interface InformationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
}

export function InformationCard({
  title,
  description,
  imageUrl,
  onPress,
}: InformationCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A3A73',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
