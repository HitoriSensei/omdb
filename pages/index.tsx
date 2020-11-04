import React from 'react'
import { VendorGetStaticProps } from 'vendor/utils/VendorGetStaticProps'

type Props = { date: string }

const PagesIndex = (props: Props) => {
  return (
    <>
      Hello
      {props.date}
    </>
  )
}

export const getStaticProps = VendorGetStaticProps<Props>(async () => ({
  props: {
    date: new Date().toISOString(),
  },
}))

export default PagesIndex
