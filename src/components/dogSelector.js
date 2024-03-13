import React from "react";
import { ReactTags } from 'react-tag-autocomplete';


const DogSelector = ({ selected, suggestions, onAdd, onDelete }) => {
    return (
        <div>
            <ReactTags
                labelText="Select Dogs"
                selected={selected}
                suggestions={suggestions}
                onAdd={onAdd}
                onDelete={onDelete}
            />
        </div>

    )

}

export default DogSelector