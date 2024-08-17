import { useLocation, useOutletContext } from 'react-router-dom'

export const ReturnDate = () => {
  const {reservation, setReservation} = useOutletContext();
  const location = useLocation()

  console.log(location)
  return (
    <div>ReturnDate</div>
  )
}
