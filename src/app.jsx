import { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // useState : 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수.
  // 함수형 컴포넌트는 클래스형 컴포넌트처럼 state를 사용할 수 없어서 Hook을 사용해서 state기능을 할 수 있게 만들어줌
  // 하나의 useState는 하나의 상태값만 관리할 수 있기때문에 관리해야 할 state가 여러개일 경우 useState를 여러번 사용해야한다<div className=""></div>
  // useState(매개변수) 매개변수는 처음 렌더링되었을 때 기본 state로 설정된다.
  // video를 파라미터로 받아와서 video를 받으면 setSelectedVideo로 video 스테이트를 변경해줌

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };


  const search = query => {
    youtube
    .search(query)
    .then(videos => {
      setVideos(videos);
      setSelectedVideo(null);
    });
  };


  useEffect(() => { //컴포넌트가 Mount가 되면 리퀘스트에 옵션을 전달해아하므로 리퀘스트 옵션 생성
    youtube
    .mostPopular()
    .then(videos => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
      { selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video = {selectedVideo} />
          </div>
      )}
        <div className={styles.list}>
          <VideoList videos = {videos} onVideoClick = {selectVideo} display={selectedVideo? 'list' : 'grid'} /> 
        </div>
      </section>
    </div>
  );
}

export default App;
