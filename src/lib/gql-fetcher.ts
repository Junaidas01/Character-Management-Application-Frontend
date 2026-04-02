type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export function gqlFetcher<Data, Variables extends Record<string, unknown>>(
  document: string,
  variables?: Variables,
): () => Promise<Data> {
  return async () => {
    const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    if (!url) {
      throw new Error("NEXT_PUBLIC_GRAPHQL_URL is not set");
    }

    const body: { query: string; variables?: Variables } = { query: document };
    if (variables && Object.keys(variables).length > 0) {
      body.variables = variables;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = (await res.json()) as GraphQLResponse<Data>;

    if (!res.ok) {
      throw new Error(`GraphQL HTTP ${res.status}`);
    }
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }
    if (json.data === undefined) {
      throw new Error("GraphQL response had no data");
    }

    return json.data;
  };
}
