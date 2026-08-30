export interface ExternalItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export async function fetchExternal(
  source: "products" | "news"
): Promise<ExternalItem[]> {
  try {
    if (source === "products") {
      const response = await fetch("https://fakestoreapi.com/products?limit=8", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const items = await response.json();

      return (Array.isArray(items) ? items : []).map((product: any) => ({
        id: String(product.id),
        title: product.title,
        subtitle: `$${product.price} • ${product.category}`,
        image: product.image,
      }));
    }

    const response = await fetch(
      "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=8",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();

    return (data?.hits || []).map((item: any) => ({
      id: String(item.objectID),
      title: item.title,
      subtitle: `${item.points ?? 0} points • by ${item.author}`,
    }));
  } catch (error) {
    console.error(`Unable to fetch ${source} data`, error);
    return [];
  }
}
