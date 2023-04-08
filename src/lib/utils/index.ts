import type { Post } from "$lib/types";
import axios from "axios";

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await axios.get("/api/posts");
  return data;
}

export async function fetchPost(id: number): Promise<Post> {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}
