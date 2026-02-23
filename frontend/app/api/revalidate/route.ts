import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  const paths: string[] = Array.isArray(body.paths) ? body.paths : body.path ? [body.path] : [];
  const tags: string[] = Array.isArray(body.tags) ? body.tags : body.tag ? [body.tag] : [];

  for (const p of paths) {
    revalidatePath(p, "page");
  }

  for (const t of tags) {
    revalidateTag(t, "default");
  }

  return NextResponse.json({
    ok: true,
    revalidated: { paths, tags }
  });
}
