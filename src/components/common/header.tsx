"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Você saiu da sua conta.");
            router.replace("/");
            router.refresh();
          },
          onError: (context) => {
            toast.error(context.error.message || "Não foi possível sair.");
            setIsSigningOut(false);
          },
        },
      });
    } catch {
      toast.error("Não foi possível sair. Tente novamente.");
      setIsSigningOut(false);
    }
  };

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
        <Link href="/" className="transition-colors hover:text-primary">
          Início
        </Link>
        <Link
          href="/product"
          className="transition-colors hover:text-primary"
        >
          Produtos
        </Link>
        {session?.user ? (
          <span className="text-muted-foreground">Olá, {session.user.name}</span>
        ) : (
          <Link
            href="/authentication"
            className="transition-colors hover:text-primary"
          >
            Entrar
          </Link>
        )}
        {session?.user && (
          <Button
            variant="ghost"
            size="sm"
            disabled={isSigningOut}
            onClick={handleSignOut}
          >
            <LogOutIcon />
            LogOut
          </Button>
        )}
      </nav>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Sair da conta"
                      disabled={isSigningOut}
                      onClick={handleSignOut}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};