export interface admin {
  adminName: string;
  adminPassword: string;
  adminSecret: string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    DB_STRING: string;
    SR_PORT: string;
    DB_NAME: string;
    JWT_SECRET: string;
  }
}

export interface movies {
  title: string;
  description: string;
  releaseDate: DateConstructor;
  actors: string;
  genre: string;
  director: string;
}
