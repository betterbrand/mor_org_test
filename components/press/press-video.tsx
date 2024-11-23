import { AspectRatio } from '@chakra-ui/react'

type PressVideoProps = {
  url: string
}

export const isYoutubeLink = (url: string): boolean => {
  // Regular expression to check if the URL is a YouTube link
  const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
  return youtubeRegex.test(url)
}

export const PressVideo: React.FC<PressVideoProps> = ({ url }) => {
  const getYoutubeVideoId = (url: string): string | null => {
    // Regular expression to extract the YouTube video ID from various YouTube URL formats
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(youtubeRegex)
    return match && match[1] ? match[1] : null
  }

  const videoId = getYoutubeVideoId(url)

  if (videoId) {
    return (
      <AspectRatio ratio={16 / 9}>
        <iframe
          width='560'
          height='315'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </AspectRatio>
    )
  }
}
