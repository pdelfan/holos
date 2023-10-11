"use client";

import { Toaster } from "react-hot-toast";
import { Provider } from "jotai";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

function AuthProvider(props: Props) {
  const { children } = props;
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });
  }, [router, supabase.auth]);

  return <>{children}</>;
}

export default function Providers(props: Props) {
  const { children } = props;

  return (
    <AuthProvider>
      <Provider>
        <Toaster />
        {children}
      </Provider>
    </AuthProvider>
  );
}
