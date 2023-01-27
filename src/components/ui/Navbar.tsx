import Image from 'next/image';
import NextLink from 'next/link';
import { Spacer, Text, useTheme, Switch } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'


export const Navbar = () => {

   const { setTheme } = useNextTheme();
   const { isDark, theme } = useTheme();

   return (
      <div style={{
         display: 'flex',
         position: 'fixed',
         top: '0',
         zIndex: '10',
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'start',
         padding: '0 20px',
         backgroundColor: theme?.colors.gray300.value
      }}>
         <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt='App Icon'
            width={70}
            height={70}
         />
         <NextLink href='/' style={{ display: 'flex', flexDirection: 'row' }} passHref>
            <Text color={theme?.colors.text.value} h2>P</Text>
            <Text color={theme?.colors.text.value} h3>okémon</Text>
         </NextLink>
         <Spacer css={{ flex: 1 }} />
         <NextLink href='/favorites' passHref>
            <Text color={theme?.colors.text.value} h3>Favorites</Text>
         </NextLink>
         <Spacer />
         <Switch
            initialChecked
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            color='primary'
            bordered
         />
      </div>
   )
}
