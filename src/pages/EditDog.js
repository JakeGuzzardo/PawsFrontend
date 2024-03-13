import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import CreateDogForm from "../components/CreateDogForm"

const EditDogs = () => {


    const initialFormValues = { name: '', address: '', primaryOwner: '', notes: '' }
    const { dogId } = useParams()

    const [formValues, setFormValues] = useState(initialFormValues)

    const handleSetFormValues = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const fetchDog = async () => {
            const response = await fetch(`/api/dogs/${dogId}`)
            const json = await response.json()

            if (response.ok) {
                setFormValues(json)
            }
        }

        fetchDog()
    }, [dogId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formValues)

        const response = await fetch(`/api/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })

        if (response.ok) {
            console.log('updated!')
        } else {
            alert('not updated!')
        }
    }


    return (
        <div className="container-md">
            <CreateDogForm
                values={formValues}
                handleChange={handleSetFormValues}
                handleSubmit={handleSubmit} />
        </div>
    )
}

export default EditDogs