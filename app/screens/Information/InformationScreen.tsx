import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { TitleText } from '../../../components/text/TitleText';
import { InformationCard } from '../../../components/card/InformationCard';
import { router } from 'expo-router';
import { getArticles } from '../../../lib/supabaseService';
import { Article } from '../../../types';

export function InformationScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles();
      setArticles(data || []);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('Мэдээлэл ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get description from HTML body (strip HTML tags and get first 100 characters)
  const getDescription = (htmlBody: string): string => {
    // Remove HTML tags
    const textOnly = htmlBody
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();

    if (textOnly.length <= 100) return textOnly;
    return textOnly.substring(0, 100) + '...';
  };

  if (loading) {
    return (
      <ScreenContainer scrollable>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1A3A73" />
          <Text style={styles.loadingText}>Ачааллаж байна...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer scrollable>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (articles.length === 0) {
    return (
      <ScreenContainer scrollable>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Мэдээлэл олдсонгүй</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      {articles.map((article) => (
        <InformationCard
          key={article.id}
          title={article.title}
          description={getDescription(article.body)}
          imageUrl={article.thumbnail_url || ''}
          onPress={() => {
            router.push({
              pathname: '/screens/Information/InfoDetails',
              params: { articleId: article.id },
            });
          }}
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#1A3A73',
  },
  errorText: {
    fontSize: 16,
    color: '#E9A3A7',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

// Default export for Expo Router
export default InformationScreen;
