import { useOutletContext } from 'react-router-dom'

export const ReturnDate = () => {
  const {reservation, setReservation} = useOutletContext();

  return (
    <div>ReturnDate</div>
  )
}
