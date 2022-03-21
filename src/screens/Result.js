import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Result({ navigation }) {
  const [answers, setAnswers] = useState([]);
  const [corrects, setCorrects] = useState(0);

  useEffect(() => {
    async function getStore() {
      try {
        const store = await AsyncStorage.getItem("Answers");
        const results = JSON.parse(store);
        const totalCorrect = results.filter(
          (item) => item.isCorrect === true
        ).length;
        setAnswers(results);
        setCorrects(totalCorrect);
      } catch (error) {
        console.log(error);
      }
    }
    getStore();
  }, []);

  return (
    <Main>
      <StatusBar style="light" />
      <Title>You scored {corrects}/10</Title>
      <ResultsContainer>
        {answers.length > 0
          ? answers.map((item, index) => (
              <Card key={index}>
                <Text>{item.question}</Text>
                {item.isCorrect ? (
                  <CorrectContainer>
                    <ResultLabel>Correct</ResultLabel>
                  </CorrectContainer>
                ) : (
                  <IncorrectContainer>
                    <ResultLabel>Incorrect</ResultLabel>
                  </IncorrectContainer>
                )}
              </Card>
            ))
          : null}
      </ResultsContainer>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Label>PLAY AGAIN?</Label>
      </Button>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  background: #2b3054;
  flex: 1;
`;
const Title = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
`;
const Button = styled.TouchableOpacity`
  background-color: #2b3054;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  width: 338px;
  height: 48px;
  align-self: center;
`;
const Label = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 24px;
`;
const ResultsContainer = styled.ScrollView`
  margin-top: 24px;
`;
const Card = styled.View`
  background-color: #383e6c;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 95%;
  align-self: center;
  margin-bottom: 16px;
  border-color: white;
  border-width: 1px;
  padding: 16px 8px;
`;
const Text = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

const CorrectContainer = styled.View`
  background-color: #3ce08b;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 4px 12px;
  flex-direction: row;
  align-self: flex-end;
  margin-top: 8px;
`;
const IncorrectContainer = styled.View`
  background-color: #ff6680;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 4px 12px;
  flex-direction: row;
  align-self: flex-end;
  margin-top: 8px;
`;

const ResultLabel = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;
