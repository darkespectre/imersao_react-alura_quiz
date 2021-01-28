/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget() {
  return (
    <Widget style={{
      fontSize: '1.4rem',
    }}
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

// eslint-disable-next-line react/prop-types
function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  return (
    <Widget>

      <Widget.Header>
        <h2>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h2>
      </Widget.Header>

      <Widget.Img>
        <img src={question.image} alt={`${questionIndex} answer`} />
      </Widget.Img>

      <Widget.Content>
        <h3>{question.title}</h3>

        <p>{question.description}</p>

        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.InputContainer alternative={alternative} alternativeId={alternativeId} />
            );
          })}

          <Widget.Button>CONFIRMAR</Widget.Button>
        </form>
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
