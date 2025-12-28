import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [about, setAbout] = useState("");
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addSkill = () => {
        if (skill.trim() && !skills.includes(skill.trim())) {
            setSkills([...skills, skill.trim()]);
            setSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select an image file");
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            setPhotoFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview(null);
    };

    const handleSignup = async () => {
        // Basic validation
        if (!firstName || !lastName || !emailId || !password || !age || !gender) {
            toast.error("Please fill all required fields");
            return;
        }

        if (skills.length === 0) {
            toast.error("Please add at least one skill");
            return;
        }

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('emailId', emailId);
            formData.append('password', password);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('about', about || '');
            formData.append('skills', JSON.stringify(skills));
            
            // Append photo file if selected
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            const res = await axios.post(
                BASE_URL + "/signup",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            dispatch(addUser(res.data.user));
            navigate("/feed");
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            console.log("ERROR:", error);
        }
    };

    return (
        <div className='flex justify-center my-10 px-4'>
            <div className="card bg-base-300 w-full max-w-2xl shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl mb-4">Create Account</h2>
                    
                    {/* Name Fields - Side by Side */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <fieldset className="form-control w-full">
                            <div className='label'>
                                <span className='label-text text-white'>First Name *</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                            />
                        </fieldset>
                        <fieldset className="form-control w-full">
                            <div className='label'>
                                <span className='label-text text-white'>Last Name *</span>
                            </div>
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                            />
                        </fieldset>
                    </div>

                    {/* Email and Password */}
                    <fieldset className="form-control w-full">
                        <div className='label'>
                            <span className='label-text text-white'>Email ID *</span>
                        </div>
                        <input 
                            type="email" 
                            className="input input-bordered w-full" 
                            value={emailId} 
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="john.doe@example.com"
                        />
                    </fieldset>
                    <fieldset className="form-control w-full">
                        <div className='label'>
                            <span className='label-text text-white'>Password *</span>
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="input input-bordered w-full pr-10" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </fieldset>

                    {/* Age and Gender - Side by Side */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <fieldset className="form-control w-full">
                            <div className='label'>
                                <span className='label-text text-white'>Age *</span>
                            </div>
                            <input 
                                type="number" 
                                className="input input-bordered w-full" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="25"
                                min="18"
                                max="100"
                            />
                        </fieldset>
                        <fieldset className="form-control w-full">
                            <div className='label'>
                                <span className='label-text text-white'>Gender *</span>
                            </div>
                            <select 
                                className="select select-bordered w-full capitalize" 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </fieldset>
                    </div>

                    {/* Photo Upload */}
                    <fieldset className="form-control w-full">
                        <div className='label'>
                            <span className='label-text text-white'>Profile Photo</span>
                        </div>
                        {!photoPreview ? (
                            <div className="flex items-center gap-4">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full max-w-xs" 
                                    onChange={handlePhotoChange}
                                    id="photo-upload"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="photo-upload" className="btn btn-outline btn-primary cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Choose Photo
                                </label>
                                <span className="text-gray-400 text-sm">(Max 5MB)</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img 
                                        src={photoPreview} 
                                        alt="Preview" 
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-base-content/20"
                                    />
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
                                        onClick={handleRemovePhoto}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div>
                                    <p className="text-sm text-white mb-2">{photoFile?.name}</p>
                                    <label htmlFor="photo-upload-change" className="btn btn-sm btn-outline btn-primary cursor-pointer">
                                        Change Photo
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="file-input file-input-bordered" 
                                        onChange={handlePhotoChange}
                                        id="photo-upload-change"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        )}
                    </fieldset>

                    {/* About */}
                    <fieldset className="form-control w-full">
                        <div className='label'>
                            <span className='label-text text-white'>About</span>
                        </div>
                        <textarea 
                            className="textarea textarea-bordered w-full h-24" 
                            value={about} 
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Tell us about yourself..."
                        />
                    </fieldset>

                    {/* Skills */}
                    <fieldset className="form-control w-full">
                        <div className='label'>
                            <span className='label-text text-white'>Skills *</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="input input-bordered flex-1" 
                                value={skill} 
                                onChange={(e) => setSkill(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Add a skill (e.g., Product Design)"
                            />
                            <button 
                                className="btn btn-secondary" 
                                onClick={addSkill}
                                type="button"
                            >
                                Add
                            </button>
                        </div>
                        {skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {skills.map((skillItem, index) => (
                                    <div 
                                        key={index} 
                                        className="badge badge-primary badge-lg gap-2 px-3 py-3"
                                    >
                                        <span>{skillItem}</span>
                                        <button 
                                            className="btn btn-xs btn-circle btn-ghost"
                                            onClick={() => removeSkill(skillItem)}
                                            type="button"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </fieldset>

                    {/* Submit Button */}
                    <div className="card-actions justify-center mt-4">
                        <button 
                            className="btn btn-primary px-8" 
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <span className="text-white">Already have an account? </span>
                        <Link to="/login" className="link link-primary">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

