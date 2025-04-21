const Workspace = async ({params}:{
    params: Promise<{userId: string}>
}) => {

    const {userId} = (await params);
    return ( 
        <div className="text-white h-[200vh] w-full">
            {userId}
        </div>
     );
}
 
export default Workspace;