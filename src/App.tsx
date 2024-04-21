import { useEffect, useRef, useState } from 'react';
import './App.css';
import { TimeDuration } from './utils/TimeDuration';

const items = ['0.2', '0.5', '1.0', '1.5', '2.0'] as const;

function App() {
  const audioRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const clickRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState<number>(1);
  const [mus, setMus] = useState<string>('1.0');
  useEffect(() => {
    audioRef.current!.volume = +volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current!.playbackRate = +mus;
  }, [mus]);

  useEffect(() => {
    if (playing) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [playing]);

  /*  requestFullscreen*/

  const full = () => {
    audioRef.current?.requestFullscreen();
  };

  const playVideo = () => {
    setProgress((audioRef.current?.currentTime! / audioRef.current?.duration!) * 100);
    if (audioRef.current?.currentTime === audioRef.current?.duration) {
      setProgress(0);
      audioRef.current?.play();
    }
  };

  const checkwidth = (e: any) => {
    let width = clickRef.current?.clientWidth!;
    const offect = e.nativeEvent.offsetX;
    const result = (offect / width) * 100;
    audioRef.current!.currentTime = (result / 100) * audioRef.current?.duration!;
  };

  return (
    <div className="relative rounded-x">
      <video
        onTimeUpdate={playVideo}
        className="rounded-xl"
        ref={audioRef}
        src="/video.mp4"></video>
      <div className="prod">
        <div
          onClick={checkwidth}
          ref={clickRef}
          className="bg-[#4e4e4e] bottom-14 cursor-pointer  left-2 right-2 h-1 absolute">
          <div
            style={{ width: `${progress}%` }}
            className={`bg-[#ed5252] transition duration-150 h-1`}></div>
        </div>
        <div className=" flex justify-between items-center h-8 bottom-4 absolute px-4 left-0 right-0">
          <div className="flex gap-2 items-center">
            {playing ? (
              <svg
                onClick={() => setPlaying(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setPlaying(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            )}
            <div className="flex items-center">
              <input
                value={volume}
                onChange={e => setVolume(+e.target.value)}
                min="0"
                max="1"
                step={0.01}
                defaultValue={1}
                type="range"
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>{TimeDuration(Math.floor(audioRef.current?.currentTime!))}</p>
              <span>/</span>
              <p>{TimeDuration(Math.floor(audioRef.current?.duration!))}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="dsas relative">
              <h2 className=" cursor-pointer">{mus}x</h2>
              <div className="ds">
                {items.map((item, index) => (
                  <h2 key={index} onClick={() => setMus(item)} className=" text-sm cursor-pointer">
                    {item}
                  </h2>
                ))}
              </div>
            </div>
            <svg
              onClick={full}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-8 cursor-pointer h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
