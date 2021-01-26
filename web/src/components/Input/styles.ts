import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;
    // o input que tiver outro antecedendo vai ter essa estilização

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
