import React, { useEffect, useState, useCallback } from "react";
import { getNews, searchNews } from "../services/api";
import { News } from "../types";
import SearchBar from "../components/SearchBar";
import NewsList from "../components/NewsList";

// Clave para almacenar en localStorage
const NEWS_CACHE_KEY = 'cached_news';
const NEWS_TIMESTAMP_KEY = 'news_timestamp';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos en milisegundos

const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [allNews, setAllNews] = useState<News[]>([]); // Almacenar todas las noticias para búsqueda local
  const [_searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadNewsWithCache();
  }, []);

  const loadNewsWithCache = async (orderBy = "pub_date") => {
    // Intentar cargar desde la caché
    const cachedNews = localStorage.getItem(NEWS_CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(NEWS_TIMESTAMP_KEY);
    
    if (cachedNews && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp);
      const now = Date.now();
      
      // Si la caché es válida (menos de 5 minutos)
      if (now - timestamp < CACHE_EXPIRATION) {
        try {
          const parsedNews = JSON.parse(cachedNews);
          setNews(parsedNews);
          setAllNews(parsedNews); // Guardar copia para búsqueda local
          console.log("Datos cargados desde caché local");
          return;
        } catch (e) {
          console.error("Error al parsear la caché:", e);
        }
      }
    }
    
    // Si llegamos aquí, necesitamos cargar datos frescos
    await fetchNews(orderBy);
  };

  const fetchNews = async (orderBy = "pub_date") => {
    setIsLoading(true);
    try {
      const newsData = await getNews(orderBy);
      setNews(newsData);
      setAllNews(newsData); // Guardar copia para búsqueda local
      
      // Guardar en caché
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(newsData));
      localStorage.setItem(NEWS_TIMESTAMP_KEY, Date.now().toString());
      
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función de búsqueda local usando la caché
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // Si la búsqueda está vacía, mostrar todas las noticias
      setNews(allNews);
      return;
    }
    
    // Búsqueda local en la caché
    const lowerQuery = query.toLowerCase();
    const filteredNews = allNews.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery)
    );
    
    if (filteredNews.length > 0) {
      setNews(filteredNews);
      console.log("Búsqueda realizada en caché local");
    } else {
      // Si no hay resultados locales, entonces hacer búsqueda en servidor
      performServerSearch(query);
    }
  }, [allNews]);
  
  // Función para ordenar localmente sin hacer petición HTTP
  const handleSort = (column: string) => {
    // Crear una copia para no mutar el estado directamente
    const newsSorted = [...news];
    
    newsSorted.sort((a, b) => {
      // Convertir a minúsculas para comparación insensible a mayúsculas/minúsculas
      if (column === 'title') {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      if (column === 'description') {
        return a.description.toLowerCase().localeCompare(b.description.toLowerCase());
      }
      if (column === 'pub_date') {
        return new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime();
      }
      if (column === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });
    
    setNews(newsSorted);
    console.log(`Ordenamiento por ${column} realizado localmente`);
  };
  
  // Búsqueda en servidor solo cuando es necesario
  const performServerSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const searchResults = await searchNews(query);
      if (Array.isArray(searchResults)) {
        setNews(searchResults);
      } else {
        alert(`${searchResults} para ${query}`);
      }
    } catch (error) {
      console.error("Error al buscar noticias:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para actualizar forzadamente desde el servidor
  const forceRefresh = () => {
    fetchNews("pub_date");
  };

  return (
    <div className="container">
      <div className="d-flex align-items-right mb-1">
        <div className="d-flex flex-column flex-grow-1">
          <SearchBar onSearch={handleSearch} onFetchNews={forceRefresh} onSort={handleSort} />
        </div>
      </div>
      <div className="news-container mt-0 m-4 p-4 rounded shadow">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : news.length > 0 ? (
          <NewsList news={news} />
        ) : (
          <h2 className="text-center text-muted">No hay noticias</h2>
        )}
      </div>
    </div>
  );
};

export default Home;