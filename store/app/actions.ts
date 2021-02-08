import { GenerateActions } from 'vendor/store/configure-store'

export type Actions = {
  SET_QUERY: ActionPayload<string>
  SET_LOADING: ActionPayload<boolean>
  SET_SELECTED_ID: ActionPayload<string>
}

export const AppAction = GenerateActions<Actions>()
