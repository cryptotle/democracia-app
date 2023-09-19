export interface User {
  id: string;
  name: string;
  email?: string | null;
  wallet?: string | null;
  password?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account[];
  sessions: Session[];
  denuncias: Denuncias[];
  fiscales: Fiscales[];
}

export interface Account {
  id: string;
  userId: string;
  type?: string | null;
  provider: string;
  providerAccountId: string;
  token_type?: string | null;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  scope?: string | null;
  id_token?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Session {
  id: string;
  userId?: string | null;
  sessionToken: string;
  accessToken?: string | null;
  expires: Date;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Denuncias {
  id: string;
  userId: string;
  nroMesa: number;
  distrito: number;
  seccion: number;
  circ: number;
  pregunta1: string;
  pregunta2: string;
  pregunta3: string;
  imagen_url?: string | null;
  user: User;
}

export interface Fiscales {
  id: string;
  userId: string;
  dni: number;
  idPartido: string;
  foto_dni?: string;
  fiscalizado: boolean;
  foto_poder_fiscal_url?: string | null;
  foto_selfie_mesa_url?: string | null;
  nroMesa?: number | null;
  distrito?: number | null;
  seccion?: number | null;
  circ?: number | null;
  colegio?: string | null;
  partido: Partido;
  user: User;
}

export interface Partido {
  id: string;
  name: string;
  desc: string;
  Fiscales: Fiscales[];
}

export interface Colegio {
  juri: string;
  loc: string;
  codloc: string;
  cueanexo: string;
  name: string;
  dom: string;
  cp: string;
}