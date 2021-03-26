import React from 'react'
import CommentItem from './CommentItem'
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCardFooter} from 'mdbreact';

function CommentBox() {
    return (
        <>
            <form>
                <div className="form-group focused mt-4 mb-5 ">
                    <input type="text" 
                        className="form-control form-control-alternative addComment" 
                        placeholder="Add comment" 
                    />
                </div>
            </form>
            <CommentItem />
        </>
    )
}

export default CommentBox
