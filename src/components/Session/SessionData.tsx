"use client";
import { SessionInterface, useSession } from "~/context/Session/useSession";

type SessionDataProps = {
  session: SessionInterface;
};

export default function SessionData({ session }: SessionDataProps) {
  const setSession = useSession((state) => state.setSession);
  setSession(session);

  return null;
}
