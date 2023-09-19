"use client"

import customTheme from "@/theme/theme";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from "next/head";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        
        <ChakraProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <NextAuthProvider>{children}</NextAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
