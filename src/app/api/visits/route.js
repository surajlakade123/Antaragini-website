import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "visits.json");

// create file if not exists
function readCount() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
  }
  const data = JSON.parse(fs.readFileSync(filePath));
  return data.count;
}

function writeCount(count) {
  fs.writeFileSync(filePath, JSON.stringify({ count }));
}

export async function GET(req) {
  let count = readCount();

  const visited = req.cookies.get("visited");

  // increment only for new visitor
  if (!visited) {
    count += 1;
    writeCount(count);
  }

  const res = NextResponse.json({ count });

  // cookie valid for 24 hours
  res.cookies.set("visited", "true", {
    maxAge: 60 * 60 * 24,
  });

  return res;
}
