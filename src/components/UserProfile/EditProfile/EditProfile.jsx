import {ProfileHeaderContainer, ProfileHeaderRightContainer, ProfileHeaderLeftContainer, ProfileBackground, SavedChangesMessage} from '../Profile/ProfileHeader.style.js'
import {useEffect, useState} from 'react'
import useApiRequest from '../../../hooks/useApiRequest.js'
import {loginUser} from '../../../store/slices/loggedInUser.js'
import {useDispatch} from 'react-redux'
import useAutoFetch from '../../../hooks/useAutoFetch.js'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx'
import {InputWrapper} from './EditProfile.style.js'
import LeftEditContainer from './LeftEditContainer.jsx'
import ThingsUserLikes from './ThingsUserLikes.jsx'
import BackgroundImage from '../../../assets/images/profile_background.png'
import CheckMarkIcon from '../../../assets/svgs/checkmark_new.svg'
import {CheckMark} from '../../../styles/globalStyles.js'


function EditProfile(){
    const {data, loading} = useAutoFetch('get', 'users/me/')
    const inputFields = {
        first_name: {type: 'text', value: data?.first_name, label: 'First Name'},
        last_name: {type: 'text', value: data?.last_name, label: 'Last Name'},
        email: {type: 'email', value: data?.email, label: 'Email'},
        username: {type: 'text', value: data?.username, label: 'Username'},
        location: {type: 'text', value: data?.location, label: 'Location'},
        phone_number: {type: 'phone', value: data?.phone_number, label: 'Phone'},
        about_me: {type: 'text', value: data?.about_me, label: 'About'},
        password: {type: 'password', value: data?.password, label: 'Password'},
    }

    const {sendRequest} = useApiRequest()
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const [changesSaved, setChangesSaved] = useState(false)

    const handleInput = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleProfileUpdate = () => {
        sendRequest('patch', 'users/me/', userData)
        showChangesSavedMessage()
    }

    const showChangesSavedMessage = () => {
        setChangesSaved(true)
        setTimeout(() => setChangesSaved(false), 2000)
    }

    useEffect(() => {
        if(data){
            localStorage.setItem('user', JSON.stringify(data))
            dispatch(loginUser({user: data}))
            setUserData({...userData, things_user_likes: data.things_user_likes})
        }
    }, [data])


    return (
        <>
            <ProfileBackground src={BackgroundImage} alt="Background"></ProfileBackground>
            <ProfileHeaderContainer>
                {
                    loading ? <LoadingSpinner/> : <>
                        <ProfileHeaderLeftContainer>
                            <LeftEditContainer initialAvatar={data?.avatar} handleProfileUpdate={handleProfileUpdate}/>
                        </ProfileHeaderLeftContainer>
                        <ProfileHeaderRightContainer>
                            <InputWrapper>
                                <form>
                                    {Object.keys(inputFields).map(field => {
                                        return <div className={'input-field'} key={field}>
                                            <label>{inputFields[field].label}</label>
                                            {
                                                field !== 'about_me' ?
                                                    <input type={inputFields[field].type} value={userData[field] === undefined ? inputFields[field].value : userData[field]} id={field} onChange={handleInput}/> :
                                                    <textarea name="Text1" cols="40" rows="5" value={userData[field] === undefined ? inputFields[field].value : userData[field]} id={field} onChange={handleInput}/>
                                            }
                                        </div>
                                    })}
                                </form>
                                <ThingsUserLikes things={userData.things_user_likes} setUserData={setUserData} userData={userData}/>
                                {changesSaved && <SavedChangesMessage><CheckMark src={CheckMarkIcon}/>changes saved!</SavedChangesMessage>}
                            </InputWrapper>
                        </ProfileHeaderRightContainer>
                    </>
                }
            </ProfileHeaderContainer>
        </>
    )
}

export default EditProfile
