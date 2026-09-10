export async function GET() {
    return Response.json(
      {
        status: "ok",
        service: "PhonoPlay API",
      },
      {
        status: 200,
      }
    );
  }