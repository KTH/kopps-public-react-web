declare module 'kth-node-i18n' {
  /** Shape of each language entry in your messages array */
  export interface Language {
    shortNames: string[]
    longNameEn: string
    messages: Record<string, string>
  }

  /** The default language short code (e.g. 'sv') */
  export const DEFAULT_LANG: string

  /** All available language entries */
  export const messages: Language[]

  /**
   * Fetches a language by its short name.
   * Returns undefined if no language was found.
   */
  export function getLanguageByShortname(shortName?: string): Language | undefined

  /**
   * Returns the message for a given key in the active language.
   * @param key the message key
   * @param overrideLang optional override short code
   */
  export function message(key: string, overrideLang?: string): string

  /** True if the current language (via cookie) is Swedish */
  export function isSwedish(): boolean
  /** True if the current language (via cookie) is English */
  export function isEnglish(): boolean
}
