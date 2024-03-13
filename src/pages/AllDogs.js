import { useEffect, useState, useMemo, useRef } from 'react'
import DogInfo from '../components/dogInfo'
import Form from 'react-bootstrap/Form'

const AllDogs = () => {

    const [dogs, setDogs] = useState([])
    const [query, setQuery] = useState('')
    const cardContainerRef = useRef(null)

    const removeDog = (dogId) => {
        setDogs(prevDogs => prevDogs.filter(dog => dog._id !== dogId))
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

    // Scroll to top when query changes
    useEffect(() => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollTop = 0
        }
    }, [query])

    const filteredDogs = useMemo(() => {
        console.log('filtering dogs')
        return dogs.filter(dog => {
            return dog.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [dogs, query])


    return (
        <div className='alldogs'>
            <Form.Control
                style={{ width: '500px' }}
                type="text"
                placeholder="Search"
                className="searchBar"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            <div ref={cardContainerRef} className="card-container">
                {filteredDogs.map((dog) => (
                    <DogInfo
                        key={dog._id}
                        dogName={dog.name}
                        dogAddress={dog.address}
                        dogOwner={dog.primaryOwner}
                        dogId={dog._id}
                        dogNotes={dog.notes ? dog.notes : 'No notes'}
                        removeDog={removeDog}
                    />
                ))}
            </div>
        </div >
    )

}

export default AllDogs

