
import { Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const CreateDogForm = ({ values, handleChange, handleSubmit }) => {

    const location = useLocation()
    const isEditPage = location.pathname.includes('editDog')

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Dog Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter dog name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Owner</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Owner's Name"
                    name="primaryOwner"
                    value={values.primaryOwner}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Notes"
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">
                {isEditPage ? 'Update' : 'Create'}
            </Button>
        </Form>
    )

}

export default CreateDogForm