import React from 'react'
import { Row } from 'react-bootstrap'
import './titleTram.scss'

export const TitleTram = ({children, backgroundColor, color}) => {
  return (
    <Row className="mt-4 banner-titleTram d-flex align-items-center justify-content-center" style={{backgroundColor}}>
      <div className="ppal-titleTram flex-grow-1" style={{color}}>
      <h2 className="pb-2 m-0 text-center">{children}</h2>
      </div>
    </Row>
  )
}
