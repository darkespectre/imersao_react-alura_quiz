import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Arrow = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    transform: rotate(180deg);
`;

export default function ArrowBack() {
  return (
    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        style={{
          width: '1.5rem',
          height: '1.5rem',
        }}
      >
        <Arrow src="/arrow.svg" />
      </a>
    </Link>
  );
}
