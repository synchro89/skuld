import React, { useEffect, useRef } from 'react';

import Hammer from 'hammerjs';

import * as S from './styles';

function HammerWrapper(props) {
  const { children, onPanLeft, onPanRight } = props;

  console.log(props);

  const element = useRef(null);

  useEffect(() => {
    if (!element || !element.current) return;

    const elementHammer = new Hammer(element.current);

    if (onPanLeft) elementHammer.on('panleft', onPanLeft);

    if (onPanRight) elementHammer.on('panright', onPanRight);

    return () => {
      elementHammer.off('panleft', onPanLeft);
      elementHammer.off('panright', onPanRight);
    };
  });

  return <S.HammerWrapper ref={element}>{children}</S.HammerWrapper>;
}

export default HammerWrapper;
