import { Portfolio } from '@/components/Portfolio';
import { JsonLd } from '@/components/JsonLd';
import { pt } from '@/content/pt';

export default function Home() {
  return (
    <>
      <JsonLd content={pt} />
      <Portfolio content={pt} />
    </>
  );
}
