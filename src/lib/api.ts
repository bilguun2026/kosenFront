import { fixMediaUrls } from "@/utils/replaceMediaUrl";
import axios, { AxiosInstance } from "axios";
import {
  PageNavigation,
  PaginatedResponse,
  Page,
  Content,
  Tag,
  ContentList,
  ContentText,
  Video,
  Urls,
} from "../types/api";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchNavigation = async (): Promise<PageNavigation[]> => {
  try {
    const response = await api.get<PaginatedResponse<PageNavigation>>(
      "page-navigation/"
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
};

export const fetchPage = async (id: string): Promise<Page> => {
  try {
    const response = await api.get(`pages/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error; // Let PageDetail handle the error
  }
};

export const fetchContents = async (slug: string): Promise<ContentList[]> => {
  try {
    const response = await api.get<PaginatedResponse<ContentList>>(
      `/contents/?tag=${slug}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
};

export const fetchContent = async (contentId: number): Promise<Content> => {
  try {
    const response = await api.get(`contents/${contentId}/`);
    const data = response.data;

    if (data.texts) {
      data.texts = data.texts.map((t: ContentText) => ({
        ...t,
        text: fixMediaUrls(t.text),
      }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<PaginatedResponse<Tag>>("tags/");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

export const fetchCarouselContent = async (): Promise<Content[]> => {
  try {
    const response = await api.get(`carousel/`);
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching tag:", error);
    throw error;
  }
};

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await api.get<PaginatedResponse<Video>>("videos/");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const fetchUrls = async (): Promise<Urls[]> => {
  try {
    const response = await api.get<PaginatedResponse<Urls>>("urls/");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching urls:", error);
    return [];
  }
};
