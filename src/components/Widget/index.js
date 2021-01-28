import styled from 'styled-components';
import React from 'react';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  color: #171B35;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1, h2, h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  height: auto;
  width: 100%;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  p {
    margin: 2rem 0;
    font-size: 1.5rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Input = styled.input`
  width: 100%;
  min-height: 3.5rem;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.mainBg};
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.tertiary};
  &[type=radio] {
    appearance: none;
    width: 100%;
    color: ${({ theme }) => theme.colors.tertiary};
    font-weight: 500;
    position: absolute;
    top: 0;
    left: 0;
  }
  &[type=radio]:checked {
    background-color: ${({ theme }) => theme.colors.quintenary};
  }
`;

Widget.Button = styled.button`
  width: 100%;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 1rem;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.contrastText};
  margin-top: 2rem;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.secondary},
                0 0 5px ${({ theme }) => theme.colors.secondary};
  }
  &:disabled {
    background-color: rgba(0,0,0,0.5);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

Widget.Img = styled.div`
  width: 100%;
  height: 15rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

// eslint-disable-next-line react/prop-types
Widget.InputContainer = function InputContainer({ alternative, alternativeId }) {
  return (
    <div style={{
      position: 'relative',
      minHeight: '3.5rem',
      padding: '.5rem 1rem',
      marginBottom: '1rem',
    }}
    >

      <label
        htmlFor={alternativeId}
        style={{
          fontSize: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {alternative}
      </label>

      <Widget.Input
        type="radio"
        name="option"
        id={alternativeId}
      />

    </div>
  );
};

export default Widget;
