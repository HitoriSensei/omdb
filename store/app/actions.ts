import { GenerateActions } from '../../vendor/store/configure-store'

export type Actions = {
  SET_MODAL_OPEN_STATE: ActionPayload<{
    isModalOpen: boolean
  }>
  TOGGLE_MODAL_OPEN_STATE: null
}

export const AppAction = GenerateActions<Actions>()
