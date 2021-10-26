import { useEffect, useState } from 'react';
import './App.css';
import VideoList from './components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);

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
    <VideoList videos={videos} />
  );
}

export default App;
