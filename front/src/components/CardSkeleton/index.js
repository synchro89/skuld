import React from 'react';

import * as S from './styles';

export default function CardSkeleton() {
  return (
    <S.CardSkeleton>
      <S.CardSkeletonSpan />
      <S.CardImgWrapper></S.CardImgWrapper>
      <S.CardContent>
        <S.CardTitle>Lorem</S.CardTitle>
        <S.CardActions>
          <S.CardIcon>
            <div style={{ width: 24, height: 24 }}></div>
          </S.CardIcon>
        </S.CardActions>
      </S.CardContent>
    </S.CardSkeleton>
  );
}
