import styled from 'styled-components';

export const DrawerSpan = styled.div`
  position: fixed;
  left: 0;
  width: 15px;
  top: 0;
  bottom: 0;
  background: red;
`;

export const DrawerWrapper = styled.div`
  position: fixed;
  right: 100%;
  bottom: 0;
  top: 0;

  width: 350px;

  background: var(--content);
  box-shadow: var(--box-shadow);

  transition: all 0.2s ease-in-out;

  &.open {
    transform: translateX(100%);
  }
  &.closed {
    transform: translateX(0);
  }
`;

export const DrawerHeader = styled.header`
  padding: 12px;
  background: var(--tap);
`;

export const DrawerImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  margin-bottom: 15px;
`;

export const DrawerName = styled.h1`
  font-weight: bolder;
  font-size: 1.2em;
  color: var(--color);
  display: flex;
  align-items: center;
`;
export const Year = styled.p`
  font-weight: bolder;
  margin-left: 8px;
  padding: 0 6px;
  border-radius: 6px;
  background: var(--primary);
  color: #fff;
  font-size: 0.7em;
  &::before {
    content: '#';
  }
`;

export const DrawerJoinedIn = styled.div`
  color: var(--color-light);
  display: flex;
  align-items: center;
`;
export const DrawerIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 5px;
`;
export const DrawerJoinedText = styled.p``;
