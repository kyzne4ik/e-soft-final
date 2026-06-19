import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  DATABASE_URL: str({
    default: "postgresql://postgres:postgres@localhost:5432/esoft_learn",
  }),
});

interface IConfig {
  DATABASE_URL: string;
}

export const Config: IConfig = {
  DATABASE_URL: env.DATABASE_URL,
};
