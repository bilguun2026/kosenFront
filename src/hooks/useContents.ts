import { useQuery } from "@tanstack/react-query";
import { fetchContents, fetchTags } from "@/lib/api";
import { useParams } from "next/navigation";

export function useTagSlug(): string {
  return useParams()?.slug as string;
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
}

export function useContentsByTag(slug: string) {
  return useQuery({
    queryKey: ["contents", slug],
    queryFn: () => fetchContents(slug),
    enabled: !!slug,
  });
}
