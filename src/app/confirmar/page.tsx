import Header from "@/components/common/Header/header.component";
import { ConfirmForm } from "./form";
import { prisma } from "@/lib/prisma";
import { colors } from "@/theme/colors";

export default async function  ComfirmPage({searchParams}: any) {

  const token = searchParams.token;  
  const {success} = await validateToken(token);
  return (
    <>
      <Header />
      <section style={{background: colors.primary}} className=" min-h-screen pt-20">
          <div className="w-full bg-white md:px-8 sm:px-2 py-10">
            <ConfirmForm success={success} />
          </div>
      </section>
    </>
  );
}

const validateToken = async (token: any) => {
  
  const verificationRequest = await prisma.verificationRequest.findFirst({
    where: {
      token: token as string,
    },
  });

  if (verificationRequest && verificationRequest.userId && new Date() < verificationRequest.expires) {
     await prisma.user.update({
      where: {
        id: verificationRequest.userId,
      },
      data: {
        emailConfirmed: true,
      },
    });

    await prisma.verificationRequest.delete({
      where: {
        id: verificationRequest.id,
      },
    });

    return {success: true};
  }

  return {success: false};
};