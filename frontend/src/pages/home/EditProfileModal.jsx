import { useState } from "react";

const EditProfileModal = ({ user }) => {
  const [formData, setFormData] = useState({
    NewCityAndCountry: user?.CityAndCountry || "",
    NewBio: user?.bio,
    Birthday: user?.Birthday ? user.Birthday.split('T')[0] : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => document.getElementById('edit_profile_modal').close();

  const handleSubmit = async () => {
    console.log("Updating profile with:", formData);
    // Add your update logic here
    closeModal();
  };

  return (
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
        
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold">Bio</label>
          <input 
            type="text" 
            name="NewBio"
            value={formData.NewBio}
            onChange={handleChange}
            className="input input-bordered w-full" 
          />

          <label className="text-sm font-semibold">City, Country</label>
          <input 
            type="text" 
            name="NewCityAndCountry"
            value={formData.NewCityAndCountry}
            onChange={handleChange}
            className="input input-bordered w-full" 
          />

          <label className="text-sm font-semibold">Birthday</label>
          <input 
            type="date" 
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
            className="input input-bordered w-full" 
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={closeModal}>Close</button>
          <button className="btn bg-[#244d6d] text-white" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default EditProfileModal;