import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import PostItem from './PostItem'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { Alert } from '@material-ui/lab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MDBCol, MDBCard, MDBIcon, MDBBtn, MDBRow } from 'mdbreact';



function Post() {

    const [ posts, setPosts ] = useState([])
    const [ suggestions, setSuggestions ] = useState([])
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {

    setValue(newValue);
    
    if(newValue===0) {

        setSuggestions(posts)

    } else if(newValue===1) {

        const temp = posts.filter((post) => {
            if(!post.experience) {
                return post
            }
        })

        setSuggestions(temp)

    } else if(newValue===2) {

        const temp = posts.filter((post) => {
            if(post.experience) {
                return post
            }
        })

        setSuggestions(temp)

    }


  };

    useEffect(() => {

        if(localStorage.getItem('data')) {
            localStorage.removeItem('data')
        }
        if(localStorage.getItem('title')){
            localStorage.removeItem('title')
        }
        if(localStorage.getItem('text')){
            localStorage.removeItem('text')
        }

        const fetchPosts = async () => {

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                const res1 = await axios.get('/interview', config)
                const res2 = await axios.get('/post', config)
                
                let posts = res1.data
                posts.unshift(...res2.data)

                posts.sort((post1, post2) => {
                    let x = new Date(post1.updatedAt)
                    let y = new Date(post2.updatedAt)
                    if(x<y) return 1
                    if(x>=y) return -1
                    return 0
                })

                setPosts(posts)
                setSuggestions(posts)

            } catch (error) {

                console.log(error.response)

            }

        }

        fetchPosts()

    }, [])

    return(
        <MDBCol className="post pb-4 mt-4" xl="8">
            <MDBCard className="mx-5 mdb-color">
            <Paper className="mdb-color lighten-5">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
            <Tab label="All"  />
            <Tab label="Posts" icon={<MDBIcon icon="pen"/>}/>
            <Tab label="Interview Experiences" icon={<MDBIcon icon="chalkboard-teacher"/>}/>
  
            </Tabs>
            </Paper>
            { 1 && <MDBRow className="mt-5 mx-5 mb-5">
            
            
                <MDBCol size="12"><Link to={{pathname: 'dashboard/post'}}><MDBBtn className="w-100 mx-auto">Add Post</MDBBtn></Link></MDBCol>
                <MDBCol size="12"><Link to={{pathname: 'dashboard/interview-exp'}}><MDBBtn className="w-100 mx-auto" outline rounded>Add Interview Experience</MDBBtn></Link></MDBCol>
            </MDBRow> }
            </MDBCard>
        
            {
                suggestions.length!==0 ? 
                suggestions.map((post) => {
                    return <PostItem  key={post._id} data={post} parent="posts"/>
                }) : 
                <Alert  className="mx-5 mt-5" severity="info">No posts</Alert>

            }

        </MDBCol>
    )
}

export default Post