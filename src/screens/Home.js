import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function Home({ navigation }) {
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setStore();
      getQuestions();
      setCurrentQuestion(0);
    }, [])
  );

  const next = async (value) => {
    const current = questionsList[currentQuestion];
    const userAnswer = {
      question: current.question
        .replace(/&quot;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&#039;/g, "`")
        .replace(/&Aring;/g, "Å"),
      isCorrect: value === current.correct_answer,
    };
    try {
      const store = await AsyncStorage.getItem("Answers");
      const results = JSON.parse(store);
      if (currentQuestion < 9) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        navigation.navigate("Result");
      }
      if (results.length < 10) {
        results.push(userAnswer);
        await AsyncStorage.setItem("Answers", JSON.stringify(results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function setStore() {
    try {
      await AsyncStorage.setItem("Answers", JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }
  const getQuestions = async () => {
    await api
      .then((response) => {
        setQuestionsList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  return (
    <Main>
      <StatusBar style="light" />
      <HeadLine>
        <CounterContainer>
          <CounterText>{currentQuestion + 1} of 10</CounterText>
        </CounterContainer>
        <CategoryContainer>
          <CategoryLabel>
            {questionsList.length > 0
              ? questionsList[currentQuestion].category
              : null}
          </CategoryLabel>
        </CategoryContainer>
      </HeadLine>

      <QuestionContainer>
        <Question>
          {questionsList.length > 0
            ? questionsList[currentQuestion].question
                .replace(/&quot;/g, '"')
                .replace(/&ldquo;/g, '"')
                .replace(/&rdquo;/g, '"')
                .replace(/&#039;/g, "`")
                .replace(/&Aring;/g, "Å")
            : null}
        </Question>
      </QuestionContainer>
      <ButtonsContainer>
        <Button onPress={() => next("True")}>
          <Label>TRUE</Label>
        </Button>
        <Button onPress={() => next("False")}>
          <Label>FALSE</Label>
        </Button>
      </ButtonsContainer>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  background: #2b3054;
  flex: 1;
`;
const HeadLine = styled.View`
  padding-left: 16px;
  margin-top: 24px;
`;
const CategoryContainer = styled.View`
  background-color: #7880ba;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 8px 16px;
  flex-direction: row;
  width: 60%;
  margin-top: 8px;
`;
const CategoryLabel = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;
const CounterContainer = styled.View`
  background-color: #1a1d32;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 8px 16px;
  width: 25%;
`;
const CounterText = styled.Text`
  color: #fff;
  font-size: 13px;
`;
const QuestionContainer = styled.View`
  padding: 16px 24px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Question = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
const ButtonsContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const Button = styled.TouchableOpacity`
  background-color: #383e6c;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 80%;
  height: 56px;
  align-self: center;
  margin-bottom: 32px;
  border-color: white;
  border-width: 1px;
`;
const Label = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 24px;
`;
