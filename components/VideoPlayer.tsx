type VideoPlayerProps = {
    src: string;
    title: string;
}

/**
 * @module VideoPlayer
 * Composant pour afficher une vidéo locale ou une vidéo YouTube
 * @param {string} src - URL de la vidéo (locale ou YouTube embed)
 * @param {string} title - Titre de la vidéo
 */
const VideoPlayer = ({ src, title }: VideoPlayerProps) => {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  return (
    <div className="videoPlayer">
      <h3>{title}</h3>
      {isYouTube ? (
        <iframe
          width="560"
          height="315"
          src={getYouTubeEmbedURL(src)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

// Convertit une URL YouTube standard ou raccourcie en URL d'embed
const getYouTubeEmbedURL = (url: string): string => {
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1];
  } else if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  }
  return `https://www.youtube.com/embed/${videoId}`;
};

export default VideoPlayer;
