const addNewInitialState = {
    name: '',
    age: '',
    mobile_number: '',
    address: '',
    job: '',
    blood_group: '',
    image: '',
}

const addNewFields = [
    {
        name: "name",
        type: "text",
        placeHolder: "Name",
    },
    {
        name: "age",
        type: "number",
        placeHolder: "Age",
    },
    {
        name: "mobile_number",
        type: "number",
        placeHolder: "Mobile Number",
    },
    {
        name: "address",
        type: "text",
        placeHolder: "House name",
    },
    {
        name: "job",
        type: "text",
        placeHolder: "Job",
    },
    {
        name: "blood_group",
        type: "text",
        placeHolder: "Blood group",
    },
    {
        name: "image",
        type: "file",
        placeHolder: "Image",
        required: false
    },
]

export {
    addNewFields,
    addNewInitialState
}