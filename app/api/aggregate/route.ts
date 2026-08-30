import { fetchExternal } from '@/lib/external';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const source = url.searchParams.get('source') === 'news' ? 'news' : 'products';

  try {
    const external = await fetchExternal(source);
    return Response.json({ source, external });
  } catch {
    return Response.json({ source, external: [], error: 'External API unavailable' }, { status: 200 });
  }
}
