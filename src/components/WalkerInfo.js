import { useState } from 'react'
import EditWalkers from './EditWalkers'
import '../css/walkerInfo.css'

const WalkerInfo = ({ walkerData, setWalkerData, updatedWalker }) => {
    const [editMode, setEditMode] = useState(false)

    const handleEdit = () => {
        setEditMode(!editMode)
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/walkers/${walkerData._id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            setWalkerData({ name: "", email: "", phone: "", _id: "" })
            updatedWalker()
        } else {
            alert('Walker not deleted!')
        }
    }

    const handleChange = (e) => {
        setWalkerData({ ...walkerData, [e.target.name]: e.target.value })
    }

    if (walkerData._id === "") {
        return (< div className="walkerInfo" >
            <h1>Select a walker</h1>
        </div >)
    }

    return editMode ? (<EditWalkers
        walkerData={walkerData}
        handleEdit={handleEdit}
        handleChange={handleChange}
        updatedWalker={updatedWalker}
    />) :
        (< div className="walkerInfo" >
            <button className='editButton' onClick={handleEdit}>Edit</button>
            <button className='deleteButton' onClick={handleDelete}>Delete</button>
            <h1>{walkerData.name}</h1>
            <p>{walkerData.email}</p>
            <p>{walkerData.phone}</p>
        </div >)


}

export default WalkerInfo