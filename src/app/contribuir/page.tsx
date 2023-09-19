"use client";
import Header from "@/components/common/Header/header.component";
import styles from "./page.module.scss"; // Importa los estilos CSS Modules
import Image from "next/image";
import { Button, Stack, VStack } from "@chakra-ui/react";
import CopyToClipboardButton from "@/components/common/CopyToClipoardButton";
import { colors } from "@/theme/colors";
import Link from "next/link";

export default function Contribuir() {
  const donationAddress = process.env.DONATION_ADDRESS || "0x000000";
  return (
    <>
      <Header />
      <section style={{background: colors.primary}} className="min-h-screen md:p-20">
        <div className={styles.settings}>
          <div className="max-w-4xl mx-auto bg-ct-dark-100 py-5 px-10 md:rounded-md flex justify-between space-x-4">
            
            <Stack direction={{base: 'column', md:"row"}} spacing={5}>
              <div>
                <p className="mb-3 pt-5 text-4xl text-start font-semibold">
                  Contribute
                </p>
                <p className="text-center">
                  <b>Send only ETH on ethereum mainnet</b>
                </p>
              </div>
              <VStack spacing={5} align="stretch">
                <Button
                  as="a"
                  href={`https://metamask.app.link/send/pay-${donationAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="blue">
                    Open Metamask
                </Button>
                <Image 
                  src={"/images/donation-address.png"}
                  width={500}
                  height={500}
                  alt="Donation Address"/>
                <CopyToClipboardButton textToCopy={donationAddress} > Copy deposit address</CopyToClipboardButton>
              </VStack>
              <p>
                  You will be depositing ETH in an ERC4626 smart contract. 
                  You will receive DDAO tokens as receipt / Depositará ETH en un contrato inteligente ERC4626.
                  Recibirá DDAO tokens como recibo.
                </p>  
            </Stack>

           
          </div>
        </div>
      </section>
    </>
  );
}
