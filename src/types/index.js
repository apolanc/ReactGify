// @flow

export type ImageModel = {
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

export type ImageData = {
  data: Array<ImageModel>
};

export type DashboardState = {
  images: Array<ImageModel>,
  searchQuery: string,
  error: string
};

export type ImageProps = {
  url: string,
  width: string,
  height: string,
  title: string,
  onImageClick: () => void
};

export type SearchFormProps = {
  onClick: () => void,
  handleChange: () => void
};

export type ImageContainerProps = {
  images: Array<ImageModel>
};
