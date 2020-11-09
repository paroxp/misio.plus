import Link from 'next/link';
import React, { ReactElement, ReactNode } from 'react';

import { Footer, Header } from '../../partials';

import styles from './styles.module.scss';

interface PageProperties {
  readonly children: ReactNode;
}

interface DifficulityProperties {
  readonly children: ReactNode;
  readonly title: string;
}

interface ModelProperties {
  readonly model: string;
  readonly name: string;
}

interface EncoutnerProperties extends ModelProperties {
  readonly children: ReactNode;
  readonly open?: boolean;
}

export interface BossProperties {
  readonly open?: boolean;
}

export function Difficulity({ children, title }: DifficulityProperties): ReactElement {
  return <>
    <dt>
      {title}
    </dt>
    <dd>
      {children}
    </dd>
  </>;
}

export function Model(props: ModelProperties): ReactElement {
  return <p>
    <img
      src={`https://wow.zamimg.com/uploads/screenshots/normal/${props.model}.jpg?maxWidth=800`}
      alt={`Model Bossa: ${props.name}`} />
  </p>;
}

export function Encounter(props: EncoutnerProperties): ReactElement {
  const slug = props.name.toLocaleLowerCase().replace(/(\s_?:?@?\/?\\?)+/g, '-').replace(/[^0-9a-zA-Z-]/g, '');

  return <details id={slug} open={props.open}>
    <summary>
      <h2>
        {props.name} {}
        <small>
          <Link
            href={{
              pathname: '/raid/castle-nathria/[slug]',
              query: { slug },
            }}
            // title={`Bezpośredni link do bossa: ${props.name}`}
          >
            [bezpośrednik]
          </Link>
        </small>
      </h2>
    </summary>

    {props.children}
  </details>;
}

export function Page(props: PageProperties): ReactElement {
  return <>
    <Header subtitle="Rajdy" page='raid' />

    <main className={styles.raid}>
      <div className="information">
        <h3>Rekrutacja na rajdy trwa!</h3>

        <p>Jeśli interesuje Cię rajdowanie z nami, napisz smiało a na pewno, dojdziemy do porozumienia!</p>

        <p className="collapsed">Dni Rajdowe:</p>

        <p className="collapsed">
          <span className="visually-hidden">Dni rajdowe:</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Sobota, Niedziela - <strong>Ectimel</strong>
        </p>

        <p className="collapsed">
          <span className="visually-hidden">Dni rajdowe:</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Poniedziałek, Środa - <strong>Dulamari</strong>
        </p>

        <p>
          Rajd dla {}
          <abbr title={'osób jeszcze zapoznających się z mechaniką, samą grą, bądź też cierpliwych i chętnych '
            + 'nadgonić z poziomem itemów'}>
            Gałganów
          </abbr> - <strong>Matronalis</strong>
        </p>

        <p className="collapsed">
          Kontakt dodatkowy: {}
          <strong>Liferie</strong>, {}
          <strong>Cefeon</strong>, {}
          <strong>Melonek</strong>, {}
          <strong>Narkoromek</strong>
        </p>

        <p>
          <em>
            Każdy z nas ma alty bądź może nie być dostępny w danej chwili w grze.
            Pytajcie na czacie lub Discordzie a zapewniam, że nikt nie zostanie umyślnie zignorowany.
          </em>
        </p>
      </div>

      <h1>
        <span className="visually-hidden">Rajd: </span>
        Castle Nathria
      </h1>

      {props.children}
    </main>

    <Footer />
  </>;
}
