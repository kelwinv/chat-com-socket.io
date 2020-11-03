import styled from "styled-components";
import { ArrowLeft } from "../../assets/svgs";

export const Container = styled.div`
  position: absolute;
  z-index: 2;

  width: 80%;
  height: 50%;
  background: var(--input-background);
  border-radius: 6px;

  main {
    display: flex;
    padding: 2rem 0;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 90%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  border-radius: 6px;
  border-bottom: solid 3px var(--black);

  > p {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const FontConfig = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  gap: 20px;
  > p {
    font-size: 1.4rem;
  }
  select {
    background: none;
    border: solid 1px #00000040;
    width: 20%;
    border-radius: 5px;
    cursor: pointer;

    option {
      background: var(--input-background);
    }
  }
`;

export const ArrowLeftSvg = styled(ArrowLeft)``;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;

  .exitChat {
    display: flex;
    gap: 5px;
    background: none;
    color: var(--red);


    cursor: pointer;

    font-size: 1.4rem;
    font-weight: bold;
  }

  .exitConfig {
    width: 15%;
    margin: 5px 0;

    background: var(--green);
    color: var(--black);

    cursor: pointer;

    font-size: 1.4rem;
    font-weight: bold;

    border-radius: 3px;
    transition: opacity 0.4s;

    &:hover{
      opacity: 0.7;
    }
  }
`;
