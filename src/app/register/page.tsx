"use client";

import PageContainer from "@/components/common/PageContainer";
import { RegisterForm } from "./form";
import Header from "@/components/common/Header/header.component";
import PageTitle from "@/components/common/PageTitle";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <>
      <Header />
      <PageContainer>
        <PageTitle title="Registro de usuario"/>
        <RegisterForm email={email} />
      </PageContainer>
    </>
  );
}
