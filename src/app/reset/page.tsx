import ResetPasswordForm  from "./form";
import Header from "@/components/common/Header/header.component";
import { prisma } from "@/lib/prisma";
export default async function ResetPasswordPage({searchParams}: any) {

  const token = searchParams.token;  
  const {success, user} = await validateToken(token);

  if (!success && !user) return <>Token no valido</>

  return (
    <>
      <Header />
      <ResetPasswordForm user={user!} token={token} />
    </>
  );
}


const validateToken = async (token: any) => {

  const verificationRequest = await prisma.verificationRequest.findFirst({
    where: {
      token: token as string,
    },
  });

  if (verificationRequest && verificationRequest.userId && new Date() < verificationRequest.expires ) {
    const user = await prisma.user.findFirst({
      where: {
        id: verificationRequest.userId
      }
    })
    return {success: true, user};
  }
   return { success: false, user: null}
};