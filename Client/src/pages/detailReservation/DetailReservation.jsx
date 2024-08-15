import { useOutletContext } from "react-router-dom"

export const DetailReservation = () => {
  const {reservation, setReservation} = useOutletContext();

  return (
    <div>DetailReservation</div>
  )
}
