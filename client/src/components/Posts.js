import React from "react";
import PostItem from './PostItem'
import AddComment from '@material-ui/icons/AddCommentRounded';
import Like from '@material-ui/icons/ThumbUpAltOutlined';
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';



function Post() {

    return(
        <MDBCol className="post pr-2 pb-4 mt-5" lg="7">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
        </MDBCol>
    )
}

export default Post