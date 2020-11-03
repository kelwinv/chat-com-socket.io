import styled from "styled-components";

import BackGroundSvg from "../../assets/svgs/background.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  height: 100%;

  background: url(${BackGroundSvg}) center var(--primary-color);

  h1 {
    margin-bottom: 3rem;
    font-size: 3rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    width: 100%;
    max-width: 609px;
  }

  > p{
    margin-top: 2rem;
    color: var(--red);
  }

  input {
    text-align: center;
    background: var(--white);
    width: 100%;
    height: 42px;
    color: var(--primary-color);
    border-radius: 0.3rem;
    font-size: 1.4rem;
  }

  > form button {
    background: var(--primary-color);
    border: solid 3px var(--purple);
    height: 42px;
    width: 60%;
    border-radius: 0.3rem;

    color: var(--purple);
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: var(--dark-purple);
    }
  }

  > span {
    position: absolute;
    bottom: 40px;

    > a {
      color: var(--purple);
    }
  }
`;
