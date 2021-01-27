import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.questions[0].title}</h1>
          </Widget.Header>
          <Widget.Img>
            <img src={db.questions[0].image} alt="1 answer" />
          </Widget.Img>
          <Widget.Content>
            <h2>{db.questions[0].title}</h2>

            <p>{db.questions[0].description}</p>

            <form>
              <Widget.InputContainer alternative={db.questions[0].alternatives[0]} />
              <Widget.InputContainer alternative={db.questions[0].alternatives[1]} />
              <Widget.InputContainer alternative={db.questions[0].alternatives[2]} />
              <Widget.InputContainer alternative={db.questions[0].alternatives[3]} />
              <Widget.Button>JOGAR</Widget.Button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
