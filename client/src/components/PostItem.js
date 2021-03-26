import React, { useState } from 'react'
import CommentBox from './CommentBox'
import AddComment from '@material-ui/icons/AddCommentRounded';
import Like from '@material-ui/icons/ThumbUpAltOutlined';
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';

function PostItem() {

    const [ onCommentClick, setOnCommentClick ] = useState(false)

    const onClick = () => {
        setOnCommentClick(!onCommentClick)
    }

    return (
        <MDBRow className="mt-5">
            <MDBCol md="12">
                <MDBCard className="mx-5">
                    <MDBCardHeader className="cyan darken-2">
                        <MDBRow>
                            <MDBCol size="1"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle white mr-3" width="50"></img></MDBCol>
                            <MDBCol size="11" className="text-left"><h5 className="text-white font-weight-bold m-0 mt-1">Hrujul Thumar</h5><h6 className="m-0 mt-1 text-white">26-03-2021</h6></MDBCol>
                        </MDBRow>
                    </MDBCardHeader>
                    <MDBCardBody className="white">
                        <h5>Interview at Google</h5>
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
