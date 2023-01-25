import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import profile from "../../assets/icons/user.svg"


const AddNew = ({ onClose, initialState, fields = [], header, addItem }) => {
    // initial state 
    const [params, setParams] = useState(initialState)
    // input fields 
    const [_fields, setFields] = useState(() => {

        fields.forEach((item) => {

            if (item["required"] === false) {
                return item

            } else {
                item["errorMessage"] = "This field is required"
                item['error'] = false

                return item
            }
        })

        return fields
    })
    const [imageUrl, setUrl] = useState({})

    const [isImageExists] = useState(() => {
        var url = {}
        let exists = []
        for (let key in initialState) {
            // String(initialState[key]).includes("http://")
            if (String(key).includes('image')) {
                url[key] = initialState[key]
                exists.push(true)
                setUrl(url)
            } else {
                exists.push(false)
            }
        }
        if (exists.includes(true)) {
            return true
        }
    })


    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    // onchange function for all inputs 
    const onChange = (e, field) => {
        let data = { ...params }
        let value = e.target.value

        if (e.target.type === "file") {
            data[e.target.name] = e.target.files[0]
        } else {
            data[e.target.name] = value
        }
        if (value.trim().length === 0) {
            field.error = true
        } else {
            field.error = false
        }

        setFields([...new Set([..._fields, field])])
        setParams(data)
    }

    // form validation function 
    const validate = () => {
        var isValid = []

        let tempFields = _fields.map((item) => {

            if (item?.required === false) {
                item.error = false;
                isValid.push(false)

                return item
            } else if (params[item['name']].length === 0) {
                isValid.push(true)
                item.error = true;

                return item
            }

            return item;
        })

        setFields(tempFields)
        return isValid
    }

    const submitHandler = (e) => {
        const isValid = validate()

        let formData = new FormData();

        console.log(params);

        for (let item in params) {
            formData.append(item, params[item])
        }

        if (!isValid.includes(true)) {
            addItem(formData)
        }
    }

    const inputProps = (field) => {
        let prop = {
            type: field?.type,
            id: field?.id,
            name: field?.name,
            placeholder: field?.placeHolder,
            disabled: field?.disabled,
            multiple: field?.multiple,
        }
        if (field?.type !== "file") {
            prop["value"] = params[field?.name] || ""
        }

        return prop
    }

    return (
        <Wrapper onClick={() => onClose()}>
            <Content onClick={e => e.stopPropagation()}>
                <div>
                    <div className="top">
                        <h1>{header}</h1>
                    </div>
                    {isImageExists && (
                        <ImageContainer>
                            <img
                                loading='lazy'
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                src={imageUrl.image ? imageUrl.image : profile}
                                alt="something"
                            />
                            <input
                                type="file"
                                hidden
                                id="image"
                                name={Object.keys(imageUrl)[0]}
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        let field = _fields.filter(item => item.name === Object.keys(imageUrl)[0])[0] || ""

                                        onChange(e, field)

                                        let reader = new FileReader();

                                        reader.onload = (e) => {
                                            var imgObj = {}
                                            imgObj[Object.keys(imageUrl)[0]] = e.target.result
                                            setUrl(imgObj)
                                        };
                                        reader.readAsDataURL(e.target.files[0])
                                    }
                                }}
                            />
                            <label htmlFor="image">choose image</label>
                        </ImageContainer>
                    )}
                    <Form >
                        {_fields?.filter(item => item.type !== "file").map((field, index) => (

                            <InputContainer key={index}>
                                <label htmlFor={field.name}>{field.placeHolder}</label>
                                <input
                                    {...inputProps(field)}
                                    onChange={e => onChange(e, field)}
                                />
                                {(field.error) && <p>{field.errorMessage}</p>}
                            </InputContainer>

                        ))}
                    </Form>
                </div>
                <Bottom>
                    <div className="buttons-wrapper">
                        <Button onClick={onClose}>Cancel</Button>
                        <SaveButton onClick={submitHandler}>Save</SaveButton>
                    </div>
                </Bottom>
            </Content>
        </Wrapper>
    )
}

export default AddNew

const Wrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #534e4e34;
    z-index: 10;

    *{
		user-select: none;
	}
`

const fadeIn = keyframes`
    0%{
        scale: .7;
        opacity: 0.8;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`

const Content = styled.main`
    width: 980px;
    max-width: 90%;
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-between;
    /* height: 700px; */
    background: #111;
    border-radius: 16px;
    padding: 32px;
    animation:${fadeIn} .3s ease-in-out ;

    h1{
        color: #fff;
        font-size: 32px;
        /* text-align: center; */
        margin-bottom: 46px;
    }
`

const Form = styled.div`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 42px;
`
const InputContainer = styled.div`
    width: 49%;
    margin-bottom: 6px;
    position: relative;

    label{
        display: inline-block;
        cursor:pointer;
        color: #746e6e;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    input{
        border: 1px solid #686771b9;
        display: block;
        width: 100%;
        padding: 12px ;
        border-radius: 8px;
        font-size: 17px;
        color: #9d9999;

        ::-webkit-input-placeholder{
            color:#9d9999 ;
        }

        :focus-within{
		    border-color: #4b1989;
	    }
        :disabled{
            cursor: not-allowed;
            user-select: none;
        }
    }
    p{  
        position: absolute;
        right: 0;
        font-size: 12px;
        letter-spacing: 1px;
        color: red;
    }
`

const Bottom = styled.div`
    display: flex;
    justify-content: flex-end;

    &>.buttons-wrapper{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        /* justify-content: space-between; */
    }
`

const Button = styled.button`
    display: block;
    width: 47%;
    cursor: pointer;
    border: 1px solid #75728e;
    padding: 18px;
    border-radius: 8px;
    margin-right: 18px;
    font-size: 18px;
    color: #e8e3f9;

    :last-child{
        margin-right: 0;
    }
`

const SaveButton = styled(Button)`
    border:none;
    background: #4b1989;
`

const ImageContainer = styled.div`
    padding: 16px;
    display: flex;
    gap: 32px;
    align-items: center;

    label{
        background-color:#e8e3f9 ;
        padding: 4px 10px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 13px;
        color: #111;
        cursor: pointer;
    }
`