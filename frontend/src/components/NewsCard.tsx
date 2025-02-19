import React from 'react';
import { NewsCardProps } from '../types';

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const categories: string[] = JSON.parse(news.categories || '[]');

  return (
    <div className="news-card rounded-3 shadow p-4 mb-4">
      <h2>{news.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: news.description }} />

      {/* Badges (Tags) */}
      <div className="categories mt-3 d-flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span key={index} className="badge bg-dark text-white px-3 py-2">
            {category}
          </span>
        ))}
      </div>

      {/* Fechas */}
      <small className="d-block mt-2">📅 Publicado el: {new Date(news.pub_date).toLocaleDateString('es-ES')}</small>
      <small className="d-block">🗂 Creado el: {new Date(news.created_at).toLocaleDateString('es-ES')}</small>

      {/* Enlace */}
      <a href={news.link} target="_blank" rel="noopener noreferrer" className="d-block mt-3">
        🔗 Leer más
      </a>
    </div>
  );
};

export default NewsCard;
