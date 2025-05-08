import React from 'react';
import { NewsListProps } from '../types';
import NewsCard from './NewsCard';

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <div className="news-list row g-4">
      {news.map((item) => (
        <div key={item.id} className="col-md-6 col-lg-4">
          <NewsCard news={item} />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
