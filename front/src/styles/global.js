import { createGlobalStyle } from 'styled-components';

import colors from '@/utils/styles';

const GlobalStyle = createGlobalStyle`

  html,
  body, #root {
    height: 100%;
  }
  *{
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    font-family: 'Baloo Paaji 2', cursive;
  }
  body.dark{
    --color: rgb(214, 218, 221);
    --color-light: rgb(129, 130, 132);
    --color-transparent: rgba(214, 218, 221, .4);
    
    --content: rgb(30, 30, 30);
    --background: rgb(5, 5, 5);
    --fallback: rgba(127.5, 127.5, 127.5, 0.2);
    --tap: rgba(18, 18, 18, 0.5);
    
    --box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  }
  body.light{
    --color: rgb(35, 25, 45);
    --color-light: rgb(105, 109, 110);
    --color-transparent: rgba(35, 25, 45, .4);
    
    --content: rgb(255, 255, 255);
    --background: rgb(238, 239, 241);
    --fallback: rgba(127.5, 127.5, 127.5, 0.5);
    --tap: rgba(214, 218, 221, 0.5);

    --box-shadow: 0 2px 4px 0 rgba(14,30,37,.12);
  }

  body {
    background: var(--background);
    width: 100%;
    min-height: 100%;

    --primary: rgb(109, 45, 164);
    --secondary: rgb(191, 59, 250);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
  img {
    display: block;
  }

  ul {
    padding: 0;
    list-style: none;
  }


  a, button {
    outline: none;
  }

  /* Toast Notification */
  .toast-notification-error,
  .toast-notification-info,
  .toast-notification-success,
  .toast-notification-warning {
    display:flex;
    .toast-notification-body {
      padding: 8px 12px;
      font-size: 14px;

      &:before {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
  .toast-notification-error {
    background-color: ${colors.error};
    .toast-notification-body:before {
      content: 'Error message:';
    }
  }
  .toast-notification-info {
    background-color: ${colors.info};
    .toast-notification-body:before {
      content: 'Info message:';
    }
  }
  .toast-notification-success {
    background-color: ${colors.success};
    .toast-notification-body:before {
      content: 'Success message:';
    }
  }
  .toast-notification-warning {
    background-color: ${colors.warning};
    .toast-notification-body:before {
      content: 'Warning message:';
    }
  }
`;

export default GlobalStyle;
