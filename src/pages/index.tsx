/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type GetImagesResponse = {
  after: string;
  data: Image[];
};

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<GetImagesResponse> {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const formattedImagesData = data?.pages.flatMap(item => {
      return item.data.flat();
    });

    return formattedImagesData;
  }, [data]);

  if (isLoading && !isError) return <Loading />;

  if (isError && !isLoading) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Box w="100%" display="flex" mt="10">
            <Button onClick={() => fetchNextPage()}>
              {hasNextPage && !isFetchingNextPage
                ? 'Carregar mais'
                : 'Carregando...'}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
