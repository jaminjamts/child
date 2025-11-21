import { ScrollView, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { TitleText } from '../components/text/TitleText';
import { InformationCard } from '../components/InformationCard';

const articles = [
  {
    id: 1,
    title: 'Цэцэглэлэг',
    description: 'Булли өсвөр үе дээр сэтгэцийн эрүүл мэндийг өргөтгөгдөж...',
    imageUrl:
      'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    title: 'Аугаа цэцэглэлэг',
    description: 'Сөрөг байдлыг урьдчилан сэргийлэх арга замууд...',
    imageUrl:
      'https://images.pexels.com/photos/3807514/pexels-photo-3807514.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    title: 'Сэтгэл ойлгомжтой',
    description: 'Өөрийгөө хэрхэн хамгаалах вэ? Үндсэн сургамжууд...',
    imageUrl:
      'https://images.pexels.com/photos/3807541/pexels-photo-3807541.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    title: 'Нийгмийн сүлжээ',
    description: 'Онлайн аюулаас сэргийлэх үндсэн дүрмүүд...',
    imageUrl:
      'https://images.pexels.com/photos/3807537/pexels-photo-3807537.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function InformationScreen() {
  const handleArticlePress = (id: number) => {
    console.log('Article pressed:', id);
  };

  return (
    <ScreenContainer scrollable>
      <TitleText>Мэдээлэл</TitleText>
      {articles.map((article) => (
        <InformationCard
          key={article.id}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          onPress={() => handleArticlePress(article.id)}
        />
      ))}
    </ScreenContainer>
  );
}
