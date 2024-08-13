import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css";
import "./msgVerify.scss"

export const MsgVerifyEmail = () => {
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

          <p>Te hemos enviado un correo de verificación. 
            Por favor, revisa tu bandeja de entrada
             y sigue las instrucciones para activar tu cuenta</p>
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