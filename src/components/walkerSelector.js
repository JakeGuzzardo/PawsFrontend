
const WalkerSelector = ({ onSelectionChange, walkers }) => {

    const handleSelectionChange = (e) => {
        onSelectionChange(e.target.value)
    }


    return (
        <select onChange={handleSelectionChange}>
            {walkers.map((walker) => (
                <option key={walker._id} value={walker._id}>{walker.name}</option>
            ))}
        </select>
    )
}

export default WalkerSelector