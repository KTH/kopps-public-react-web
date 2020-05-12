import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from './Button'

test('loads and displays greeting', async () => {
  const { asFragment } = render(<Button message="This is a message" />)
  expect(asFragment()).toMatchSnapshot()

  expect(screen.getByTestId('message-header')).toHaveTextContent('This is a message')

  fireEvent.click(screen.getByText('Try me'))
  expect(screen.getByTestId('click-message')).toHaveTextContent('Button works!')
  expect(asFragment()).toMatchSnapshot()
})
