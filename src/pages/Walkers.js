import { useState, useEffect } from "react"
import WalkerInfo from '../components/WalkerInfo'
import CreateWalkerForm from "../components/CreateWalkerForm"
import '../css/walkers.css'

const Walkers = () => {
    const initialWalkerData = { name: "", email: "", phone: "", _id: "" }
    const createInitialWalkerData = { name: "", email: "", phone: "" }

    const [walkers, setWalkers] = useState({})
    const [loading, setLoading] = useState(true)
    const [walkerData, setWalkerData] = useState(initialWalkerData)
    const [createWalkerData, setCreateWalkerData] = useState(createInitialWalkerData)

    //used to trigger a re-render when a walker is added
    const [updatedWalker, setUpdatedWalker] = useState(false)

    const handleCreateWalker = (e) => {
        setCreateWalkerData({
            ...createWalkerData,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(createWalkerData)
        const response = await fetch('/api/walkers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createWalkerData)
        })

        if (response.ok) {
            setCreateWalkerData(createInitialWalkerData)
            setUpdatedWalker(updatedWalker => !updatedWalker)
        } else {
            alert('Walker not added!')
        }
    }


    useEffect(() => {
        const fetchWalkers = async () => {
            const response = await fetch("/api/walkers")
            const data = await response.json()
            const walkerDict = data.reduce((acc, walker) => {
                acc[walker._id] = walker
                return acc
            }, {})
            setWalkers(walkerDict)
            setLoading(false)

            //check if there is a saved walker. Assigns if there is
            const savedWalker = localStorage.getItem("selectedWalkerId")
            if (savedWalker && walkerDict[savedWalker]) {
                setWalkerData(walkerDict[savedWalker])
            }
        }
        fetchWalkers()


    }, [updatedWalker])

    const handleWalkerUpdate = () => {
        setUpdatedWalker(updatedWalker => !updatedWalker)
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    const handleSelectionChange = (e) => {
        if (e.target.value === "") {
            setWalkerData(initialWalkerData)
            localStorage.removeItem("selectedWalkerId")
            return
        }
        setWalkerData(walkers[e.target.value])
        localStorage.setItem("selectedWalkerId", e.target.value)

    }



    return (
        <div className="container">
            <div className="selectWalker">
                <label htmlFor="walkers">Select a walker:</label>
                <select name="walkers" id="walkers" onChange={handleSelectionChange} value={walkerData._id}>
                    <option value="">Select a walker</option>
                    {Object.entries(walkers).map(([id, walker]) => {
                        return (
                            <option key={id} value={id}>
                                {walker.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="showWalker">
                <WalkerInfo
                    walkerData={walkerData}
                    setWalkerData={setWalkerData}
                    updatedWalker={handleWalkerUpdate}
                />
            </div>
            <div className="createWalker">
                <h2>Add a new walker</h2>
                <CreateWalkerForm
                    values={createWalkerData}
                    handleChange={handleCreateWalker}
                    handleSubmit={handleCreateSubmit}

                />
            </div>

        </div>
    )
}


export default Walkers