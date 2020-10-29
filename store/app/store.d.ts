declare interface StoreRoot {
  app: import('./redux').Store
}

declare interface StoreActions extends ActionsMap<import('./actions').Actions> {}
