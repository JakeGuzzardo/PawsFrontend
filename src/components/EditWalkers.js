const EditWalkers = ({ walkerData, handleEdit, handleChange, updatedWalker }) => {

    const save = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/walkers/${walkerData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(walkerData)
        })
        if (response.ok) {
            console.log('Walker updated')

        } else {
            console.log('Walker not updated')
        }
        updatedWalker()
        handleEdit()
    }


    return (
        <div>


            <form onSubmit={save}>
                <div className="walkerInfo">
                    <button className='editButton' type="submit">Save</button>
                    <h1><input type="text"
                        id="name" name="name"
                        value={walkerData.name}
                        className="editWalkerData"
                        onChange={handleChange}
                    /></h1>
                    <input type="text"
                        id="email"
                        name="email"
                        value={walkerData.email}
                        className="editWalkerData"
                        onChange={handleChange} />
                    <input type="text"
                        id="phone" name="phone"
                        value={walkerData.phone}
                        className="editWalkerData"
                        onChange={handleChange} />
                </div>
            </form>

        </div>)

}

export default EditWalkers