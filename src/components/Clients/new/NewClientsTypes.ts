import { z } from "zod";


export type NewClientFormSchemaType = z.infer<typeof NewClientFormSchema>;

export const NewClientFormSchema = z.object({
  fantasyName: z
    .string()
    .optional(),
  companyName: z.string().min(1, { message: "Por favor digite o nome da empresa" }),
  cnpj: z.string().min(1, { message: "Por favor digite o CNPJ" }),
  cnaeDescription: z
    .string()
    .optional(),
  cnaeCode: z.string().optional(),
  openingDate: z
    .string()
    .optional(),
  address: z.object({
    streetType: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  contactNumber: z
    .string()
    .optional(),
  contactEmail: z
    .string()
    .optional(),
  contacts: z
    .array(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
      }),
    )
    .optional(),
});

export type CNPJRequestType = {
  BAIRRO: string;
  CEP: string;
  "CNAE PRINCIPAL CODIGO": string;
  ["CNAE PRINCIPAL DESCRICAO"]: string;
  CNPJ: string;
  COMPLEMENTO: string;
  ["DATA ABERTURA"]: string;
  DDD: string;
  EMAIL: string;
  LOGRADOURO: string;
  MUNICIPIO: string;
  ["NOME FANTASIA"]: string;
  NUMERO: string;
  ["RAZAO SOCIAL"]: string;
  STATUS: string;
  TELEFONE: string;
  ["TIPO LOGRADOURO"]: string;
  UF: string;
}