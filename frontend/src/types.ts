export interface APIResponse {
  success: boolean;
  data: string | Feed[] | News[];
}

export interface Feed {
  id: number;
  name: string;
  url: string;
  created_at: Date;
}

export interface News {
  id: number;
  feed_id: number;
  title: string;
  description: string;
  link: string;
  pub_date: Date;
  categories: string;
  created_at: Date;
}

export interface NewsListProps {
  news: News[];
}

export interface NewsCardProps {
  news: News;
}

export interface FeedsCardProps {
  feed: Feed;
}

export interface AddFeedFormProps {
  onFeedAdded: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onFetchNews: () => void;
  onSort: (sortBy: string) => void;
}

export interface UpdateNewsButtonProps {
  onFetchNews: () => void;
}
