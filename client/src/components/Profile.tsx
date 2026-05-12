import profile from "../assets/profile.jpg"

const Profile = () => {
  return (
    <img src={profile} alt="profile" className='w-12 h-12 rounded-full hover:cursor-pointer popup'/>
  )
}

export default Profile