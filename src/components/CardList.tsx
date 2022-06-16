/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string>('');

  function handleViewImage(url: string) {
    if (url) {
      setImageUrl(url);
      onOpen();
    }
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards &&
          cards.map(card => <Card data={card} viewImage={handleViewImage} />)}
      </SimpleGrid>

      {isOpen && (
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
      )}
    </>
  );
}
