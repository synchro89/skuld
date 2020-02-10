import styled from 'styled-components';
import EmblaSlide from 'embla-carousel-react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const HeaderFullScreen = styled.div`
  position: fixed;
  bottom: 0;

  left: 0;
  width: 100%;

  transition: all 0.2s ease-in-out;

  background: red;

  z-index: 30;
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
  &.hidden {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const GenreWrapper = styled.div``;
export const GenreSlideWrapper = styled(EmblaSlide)``;
export const GenreContainer = styled.div`
  display: flex;
  min-width: 100%;
`;
export const GenreSlide = styled.div`
  flex: 0 0 200px;
  height: 200px;
  border-radius: 6px;
  padding: 6px;
`;
export const GenreSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  background: blue;
`;

export const Viewport = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  background: #f8f8f9;

  min-height: 100vh;
`;
export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Container = styled.main`
  padding: 2rem 0;
  width: 100%;
  max-width: 1250px;
`;

export const HeaderWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
`;
export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1250px;
  padding: 6px 1rem;
`;

export const InfiniteScrollComponent = styled(InfiniteScroll)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 155px);
  grid-gap: 8px;
  padding: 8px;
  justify-content: center;
`;

export const ClickAway = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
  transition: all 0.2s ease-in-out;
  &.visible {
    visibility: visible;
    opacity: 1;
  }
  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
`;
export const MenuViewport = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;

  z-index: 30;

  display: flex;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
  &.hidden {
    transform: translateY(100%);
    opacity: 0;
  }
`;
export const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const MenuHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  background: #3f51b5;
  justify-content: center;
`;

export const MenuHeaderLabel = styled.div`
  color: #fff;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MenuHeader = styled.div`
  padding: 1rem 2rem;
  max-width: 550px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MenuContainer = styled.div`
  width: 100%;
  max-width: 550px;
`;
export const MenuArticle = styled.article`
  padding: 0.65rem 0;
`;
export const MenuItemWrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  &:hover {
    background: #f9f9f9;
  }
`;
export const MenuItemLabel = styled.p`
  padding: 8px;
  margin-left: 8px;
`;
export const MenuDivisor = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f4f4;
`;
