// @flow

export type GifModel = {
  type: string,
  id: string,
  slug: string,
  url: string,
  bitly_gif_url: string,
  bitly_url: string,
  embed_url: string,
  username: string,
  source: string,
  rating: string,
  content_url: string,
  source_tld: string,
  source_post_url: string,
  is_sticker: string,
  import_datetime: string,
  trending_datetime: string,
  images: {},
  title: string,
  _score: number,
  analytics: {}
};

export type GifData = {
  data: Array<GifModel>
};

export type DashboardState = {
  gifs: Array<GifModel>,
  searchQuery: string,
  error: string
};

export type GifProps = {
  url: string,
  width: string,
  height: string,
  title: string
};

export type SearchFormProps = {
  onClick: () => void,
  handleChange: () => void
};

export type GifContainerProps = {
  gifs: Array<GifModel>
};
