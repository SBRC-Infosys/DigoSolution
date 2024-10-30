import AutomaticNumbers from '@/components/AutomaticNumbers/AutomaticNumbers'
import Breadcrumb from '@/components/Common/Breadcrumb'
import React from 'react'

const AWS = () => {
  return (
    <div>   <Breadcrumb
    pageName="AWS"
    description="AWS (Amazon Web Services) is a cloud computing platform that provides a wide range of services including computing, storage, database, analytics, and machine learning."
  />
  <AutomaticNumbers/>
  </div>
  )
}

export default AWS