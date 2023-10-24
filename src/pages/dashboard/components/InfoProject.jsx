import { useParams } from 'react-router-dom';

function InfoProject() {
    const { id } = useParams();
  return (
    <div><h1> {id}</h1></div>
  )
}
export default InfoProject