import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { AppRoute } from '../../const';
import { SyntheticEvent, useRef, useState } from 'react';
import PlayButton from '../../components/play-button/play-button';
import { humanizeDuration } from '../../utils';
import Spinner from '../../components/spinner/spinner';
import ProgressBar from '../../components/progress-bar/progress-bar';

const SMOOTHER_MULTIPLIER = 66;

type PlayerParams = {
  id: string,
}

function Player() {
  const navigate = useNavigate();
  const {id} = useParams<PlayerParams>();
  const film = useAppSelector((state) => state.films.find((f) => f.id === Number(id)));
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading,] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [progressPosition, setProgressPosition] = useState(0);


  function handlePlayButtonClick() {
    if (videoRef.current === null) {
      return;
    }
    setIsPlaying((prevState) => !prevState);
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  function handleTimeUpdate(evt: SyntheticEvent<HTMLVideoElement>) {
    const video = (evt.target as HTMLVideoElement);
    setTimeElapsed(humanizeDuration(video.duration - video.currentTime));
    setProgressPosition(video.currentTime / video.duration * 100);
  }

  function handleTogglerDrag(evt: MouseEvent) {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.currentTime + evt.movementX / SMOOTHER_MULTIPLIER;
      setProgressPosition(videoRef.current.currentTime / videoRef.current.duration * 100);
    }
  }

  if (!film) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <>
      {isLoading && <Spinner/>}
      <div className="player">
        <video className="player__video"
          src={film.videoLink}
          poster={film.posterImg}
          ref={videoRef}
          onCanPlay={() => console.log('123')}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <ProgressBar position={progressPosition} onTogglerDrag={handleTogglerDrag}/>
            <div className="player__time-value">{timeElapsed}</div>
          </div>

          <div className="player__controls-row">
            <PlayButton
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlayButtonClick}
            />

            <div className="player__name">{film.name}</div>

            <button type="button" className="player__full-screen" onClick={() => videoRef.current?.requestFullscreen()}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

}

export default Player;
