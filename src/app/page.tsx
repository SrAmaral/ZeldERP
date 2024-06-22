import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (  
    <>
        <div className="card text-4xl font-bold text-[--text-color] mb-12">Listagem de Clientes</div>

    </>
  );
}
