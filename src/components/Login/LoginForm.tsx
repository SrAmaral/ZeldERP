"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormSchema = z.infer<typeof LoginFormSchema>;

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(3, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleLogin(data: LoginFormSchema) {
    if (!!data.email && !!data.password) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="flex-column flex">
        <span className="p-input-icon-left mb-4 w-full">
          <i className="pi pi-envelope"></i>
          <InputText
            id="email"
            type="text"
            className="md:w-25rem w-full"
            placeholder="Email"
            {...register("email")}
          />
        </span>
        <span className="p-input-icon-left mb-4 w-full">
          <i className="pi pi-lock"></i>
          <InputText
            id="password"
            type="password"
            className="md:w-25rem w-full"
            placeholder="Password"
            {...register("password")}
          />
        </span>
        <div className="mb-4 flex flex-wrap gap-3">
          <div>
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="mr-2"
            ></input>
            <label htmlFor="checkbox" className="text-900 mr-8 font-medium">
              Remember Me
            </label>
          </div>
          <a className="text-600 hover:text-primary transition-duration-300 ml-auto cursor-pointer cursor-pointer transition-colors">
            Reset password
          </a>
        </div>
        <Button label="Log In" type="submit" className="w-full" />
      </form>
    </div>
  );
}
