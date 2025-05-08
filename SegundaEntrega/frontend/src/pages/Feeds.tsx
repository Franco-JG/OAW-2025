// import React from 'react';
// import AddFeedForm from '../components/AddFeedForm';

// const Feeds: React.FC = () => {

//   return (
//     <div className="container">
//       <div className="d-flex align-items-right mb-1">
//         <div className="d-flex flex-column flex-grow-1">
//           <h1>Agregar Feeds</h1>
//           <AddFeedForm />
//         </div>
//       </div>
//       <div className="news-container mt-0 m-4 p-4 rounded shadow">
//         {/* <NewsList news={news} /> */}
//       </div>
//     </div>
//   );
//   // return (
//   //   <div>
//   //     <h1>Agregar Feeds</h1>
//   //     <AddFeedForm />
//   //   </div>
//   // );
// };

// export default Feeds;
import React, { useEffect, useState } from 'react';
import AddFeedForm from '../components/AddFeedForm';
import FeedsCard from '../components/FeedsCard';
import { getFeeds } from '../services/api';
import { Feed } from '../types';

const Feeds: React.FC = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const feeds = await getFeeds();
      setFeeds(feeds);
    } catch (error) {
      alert('Error al obtener los feeds');
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Feed</h1>
      <AddFeedForm onFeedAdded={fetchFeeds}/>

      <div className="row mt-4">
        {feeds.map((feed) => (
          <div key={feed.id} className="col-md-6 col-lg-4">
            <FeedsCard feed={feed} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feeds;
