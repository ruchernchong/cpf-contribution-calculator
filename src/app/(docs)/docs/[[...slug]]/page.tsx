import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/app/(docs)/components/mdx-components";
import { getPageImage, source } from "@/app/(docs)/lib/source";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page(props: PageProps): Promise<React.ReactNode> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {/*TODO: Implement later*/}
      {/*<Feedback
        onRateAction={async (url, feedback) => {
          "use server";
          await posthog.capture("on_rate_docs", feedback);
        }}
      />*/}
    </DocsPage>
  );
}

export function generateStaticParams(): { slug?: string[] }[] {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return {};
  }

  const slug = params.slug?.join("/") ?? "";
  const canonical = slug ? `/docs/${slug}` : "/docs";

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
    },
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
