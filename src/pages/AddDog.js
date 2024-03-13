import { useState } from "react"
import CreateDogForm from "../components/CreateDogForm"

const AddDogs = () => {
    const initialFormValues = { name: '', address: '', primaryOwner: '', notes: '' }

    const [formValues, setFormValues] = useState(initialFormValues)

    const handleSetFormValues = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormValues(initialFormValues)
        console.log(formValues)

        const response = await fetch('/api/dogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })

        if (response.ok) {
            alert('Dog added!')
        } else {
            alert('Dog not added!')
        }
    }

    const handleDevCreate = async () => {
        const response = await fetch('/api/dogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'dev dog',
                address: 'dev address',
                primaryOwner: 'dev owner',
                notes: 'dev notes'
            })
        })

        if (response.ok) {
            console.log('Dog added!')
        } else {
            alert('Dog not added!')
        }
    }



    return (
        <div className="container-md">
            <CreateDogForm
                values={formValues}
                handleChange={handleSetFormValues}
                handleSubmit={handleSubmit} />

            <button onClick={handleDevCreate}>dev create</button>
        </div>
    )
}

export default AddDogs