import React, { useEffect, useState } from 'react';
import AddFeedForm from '../components/AddFeedForm';
import FeedsCard from '../components/FeedsCard';
import { getFeeds } from '../services/api';
import { Feed } from '../types';

// Clave para almacenar en localStorage
const FEEDS_CACHE_KEY = 'cached_feeds';
const FEEDS_TIMESTAMP_KEY = 'feeds_timestamp';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos en milisegundos

const Feeds: React.FC = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadFeedsWithCache();
  }, []);

  const loadFeedsWithCache = async () => {
    // Intentar cargar desde la caché
    const cachedFeeds = localStorage.getItem(FEEDS_CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(FEEDS_TIMESTAMP_KEY);
    
    if (cachedFeeds && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp);
      const now = Date.now();
      
      // Si la caché es válida (menos de 5 minutos)
      if (now - timestamp < CACHE_EXPIRATION) {
        try {
          const parsedFeeds = JSON.parse(cachedFeeds);
          setFeeds(parsedFeeds);
          console.log("Feeds cargados desde caché local");
          return;
        } catch (e) {
          console.error("Error al parsear la caché de feeds:", e);
        }
      }
    }
    
    // Si llegamos aquí, necesitamos cargar datos frescos
    await fetchFeeds();
  };

  const fetchFeeds = async () => {
    setIsLoading(true);
    try {
      const feedsData = await getFeeds();
      setFeeds(feedsData);
      
      // Guardar en caché
      localStorage.setItem(FEEDS_CACHE_KEY, JSON.stringify(feedsData));
      localStorage.setItem(FEEDS_TIMESTAMP_KEY, Date.now().toString());
      
    } catch (error) {
      console.error("Error al obtener los feeds:", error);
      alert('Error al obtener los feeds');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedAdded = () => {
    fetchFeeds(); // Recargar después de añadir un feed
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Feed</h1>
      <AddFeedForm onFeedAdded={handleFeedAdded}/>

      {isLoading ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {feeds.map((feed) => (
            <div key={feed.id} className="col-md-6 col-lg-4">
              <FeedsCard feed={feed} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feeds;