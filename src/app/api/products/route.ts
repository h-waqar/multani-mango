import mangoes from "../../../data/mangoes";

export async function GET() {
  return new Response(JSON.stringify(mangoes), { status: 200 });
}
