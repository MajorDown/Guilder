type VideoPlayerProps = {
    src: string;
    title: string;
}

/**
 * @module VideoPlayer
 * Composant pour afficher une vidéo
 * @param {string} src - URL de la vidéo
 * @param {string} title - Titre de la vidéo
 */
const VideoPlayer = (props: VideoPlayerProps) => {
  return (
    <div className={"videoPlayer"}>
        <h3>{props.title}</h3>
        <video controls>
            <source src={props.src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
  )
}

export default VideoPlayer;