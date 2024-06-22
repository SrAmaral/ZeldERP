"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";

export default function ButtonGoogleLogin() {
  return (
    <Button
      label="Sair do sistema"
      icon="pi pi-google"
      onClick={() => signOut()}
    />
  );
}
