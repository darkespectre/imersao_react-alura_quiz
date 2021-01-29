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
import AlternativesForm from '../src/components/AlternativesForm';
import LoadingWidget from '../src/components/LoadingWidget';
import ArrowLink from '../src/components/ArrowLink';

function Loading() {
  return (
    <Widget style={{
      fontSize: '1.4rem',
      fontWeight: '600',
    }}
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <LoadingWidget />
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
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>

      <Widget.Header>
        <div style={{ marginRight: '2rem' }}>
          <ArrowLink />
        </div>
        <h2>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h2>
      </Widget.Header>

      <Widget.Img>
        <img src={question.image} alt={`${questionIndex} answer`} />
      </Widget.Img>

      <Widget.Content>
        <h3>{question.title}</h3>

        <p>{question.description}</p>

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setSelectedAlternative(undefined);
            setIsQuestionSubmited(false);
          }, 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.InputContainer
                key={alternativeId}
                alternative={alternative}
                alternativeId={alternativeId}
                onChange={() => setSelectedAlternative(alternativeIndex)}
                dataSelected={isSelected}
                dataStatus={isQuestionSubmited && alternativeStatus}
              />
            );
          })}

          <Widget.Button disabled={!hasAlternativeSelected}>CONFIRMAR</Widget.Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ name }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [results, setResults] = React.useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
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
    <QuizBackground backgroundImage={db.bg} style={{ marginBottom: '3rem' }}>
      <QuizContainer style={{ animation: 'slide-down 1s linear forwards' }}>
        <QuizLogo />

        {screenState === screenStates.LOADING && <Loading />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.RESULT && <Widget.Results results={results} name={name} />}

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;

  return {
    props: { name },
  };
}
