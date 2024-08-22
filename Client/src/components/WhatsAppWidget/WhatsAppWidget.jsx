import { useState } from 'react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const phoneNumber = '34123456789';
  const defaultMessage = encodeURIComponent('Bienvenid@ a Tranbólico. ¿En qué puedo ayudarle?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div>
      <button 
        onClick={toggleChat} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          style={{ width: '100%', height: '100%' }}
        />
      </button>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            padding: '10px'
          }}
        >
          <iframe 
            src={whatsappUrl} 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="WhatsApp Chat"
          />
        </div>
      )}
    </div>
  );
};

