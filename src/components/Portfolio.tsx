import type { Content } from '@/content/types';
import { SmoothScroll } from '@/providers/SmoothScroll';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StageCanvas } from '@/components/StageCanvas';
import { ScrollEffects } from '@/components/ScrollEffects';
import { Hero } from '@/sections/Hero';
import { Manifesto } from '@/sections/Manifesto';
import { StackStory } from '@/sections/StackStory';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';

const STAGE_TRACK = 'stage-track';

/**
 * Página única. Estrutura:
 *   palco 3D fixo  ← Hero · Manifesto · Stack (seções transparentes)
 *   folha clara    ← Trajetória · Projetos · Sobre (cobre o palco, que pausa)
 *   Contato e rodapé no escuro.
 */
export function Portfolio({ content }: { content: Content }) {
  const layerNames = content.stack.layers.map((layer) => layer.name);
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        {content.a11y.skip}
      </a>
      <Header content={content} />
      <StageCanvas trackId={STAGE_TRACK} layerNames={layerNames} />

      <main id="main" tabIndex={-1}>
        <div id={STAGE_TRACK} className="stage-track">
          <Hero content={content} />
          <Manifesto content={content} />
          <StackStory content={content} />
        </div>

        <div className="content-sheet" data-theme="light">
          <Experience content={content} />
          <Projects content={content} />
          <About content={content} />
        </div>

        <Contact content={content} />
      </main>

      <Footer content={content} />
      <ScrollEffects />
    </SmoothScroll>
  );
}
