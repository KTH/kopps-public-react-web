import { MIXED_SEARCH_DATA_SE } from '../../components/mocks/mockSearchData'

export const courseSearch = jest.fn().mockResolvedValue({
  searchData: MIXED_SEARCH_DATA_SE,
})
