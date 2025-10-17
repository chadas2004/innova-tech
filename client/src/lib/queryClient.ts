import { QueryClient, QueryFunction } from "@tanstack/react-query";

// ➤ Fonction qui lève une erreur si la réponse n’est pas OK
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * ➤ apiRequest : Effectue une requête HTTP et retourne automatiquement la réponse JSON (déjà parsée)
 * @param url URL de l’API (ex: "/api/features")
 * @param method Méthode HTTP (GET, POST, etc.)
 * @param data Données à envoyer (pour POST, PATCH…)
 * @returns Résultat JSON typé (ou générique)
 */
export async function apiRequest<T = any>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  data?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Inclut les cookies si nécessaires
  });

  await throwIfResNotOk(res);
  return res.json();
}

// ➤ Fonction utilitaire pour les requêtes React Query (avec gestion de 401)
type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null as any;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// ➤ Configuration du client React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
