"use client";

import PageContainer from "@/components/common/PageContainer";
import { LoginForm } from "./form";
import Header from "@/components/common/Header/header.component";
import PageTitle from "@/components/common/PageTitle";

export default function LoginPage() {
  return (
    <>
      <Header />
      <PageContainer>
        <PageTitle title="Iniciar Sesión"/>
        <LoginForm />
      </PageContainer>
    </>
  );
}
