import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBIcon,MDBCardHeader,MDBCardTitle } from "mdbreact";
import Multiselect from "react-multi-select-component";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const programminglabels = [
    { label: 'Array', value: '1' }, { label: 'String', value: '2' }, { label: 'DP', value: '3' }, { label: 'Binary Search', value: '4' }, { label: 'Sort', value: '5' },
    { label: 'Greedy', value: '6' }, { label: 'Two Pointers', value: '7' }, { label: 'Slvalueing Window', value: '8' }, { label: 'Stack', value: '9' },
    { label: 'Queue', value: '10' }, { label: 'Heap', value: '11' }, { label: 'Priority Queue', value: '12' }, { label: 'Tree', value: '13' }, 
    { label: 'Linked List', value: '14' }, { label: 'Recursion', value: '15' }, { label: 'Hashing', value: '16' }, { label: 'BST', value: '17' },
    { label: 'Backtracking', value: '18' }, { label: 'DFS, BFS', value: '19' }, { label: 'Graph', value: '20' }, { label: 'Union Find', value: '21' },
    { label: 'Divvaluee and Conquer', value: '22' }, { label: 'Shortest Path', value: '23' }, { label: 'Topological Sort', value: '24' }, { label: 'Trie', value: '25' }
]

const CSFundamentals = [
    { label: 'Data Structures', value: '1' }, { label: 'Algorithms', value: '2' }, { label: 'Object Oriented Programming', value: '3' }, 
    { label: 'Operating System', value: '4' }, { label: 'Database Management System', value: '5' }, { label: 'Computer Networks', value: '6' }, { label: 'Computer Architecture', value: '7' }, { label: 'Theory of Computation', value: '8' }, { label: 'Compiler Design', value: '9' }
]

function InterviewExperience() {

    const [ programmingTopics, setProgrammingTopics ] = useState([])
    const [ csFundamentals, setCSFundamentals ] = useState([]);
    const [ formData, setFormData ] = useState({
        company: '', role: '', text: '' 
    })
    const [ isSubmitted, setIsSubmited ] = useState(false)
    const [ errors, setErrors ] = useState({
        companyError: '',
        roleError: '',
        csFundamentalsError: ''
    })

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }

            const { company, role, text } = formData

            let companyError, roleError, csFundamentalsError

            if(!company) {
                companyError = 'Please enter company name'
            }
            if(!role) {
                roleError = 'Enter the role'
            }
            if(csFundamentals.length===0) {
                csFundamentalsError = 'Enter the topics asked'
            }

            if(companyError) {
                return toast.error('Please enter compnay name!', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }
            if(roleError) {
                return toast.error('Please enter role!', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }
            if(csFundamentalsError) {
                return toast.error('Please enter CS fundamentals asked !', { 
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            }

            const body = {
                company, role, text,  programmingTopics, csFundamentals 
            }

            const res = await axios.post('http://localhost:5000/interview/add', body, config)

            setIsSubmited(true)

            toast.success('Interview experience added successfully !', { 
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })


        } catch (error) {

            console.log(error.response.data.error)

        }
    }

    if(isSubmitted) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
        <Navbar />
            <MDBContainer className="mb-5 mt-5">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardHeader className="blue-grey lighten-1">
                            <MDBCardTitle className="text-center text-white font-weight-bolder mt-2">Interview Experience</MDBCardTitle>
                        </MDBCardHeader>
                        <MDBCardBody className="mr-2">
                            <form onSubmit={e => onSubmit(e)}>
                                <hr className="hr-text-form mt-5 mb-5" data-content="Company Info."></hr>
                                <div className="pl-lg-4 mb-5">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-company-name">Company Name <span className="text-danger">*</span></label>
                                                <input type="text" 
                                                    value={formData.company} 
                                                    onChange={e => setFormData({...formData, company: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Enter the Company Name" 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-role">Role <span className="text-danger">*</span></label>
                                                <input type="text" 
                                                    value={formData.role} 
                                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                                    className="form-control form-control-alternative" 
                                                    placeholder="Full time / Intern" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="hr-text-form" data-content="What was asked ?"></hr>
                                <div className="pl-lg-4 mb-5 mt-5">
                                    <div className="row">
                                        <div style={{zIndex:1001}} className="col-md-12">
                                            <label className="form-control-label" htmlFor="input-job">CS Fundamentals <span className="text-danger">*</span></label>
                                            <Multiselect
                                                options={CSFundamentals}
                                                value={csFundamentals}
                                                onChange={setCSFundamentals}
                                                labelledBy={"Select"}
                                            />
                                            
                                        </div>
                                        <div style={{zIndex:1000}} className="col-md-12 mt-5">
                                            <label className="form-control-label" htmlFor="input-job">Programming Topics</label>
                                            <Multiselect
                                                options={programminglabels}
                                                value={programmingTopics}
                                                onChange={setProgrammingTopics}
                                                labelledBy={"Select"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="hr-text-form mb-5" data-content="Write your Experience"></hr>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <CKEditor
                                                    editor={ ClassicEditor }
                                                    data="<p>Write your interview experience here....</p>"
                                                    onChange={ ( e, editor ) => {
                                                        const data = editor.getData();
                                                        setFormData({...formData, text: data})
                                                    } }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-3 mb-3 btn blue-grey lighten-1 text-white font-weight-bold" type="submit">Submit <MDBIcon far icon="paper-plane" className="ml-2" /></button>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    )
}

export default InterviewExperience
