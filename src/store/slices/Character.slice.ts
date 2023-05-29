import { createSlice } from '@reduxjs/toolkit';

export interface ICharacterFavourite {
  id: string;
  name: string;
}

const characterSlice = createSlice({
  name: 'character',

  initialState: <ICharacterFavourite[]>JSON.parse(window.localStorage.getItem('favCharacter') || '[]'),
  reducers: {
    setFavouriteCharacter: (state, { payload }) => {
      const { name, id } = payload;

      const isFavouriteAlready = state.find(
        (character) => character.id === id && character.name === name,
      );

      if (isFavouriteAlready) {
        return state;
      }
      const newState = [
        ...state,
        {
          name,
          id,
        },
      ];
      window.localStorage.setItem('favCharacter', JSON.stringify(newState))
      return newState
    },
    removeFavouriteCharacter: (state, { payload }) => {
      const { name, id } = payload;
      const newState = state.filter(
        (character) => character.name !== name || character.id !== id,
      );
      window.localStorage.setItem('favCharacter', JSON.stringify(newState))
      return newState
    },
  },
});

export const { setFavouriteCharacter, removeFavouriteCharacter } = characterSlice.actions;

export default characterSlice.reducer;
