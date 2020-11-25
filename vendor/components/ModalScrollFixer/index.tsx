import { useSelector } from 'react-redux'
import { isModalOpenSelector } from 'store/app/selectors'
import { useLockScroll } from '../../hooks/useLockScroll'

export const ModalScrollFixer = (): null => {
  const isModalOpen = useSelector(isModalOpenSelector)

  useLockScroll(isModalOpen)

  return null
}
