

const ProfileCard = () => {

  return (
    <div className="card w-full max-w-[900px] min-h-[200px] bg-base-100 shadow-sm mx-auto mt-10 border border-base-300">
      <div className="card-body flex-row items-center justify-between gap-4">

        <div>
          <div className="avatar">
            <div className="w-24 rounded">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div>
          <h2>Details</h2>
          
        </div>

      </div>
      
    </div>

  )
}

export default ProfileCard