declare type StyleVariant<
  P extends keyof T = string,
  T extends Record<string, string> = Record<string, string>
> = P
