import React from 'react'
import { fireEvent, render, screen, act, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import koppsCourseSearch from '../util/internApi'
import NewSearchLandingPage from './NewSearchLandingPage'
import { useStore } from '../mobx'
import { TEST_API_ANSWER_ALGEBRA, TEST_API_ANSWER_RESOLVED } from '../components/mocks/mockKoppsCourseSearch'


const mockDate = new Date('2021-03-23 16:00')

jest.setTimeout(1000)

jest.mock('../mobx')
jest.mock('../util/internApi')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))
const periods = [
  'Spring 2021 period 3',
  'Spring 2021 period 4',
  '2021 summer',
  'Autumn 2021 period 1',
  'Autumn 2021 period 2',
  'Spring 2022 period 3',
  'Spring 2022 period 4',
  '2022 summer',
]
const eduLevels = ['Pre-university level', 'First cycle', 'Second cycle', 'Third cycle']
const showOptions = [
  'Courses taught in English',
  'Courses that deal with environment, environmental technology or sustainable development',
  'Dormant/Terminated course',
]
describe('Component <CourseSearch>, events', () => {
    test('test', async () => {
        const { rerender } = render(<NewSearchLandingPage />);
    })
})