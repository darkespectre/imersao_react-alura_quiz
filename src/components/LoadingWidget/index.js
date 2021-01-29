import styled from 'styled-components';
import React from 'react';

const Loading = styled.img`
  width: 7rem;
  transition: 1s;
  transform: rotate(360deg);
  filter: hue-rotate(200deg);
  animation: animate 2s linear infinite;
`;

export default function LoadingWidget() {
  return (
    <Loading src="/loading.svg" />
  );
}
