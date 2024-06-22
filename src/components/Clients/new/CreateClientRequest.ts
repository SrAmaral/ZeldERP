'use server';
import { api } from "~/trpc/server";
import { type NewClientFormSchemaType } from "./NewClientsTypes";

export async function CreateClientRequest(data: NewClientFormSchemaType) {
  try {
    // console.log(data)
    await api.zen.client.create({
      data: {
        ...data,
      }
    });
    // await db.client.create({
    //   data: {
    //     ...data,
    //   },
    // });
    // return response;
  } catch (error) {
    console.log(error);
  }
}