import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline'

import LinkWrapper from 'components/LinkWrapper'
import { MapProps } from 'components/Map'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo
        title="Game Popularity Map"
        description="A simple project to show the most popular games in some countries."
        canonical="https://game-popularity-map.luisarbezerra.com"
        openGraph={{
          url: 'https://game-popularity-map.luisarbezerra.com',
          title: 'Game Popularity Map',
          description:
            'A simple project to show the most popular games in some countries.',
          site_name: 'Game Popularity Map'
        }}
      />

      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
