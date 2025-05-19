export type DataItem =
  | string
  | {
      content: React.ReactElement | string
      sortKey: string
    }
