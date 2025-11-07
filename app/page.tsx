import { getAllPosts } from '@/lib/blog';
import HeroAnimated from '@/components/hero-animated';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return <HeroAnimated latestPosts={latestPosts} />;
}