import React from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

export default function Welcome({ navigation }) {
  return (
    <Main>
      <StatusBar style="auto" />
      <Title>Welcome to the Trivia Challenge!</Title>
      <Text>You will be presented with 10 True or False questions.</Text>
      <Text>Can you score 100%?</Text>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Label>BEGIN</Label>
      </Button>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  background: #fff;
  flex: 1;
  padding-bottom: 10px;
`;
const Title = styled.Text`
  color: #2b3054;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  flex: 1;
  padding-top: 30px;
`;
const Text = styled.Text`
  color: #2b3054;
  text-align: center;
  font-size: 18px;
  flex: 1;
  padding-top: 10px;
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
