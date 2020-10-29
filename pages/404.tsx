import React from 'react'
import { NextPage } from 'next'
import { getStaticPropsWithStore } from '../vendor/utils/getServerSideProps'

const Pages404: NextPage = () => {
  return <>404</>
}

export const getStaticProps = getStaticPropsWithStore(async () => {
  return {
    props: {},
  }
})

export default Pages404
