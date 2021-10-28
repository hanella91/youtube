import { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const search = query => {
    youtube
    .search(query)
    .then(videos => setVideos(videos));
  };

  useEffect(() => { //컴포넌트가 Mount가 되면 리퀘스트에 옵션을 전달해아하므로 리퀘스트 옵션 생성
    youtube
    .mostPopular()
    .then(videos => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
