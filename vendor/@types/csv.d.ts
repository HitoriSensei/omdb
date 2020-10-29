/**
 * Type that forces unknown string to be split and trimmed before it can be used as a key.
 *
 * NOTICE: Since it guarantees normalization, it doesn't guarantee that data inside
 * the supplied csv string is really a string consisting of T strings
 */
interface CSVString<T extends string, Separator = ','> {
  split(separator: ','): Array<{ trim(): T }>
}
