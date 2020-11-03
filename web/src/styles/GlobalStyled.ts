import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto',sans-serif;
    color: var(--white);
    font-size: 14px;
  }

  html, body, #root{
    max-height: 100vh;
    max-width: 100vw;
    
    height: 100%;
    width: 100%;
  }

  *, input, button{
    border: none;
  }

  :root{
    --primary-color: #2F2F2F;
    --dark-purple: #3A303F;
    --purple: #B745F6;
    --input-background: #363636;
    --users-on-color: #D0D0D0;
    --chat-background: #1E2428;
    --massage-color: #262D31;
    --black: #0F0F0F;
    --white: #F5F5F5;
    --dark-green: #054740;
    --green: #61FE7A;
    --red: #EA3F3F;
  }
`