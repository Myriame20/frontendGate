import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  muted = true,
  loop = true,
  className = ''
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Don't autoplay if user prefers reduced motion
  const shouldAutoplay = autoplay && !prefersReducedMotion;

  return (
    <div className={`video-container group relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop={loop}
        playsInline
        autoPlay={shouldAutoplay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
        aria-label={title}
      />
      
      {/* Overlay gradient */}
      <div className="video-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <button
            onClick={handleFullscreen}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Plein écran"
          >
            <Maximize className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/40 to-transparent">
        <h3 className="text-white font-semibold text-sm sm:text-base">{title}</h3>
      </div>

      {/* Reduced motion indicator */}
      {prefersReducedMotion && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
          ⏸️ Animations désactivées
        </div>
      )}
    </div>
  );
}
