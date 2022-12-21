import React, { useState } from 'react'
import ItemHeader from '../includes/main/ItemHeader'

const Houses = () => {
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [disableDelete, setDisableDelete] = useState(true)

  const bulkDeleteHandler = () => {
    console.log("bulk delete button triggered");
  }

  const addNewHandler = () => {
    console.log("Add new button triggered");
  }

  return (
    <div>
      <ItemHeader
        header="Houses"
        setSearchKeyWord={setSearchKeyWord}
        addNewHandler={addNewHandler}
        deleteMethod={bulkDeleteHandler}
        disableDelete={disableDelete}
      />
    </div>
  )
}

export default Houses