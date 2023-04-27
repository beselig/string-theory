import { createClient } from "@supabase/supabase-js";

interface ApiClient {
    client?: ReturnType<typeof createClient>;
    getClient(): ReturnType<typeof createClient>;
}

class ApiClient implements ApiClient {
    getClient() {
        if (this.client) {
            return this.client;
        }
        return this.setClient();
    }
    private setClient() {
        if (!process.env.SUPABASE_KEY || !process.env.SUPABASE_URL) {
            throw new Error("incomplete env vars for supabase");
        }

        return (this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY));
    }
}

export { ApiClient };
