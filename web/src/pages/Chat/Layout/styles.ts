import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: 144px 1fr;
  grid-template-rows: 80px auto 74px;
  grid-template-areas:
    "header header"
    "chat chat"
    "input input";
    
  @media (min-width: 800px){
    grid-template-areas:
    "header header"
    "ad chat"
    "ad input";
  }
`;
