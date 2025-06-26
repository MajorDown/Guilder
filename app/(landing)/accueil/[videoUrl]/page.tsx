import Link from 'next/link';
import Style from '@/styles/components/landing/VideoSection.module.css';

type Props = {
  params: { videoUrl: string };
};

const VideoPage = ({ params }: Props) => {
  // Extrait uniquement l’ID, sans les éventuels paramètres comme ?si=...
  const videoId = params.videoUrl.split('?')[0];

  return (
    <section id={Style.VideoSection}>
      <Link href="/accueil" className={Style.backLink}>Retour à l'accueil</Link>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Vidéo YouTube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default VideoPage;
