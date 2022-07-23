import { useNavigate, useParams } from 'react-router-dom';
import { ApiRoute } from '../../const';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import PlayerPlay from '../../components/player-play/player-play';
import { humanizeDuration } from '../../utils';
import Spinner from '../../components/spinner/spinner';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Film } from '../../types/models';
import { createAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const SMOOTHER_MULTIPLIER = 66;

type PlayerParams = {
  id: string,
}

function Player() {
  const navigate = useNavigate();
  const {id} = useParams<PlayerParams>();
  const [film, setFilm] = useState<null | Film>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [progressPosition, setProgressPosition] = useState(0);

  useEffect(() => {
    if (id && isLoading) {
      createAPI().get<Film>(ApiRoute.Player(id))
        .then((response) => {
          setFilm(response.data);
          setIsLoading(false);
        },
        (reason: AxiosError) => {
          toast.error(`${reason.message}. Will be redirected to home page.`);
          setTimeout(() => navigate('/'), 3000);
        });
    }
  }, [id, isLoading, navigate]);

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

  return (
    isLoading ?
      <Spinner/>
      :
      <div className="player">
        <video className="player__video"
          src={film?.videoLink}
          poster={film?.posterImage}
          ref={videoRef}
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
            <PlayerPlay
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlayButtonClick}
            />

            <div className="player__name">{film?.name}</div>

            <button type="button" className="player__full-screen"
              onClick={() => videoRef.current?.requestFullscreen()}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
  );

}

export default Player;
