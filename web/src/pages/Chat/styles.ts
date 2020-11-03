import styled from "styled-components";

import { SendMessageIcon } from "../../assets/svgs";
import { ThreeDots} from "../../assets/svgs/";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  background: var(--primary-color);
`;

export const UserNameContainer = styled.div`
  display: none;

  width: 144px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: solid 1px var(--black);

  > p {
    color: var(--users-on-color);
  }

  @media (min-width: 800px) {
    display: flex;
  }
`;

export const Header = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 5%;
    width: 50%;
    list-style: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    gap: 5px;

    color: var(--users-on-color);
  }
`;

export const DotsSvg = styled(ThreeDots)``

export const DotsButton = styled.button`
  margin-right: 2rem;
  height: 70%;

  background: transparent;
  cursor: pointer;
`

export const AdContainer = styled.div`
  display: none;

  grid-area: ad;
  background: var(--black);

  @media (min-width: 800px) {
    display: initial;
  }
`;

export const ChatContainer = styled.div`
  grid-area: chat;
  position: relative;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;

  flex: 1;
  background: var(--chat-background);
  padding: 20px 0;
  overflow-y: auto;
`;

export const InputForm = styled.form`
  grid-area: input;

  display: flex;
  align-items: center;
  justify-content: space-around;

  background: var(--input-background);

  > input {
    background: var(--chat-background);

    height: 60%;
    width: 90%;

    padding-left: 20px;
    border-radius: 8px;

    font-size: 1rem;
  }

  > button {
    background: transparent;
    cursor: pointer;
  }
`;

export const MessageIcon = styled(SendMessageIcon)``;

export const MessageBox = styled.div`
  margin: 20px 20px 0;

  &.thisUser {
    display: flex;
    justify-content: flex-end;
  }
`;

export const MessageContante = styled.div`
  display: flex;
  flex-direction: column;

  background: var(--massage-color);
  max-width: 30%;
  min-width: 74px;
  overflow-wrap: break-word;
  padding: 5px 10px;
  border-radius: 8px;

  &.thisUser {
    background: var(--dark-green);
    justify-self: flex-end;
  }
`;

export const AuthorMessage = styled.div`
  color: var(--purple);

  &.thisUser {
    display: none;
  }
`;

export const Message = styled.p``;

export const Alert = styled.div`
  position: fixed;

  top: 88px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;

  margin: auto;
  width: 30%;

  background: var(--red);
  color: var(--white);

  border-radius: 4px;

  animation: fade-in 2s ease-in forwards;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
