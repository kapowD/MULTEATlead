export interface VideoBlockProps {
  videoUrl: string;
  title: string;
  description: string;
}

export interface VideoSectionProps {
  title: string;
  introText: string;
  videos: VideoBlockProps[];
}