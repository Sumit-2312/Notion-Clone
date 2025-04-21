const Profile = ({letter}:{letter:string}) => {
    return ( 
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-black font-bold text-lg">
            {letter}
        </div>
     );
}
 
export default Profile;