import { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';

function App() {
  const [videos, setVideos] = useState([]);
  const search = query => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyDrtpZrMstIhDlf1RFqDPVKVwNpn4SXlKE`,
      requestOptions
    )
      .then(response => response.json())
      .then(result =>
        result.items.map( item => ({ ...item, id:item.id.videoId}))
      )
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));

  };

  useEffect(() => { //컴포넌트가 Mount가 되면 리퀘스트에 옵션을 전달해아하므로 리퀘스트 옵션 생성
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyDrtpZrMstIhDlf1RFqDPVKVwNpn4SXlKE", 
      requestOptions
    )
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
