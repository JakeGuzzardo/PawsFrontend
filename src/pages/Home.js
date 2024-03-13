import { useEffect, useState, useCallback } from "react"
import DogSelector from "../components/dogSelector"
import WalkerSelector from "../components/walkerSelector"

const Home = () => {
    const [dogs, setDogs] = useState(null)
    const [selectedDogs, setSelectedDogs] = useState({})
    const [selectedWalker, setSelectedWalker] = useState("")
    const [selectedPack, setSelectedPack] = useState({ 0: "AM", 1: "AM", 2: "AM", 3: "AM" })
    const [walkers, setWalkers] = useState([])
    const [packs, setPacks] = useState(1)
    const [submitStatus, setSubmitStatus] = useState('idle')

    const handleSetSelectedWalker = (newSelection) => {
        setSelectedWalker(newSelection)
    }


    useEffect(() => {
        const fetchDogs = async () => {
            const response = await fetch('/api/dogs')
            const json = await response.json()

            if (response.ok) {
                setDogs(json)
            }
        }

        fetchDogs()
    }, [])

    useEffect(() => {
        const fetchWalkers = async () => {
            const response = await fetch('/api/walkers')
            const json = await response.json()

            if (response.ok) {
                setWalkers(json)
            }
        }

        fetchWalkers()
    }, [])

    useEffect(() => {
        setPacks((prevPacks) => {
            setSelectedDogs(prevSelectedDogs => {
                const newSelectedDogs = { ...prevSelectedDogs }
                for (let i = 0; i < packs; i++) {
                    if (newSelectedDogs[i] === undefined) {
                        newSelectedDogs[i] = []
                    }
                }
                return newSelectedDogs;
            })
            return prevPacks;
        })
    }, [packs])

    useEffect(() => {
        if (walkers.length > 0) {
            setSelectedWalker(walkers[0]._id);
        }
    }, [walkers])


    const onDogAdd = useCallback((newTag, index) => {
        setSelectedDogs(prev => ({
            ...prev,
            [index]: [...(prev[index] || []), newTag]

        }))
    }, [])


    const onDogDelete = useCallback((tagIndex, packIndex) => {
        setSelectedDogs(prev => ({
            ...prev,
            [packIndex]: prev[packIndex].filter((_, i) => i !== tagIndex)
        }))
    }, [])


    const generateSuggestions = () => {
        if (dogs) {
            const formattedDogs = dogs.map((dog) => {
                return { value: dog._id, label: dog.name }
            })
            return formattedDogs
        }
        return []
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const dogs = Object.keys(selectedDogs).map((packIndex) => {
            return selectedDogs[packIndex].map((dog) => {
                return dog.value
            })
        })
        const schedule = {
            dogs,
            selectedWalker,
            selectedPack,
            packs
        }

        console.log(schedule)
        const response = await fetch('/api/walkers/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(schedule)
        })

        if (response.ok) {
            setSelectedDogs({})
            setSubmitStatus('success')
        } else {
            setSubmitStatus('failure')
        }
    }

    // Set a timer to reset the submit status
    useEffect(() => {
        let timer
        if (submitStatus === 'success' || submitStatus === 'failure') {
            setTimeout(() => {
                timer = setSubmitStatus('idle')
            }, 3000)
        }

        return () => clearTimeout(timer)

    }, [submitStatus])

    const handlePackTimeChange = (e, index) => {
        setSelectedPack(prev => {
            const newSelectedPack = { ...prev }
            newSelectedPack[index] = e.target.value
            return newSelectedPack
        })
    }

    const renderPacks = () => {
        let packArray = []
        for (let i = 0; i < packs; i++) {
            packArray.push(
                <div key={i} className="pack">
                    <h2>Pack {i + 1}</h2>
                    <select onChange={(e) => handlePackTimeChange(e, i)} >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        <option value="MIDDAY">Midday</option>
                        <option value="LATE">Late</option>
                    </select>
                    <DogSelector
                        selected={selectedDogs[i] || []}
                        onAdd={(newTag) => onDogAdd(newTag, i)}
                        onDelete={(tagIndex) => onDogDelete(tagIndex, i)}
                        suggestions={generateSuggestions()}
                    />
                </div>
            )
        }
        return packArray
    }


    return (
        <div className="home">
            <h1 className="homeTitle">Create Schedules</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="packs">Number of packs:</label>
                <select onChange={e => setPacks(e.target.value)} id="packs">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <WalkerSelector onSelectionChange={handleSetSelectedWalker} walkers={walkers} selectedWalker={selectedWalker} />
                {renderPacks()}
                <button type="submit">Create Schedule</button>
            </form>
        </div>
    )
}

export default Home