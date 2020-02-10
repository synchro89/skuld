import React, { useState, useEffect, useRef } from 'react';

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

  const Container = useRef(null);

  const [page, setPage] = useState(2);
  const contentsPerPage = 10;
  const [offset, setOffset] = useState(20);

  const [menu, setMenu] = useState({ visible: false, data: null });
  function nextPage() {
    setPage(page + 1);
    setOffset(page * contentsPerPage);
  }
  async function loadContent(limit, skip) {
    try {
      const response = await kitsu
        .query('anime') // anime category
        .filter([
          {
            key: 'status',
            value: ['upcoming'],
          },
        ])
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

  useEffect(() => {
    loadContent(20, 0);
  }, [Container]);
  return (
    <S.Wrapper>
      <S.Container ref={Container}>
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
                    onClick={() =>
                      setMenu({
                        visible: true,
                        data: {
                          id: item.id,
                          title,
                        },
                      })
                    }
                    key={item.id}
                    data={data}
                  />
                );
              })}
        </S.InfiniteScrollComponent>
      </S.Container>
      <S.MenuViewport className={menu.visible ? 'visible' : 'hidden'}>
        <S.MenuWrapper>
          <S.MenuHeaderContainer
            onClick={() => setMenu({ visible: false, data: null })}
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
            </S.MenuArticle>
          </S.MenuContainer>
        </S.MenuWrapper>
      </S.MenuViewport>
      <S.MenuClickAway
        onClick={() => setMenu({ visible: false, data: null })}
        className={menu.visible ? 'visible' : 'hidden'}
      />
    </S.Wrapper>
  );
}

export default Home;
