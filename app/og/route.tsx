import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { metaData } from "app/config";

// Static font instances (Satori can't read variable fonts or woff2).
const fontDir = join(process.cwd(), "assets", "og");
const fonts = Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "GeistMono-Regular.ttf")),
]);

const PAPER = "#F5F5F5";
const INK = "#1C1C1C";
const MUTED = "#737373";
const LINE = "#E5E5E5";
const ACCENT = "#737373";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.name;
  const [sans, mono] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: PAPER,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "Geist Mono",
            fontSize: 28,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: ACCENT,
            }}
          />
          {metaData.title}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Geist",
            fontSize: title.length > 60 ? 64 : 80,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${LINE}`,
            paddingTop: 28,
            fontFamily: "Geist Mono",
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>{metaData.name}</span>
          <span>{metaData.baseUrl.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
