import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import '../css/dogInfo.css'
import { useNavigate } from 'react-router-dom'

const DogInfo = ({ dogName, dogAddress, dogOwner, dogId, removeDog, dogNotes }) => {

    const naviagte = useNavigate()

    const handleDelete = async () => {
        const response = await fetch(`/api/dogs/${dogId}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log('Dog deleted')
            removeDog(dogId)
        }
    }

    const handleEdit = () => {
        naviagte(`/editDog/${dogId}`)
    }

    return (
        <Card className='card-style'>
            <Card.Title className='cardTitle'>
                <span>{dogName}</span>
                <button className='deleteButton' onClick={handleDelete}>&#x2715;</button>
                <button className='editButton' onClick={handleEdit}>&#9998;</button>
            </Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Address: {dogAddress}</ListGroup.Item>
                <ListGroup.Item>Owner: {dogOwner}</ListGroup.Item>
            </ListGroup>
            <Accordion className='accordion-flush'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>General info</Accordion.Header>
                    <Accordion.Body>
                        {dogNotes}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card>
    )
}

export default DogInfo