import React from 'react'
import { NextPage } from 'next'
import { VendorGetStaticProps } from 'vendor/utils/VendorGetStaticProps'

const Pages404: NextPage = () => {
  return <>404</>
}

export const getStaticProps = VendorGetStaticProps()

export default Pages404
