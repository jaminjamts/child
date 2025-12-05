import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { TitleText } from '../../../components/texts/TitleText';
import { FixedBackButton } from '../../../components/buttons/FixedBackButton';
import { getArticleById } from '../../../lib/supabaseService';
import { Article } from '../../../types';
import { Image } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const InfoDetails = () => {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  // Hide header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticleById(articleId as string);
      setArticle(data);
    } catch (err) {
      console.error('Failed to load article:', err);
      setError('Мэдээлэл ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    console.log('a');

    setRefreshing(true);
    await loadArticle();
    setRefreshing(false);
  }, [articleId]);

  const handleBack = () => {
    router.back();
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
  };

  if (loading && !refreshing) {
    return (
      <ScreenContainer scrollable={false}>
        <FixedBackButton onPress={handleBack} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1A3A73" />
          <Text style={styles.loadingText}>Ачааллаж байна...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !article) {
    return (
      <ScreenContainer scrollable={false}>
        <FixedBackButton onPress={handleBack} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Мэдээлэл олдсонгүй'}</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <>
      <FixedBackButton
        onPress={handleBack}
        showBackgroundOnScroll={true}
        scrollOffset={scrollOffset}
      />
      <ScreenContainer scrollable={false}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {article.thumbnail_url && (
            <Image
              source={{ uri: article.thumbnail_url }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}
          <TitleText>{article.title}</TitleText>
          {article.category && (
            <Text style={styles.category}>Категори: {article.category}</Text>
          )}
          <View style={styles.bodyContainer}>
            <RenderHTML
              contentWidth={width - 48}
              source={{ html: article.body }}
              baseStyle={styles.htmlBase}
              tagsStyles={{
                p: {
                  marginBottom: 12,
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#333',
                },
                h1: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  color: '#1A3A73',
                },
                h2: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 14,
                  color: '#1A3A73',
                },
                h3: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 12,
                  color: '#1A3A73',
                },
                ul: { marginBottom: 12 },
                ol: { marginBottom: 12 },
                li: {
                  marginBottom: 8,
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#333',
                },
                strong: { fontWeight: 'bold', color: '#1A3A73' },
                em: { fontStyle: 'italic' },
                a: { color: '#1A3A73', textDecorationLine: 'underline' },
                blockquote: {
                  borderLeftWidth: 4,
                  borderLeftColor: '#A8D8C5',
                  paddingLeft: 16,
                  marginLeft: 0,
                  marginBottom: 12,
                  fontStyle: 'italic',
                  color: '#666',
                },
              }}
            />
          </View>
          <Text style={styles.date}>
            {article.created_at
              ? new Date(article.created_at).toLocaleDateString('mn-MN')
              : ''}
          </Text>
        </ScrollView>
      </ScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
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
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontWeight: '600',
  },
  bodyContainer: {
    marginBottom: 20,
  },
  htmlBase: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});

export default InfoDetails;
