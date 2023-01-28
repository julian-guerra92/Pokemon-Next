import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
   pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

   const [isInFavorites, setIsInFavorites] = useState(false);

   useEffect(() => {
      setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
   }, [pokemon.id])


   const onToggleFavorite = () => {
      localFavorites.toggleFavorite(pokemon.id);
      setIsInFavorites(!isInFavorites);
      if (isInFavorites) return;
      confetti({
         zIndex: 99,
         particleCount: 100,
         spread: 350,
         origin: {
            x: 0.85,
            y: 0.05
         }
      })
   }

   return (
      <Layout title={`Pokemon: ${pokemon.name}`}>

         <Grid.Container css={{ marginTop: '5px' }} gap={2}>

            <Grid xs={12} sm={4}>
               <Card isHoverable css={{ padding: '30px' }}>
                  <Card.Body>
                     <Card.Image
                        src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                        alt={pokemon.name}
                        width='100%'
                        height={200}
                     />
                  </Card.Body>
               </Card>
            </Grid>

            <Grid xs={12} sm={8}>
               <Card>
                  <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                     <Text h1 transform='capitalize'>{pokemon.name}</Text>
                     <Button
                        color='gradient'
                        onPress={onToggleFavorite}
                        ghost={!isInFavorites}
                     >
                        {isInFavorites ? 'In Favorites' : 'Save in Favorites'}
                     </Button>
                  </Card.Header>
                  <Card.Body>
                     <Text size={30}>Sprites:</Text>
                     <Container direction='row' display='flex' gap={0}>
                        <Image
                           src={pokemon.sprites.front_default}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.back_default}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.front_shiny}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.back_shiny}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                     </Container>
                  </Card.Body>
               </Card>
            </Grid>

         </Grid.Container>

      </Layout>
   )
}

//*Método para la creación de los paths de las distinas páginas de la App (tener en cuenta llaves en el nombre del archivo)
export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
   return {
      paths: pokemon151.map((id) => ({
         params: { id }
      })),
      // fallback: false //*Usado para casos donde la página no exitse y se quiere regresas un código 404
      fallback: 'blocking' //*Usado para generar el contenido aunque no se encuentre construido
   }
}

//*Método para crear el contenido estático que va a ir a las props de la página que va a ser renderizada
export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { id } = params as { id: string };
   const pokemon = await getPokemonInfo(id);
      //*Se debe hacer validación de la existecia del pokemon para evitar que la aplicación rompa
   if(!pokemon) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }
   return {
      props: {
         pokemon
      },
      revalidate: 86400, //*Revalida el contenido de la paǵina en este tiempo determinado
   }
}

export default PokemonPage;
