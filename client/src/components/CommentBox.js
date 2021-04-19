import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentItem from './CommentItem'

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
                
                let res
                if(props.type.current==='post')res = await axios.get(`/post/${props.postId}`, config)
                else res = await axios.get(`/interview/${props.postId}`, config)
                
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

            let res
            if(props.type.current==='post')res = await axios.put(`/post/comment/${props.postId}`, body, config)
            else res = await axios.put(`/interview/comment/${props.postId}`, body, config)

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
                comments.map((comment, index) => {
                    return <CommentItem name={comment.name} text={comment.text} key={index}/>
                })
            }

        </>
    )
}

export default CommentBox
