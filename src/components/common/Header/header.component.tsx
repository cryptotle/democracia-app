"use client";

import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, HStack, Hide, Image, Menu, MenuButton, MenuItem, MenuList, Show, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <header className="bg-white  sm:px-4 sm:py-4 shadow-md">
      <nav className="flex justify-between container items-center">
        
          <Link href="/" className="text-ct-dark-600 sm:text-xl md:text-2xl font-semibold">
            <HStack>
              <Image src={"./logo.png"} boxSize={'40px'} alt="Logo" />
              <Text>Democracia DAO</Text>  
            </HStack>
          </Link>
        <Show above='md'>
          <ul className="flex items-center gap-4">
            {/* <li>
              <Link href="/" className="text-ct-dark-600">
                Inicio
              </Link>
            </li> */}
            {!user && (
              <>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    <Button>Registrate</Button>
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/" className="text-ct-dark-600">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Perfil
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Desconectar
                </li>
              </>
            )}
          </ul>
        </Show>
        
        <Hide above='md'>
          <Menu>
            <MenuButton variant={'outlined'} as={Button}>
              <HamburgerIcon fontSize={'1.4rem'}/>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push('/')}>Inicio</MenuItem>
              {!user && (<>
              <MenuItem onClick={() => router.push('/login')}>Login</MenuItem>
              <MenuItem onClick={() => router.push('/register')}>Registrate</MenuItem></>)}
              {user && (<>
              <MenuItem onClick={() => router.push('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={() => signOut()}>Desconectar</MenuItem></>)}
            </MenuList>
          </Menu>
        </Hide>
      </nav>
    </header>
  );
};

export default Header;
