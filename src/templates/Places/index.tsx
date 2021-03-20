import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

import LinkWrapper from 'components/LinkWrapper'

import * as S from './styles'

type ImageProps = {
  url: string
  height: number
  width: number
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <>
      <NextSeo
        title={`${place.name} - Game Popularity Map`}
        description={
          place.description?.text ||
          'A simple project to show the most popular games in some countries.'
        }
        canonical="https://game-popularity-map.luisarbezerra.com"
        openGraph={{
          url: 'https://game-popularity-map.luisarbezerra.com',
          title: `${place.name} - Game Popularity Map`,
          description:
            place.description?.text ||
            'A simple project to show the most popular games in some countries.',
          images: [
            {
              url: place.gallery[0].url,
              width: place.gallery[0].width,
              height: place.gallery[0].height,
              alt: `${place.name}`
            }
          ]
        }}
      />

      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Close" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name} </S.Heading>

          <S.Gallery>
            {place.gallery.map((image, index) => (
              <Image
                key={`photo-${index}`}
                src={image.url}
                alt={place.name}
                width={1000}
                height={300}
              />
            ))}
          </S.Gallery>

          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />
        </S.Container>
      </S.Wrapper>
    </>
  )
}
