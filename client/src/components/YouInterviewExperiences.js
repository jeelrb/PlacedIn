import React, { useState, useEffect } from 'react'
import PostItem from './PostItem'
import Navbar from './Navbar'
import { Alert } from '@material-ui/lab';
import axios from 'axios'
import {  MDBContainer } from 'mdbreact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function YouInterviewExperiences() {

    const [ posts, setPosts ] = useState([])
    
    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                const res1 = await axios.get('/interview/my', config)
                
                let posts = res1.data
               
                posts.sort((post1, post2) => {
                    let x = new Date(post1.updatedAt)
                    let y = new Date(post2.updatedAt)
                    if(x<y) return 1
                    if(x>=y) return -1
                    return 0
                })
        
                setPosts(posts)
               

            } catch (error) {

                console.log(error.response)

            }


        }

        fetchPosts()

    },[])

    const onDelete = async (post_id) => {
        
        toast.success('Interview Experience deleted !', { 
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })

        const Posts = posts.filter((post) => {
            return post._id!==post_id
        })

        setPosts(Posts)

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
            
            const res1 = await axios.delete(`/interview/my/${post_id}`, config)
            

        } catch (error) {

            console.log(error.response)

        }

    }

    return (
        <>
        <Navbar />
        <MDBContainer className="post pb-4 mt-4 " xl="8">
            {
                posts.length!==0 ?
                posts.map((post) => {
                    return <PostItem  key={post._id} data={post} parent="Interview Experience" onDelete={onDelete}/>
                })
                :
                <Alert severity="info">No interview experiences!!</Alert>
            }
        </MDBContainer>
        </>
    )
}

export default YouInterviewExperiences
