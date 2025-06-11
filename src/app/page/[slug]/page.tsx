export const dynamic = "force-dynamic"; // Ensure route is not statically built

import { fetchNavigation } from "../../../lib/api";
import PageDetail from "../../../components/layouts/PageDetail";
import { PageNavigation } from "../../../types/api";

async function getPageIdBySlug(slug: string): Promise<string | null> {
  const pages = await fetchNavigation();

  const findPage = (pages: PageNavigation[]): PageNavigation | undefined => {
    for (const page of pages) {
      if (page.slug === slug) return page;
      if (page.children?.length > 0) {
        const found = findPage(page.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const page = findPage(pages);
  return page?.id ?? null;
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const pageId = await getPageIdBySlug(slug);

  if (!pageId) {
    return (
      <main className="p-4">
        <div>Page not found</div>
      </main>
    );
  }

  return (
    <main className="p-4">
      <PageDetail pageId={pageId} />
    </main>
  );
}
