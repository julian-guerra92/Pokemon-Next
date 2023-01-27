
import { useState, useEffect } from 'react';
import { Grid } from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { SmallPokemon, Pokemon } from '../../interfaces';
import { pokeApi } from '../../api';
import { PokemonCard } from '../../components/pokemon';

const FavoritesPage = () => {

   const [favoritePokemons, setFavoritePokemons] = useState<SmallPokemon[]>([]);

   const getFavoritePokemons = (idPokemons: number[]) => {
      const pokemons = idPokemons.map(async (id) => {
         const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
         return {
            name: data.name,
            id,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
         }
      })
      return pokemons;
   }

   useEffect(() => {
      const idFavoritePokemons: number[] = localFavorites.pokemons()
      Promise
         .all(getFavoritePokemons(idFavoritePokemons))
         .then(result => setFavoritePokemons(result));
   }, []);

   return (
      <Layout title="Favorites Pokémons">
         {
            favoritePokemons.length === 0
               ? (<NoFavorites />)
               : (
                  <Grid.Container gap={2} direction='row' justify='flex-start'>
                     {
                        favoritePokemons.map((pokemon) => (
                           <PokemonCard pokemon={pokemon} key={pokemon.id} />
                        ))
                     }
                  </Grid.Container>
               )
         }
      </Layout>
   )
}

export default FavoritesPage;