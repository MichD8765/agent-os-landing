import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file || file !== "Agent-OS-Starter-Pack.pdf") {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "downloads", file);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File missing on server." }, { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}