import React, { useState } from 'react';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setFavouriteCharacter,
  removeFavouriteCharacter,
} from '../../store/slices/Character.slice';
import { Container } from './styles';

interface ICardProps {
  imageUrl: string;
  name: string;
  id: string;
  type: 'characters';
  isFavourited: boolean;
}

export function Card({
  type,
  imageUrl,
  name,
  id,
  isFavourited = false,
}: ICardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavourited);
  const dispatch = useDispatch();

  function handleFavourite() {
    if (isFavourited === false) {
      if (type === 'characters') {
        dispatch(setFavouriteCharacter({ name, id }));
      }
    } else {
      if (type === 'characters') {
        dispatch(removeFavouriteCharacter({ name, id }));
      }
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <Container>
      <button type="button" onClick={() => handleFavourite()}>
        {!isFavorite ? <MdStarBorder size={32} /> : <MdStar size={32} />}
      </button>

      <img src={imageUrl} alt={`Image ${name}`} />

      <div className="card-name">
        <Link to={`/${type}/${id}`}>
          <span>{name}</span>
        </Link>
      </div>
    </Container>
  );
}
