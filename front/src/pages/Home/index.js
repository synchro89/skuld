import React, { useState, useEffect, useRef } from 'react';

import Headroom from 'react-headroom';
import MenuHamburger from 'react-menu-hamburger';

import Icon from '@/components/BoxIcon';
import Card from '@/components/Card';
import CardSkeleton from '@/components/CardSkeleton';

import kitsu from '@/utils/kitsu';
import copyToClip from '@/utils/copyToClip';

import * as S from './styles';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(null);

  const [page, setPage] = useState(2);
  const contentsPerPage = 10;
  const [offset, setOffset] = useState(20);

  const [clickAway, setClickAway] = useState({
    visible: false,
    onClick: () => {},
  });

  const [hamburger, setHamburger] = useState(null);

  const [menu, setMenu] = useState({ visible: false, data: null });
  function nextPage() {
    setPage(page + 1);
    setOffset(page * contentsPerPage);
  }

  const [header, setHeader] = useState(false);

  async function loadContent(limit, skip) {
    try {
      const response = await kitsu
        .query('anime') // anime category
        .paginationLimit(limit) // set limit
        .paginationOffset(skip) // set offset
        .sort(['user_count']) // sort by follower count and following count
        .execute(); // execute the query

      const content = JSON.parse(response);

      if (!total) setTotal(content.meta.count);

      const moreData = content.data;

      setData(data === null ? moreData : [...data, ...moreData]);

      nextPage();

      setLoading(false);
    } catch (error) {
      console.log('error :', error);
    }
  }

  function addHeaderListeners() {}
  useEffect(() => {
    loadContent(20, 0);
    addHeaderListeners();
  }, []);
  useEffect(() => {
    if (hamburger) {
      hamburger.on('open', () => {
        setHeader(true);
        setClickAway({
          visible: true,
          onClick: () => {
            hamburger.close();
          },
        });
      });
      hamburger.on('close', () => {
        setHeader(false);
      });
    }
  }, [hamburger]);
  return (
    <S.Viewport>
      <S.HeaderFullScreen className={header ? 'visible' : 'hidden'}>
        <S.GenreWrapper>
          <S.GenreSlideWrapper
            options={{ containScroll: true, dragFree: true }}
          >
            <S.GenreContainer>
              <S.GenreSlide>
                <S.GenreSlideContainer>1</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>2</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>3</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>1</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>2</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>3</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>1</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>2</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>3</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>1</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>2</S.GenreSlideContainer>
              </S.GenreSlide>
              <S.GenreSlide>
                <S.GenreSlideContainer>3</S.GenreSlideContainer>
              </S.GenreSlide>
            </S.GenreContainer>
          </S.GenreSlideWrapper>
        </S.GenreWrapper>
      </S.HeaderFullScreen>
      <S.Wrapper>
        <Headroom
          wrapperStyle={{ width: '100%' }}
          style={{ width: '100%', height: '3.75rem' }}
        >
          <S.HeaderWrapper>
            <S.HeaderContainer>
              <MenuHamburger
                menuRef={setHamburger}
                config={{
                  size: 40,
                  lineWidth: 2,
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  iconColor: '#444',
                }}
              />
            </S.HeaderContainer>
          </S.HeaderWrapper>
        </Headroom>
        <S.Container>
          <S.InfiniteScrollComponent
            dataLength={data ? data.length : 0} //This is important field to render the next data
            next={() => loadContent(contentsPerPage, offset)}
            hasMore={total ? data && data.length < total : true}
            loader={Array.from({ length: contentsPerPage }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {loading || !data
              ? Array.from({ length: contentsPerPage }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : data.map((item) => {
                  const { attributes } = item;
                  const { titles, canonicalTitle } = attributes;
                  const title = titles.en || titles.en_jp || canonicalTitle;
                  const data = {
                    src: attributes.posterImage.medium,
                    alt: title,
                    title,
                    anime: item,
                  };
                  return (
                    <Card
                      onClick={() => {
                        setMenu({
                          visible: true,
                          data: {
                            id: item.id,
                            title,
                          },
                        });
                        setClickAway({
                          visible: true,
                          onClick: () => {
                            setMenu({
                              visible: false,
                              data: null,
                            });
                          },
                        });
                      }}
                      key={item.id}
                      data={data}
                    />
                  );
                })}
          </S.InfiniteScrollComponent>
        </S.Container>
      </S.Wrapper>
      <S.MenuViewport className={menu.visible ? 'visible' : 'hidden'}>
        <S.MenuWrapper>
          <S.MenuHeaderContainer
            onClick={() => {
              setMenu({ visible: false, data: null });
              setClickAway({
                visible: false,
                onClick: () => {},
              });
            }}
          >
            <S.MenuHeader>
              <S.MenuHeaderLabel>
                {menu.data && menu.data.title}
              </S.MenuHeaderLabel>
              <Icon color="#fff" name="chevron-left" />
            </S.MenuHeader>
          </S.MenuHeaderContainer>
          <S.MenuContainer>
            <S.MenuArticle>
              <S.MenuItemWrapper>
                <Icon name="chevron-left" />
                <S.MenuItemLabel>Complete</S.MenuItemLabel>
              </S.MenuItemWrapper>
              <S.MenuItemWrapper>
                <Icon name="sun" />
                <S.MenuItemLabel>On Hold</S.MenuItemLabel>
              </S.MenuItemWrapper>
              <S.MenuItemWrapper>
                <Icon name="chevron-left" />
                <S.MenuItemLabel>Dropped</S.MenuItemLabel>
              </S.MenuItemWrapper>
              <S.MenuItemWrapper>
                <Icon name="chevron-left" />
                <S.MenuItemLabel>Current</S.MenuItemLabel>
              </S.MenuItemWrapper>
            </S.MenuArticle>
            <S.MenuDivisor />
            <S.MenuArticle>
              <S.MenuItemWrapper onClick={() => copyToClip(menu.data.title)}>
                <Icon name="chevron-left" />
                <S.MenuItemLabel>Copy Name</S.MenuItemLabel>
              </S.MenuItemWrapper>
              <S.MenuItemWrapper onClick={() => copyToClip(menu.data.title)}>
                <Icon name="search" />
                <S.MenuItemLabel>Search on Google</S.MenuItemLabel>
              </S.MenuItemWrapper>
            </S.MenuArticle>
          </S.MenuContainer>
        </S.MenuWrapper>
      </S.MenuViewport>
      <S.ClickAway
        onClick={() => {
          clickAway.onClick();
          setClickAway({
            visible: false,
            onClick: () => {},
          });
        }}
        className={clickAway.visible ? 'visible' : 'hidden'}
      />
    </S.Viewport>
  );
}

export default Home;
