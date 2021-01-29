import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget style={{ animation: 'slide-left 1s linear forwards' }}>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Widget.Input
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Widget.Button disabled={name.length === 0}>
                JOGAR
              </Widget.Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget style={{ animation: 'slide-right 1s linear forwards' }}>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul style={{
              marginTop: '2rem',
            }}
            >
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      marginBottom: '.5rem',
                    }}
                    key={linkExterno}
                  >
                    <Widget.Input
                      as="a"
                      style={{
                        color: '#171B35',
                        textDecoration: 'none',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        padding: '0 1rem',
                      }}
                      href={linkExterno}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Input>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer style={{ animation: 'slide-left 1s linear forwards' }} />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/darkespectre/imersao_react-alura_quiz" />
    </QuizBackground>
  );
}
