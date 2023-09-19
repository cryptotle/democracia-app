"use client";

import { UserDataForm } from "./UserDataForm";
import { Image, Skeleton, Stack } from "@chakra-ui/react";
import PageTitle from "../common/PageTitle";
import PageContainer from "../common/PageContainer";
import { User } from "@/types/database.types";

type Props = {
  user?: User
}

export default function Profile( {user}:Props ) {
  return (
    <PageContainer>
      <Stack alignItems="center" direction={{base:"column",md:"row"}} w="100%" justifyContent="space-between" mb="30px">
        <PageTitle title="Perfil"/>
        {/* <Image
          src={user?.image ? user.image : "/images/default.png"}
          alt={`profile photo of ${user?.name || "user"}`}
          maxW={{base:"100%",md:"120px"}}
        /> */}
      </Stack>
      <Skeleton borderRadius="6px" minH="300px" w="100%" isLoaded={user!==undefined}>
        {user && <UserDataForm user={user}/> }
      </Skeleton>
    </PageContainer>
  );
}