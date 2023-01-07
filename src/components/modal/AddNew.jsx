import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
// import { useApi } from '../hooks/useApi'

const AddNew = ({ onClose, initialState, fields = [], header, addItem, apiURI }) => {
    // const api = useApi()
    const [params, setParams] = useState(initialState)
    const [_fields, setFields] = useState(() => {
        fields.forEach((item) => {
            if (item["required"] === false) {
                return item
            } else {
                item["errorMessage"] = "This field is required"
                item['error'] = false
            }

            return item
        })

        return fields
    })
    const [isError, setError] = useState(false)


    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    const onChange = (e, field) => {
        let data = { ...params }
        let value = e.target.value

        if (e.target.type === "file") {
            data[e.target.name] = e.target.files[0]
        } else {
            data[e.target.name] = value
        }
        if (value.length <= 0) {
            setError(true)
            field.error = true
        } else {
            field.error = false
        }

        setParams(data)
    }

    const validate = () => {
        var error = true

        for (let key of Object.keys(params)) {

            if (params[key] === "") {
                let tempFields = _fields

                for (let property of tempFields) {
                    if (property["required"] === false) {
                        continue
                    }
                    if (property['name'] === key) {
                        property.error = true;
                        error = true;
                        setError(true)
                    }
                }
                setFields(tempFields)
            } else {
                error = false;
            }
        }
        return error
    }

    const submitHandler = () => {
        const hasError = validate()
        if (!hasError) {
            addItem(params)
            onClose()
        }

        // let formData = new FormData();

        // for (let item in params) {
        //     formData.append(item, params[item])
        // }

        // api
        //     .post(apiURI,formData)
        //     .then((response) => {
        //         const { data,statusCode } = response.data;
        //         console.log(data);

        //         if(statusCode === 6000){
        //              addItem(params)
        //             onClose()
        //         }
        //     })
        //     .catch(e => console.log(e))
    }

    return (
        <Wrapper onClick={onClose}>
            <Content onClick={e => e.stopPropagation()}>
                <div>
                    <div className="top">
                        <h1>{header}</h1>
                    </div>
                    <Form>
                        {_fields?.map((field, index) => (
                            <InputContainer key={index}>
                                <label htmlFor={field.name}>{field.placeHolder}</label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeHolder}
                                    value={field.type === "file" ? (params[field.name][0] || "") : params[field.name]}
                                    onChange={e => onChange(e, field)}
                                    disabled={field?.disabled}
                                    multiple={field?.multiple}
                                />
                                {(isError && field.error) ? <p>{field.errorMessage}</p> : null}
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

    label{
        display: inline-block;
        cursor:pointer;
        color: #746e6e;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 14px;
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