import { useEffect, useState, useRef } from 'react';

type Phase = 'typing' | 'heart';

const SONG_ID = '_4tNUIt2ZuA';
const MORE_SONG_ID = '3dPvWnEpJJI';

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
  const [expandedReelImage, setExpandedReelImage] = useState(false);
  const [endPhase, setEndPhase] = useState<'idle' | 'dots' | 'quote' | 'final'>(
    'idle'
  );
  const [endTypedDots, setEndTypedDots] = useState('');
  const paperPages = [
    "16:41 PM, 24 September\n♫ Now Playing-D<E<A<T<H<M<E<T<A<L ♫\n\n“Cause you’re holding onto someone special\nEducating someone who’s mental…”\nMy earphones sing to me this beautiful song I discovered a year ago. I was searching for Death Metal by Possessed, one of my favourite metal bands from the 80s. Seeing the anime girl on the album cover caught my attention. I went in thinking what crazy ear-shredding riff I might get to hear but it was the polar opposite. A gentle, catchy, poppy tune. A year later I have a playlist up to the brim with these obscure little cassette recordings desperately waiting to be discovered.",
    "I got a thought then—there are many such melodies in this world, and not just melodies, but entire places, movies, foods, and especially—people. That whizz by you, dissolve into your surroundings. There is an obscure vedic story called “Bhagya ke kesh”. Bhagya is the feminine personification of fate. The story goes that every so often when Bhagya is bored, she does a mad dance aggressively flicking her luscious mane. Her hair strands are timelines, alternate timelines to be precise. In these collisions, timelines end up sharing a single event, and that causes a drastic domino effect that may alter the trajectory of one’s life.",
    "Aaj se 2 saal aur kuch mahine pehley, I was forced to take that dreaded science stream. I just suffered, to say the least. Then Bhagya decided to headbang like an unbathed metalhead at a Slipknot concert with her locks and turned my life around. The amber yellow leaves of autumn fluttered over by the gentle caresses of the upcoming winter winds signified something is over the horizon. Something…no. Someone. Today I will finally tell you what I have gatekept from you for a long while, I will be vulnerable about everything I hid from you.",
    "Late 2024 brought me the cold embrace of someone who calmed the raging hellfire within me. Swarms of eclectic butterflies rose within me with every chuckle I shared. Months went by and I realized just how much this person has extinguished within me. Those damn butterflies strummed their wings way too loud at times. She did not even spare my dreams.\n\n♫ Now Playing- Not Allowed ♫\nBut it was not all showers of petals and kisses of sunlight. I also saw the parts of her that she hid from the world, what her happiness really masks, her deepest insecurities and fears. My feelings became coherent. I could not help but feel like I had received a purpose in life, and that was to build a life around this person and supplement her living.\n\nBhagya saw me joyous after a long stretch. Madwoman brushes her hair against the fabric of the cosmos once again. A string of events that I wish to transcribe later led to a third person walking in, and she committed herself to him.",
    "I was uneasy, but she was happy, so I tried to distance myself from her, not because I wanted to, but because my existence in her life made it hard for her. I never flirted with her and physically avoided her like the black plague. But even though she made an obligation to someone else, I wanted to stay by her side really badly, but I knew what I was doing was the right thing to do. Yet I kept getting pulled in one way or the other. Her relationship had many troubles, but yet she would find a way to be happy. I would rather have her be happy with someone else than be unhappy with me. Towards the end of 2025 I decided I would distance myself from her gradually once school is over. But I saw her smile getting snatched away, replaced by slow tears. Every. Damn. Time. I was only able to do the bare minimum when she was vulnerable, where I could have wiped her tears when the world scorned her for who she is.",
    "Bhagya did her third dance of shattering my life again. She broke up with her bf. All the way till the end I told her not to break up, contrary to what I wanted from within. For her happiness, so be it. But this breakup messed my mind up for days. For a year and half I was clenching myself to painfully let her go, and now I stood at a split road. I could have either stayed in her life as someone then let time fade me, or give it my all to carve a place in her life, for however long she stays alive. \n\nBut then I saw her struggles. How she has to fight the world for a place to live. Her family problems. Her fragile health and frequent ailments. Even giving NEET for the second time, despite getting destroyed the first time. And worst of all—people she thought would be by her side in everything stabbing her in the back, letting her down right when she needed their support. At that moment I decided—screw IT.",
    "I am gonna wake up everyday, even if I am sick or depressed, push myself to be better than the previous day, and work towards the happiness of this person. Even if I cannot erase her scars, I will make sure she does not suffer the pain alone. Even if she needs space, I will be patiently sitting in a corner. But what I am about to do will hurt her. I know it will. She told me she does not want to dedicate herself to a romantic relationship again, because it becomes an obligation to keep and risks the loss of that person. She will never lose me to be fair. I am doing this at your call. You still asked me to confess to her even if that is the case. \n\n♫ Now Playing- Master of None ♫\nHer name possesses a certain divinity. I cannot take it casually at all, and it is so deep that I treat people with her name differently.",
    "Her name truly represents who she is, a shy fragment of the divine on Earth, in my life. Her name is—Divya Sharma. Does that name ring a bell?  Perhaps. Oh she is quite similar to you. The same name as you, the same vessel as you, but one thing is different. She is slightly different from you when it comes to what she is. She is what I see in you. But that is not you. You are something greater than that. And I want to understand that real you. I want to unravel the complexities that make you with my own bare hands. You once told me that you do not feel like you deserve anything from the people in your life, that you do not like what you are from within. Now please grant me the privilege to know the layouts of your mind like a second home, the privilege of holding your darkness being patient while not trying to fix it immediately.",
    "Allow me to be the pen to your highlighter so that I could write our future, and you could make it brighter. Tell me your sins, your regrets, the nights you wished you could start over and I will trace them on your palm like constellations that made you so lovable. I want to peel away the layers of all the stories you tell me, and do away with social norms and this air of awkwardness between us, to get to the bottom of what makes you, YOU. I do not want to only love the armour you put on to confront the world but the messy, tough yet fragile real you underneath too.\n\nYou entered my life and I breathed lighter, slept with a smile on my face, went through the worst months of my life last year, and even got a tier 1 college dealing with it all. You are the reason why my problems do not feel as much. Everytime I feel like giving up, you show up and make me realize why I am here in the first place. You truly have made my everyday living peaceful.",
    "You are mesmerizingly pretty, especially when the sun turns your lunar complexion a soft pink, with those smile lines framing your tender pink lips, your raven dark bangs that flutter with the wind, enchanting me every time you look towards me, causing me to turn my head away lest your brightness burns my eyes, causing the tumultuous seas backed behind my eyes to roar and make my eyes blurry. You are deeply understanding and empathetic, and make time even for my worries when you are already dealing with yours. You are funny, eloquent with words aka shitty acronyms, not judgemental, and exciting to talk to.",
    "I feel jealous of all the people you talk about on your voice notes, because of how they are talked about in your so sweet, honey dew like melodic voice. I feel jealous of all the people that get to meet you and experience the heavenly feeling of talking with you. I feel jealous of your broad glasses that get to feel your vision everyday. My words seem too pretty nowadays as you pointed out, but this is genuinely how I always saw you. I never got the chance to say these to you, and that is why these words are filled up to the brim in my throat, my tongue unable to restrain them from leaking.",
    "They are not flattery to win you over. You are not a trophy. These words are not a standard you have to uphold. You are aunty ji’s little girl. A street cat’s mild annoyance. Sumukh’s worse annoyance. You deserve all the words I forge with my pen, they are all yours. \n\n♫ Now Playing- scars ♫\nYou do not have any civic sense at all, you knock the door of my mind the moment I wake up. From the moment I met you all those years ago, not a day, hell even an hour goes by when I haven’t thought of you. And now that I grapple with the upcoming 5 years of your new life—I feel agony chasing me with its fangs. I am haunted by the memories I spent with you. I miss you when I am laughing around with my friends. I miss you when I find a flower on my bag in college thinking how cute you would look with the flower tucked in your hair. You carved a place into my very soul and I hear your echoes every time I breathe.",
    "I feel fear. Fear that progression of life will sever us apart. Fear that I will lose you…\n\nYou have told me many things that you've struggled with in the past. You once told me you are afraid of losing friends to other people, that they might find others’ company better than yours. You told me how desolate you felt when you introduced Chiksha and Vaani, and down the line they would bully you at times. I wish I was there for you then. But I promise you, I will never make you feel that way. You are my first priority, even above Ekas. Even if I find new people, you will always keep the keys to my heart. You also once told me that people do not see the effort you make for relationships and that causes them to distance themselves from you. You make your efforts in your own way, and they must be ungrateful enough to not realize that. So I want you to sit back now.",
    "I want you to sit in the passenger seat while I steer the wheel away from crumbling boulders and narrow roads. You once told me that you do not like who you are from within, and all I could answer to stay in my limits was ”I only care about what you show me”. You were lied to a lot. You are deeply cared for. You always know how to console me after I have a bad day. You make it easy to open up without judging. I love all the subtle things you notice that most take for granted. Is it fear? Or if told, you fear its impact? Or is it something lodged way, way deep into your psyche? Or maybe you feel like I should not know. When your mother called me that day to ask about your brother, I promised her, at least in my mind, that I will never let anything change how I perceive your daughter, but if you do not want to, it is fine.\n\n♫ Now Playing- U Weren’t Here I Really Miss You ♫\nAnd oh, i miss you so much, again. I wish i had studied more and gotten iit delhi, i wish i was near you.",
    "You found a way to sneak into the lines between my messy c++ code, the heavy pauses between the songs from the playlist you gave me, in the back of my notebooks, in the blank piece of paper with a dog sketched on it you gave me a year ago, playing hide and seek with me. You lured me to SM Aarya the day of the bio exam, and you hid as always, you whimsical fae of Delhi. I thought I lost..then you giggled again. You sly brat. I remember those days fondly. Those days when you would come between changeover periods to talk about every particular thing in existence, and you were so full of energy every time to the point you would flap your hands and get restless like a puppy getting zoomies. I find myself playing pakdam pakdai with the toddler you when I read our texts from 2024, feeling confused if I should cry or laugh. It is burned into my very being. I miss you so deeply. \n\nI have always been an atheist, but I believe God must be jealous of how devoted I am to the heaven that resides in you.",
    "I want Bhagya to broom the whole floor with her hair. I want to see you achieve all the milestones you aimed for, follow all your passions, explore the world, and smile like the boycut era divi who still resides so deeply in you. And to hold your hand while at it, watching out for the stones in our path waiting to trip us over and laughing along the way. Your grandma calls you “kharab tuti” because you cry so much. Dadi ji, I will let you know, there is a “fati pipeline” in this girl’s life, who will hold on to every teardrop of your gudiya with his cupped hands and water the blossoms of floral joy in her life. \n\nI am deeply sorry for confessing, for hurting what we had. You might even get physically sick due to your history of fainting and other issues. Please allow me to make up for it in any way I can.",
    "I feel that is your fear, you are afraid when someone actually shows up, they will hurt you again and leave just like the past person did. You are just looking out for your safety, and I respect that. But I promise you, I swear by my grandmother who watches over us two, I am not GOING ANYWHERE. Even if the distance between us grows. Even if we get sour with each other. I will always be by your side. So take your time. If you feel like falling apart, then fall apart, I am here to recollect all of you. Ask me anything you feel, I will be completely honest with you. You have my word, do not be afraid of hurting me. You can never hurt me even if you try. Please let me serve you, that is all I want. I have realized that you have built walls to defend yourself and your energy. You have this little corner of the world completely to your will, with no external obligations. Because the last time when you were vulnerable to someone they lashed out on you.",
    "And you were hurt, terribly. Because you are afraid you will lose the only male friend you had with whom you were carefree for so long. But if this is truly you, then do not worry. Be the rapunzel who flows her locks from the window of her castle, and I will be the knight in shining armour who is content from raising his gaze. I will be in your life the way you want. \n \nAnd thank you for everything you have done for me, I cannot repay it, but I can give you, your family, the issues of the world you find most significant, all of my care, attention and love, and strive to be a better version of myself, everyday. Thank you for being patient and reading this long letter. Let us look forward to a new stage in our lives, with no obligations to keep, just us being us, visiting places, having fun. You are loved. Take care :3\n\nTo Divi, aka Duchess of Ghostington, aka krish coomer, aka Sumukh Superstar, aka Divine Shy.",
  ];
  const totalPapers = paperPages.length;
  const reelEntries = [
    { image: '/images/reel/reel-01.png', caption: '' },
    { image: '/images/reel/reel-02.png', caption: 'You are "ykw". I physically trembled taking your name even in chat.' },
    { image: '/images/reel/reel-03.png', caption: '' },
    { image: '/images/reel/reel-04.png', caption: '' },
    { image: '/images/reel/reel-05.png', caption: '' },
    { image: '/images/reel/reel-06.png', caption: 'I wanted to give you a gift before I "parted" ways with you, hence.' },
    { image: '/images/reel/reel-07.png', caption: '' },
    { image: '/images/reel/reel-08.png', caption: 'A playlist I made two years ago with songs that reminded me of you.' },
    { image: '/images/reel/reel-09.png', caption: '' },
    { image: '/images/reel/reel-12.png', caption: 'I sent myself a voice note everyday for 30 days talking about you and what is ahead of us until I confessed.' },
    { image: '/images/reel/reel-13.png', caption: 'Reading research about the psychology of the menstrual cycle and how to behave.' },
    { image: '/images/reel/reel-14.png', caption: 'Another research reading of the cognitive effect of sharing negative emotions and how to talk about it.' },
    { image: '/images/reel/reel-15.png', caption: '' },
  ];
  const revealMessage =
    'Behind the scenes of my love..';
  const audioCtxRef = useRef<AudioContext | null>(null);
  const moreTimeoutRef = useRef<number | null>(null);
  const playerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
    mute?: () => void;
    unMute?: () => void;
    loadVideoById?: (videoId: string) => void;
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
    playerRef.current?.unMute?.();
    playerRef.current?.loadVideoById?.(MORE_SONG_ID);
    setIsScattering(true);
    if (moreTimeoutRef.current !== null) {
      window.clearTimeout(moreTimeoutRef.current);
    }
    moreTimeoutRef.current = window.setTimeout(() => {
      moreTimeoutRef.current = null;
      setShowTypewriter(true);
    }, 850);
  };

  // Return to the unlocked envelope so the Dare / pages sequence can be replayed.
  const handleReplaySequence = () => {
    if (moreTimeoutRef.current !== null) {
      window.clearTimeout(moreTimeoutRef.current);
      moreTimeoutRef.current = null;
    }
    setIsDakiya(false);
    setIsDared(false);
    setPaperIndex(0);
    setIsScattering(false);
    setShowTypewriter(false);
    setTypedReveal('');
    setShowReel(false);
    setReelIndex(0);
    setEndPhase('idle');
    setEndTypedDots('');
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
    // Clear the intro line when the reel ends, before the ending sequence begins.
    setShowTypewriter(false);
    setTypedReveal('');
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

  useEffect(() => {
    if (!expandedReelImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedReelImage(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expandedReelImage]);

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
            onClick={() => {
              if (!isUnlocked) {
                setIsUnlocked(true);
                return;
              }
              setIsDared(true);
              setIsDakiya(true);
            }}
            aria-hidden={loadedImages < 2 || isDakiya}
            tabIndex={loadedImages < 2 || isDakiya ? -1 : 0}
          >
            {!isUnlocked
              ? 'Unlock what shackles me..?'
              : isDared
                ? 'Sure? I hope you are currently alone..'
                : 'Dare..?'}
          </button>
        </div>

        {isDakiya && isDared && !showTypewriter && !showReel && endPhase === 'idle' && (
          <p className="dare-confirmation" aria-live="polite">
            Sure? I hope you are currently alone..
          </p>
        )}

        <div className="paper-stack" aria-hidden={!isDakiya}>
          {/* Three lightweight backing sheets plus one real, active page. */}
          {Array.from({ length: 4 }, (_, layer) => {
            const isFront = layer === 3;
            const tilt = [-4, 3, -2, 0][layer];
            const scatterX = [-180, 220, -260, 300][layer];
            const scatterY = [180, -140, 240, -160][layer];
            const scatterRot = [24, -18, 35, -32][layer];
            const cardStyle = isScattering
              ? {
                  transform: `translate(${scatterX}px, ${scatterY}px) rotate(${scatterRot}deg)`,
                  opacity: 0,
                  zIndex: layer + 1,
                  transitionDuration: '.85s',
                }
              : {
                  transform: `rotate(${tilt}deg) translateY(${isFront ? -6 : (3 - layer) * 3}px) scale(${isFront ? 1 : 0.97})`,
                  zIndex: layer + 1,
                  opacity: isFront ? 1 : 0.82,
                };
            return (
              <div key={layer} className={`paper-card-wrap${isFront ? ' paper-card-front' : ' paper-card-backing'}`} style={cardStyle}>
                <img
                  className="paper-card"
                  src="/images/letter-paper.jpg"
                  alt={isFront ? 'A letter page' : ''}
                  aria-hidden={!isFront}
                />
                {isFront && (
                  <p key={paperIndex} className="paper-text">{paperPages[paperIndex]}</p>
                )}
              </div>
            );
          })}
          <div className="paper-nav">
            <button
              type="button"
              onClick={() => setPaperIndex((i) => Math.max(0, i - 1))}
              disabled={paperIndex === 0}
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() =>
                setPaperIndex((i) => Math.min(totalPapers - 1, i + 1))
              }
              disabled={paperIndex === totalPapers - 1}
              aria-label="Next page"
            >
              ›
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

        <button
          className="replay-sequence-button"
          type="button"
          onClick={handleReplaySequence}
          aria-hidden={!isDakiya}
          tabIndex={isDakiya ? 0 : -1}
        >
          Back to the envelope ↺
        </button>

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
              <span className="reel-arrow-desktop">‹</span>
              <span className="reel-arrow-mobile" aria-hidden="true">↑</span>
            </button>
            <div className="reel-photo-frame">
              {reelEntries[reelIndex].image ? (
                <img
                  className="reel-photo"
                  src={reelEntries[reelIndex].image}
                  alt="Open image larger"
                  role="button"
                  tabIndex={0}
                  aria-label="Enlarge this image to read it"
                  onClick={() => setExpandedReelImage(true)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setExpandedReelImage(true);
                    }
                  }}
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
              <span className="reel-arrow-desktop">›</span>
              <span className="reel-arrow-mobile" aria-hidden="true">↓</span>
            </button>
          </div>
          {reelEntries[reelIndex].caption && (
            <p key={reelIndex} className="reel-caption">{reelEntries[reelIndex].caption}</p>
          )}
        </div>

        {expandedReelImage && showReel && reelEntries[reelIndex].image && (
          <div
            className="reel-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged reel image"
            onClick={() => setExpandedReelImage(false)}
          >
            <button
              type="button"
              className="reel-lightbox-close"
              aria-label="Close enlarged image"
              onClick={() => setExpandedReelImage(false)}
            >
              ×
            </button>
            <img
              className="reel-lightbox-image"
              src={reelEntries[reelIndex].image}
              alt="Enlarged image for reading"
              onClick={(event) => event.stopPropagation()}
            />
            <p className="reel-lightbox-hint">Tap outside or press Esc to close</p>
          </div>
        )}

        <div className="end-scene" aria-hidden={endPhase === 'idle'}>
          <p className="end-dots-text" aria-hidden={endPhase !== 'dots'}>
            {endTypedDots}
            <i className="typewriter-cursor">|</i>
          </p>

          <p className="end-quote" aria-hidden={endPhase !== 'quote'}>
            I feel ashamed Divya. Please forgive me. You were betrayed.
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
