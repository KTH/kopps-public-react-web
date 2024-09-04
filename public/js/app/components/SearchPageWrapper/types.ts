export interface SearchPageWrapperProps<T = {}> {
  component: React.ComponentType<any>
  initApplicationStoreCallback: () => any
  props?: T
}
