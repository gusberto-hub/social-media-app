import {useSelector} from 'react-redux'
import FriendsGrid from '../../FriendsGrid/FriendsGrid.jsx'
import PostsGrid from '../../Posts/PostsGrid'


function ProfileSubSection({userID}){
    const filter = useSelector(store => store.profileFilter) //get state from redux
    const endPoint = userID ? `social/posts/user/${userID}/` : 'social/posts/me/'


    //returns the component to render based on which filter is chosen
    const displayComponent = () => {
        switch(filter){
            case 'posts':
                return <PostsGrid url={endPoint} inProfile/>
            case 'likes':
                return <PostsGrid url={'social/posts/likes'} inProfile/>
            case 'friends':
                return <FriendsGrid url={'social/friends'}/>
            case 'followers':
                return <FriendsGrid url={'social/followers/followers'}/>
            case 'following':
                return <FriendsGrid url={'social/followers/following'}/>
            default:
                return <PostsGrid url={endPoint} inProfile/>
        }
    }

    return displayComponent()
}

export default ProfileSubSection
