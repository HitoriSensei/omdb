import React from 'react'
import { NextPage } from 'next'
import { getStaticPropsWithStore } from 'vendor/utils/getServerSideProps'
import { HandleErrors } from 'vendor/utils/defaultErrorHandler'
import { fetchPageIndexData } from 'data/fetchPageIndexData'

type Props = { date: string }

const PagesIndex: NextPage = HandleErrors((props: Props) => {
  return (
    <>
      Hello
      {props.date}
    </>
  )
})

export const getStaticProps = getStaticPropsWithStore<Props>(
  async (
    {
      /* store - use if you want to dispatch any redux actions when loading a page */
    },
  ) => {
    return {
      props: await fetchPageIndexData(),
      revalidate: 10, // In seconds
    }
  },
)

export default PagesIndex
