import { Portfolio } from '@/components/Portfolio';
import { JsonLd } from '@/components/JsonLd';
import { en } from '@/content/en';

export default function HomeEnglish() {
  return (
    <>
      <JsonLd content={en} />
      <Portfolio content={en} />
    </>
  );
}
