import React, { useEffect, useState } from "react";
import { getNews, searchNews } from "../services/api";
import { News } from "../types";
import SearchBar from "../components/SearchBar";
import NewsList from "../components/NewsList";

const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [sortColumn, setSortColumn] = useState<string>("pub_date"); // Estado para la ordenación

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (orderBy = "pub_date") => {
    try {
      const newsData = await getNews(orderBy);
      setNews(newsData);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const searchResults = await searchNews(query);
      Array.isArray(searchResults) ? setNews(searchResults) : alert(`${searchResults} para ${searchQuery}`);
    } catch (error) {
      console.error("Error al buscar noticias:", error);
    }
  };

  const handleSort = async (column: string) => {
    // setSortColumn(column); // Actualiza el estado del criterio de ordenación
    fetchNews(column); // Llama a la API con el nuevo orden
  };

  return (
    <div className="container">
      <div className="d-flex align-items-right mb-1">
        <div className="d-flex flex-column flex-grow-1">
          <SearchBar onSearch={handleSearch} onFetchNews={() => fetchNews()} onSort={handleSort} />
        </div>
      </div>
      <div className="news-container mt-0 m-4 p-4 rounded shadow">
        {news.length > 0 ? <NewsList news={news} /> : <h2 className="text-center text-muted">No hay noticias</h2>}
      </div>
    </div>
  );
};

export default Home;
