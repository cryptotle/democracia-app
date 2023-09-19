export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/fiscal", "/validar", "/denuncias", ],
  // matcher: ["/((?!register|api|login).*)"],
};
