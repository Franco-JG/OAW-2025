import React from 'react';
import { FeedsCardProps } from "../types.ts";


const FeedsCard: React.FC<FeedsCardProps> = ({ feed }) => {
  return (
    <div className="card shadow-sm rounded-3">
      <div className="card-body">
        <h5 className="card-title">{feed.name}</h5>
        <a href={feed.url} target="_blank" rel="noopener noreferrer" className="card-link">
          {feed.url}
        </a>
        <p className="text-muted small mt-2">
          📅 Creado el: {new Date(feed.created_at).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
};

export default FeedsCard;
