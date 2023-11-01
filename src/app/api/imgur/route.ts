export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image") as File;

  const response = await fetch("https://api.imgur.com/3/image/", {
    method: "POST",
    body: image,
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const responseData = await response.json();

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
