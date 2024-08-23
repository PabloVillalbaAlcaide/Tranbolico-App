import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export const ButtonRadio = ({radios, radioValue, setRadioValue}) => {
  
  return (
    <>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            style={{
              backgroundColor: radio.value === '1' ? '#91cad8' : radio.value === '2' ? '#e3b6d4' : '#b3b420',
              color: 'white',
              borderColor: radio.value === '1' ? '#91cad8' : radio.value === '2' ? '#e3b6d4' : '#b3b420',
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
};
