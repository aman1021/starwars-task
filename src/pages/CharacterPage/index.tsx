import React, { useCallback, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { Loading } from "../../components/Loading";
import { useCharacter } from "../../hooks/useCharacter";
import { api } from "../../services/api";
import { Character } from "../../types/Character.type";
import { CharacterContainer, Container } from "./styles";

export default function CharacterPage() {
  const [data, setData] = useState<Character>();
  const {
    films,
    homeWorld,
    isLoading: isLoadingCharacter,
  } = useCharacter(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/people/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CharacterContainer>
          <div className="character-data">
            <div className="character-data-details">
              <h1>{data?.name}</h1>
              <p>
                Home Planet: <span>{homeWorld.name}</span>
              </p>

              <p>
                Date of birth: <span>{data?.birth_year}</span>
              </p>

              <p>
                Gender: <span>{data?.gender}</span>
              </p>

              <p>
                Height: <span>{data?.height} cm</span>
              </p>

              <p>
                Weight: <span>{data?.mass} kg</span>
              </p>

              <p>
                Skin color: <span>{data?.skin_color}</span>
              </p>

              <p>
                Eye Color: <span>{data?.eye_color}</span>
              </p>

              <p>
                Hair color: <span>{data?.hair_color}</span>
              </p>
            </div>

            <div className="character-data-others">
              {isLoadingCharacter ? (
                <Loading />
              ) : (
                <>
                  <div className="character-data-others-data">
                    <h2>Films</h2>
                    <ul>
                      {films.map((film, index) => (
                        <li key={index}>
                          <MdMovie />
                          {film.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="character-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={` ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
