import React, { useState, useEffect, useRef } from 'react';
import './ProfileEditor.css';

interface ProfileData {
  username: string;
  email: string;
  phone: string;
}
function ProfileEditor() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const storedProfile = localStorage.getItem('profile');
    return storedProfile
      ? JSON.parse(storedProfile)
      : {
          username: '',
          email: '',
          phone: '',
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const phoneReg = /^1[3-9]\d{9}$/;
    const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (event.target.name === 'phone') {
      setPhoneError(!phoneReg.test(event.target.value));
    }
    if (event.target.name === 'email') {
      setEmailError(!emailReg.test(event.target.value));
    }
  };

  const handleSaveClick = () => {
    if (!emailError && !phoneError) {
      localStorage.setItem('profile', JSON.stringify(profile));
      setIsEditing(false);
      // onSave && onSave(profile);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // onEdit && onEdit();
  };

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 784) return;
      if (document.activeElement?.tagName === 'INPUT') {
        cardRef.current?.style.removeProperty('transform');
        return;
      }
      if (cardRef.current) {
        const card = cardRef.current;
        const ax = -(window.innerWidth / 2 - e.pageX) / 20;
        const ay = (window.innerHeight / 2 - e.pageY) / 10;
        card.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="profile-editor-container">
      <div className="card" ref={cardRef}>
        <div className="card-content">
          <h1>My Profile</h1>
          <div className="item">
            <span>Username</span>
            {isEditing ? (
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ) : (
              <span onClick={handleEditClick}>{profile.username}</span>
            )}
          </div>
          <div className="item">
            <span>Email</span>
            {isEditing ? (
              <div className="input-item">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {emailError && <span className="error-message">Invalid email address</span>}
              </div>
            ) : (
              <span onClick={handleEditClick}>{profile.email}</span>
            )}
          </div>
          <div className="item">
            <span>Phone</span>
            {isEditing ? (
              <div className="input-item">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {phoneError && <span className="error-message">Invalid phone number</span>}
              </div>
            ) : (
              <span onClick={handleEditClick}>{profile.phone}</span>
            )}
          </div>
        </div>
      </div>
      <div className="button-container">
        {isEditing ? (
          <button type="button" disabled={emailError || phoneError} onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileEditor;
