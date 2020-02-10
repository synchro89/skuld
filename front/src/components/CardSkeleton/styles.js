import styled from 'styled-components';

export const CardSkeleton = styled.article`
  border-radius: 4px;
  background: #d9d9d9;
  overflow: hidden;
  position: relative;
`;
export const CardSkeletonSpan = styled.span`
  display: block;
  background: linear-gradient(
    to right,
    transparent 0%,
    transparent 10%,
    #fff 50%,
    transparent 90%,
    transparent 100%
  );
  position: absolute;
  top: 0;
  right: 100%;
  width: 100%;
  height: 100%;

  animation-name: skeletonAnimated;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  @keyframes skeletonAnimated {
    to {
      right: 100%;
    }
    from {
      right: -100%;
    }
  }
`;

export const CardImgWrapper = styled.div`
  opacity: 0;
  height: 250px;
`;
export const CardContent = styled.div`
  opacity: 0;
  padding: 6px 12px;
`;

export const CardTitle = styled.p`
  display: block;
  padding: 6px 0;
`;

export const CardActions = styled.div`
  display: flex;
`;

export const CardIcon = styled.div``;
