import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
   children: JSX.Element,
   title?: string
}

//*Se obtiene el url que sería utilizado para definir el path absoluto para la og:image
const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({ children, title }: Props) => {

   return (
      <>
         <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name='author' content='Julián Rodríguez' />
            <meta name='description' content={`Information about Pokemon ${title}`} />
            <meta name='keywords' content={`${title}, pokemon, pokedex`} />
            <meta property="og:title" content={`Information about Pokemon ${title}`} />
            <meta property="og:description" content={`This is the page about ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
         </Head>
         <Navbar />
         <main style={{
            padding: '0px 20px',
            marginTop: '80px'
         }}>
            {children}
         </main>
      </>
   )
}