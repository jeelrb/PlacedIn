import React, { useState, useEffect } from 'react'
import CommentBox from './CommentBox'
import parse from 'html-react-parser'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddComment from '@material-ui/icons/AddCommentRounded';
import Like from '@material-ui/icons/ThumbUpAltOutlined';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';

function PostItem(props) {

    const [ title, setTitle ] = useState('')
    const [ questions, setQuestions ] = useState([])
    const [ subjects, setSubjects ] = useState([])
    const [ text, setText ] = useState('')
    const [ onCommentClick, setOnCommentClick ] = useState(false)

    const onClick = () => {
        setOnCommentClick(!onCommentClick)
    }

    useEffect(() => {
        
        if(typeof props.data.title!=='undefined') {
            setTitle(props.data.title)
        }else{
            setTitle(`Interview @${props.data.experience.company}`)
        }
        let text
        if(props.data.experience){
            setQuestions(props.data.experience.programmingTopics)
            setSubjects(props.data.experience.csFundamentals)
            text = props.data.experience.text
        }else{
            text = props.data.text
        }
        text = text.replace('oembed','iframe')
        text = text.replace('/oembed','/iframe')
        text = text.replace('url','src')
        // console.log(text)
        setText(text)
    }, [] )

    return (
        <MDBRow className="mt-5">
            <MDBCol md="12">
                <MDBCard className="mx-5">
                    <MDBCardHeader className=" light-blue darken-3">
                        <MDBRow>
                            <MDBCol size="1"><Avatar src={props.data.profileId ? `/images/${props.data.profileId.avatar}` : ''} className="red">{props.data.userId.name[0]}</Avatar></MDBCol>
                            <MDBCol size="11" className="text-left"><h5 className="text-white font-weight-bold m-0 mt-1">{props.data.userId.name}</h5><h6 className="m-0 mt-1 text-white">26-03-2021</h6></MDBCol>
                        </MDBRow>
                    </MDBCardHeader>
                    <MDBCardBody className="white">
                    <h5 style={{color: '#bf360c'}} className="mb-4">{title}</h5>
                        <MDBRow className="text-center">
                            <MDBCol>
                                { questions.length!==0 && <hr className="hr-text-form" data-content="Programming Questions asked"></hr> }
                                { questions.map((topic) => {
                                return <Chip key={topic.value} label={topic.label}  color="secondary" className="mr-3 mb-2"/> 
                                }) }
                                { subjects.length!==0 && <hr className="hr-text-form mt-5" data-content="CS Fundamentals asked"></hr> }
                                { subjects.map((topic) => {
                                return <Chip key={topic.value} label={topic.label}   color="primary" className="mr-3 mb-2"/> 
                                }) }
                            </MDBCol>
                        </MDBRow>
                        { text &&  <hr className="hr-text-form mb-5 mt-5" data-content=""></hr> }
                        {/* <div dangerouslySetInnerHTML={{ __html: text }}></div> */}
                        {/* { parse(text) } */}
                        {/* <Chip label="DP"  color="default"/><Chip label="Binary Search"  color="secondary"/> */}
                    </MDBCardBody>
                    <MDBCardFooter className="grey lighten-3"> 
                        <Like className="mr-3 likeNComment" style={{color:'#00838f'}}/><AddComment  className="likeNComment" onClick={onClick} style={{color:'#00838f'}} />
                        { onCommentClick &&  <CommentBox />}
                    </MDBCardFooter>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

export default PostItem
