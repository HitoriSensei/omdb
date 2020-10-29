export interface Store {
  isModalOpen: boolean
}

export const appInitialStore: Store = {
  isModalOpen: false,
}

export function appReducer(state = appInitialStore, action: Values<StoreActions>): Store {
  switch (action.type) {
    case 'SET_MODAL_OPEN_STATE':
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
      }
    case 'TOGGLE_MODAL_OPEN_STATE':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      }
  }

  return state
}
