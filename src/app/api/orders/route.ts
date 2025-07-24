// POST endpoint to handle placing an order
export async function POST(req) {
  // TODO: Save order to MongoDB
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
