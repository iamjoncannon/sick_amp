import React from "react";
import styled from 'styled-components'

const TransportButtonContainer = styled.button`

  width: fit-content;
  margin-bottom: 15px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    svg {
      color: greenyellow;
    }
  }

  span {
    font-size: 2rem;
    color: white;
  }
`

export default function Play(props) {
  const { handleClick } = props;

  return (
    <TransportButtonContainer onClick={() => handleClick()}>
      <span> > </span>
    </TransportButtonContainer>
  );
}
