// types/api.ts
export interface PageNavigation {
  id: string;
  title: string;
  slug: string;
  children: PageNavigation[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ContentImage {
  id: number;
  image: string;
  image_url: string;
  text: string;
  order: number;
}

export interface ContentText {
  id: number;
  text: string;
  order: number;
}

export interface Content {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: Tag[];
  page: string; // UUID of the page
  page_title: string;
  images: ContentImage[];
  texts: ContentText[];
}
export interface ContentList {
  id: number;
  title: string;
  description: string;
  image: ContentImage | null; // Optional, can be null if no image
  tags: Tag[];
  created_at: string;
}

export interface Page {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  template: string;
  template_display: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  contents: Content[];
  children: PageNavigation[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Video {
  id: number;
  title: string;
  url: string;
  video_file?: string;
  video_source?: string;
}

export interface Urls {
  id: number;
  title: string;
  url: string;
  order: number;
}
