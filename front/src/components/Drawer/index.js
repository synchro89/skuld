import React, { useState } from 'react';

import _ from 'lodash';

import { Award } from '@styled-icons/boxicons-solid/Award';

import { useSelector } from 'react-redux';

import Hammer from '../Hammer';

import * as S from './styles';

import getMonth from './getMonthName';

import routesEnum from '@/routes/enum';

function Drawer() {
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user.data);

  const joinedIn = new Date(user.createdAt);

  function handlePanRight() {
    if (open) return;
    setOpen(true);
  }
  function handlePanLeft() {
    if (!open) return;
    setOpen(false);
  }
  return (
    <>
      <Hammer onPanRight={_.throttle(handlePanRight, 50)}>
        <S.DrawerSpan />
      </Hammer>
      <Hammer onPanLeft={_.throttle(handlePanLeft, 50)}>
        <S.DrawerWrapper className={open ? 'open' : 'closed'}>
          <S.DrawerHeader>
            <S.DrawerImage src={user.photo.url} alt={user.name} />
            <S.DrawerName>
              {user.name}
              <S.Year>{joinedIn.getFullYear()}</S.Year>
            </S.DrawerName>
            <S.DrawerJoinedIn>
              <S.DrawerIcon>
                <Award />
              </S.DrawerIcon>
              <S.DrawerJoinedText>
                Joined {getMonth(joinedIn.getMonth())} {joinedIn.getDate()},{' '}
                {joinedIn.getFullYear()}
              </S.DrawerJoinedText>
            </S.DrawerJoinedIn>
          </S.DrawerHeader>
        </S.DrawerWrapper>
      </Hammer>
    </>
  );
}

export default Drawer;
