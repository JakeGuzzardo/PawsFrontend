import { Form, Button } from "react-bootstrap"

const CreateWalkerForm = ({ values, handleChange, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Walker Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter walker name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">
                Create
            </Button>
        </Form>
    )
}

export default CreateWalkerForm