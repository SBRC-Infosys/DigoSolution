export type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number;
  title: string;
  img_url: string;
  content: string;
  author_id: string;
  category_id: string;
  // tags: string[];
  published_at: string;
};
