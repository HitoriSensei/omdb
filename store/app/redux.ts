import { HYDRATE } from 'next-redux-wrapper'

export interface Store {
  selectedId?: string
  query: string
  loading: boolean
}

export const appInitialStore: Store = {
  query: '',
  loading: false,
}

export function appReducer(state = appInitialStore, action: Values<StoreActions>): Store {
  switch (action.type) {
    case 'SET_QUERY': {
      return {
        ...state,
        query: action.payload,
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case 'SET_SELECTED_ID': {
      return {
        ...state,
        selectedId: action.payload,
      }
    }
    case HYDRATE: {
      return {
        ...action.payload.app,
      }
    }
  }

  return state
}
