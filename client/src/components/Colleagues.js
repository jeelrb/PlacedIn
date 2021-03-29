import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MDBCard,MDBCardHeader, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBIcon, MDBContainer} from 'mdbreact';


const ColleagueProfile = (props) => {

    return (

        <MDBContainer>
            <MDBCard className="mb-3">
                <MDBCardHeader className=" teal lighten-2">
                <MDBRow>
                            <MDBCol size="1" className="text-right"><Avatar src={props.details.avatar ? `/images/${props.details.avatar}` : ''} className="red">{props.details.name[0]}</Avatar></MDBCol>
                            <MDBCol size="11" className="text-left"><h5 className="text-white font-weight-bold m-0 mt-1">{props.details.name}</h5><h6 className="m-0 mt-1 text-white">26-03-2021</h6></MDBCol>
                        </MDBRow>
                </MDBCardHeader>
                <MDBCardBody className="grey lighten-4">
                    <MDBRow>
                        <MDBCol md="4" className="text-left">
                            <MDBRow><MDBCol className="font-weight-bold">Nirma University</MDBCol></MDBRow>
                        </MDBCol>
                        <MDBCol md="4" className="text-center">
                            { props.details.linkedIn && <a href={props.details.linkedIn} className='px-2 fa-lg li-ic'>
                                <MDBIcon fab icon='linkedin-in'></MDBIcon>
                            </a> }
                            { props.details.instagram && <a href={props.details.instagram} className='px-2 fa-lg fb-ic'>
                                <MDBIcon fab icon='instagram'></MDBIcon>
                            </a> }
                            { props.details.twitter && <a href={props.details.twitter} className='px-2 fa-lg tw-ic'>
                                <MDBIcon fab icon='twitter'></MDBIcon>
                            </a> }
                            { props.details.facebook && <a href={props.details.facebook} className='px-2 fa-lg fb-ic'>
                                    <MDBIcon fab icon='facebook-f'></MDBIcon>
                            </a> }
                        </MDBCol>
                        <MDBCol md="4" className="text-right">
                            <Link to={{ pathname: `/dashboard/profiles/${props.details.username}`, userId: props.details.userId }} className='mt-1' >
                                <h5 className='text-info full_profile'>See profile{' '}
                                    <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                                </h5>
                            </Link>
                        </MDBCol>
                    </MDBRow>              
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>

    );
};
function Colleague(){

    const [ profiles, setProfiles ] = useState([
        {
            name: '',
            avatar: '',
            username: '',
            instagram: '',
            facebook: '',
            twitter: '',
            linkedIn: '',
            college: '',
            batch: '',
            portfolio: '',
            company: '',
            userId: ''
        }
    ])

    const [ suggestions, setSuggestions ] = useState([])

    const [ searchField, setSearchField ] = useState('')

    useEffect(() => {


        if(localStorage.getItem('user')) {
            localStorage.removeItem('user')
        }

        const fetchAllUsers = async () => {

            try {   

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                }

                axios.get('http://localhost:5000/profile', config)
                    .then((res) => {
                        const users = res.data.map((user) => {
                            return { instagram: user.instagram, twitter: user.twitter, facebook: user.facebook, linkedIn: user.linkedIn, avatar: user.avatar, company: user.company, name: user.userId.name, username: user.userId.username, userId: user.userId._id }
                        })
                        setProfiles(users)
                        setSuggestions(users)
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } catch (error) {
                console.log(error)
            }

        }

        fetchAllUsers()

    }, [])

    const findFilteredUsers = (e) => {
        
        setSearchField(e.target.value)

        if(e.target.value.length===0) {
        
            setSuggestions(profiles)

        } else {

            const regex = new RegExp(`^${searchField}`,'i')
            const names = profiles.map((user) => user.name)
            const suggestions = names.sort().filter(name => regex.test(name))

            let filteredProfiles = []
            for(let i=0;i<suggestions.length;i++){
                for(let j=0;j<profiles.length;j++){
                    if(suggestions[i]===profiles[j].name){
                        filteredProfiles.push(profiles[j]);
                        break;
                    }
                }
            }

            if(filteredProfiles.length===0){
                filteredProfiles = []
            }
            setSuggestions(filteredProfiles)

        }
    }

    const onReload = () => {
        window.location.reload()
    }

    return (
        <>
            <Navbar onReload={onReload}/>
            <MDBContainer>
                <MDBRow className="mb-5">
                    <MDBCol md="12">
                        <div className="input-group md-form form-sm form-1 pl-0 mt-5">
                            <input className="form-control my-0 py-1" type="text" placeholder="Search User" 
                                value={searchField}
                                onChange={e => findFilteredUsers(e)}
                            />
                            <div className="input-group-prepend">
                            
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                {
                    
                }
                    { suggestions.map((profile, index) => { 
                        return <ColleagueProfile key={index} details={{ 
                            name: profile.name || '',
                            avatar: profile.avatar || '',
                            username: profile.username || '',
                            linkedIn: profile.linkedIn || '',
                            instagram: profile.instagram || '',
                            twitter: profile.twitter || '',
                            facebook: profile.facebook || '',
                            company: profile.company || '',
                            userId: profile.userId || ''
                        }} /> })  
                    }
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default Colleague;