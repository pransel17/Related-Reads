import { useState } from "react";
import axios from "axios";

const EditProfileModal = ({ user }) => {
  const [formData, setFormData] = useState({
    NewCityAndCountry: user?.CityAndCountry || "",
    Newbio: user?.bio || "",
    NewBirthday: user?.Birthday ? user.Birthday.split('T')[0] : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    const modal = document.getElementById('edit_profile_modal');
    if (modal) modal.close();
  };

  const handleSubmit = async () => {
    try {
      console.log("Updating profile with:", formData);
      
      // FIXED: Added http:// and ensured URL is correct
      const response = await axios.post(`http://localhost:2001/api/user/EditProfile`, 
        formData, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        closeModal();
        window.location.reload(); 
      }
    } catch (err) { // FIXED: Added (err) variable here
      console.error("Submission Error:", err.response?.data || err.message);
      alert("Failed to update profile: " + (err.response?.data?.error || "Server Error"));
    }
  };

  return (
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
        
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold">Bio</label>
          <input 
            type="text" 
            name="Newbio"
            value={formData.Newbio}
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
            name="NewBirthday"
            value={formData.NewBirthday}
            onChange={handleChange}
            className="input input-bordered w-full" 
          />
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={closeModal}>Close</button>
          <button type="button" className="btn bg-[#244d6d] text-white" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default EditProfileModal;