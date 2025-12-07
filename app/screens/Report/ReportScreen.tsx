import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { TitleText } from '../../../components/texts/TitleText';
import { RoundedButton } from '../../../components/buttons/RoundedButton';
import { InputField } from '../../../components/InputField';
import { FixedBackButton } from '../../../components/buttons/FixedBackButton';
import { ReportStep, ReportData } from '../../../types';
import { BodyText } from '../../../components/texts/BodyText';
import { saveReport } from '../../../lib/supabaseService';
import { WaveButton } from '../../../components/buttons/WaveButton';

const genders = ['Эрэгтэй', 'Эмэгтэй'];

type Step = ReportStep;

export function ReportScreen() {
  const [step, setStep] = useState<Step>(1);
  const [moodLevel, setMoodLevel] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleNext = () => {
    if (step === 3 && role === 'reporter') {
      setStep(5 as Step);
      return;
    }

    if (step < 6) {
      setStep((step + 1) as Step);
    } else {
      setStep(1);
      setMoodLevel(null);
      setActionType(null);
      setLocation(null);
      setRole(null);
      setGender('');
      setAge('');
      setSchool('');
      setPhone('');
    }
  };

  const handleSubmit = async () => {
    if (!gender || !actionType || !location || !role) {
      Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү');
      return;
    }
    if (phone && phone.length != 8) {
      Alert.alert('Утасны дугаараа шалгана уу');
      return;
    }
    setIsSubmitting(true);
    try {
      const reportData: ReportData = {
        moodLevel,
        actionType,
        location,
        role,
        gender,
        age,
        school,
        phone,
      };

      await saveReport(reportData);
      Alert.alert('Амжилттай', 'Таны мэдээлэл амжилттай илгээгдлээ', [
        {
          text: 'OK',
          onPress: () => {
            setStep(1);
            setMoodLevel(null);
            setActionType(null);
            setLocation(null);
            setRole(null);
            setGender('');
            setAge('');
            setSchool('');
            setPhone('');
          },
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Алдаа',
        'Мэдээлэл илгээхэд алдаа гарлаа. Дахин оролдоно уу.'
      );
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {step > 1 && <FixedBackButton onPress={handleBack} />}
      <ScreenContainer>
        {step === 1 && (
          <View style={styles.stepContainer}>
            <TitleText>Та мэдээллэх үү?</TitleText>
            <WaveButton
              label="Мэдээлэх"
              onPress={handleNext}
              size={250}
              color="pink"
              style={styles.largeCircleButton}
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <TitleText>Та хэн бэ?</TitleText>
            <View style={styles.buttonColumn}>
              <RoundedButton
                label="Хүүхэд"
                onPress={() => {
                  setRole('child');
                  handleNext();
                }}
                color="blue"
                size="large"
              />
              <RoundedButton
                label="Мэдээлэгч"
                onPress={() => {
                  setRole('reporter');
                  handleNext();
                }}
                color="mint"
                size="large"
              />
            </View>
          </View>
        )}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <TitleText>Дээрхлэлтийн хэлбэр?</TitleText>
            <View style={styles.buttonColumn}>
              <RoundedButton
                label="Үгээр"
                onPress={() => {
                  setActionType('Үгээр');
                  handleNext();
                }}
                color="pink"
                size="large"
              />
              <RoundedButton
                label="Биед халдах"
                onPress={() => {
                  setActionType('Биед халдах');
                  handleNext();
                }}
                color="mint"
                size="large"
              />
              <RoundedButton
                label="Цахим"
                onPress={() => {
                  setActionType('Цахим');
                  handleNext();
                }}
                color="blue"
                size="large"
              />
              <RoundedButton
                label="Сэтгэл зүйн"
                onPress={() => {
                  setActionType('Сэтгэл зүйн');
                  handleNext();
                }}
                color="darkBlue"
                size="large"
              />
            </View>
          </View>
        )}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <TitleText>Сэтгэл санаа үнэлнэ үү?</TitleText>
            <View style={styles.moodGuideContainer}>
              <BodyText center={false}>Хөнгөн 1</BodyText>
              <BodyText center={false}>Хүнд 5</BodyText>
            </View>
            <View style={styles.moodButtonsContainer}>
              {[1, 2, 3, 4, 5].map((level) => (
                <RoundedButton
                  key={level}
                  label={level.toString()}
                  onPress={() => {
                    setMoodLevel(level);
                    handleNext();
                  }}
                  color={
                    level === 1
                      ? 'mint'
                      : level === 2
                      ? 'blue'
                      : level === 3
                      ? 'yellow'
                      : level === 4
                      ? 'pink'
                      : 'darkBlue'
                  }
                  style={styles.moodButton}
                />
              ))}
            </View>
          </View>
        )}
        {step === 5 && (
          <View style={styles.stepContainer}>
            <TitleText>Хаана болсон вэ?</TitleText>
            <View style={styles.buttonColumn}>
              <RoundedButton
                label="Сургууль"
                onPress={() => {
                  setLocation('school');
                  handleNext();
                }}
                color="yellow"
                size="large"
              />

              <RoundedButton
                label="Гэр бүл"
                onPress={() => {
                  setLocation('Гэр бүл');
                  handleNext();
                }}
                color="blue"
                size="large"
              />
              <RoundedButton
                label="Олон нийтийн газар"
                onPress={() => {
                  setLocation('public');
                  handleNext();
                }}
                color="mint"
                size="large"
              />
            </View>
          </View>
        )}

        {step === 6 && (
          <View style={styles.stepContainer}>
            <TitleText>Хувийн мэдээлэл</TitleText>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Pressable
                style={styles.inputBox}
                onPress={() => setVisible(true)}
              >
                <Text style={styles.inputText}>
                  {gender ? gender : 'Хүйс сонгох'}
                </Text>
              </Pressable>
              <Modal transparent visible={visible} animationType="fade">
                <Pressable
                  style={styles.overlay}
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  <View style={styles.modalBox}>
                    <FlatList
                      data={genders}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <Pressable
                          style={styles.option}
                          onPress={() => {
                            setGender(item);
                            setVisible(false);
                          }}
                        >
                          <Text style={styles.optionText}>{item}</Text>
                        </Pressable>
                      )}
                    />
                  </View>
                </Pressable>
              </Modal>

              <InputField
                label="Нас"
                placeholder="Насаа оруулна уу"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />

              <InputField
                label="Сургууль"
                placeholder="Сургуулийн нэр"
                value={school}
                onChangeText={setSchool}
              />

              <InputField
                label="Утас"
                placeholder="Утасны дугаар /Заавал биш/"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <RoundedButton
                label={isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
                onPress={handleSubmit}
                color="darkBlue"
                size="large"
                style={{ marginTop: 20, opacity: isSubmitting ? 0.6 : 1 }}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#1A3A73" />
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonColumn: {
    gap: 16,
  },
  moodGuideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  moodButtonsContainer: {
    gap: 12,
  },
  moodButton: {
    width: '100%',
  },
  largeCircleButton: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 120,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3A73',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputBox: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
});

// Default export for Expo Router
export default ReportScreen;
