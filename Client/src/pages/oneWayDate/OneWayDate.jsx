import { useOutletContext } from 'react-router-dom'

export const OneWayDate = () => {
  const {reservation, setReservation} = useOutletContext();

  return (
    <div>OneWayDate</div>
  )
}
