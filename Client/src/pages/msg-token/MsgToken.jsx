import React, { Fragment, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css";
import { useParams } from 'react-router-dom';

export const MsgToken = () => {
  const{token}= useParams()
  useEffect(()=> {},
  []
  
    )
  return (

    <>
      <Row>
        <Col>
         <div  className="d-flex flex-column align-items-center justify-content-center ppal-verify">
          <div className='imagen-pollo' >
            <img src="/public/images/Trambólico.png" alt="Trambolico" width={"150px"}/>
          </div>
         <div className="text-center mb-3 style-verify w-25 p-5 d-flex justify-content-center flex-column align-items-center">
                <img
                  src="/public/images/enviando.png"
                  alt="Verify"
                  width={"50px"}
                />
              
          <h3>Verificación por email</h3>

          <p>Cuenta verificada correctamente</p>
             </div>
             <div className='imagen-rabbit'>
            <img src="/public/images/Trambólico2.png" alt="Trambolico2" width={"150px"}/>
          </div>
         </div>
          
        </Col>
      </Row>
    </>
  );
};