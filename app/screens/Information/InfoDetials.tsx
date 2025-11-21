import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const InfoDetials = () => {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article ID: {articleId}</Text>
    </View>
  );
};

export default InfoDetials;

const styles = StyleSheet.create({});
