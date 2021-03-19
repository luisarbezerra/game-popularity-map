import { render, screen } from '@testing-library/react'

import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    expect(
      screen.getByRole('link', { name: /a js library for interactive maps/i })
    ).toBeInTheDocument()
  })

  it('should render with the marker in the correct place', () => {
    const place1 = {
      id: '1',
      name: 'Madrid',
      slug: 'madrid',
      location: {
        latitude: 0,
        longitude: 0
      }
    }

    const place2 = {
      id: '2',
      name: 'Barcelona',
      slug: 'barcelona',
      location: {
        latitude: 100,
        longitude: 200
      }
    }

    render(<Map places={[place1, place2]} />)

    expect(screen.getByTitle(/madrid/i)).toBeInTheDocument()
    expect(screen.getByTitle(/barcelona/i)).toBeInTheDocument()
  })
})
