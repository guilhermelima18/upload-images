/* eslint-disable prettier/prettier */
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

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = 0 }) =>
    api.get(`/api/images?after=${pageParam}`);
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage,
  });

  const formattedData = useMemo(() => {
    const formattedImagesData = data?.pages[0].data.data;

    return formattedImagesData;
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  /* async function cadastrarImagem() {
    const params = {
      title: 'Ignite',
      description: 'Wallpaper Celular',
      url: 'https://i.ibb.co/DbfGQW5/1080x1920.png',
    };
    await api.post('/api/images', {
      ...params,
    });
   } */

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {data?.pages[0].data.after !== null && (
          <Button>
            {isFetchingNextPage
              ? 'Carregando...'
              : hasNextPage
              ? 'Carregar mais'
              : ''}
          </Button>
        )}
      </Box>
    </>
  );
}
