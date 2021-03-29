import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentItem from './CommentItem'
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';

function CommentBox(props) {

    const [ data, setFormData ] = useState('')
    const [ comments, setComments ] = useState([])

    useEffect(() => {

        const fetchComments = async () => {

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                const res = await axios.get(`http://localhost:5000/post/${props.postId}`, config)

                setComments(res.data.comments)
    
            } catch (error) {   
                
                console.log(error.response)

            }

        }

        fetchComments()

    }, [])

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }

            const body = { text: data }

            const res = await axios.put(`http://localhost:5000/post/comment/${props.postId}`, body, config)

            setFormData('')
            setComments(res.data.comments)

        } catch (error) {   
            
            console.log(error.response)

        }


    }

    return (
        <>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="form-group focused mt-4 mb-5 ">
                    <input type="text" 
                        className="form-control form-control-alternative addComment" 
                        placeholder="Add comment" 
                        value={data}
                        onChange={e => setFormData(e.target.value)}
                    />
                </div>
            </form>
            {
                comments && 
                comments.map((comment) => {
                    return <CommentItem name={comment.name} text={comment.text} />
                })
            }

        </>
    )
}

export default CommentBox
