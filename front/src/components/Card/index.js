import React from 'react';

import MaterialIcon from 'material-icons-react';

import * as S from './styles';

export default function Card(props) {
  const { data } = props;
  const { anime, title, src, alt } = data;
  return (
    <S.CardWrapper {...props}>
      <S.CardImgWrapper>
        <S.CardImg src={src} alt={alt} />
      </S.CardImgWrapper>
      <S.CardContent>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardActions>
          <S.CardIcon>
            <MaterialIcon size="24px" icon="more_horiz" color="#999" />
          </S.CardIcon>
        </S.CardActions>
      </S.CardContent>
    </S.CardWrapper>
  );
}
