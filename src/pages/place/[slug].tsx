import { GetStaticProps } from 'next'
import client from 'graphql/client'
import { GET_PLACES, GET_PLACES_BY_SLUG } from 'graphql/queries'
import { useRouter } from 'next/dist/client/router'

import PlaceTemplate, { PlacesTemplateProps } from 'templates/Places'
import { GetPlacesQuery, GetPlaceBySlugQuery } from 'graphql/generated/graphql'

export default function Place({ place }: PlacesTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <PlaceTemplate place={place} />
}

// build-time page path
export async function getStaticPaths() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })

  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// build-time page data
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACES_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return { notFound: true }

  return {
    props: {
      place
    }
  }
}
