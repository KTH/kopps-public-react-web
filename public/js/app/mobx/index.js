/* eslint no-use-before-define: ["error", "nofunc"] */

import MobxStoreProvider from './MobxStoreProvider'
import useStore from './useStore'
import { compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument } from './compress'
// import { compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument } from './compressWithPako'

export { MobxStoreProvider, useStore, compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument }
