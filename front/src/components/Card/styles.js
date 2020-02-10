import styled from 'styled-components';

export const CardWrapper = styled.article`
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 5px #f1f1f1;
  transition: all 0.1s ease-in-out;
  &:hover {
    filter: brightness(96%);
    transform: scale(0.98);
  }
`;
export const CardRating = styled.div`
  padding: 6px 1rem;
  background: lightgrey;
`;

export const CardImgWrapper = styled.div`
  height: 250px;
`;
export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
export const CardContent = styled.div`
  padding: 6px 12px;
`;

export const CardTitle = styled.p`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 6px 0;
  color: #999;
`;

export const CardActions = styled.div`
  display: flex;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const CardIcon = styled.div``;
