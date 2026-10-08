import { useEffect, useState, useRef } from 'react';

type Phase = 'typing' | 'heart';

const SONG_ID = '_4tNUIt2ZuA';

function App() {
  const [phase, setPhase] = useState<Phase>('typing');
  const [typedDots, setTypedDots] = useState('');
  const [loadedImages, setLoadedImages] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDared, setIsDared] = useState(false);
  const [isDakiya, setIsDakiya] = useState(false);
  const [paperIndex, setPaperIndex] = useState(0);
  const [isScattering, setIsScattering] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typedReveal, setTypedReveal] = useState('');
  const [showReel, setShowReel] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  const [endPhase, setEndPhase] = useState<'idle' | 'dots' | 'quote' | 'final'>(
    'idle'
  );
  const [endTypedDots, setEndTypedDots] = useState('');
  const totalPapers = 4;
  const reelEntries = [
    { image: '/images/reel/reel-01.png', caption: 'ABCD' },
    { image: '/images/reel/reel-02.png', caption: 'ABCD' },
    { image: '/images/reel/reel-03.png', caption: 'ABCD' },
    { image: '/images/reel/reel-04.png', caption: 'ABCD' },
    { image: '/images/reel/reel-05.png', caption: 'ABCD' },
    { image: '/images/reel/reel-06.png', caption: 'ABCD' },
    { image: '/images/reel/reel-07.png', caption: 'ABCD' },
    { image: '/images/reel/reel-08.png', caption: 'ABCD' },
    { image: '/images/reel/reel-09.png', caption: 'ABCD' },
    { image: '/images/reel/reel-12.png', caption: 'ABCD' },
    { image: '/images/reel/reel-13.png', caption: 'ABCD' },
    { image: '/images/reel/reel-14.png', caption: 'ABCD' },
  ];
  const revealMessage =
    'Now here I show you, things I did about you, that you never knew...';
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
    mute?: () => void;
    unMute?: () => void;
    destroy: () => void;
  } | null>(null);

  useEffect(() => {
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTypedDots('.'.repeat(count));
      if (count === 4) {
        window.clearInterval(timer);
        window.setTimeout(() => setPhase('heart'), 3000);
      }
    }, 650);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const playerId = 'yt-player';

    const createPlayer = () => {
      const w = window as unknown as {
        YT?: {
          Player: new (
            id: string,
            opts: unknown
          ) => {
            playVideo: () => void;
            pauseVideo: () => void;
            mute?: () => void;
            unMute?: () => void;
            destroy: () => void;
          };
        };
      };

      if (w.YT?.Player) {
        playerRef.current = new w.YT.Player(playerId, {
          videoId: SONG_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: SONG_ID,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (e: {
              target: {
                playVideo: () => void;
              };
            }) => {
              // Attempt audible autoplay immediately.
              // Browsers that permit autoplay will start the music here.
              e.target.playVideo();
            },
          },
        });
      }
    };

    const w = window as unknown as {
      YT?: unknown;
      onYouTubeIframeAPIReady?: () => void;
    };

    if (w.YT) {
      createPlayer();
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const script = document.createElement('script');
        script.id = 'yt-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
      w.onYouTubeIframeAPIReady = createPlayer;
    }

    // If the browser blocks audible autoplay, the first user interaction
    // starts the song. This removes the need for a speaker button.
    const startOnInteraction = () => {
      const player = playerRef.current;
      if (!player) return;
      player.unMute?.();
      player.playVideo();
    };

    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });

    return () => {
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const markImageLoaded = () => {
    setLoadedImages((count) => Math.min(count + 1, 2));
  };

  const playTypeClick = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 0.02);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 2600;
      bandpass.Q.value = 1.1;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noise.connect(bandpass).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);
    } catch {
      // Ignore if Web Audio is unavailable or blocked.
    }
  };

  const handleMore = () => {
    setIsScattering(true);
    window.setTimeout(() => setShowTypewriter(true), 850);
  };

  useEffect(() => {
    if (!showTypewriter) return;
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedReveal(revealMessage.slice(0, i));
      const ch = revealMessage[i - 1];
      if (ch && ch.trim() !== '') playTypeClick();
      if (i >= revealMessage.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setShowReel(true), 1400);
      }
    }, 55);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTypewriter]);

  const handleReelFinished = () => {
    setEndPhase('dots');
  };

  useEffect(() => {
    if (endPhase !== 'dots') return;
    const dots = '....';
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setEndTypedDots(dots.slice(0, i));
      playTypeClick();
      if (i >= dots.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setEndPhase('quote'), 900);
      }
    }, 550);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPhase]);

  useEffect(() => {
    if (endPhase !== 'quote') return;
    const timeout = window.setTimeout(() => setEndPhase('final'), 3400);
    return () => window.clearTimeout(timeout);
  }, [endPhase]);

  return (
    <main
      className={`love-page phase-${phase} ${isUnlocked ? 'is-unlocked' : ''} ${
        isDakiya ? 'is-dakiya' : ''
      } ${isScattering ? 'is-scattering' : ''} ${
        showTypewriter ? 'show-typewriter' : ''
      } ${showReel ? 'show-reel' : ''}`}
      data-end-phase={endPhase}
    >
      <div id="yt-player" className="music-frame" />

      <div className="noise" />
      <div className="pink-wash pink-wash-one" />
      <div className="pink-wash pink-wash-two" />
      <div className="carpet-bg" />

      <section className="scene-content">
        <div className="dots-scene">
          <span>{typedDots}</span>
          <i>|</i>
        </div>

        <div className="heart-scene">
          <div className="heart-halo" />
          <img className="heart-art" src="/images/heart.png?v=20260914b" alt="A glowing anatomical heart" onLoad={markImageLoaded} />
          <img className="lock-art" src="/images/lock.png?v=20260914b" alt="A small lock resting at the center of the heart" onLoad={markImageLoaded} />
          <img className="envelope-art" src="/images/envelope.png" alt="A sealed envelope" />
          <button
            className="unlock-button"
            type="button"
            onClick={() => setIsUnlocked(true)}
            aria-hidden={loadedImages < 2}
            tabIndex={loadedImages < 2 ? -1 : 0}
          >
            Unlock what shackles me..?
          </button>
          <button
            className="dare-button"
            type="button"
            onClick={() => setIsDared(true)}
            aria-hidden={!isUnlocked}
            tabIndex={isUnlocked ? 0 : -1}
          >
            {isDared ? 'Sure? I hope you are currently alone..' : 'Dare..?'}
          </button>
          <button
            className="dakiya-button"
            type="button"
            onClick={() => setIsDakiya(true)}
            aria-hidden={!isUnlocked}
            tabIndex={isUnlocked ? 0 : -1}
          >
            Dakiya dak laya!
          </button>
        </div>

        <div className="paper-stack" aria-hidden={!isDakiya}>
          {Array.from({ length: totalPapers }, (_, i) => {
            const tilt = [-6, -2, 3, 7][i];
            const isFront = i === paperIndex;
            const distance = Math.abs(i - paperIndex);
            const scatterX = [-260, 220, -180, 300][i];
            const scatterY = [-160, 200, 240, -140][i];
            const scatterRot = [-35, 28, -18, 40][i];
            const cardStyle = isScattering
              ? {
                  transform: `translate(${scatterX}px, ${scatterY}px) rotate(${scatterRot}deg)`,
                  opacity: 0,
                  zIndex: 100 - distance,
                  transitionDuration: '.85s',
                }
              : {
                  transform: `rotate(${tilt}deg) translateY(${
                    isFront ? -6 : distance * 3
                  }px) scale(${isFront ? 1 : 0.97})`,
                  zIndex: 100 - distance,
                  opacity: isFront ? 1 : 0.82,
                };
            return (
              <div key={i} className="paper-card-wrap" style={cardStyle}>
                <img
                  className="paper-card"
                  src="/images/letter-paper.jpg"
                  alt="A handwritten letter page"
                />
                <p className="paper-text">ABCD</p>
              </div>
            );
          })}
          <div className="paper-nav">
            <button
              type="button"
              onClick={() => setPaperIndex((i) => Math.max(0, i - 1))}
              disabled={paperIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setPaperIndex((i) => Math.min(totalPapers - 1, i + 1))
              }
              disabled={paperIndex === totalPapers - 1}
            >
              Next
            </button>
          </div>
          <button
            className="more-button"
            type="button"
            onClick={handleMore}
            aria-hidden={paperIndex !== totalPapers - 1}
            tabIndex={paperIndex === totalPapers - 1 ? 0 : -1}
          >
            There...is more..
          </button>
        </div>

        <div className="typewriter-scene" aria-hidden={!showTypewriter}>
          <p className="typewriter-text">
            {typedReveal}
            <i className="typewriter-cursor">|</i>
          </p>
        </div>

        <div className="reel-scene" aria-hidden={!showReel}>
          <div className="film-band">
            <img className="film-band-art" src="/images/film-reel.png" alt="" />
            <button
              type="button"
              className="reel-arrow reel-arrow-prev"
              onClick={() =>
                setReelIndex((i) => Math.max(0, i - 1))
              }
              disabled={reelIndex === 0}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className="reel-photo-frame">
              {reelEntries[reelIndex].image ? (
                <img
                  className="reel-photo"
                  src={reelEntries[reelIndex].image}
                  alt=""
                />
              ) : (
                <div className="reel-photo reel-photo-placeholder" />
              )}
            </div>
            <button
              type="button"
              className="reel-arrow reel-arrow-next"
              onClick={() => {
                if (reelIndex === reelEntries.length - 1) {
                  handleReelFinished();
                } else {
                  setReelIndex((i) => i + 1);
                }
              }}
              aria-label="Next"
            >
              ›
            </button>
          </div>
          <p className="reel-caption">{reelEntries[reelIndex].caption}</p>
        </div>

        <div className="end-scene" aria-hidden={endPhase === 'idle'}>
          <p className="end-dots-text" aria-hidden={endPhase !== 'dots'}>
            {endTypedDots}
            <i className="typewriter-cursor">|</i>
          </p>

          <p className="end-quote" aria-hidden={endPhase !== 'quote'}>
            ABCD
          </p>

          <div className="end-final" aria-hidden={endPhase !== 'final'}>
            <h2 className="end-title">
              THE END...or perhaps, THE BEGINNING.
            </h2>
            <p className="end-paragraph">
              You are left with many questions. I know, you sweet curious
              soul. I will answer all, do not be afraid to ask, please ask...
            </p>
            <a
              className="end-instagram-button"
              href="https://www.instagram.com/direct/t/17847608438870037/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Take this to Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
