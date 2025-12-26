import { notFound } from "next/navigation";
import { getLLMText } from "@/app/(docs)/lib/get-llm-text";
import { source } from "@/app/(docs)/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/docs/llms.mdx/[[...slug]]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
