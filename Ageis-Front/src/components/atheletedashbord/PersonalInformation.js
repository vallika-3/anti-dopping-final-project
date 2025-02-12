import React, { useState } from 'react';

const AthleteDashboard = () => {
  const [name, setName] = useState('John Doe');
  const [dob, setDob] = useState('01/01/1990');
  const [sport, setSport] = useState('Athletics');
  const [height, setHeight] = useState('180 cm');
  const [weight, setWeight] = useState('75 kg');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [achievements, setAchievements] = useState('Gold Medal, National Athletics Championship');
  const [medicalHistory, setMedicalHistory] = useState('No chronic injuries');
  const [antiDopingCourses, setAntiDopingCourses] = useState('Completed WADA Anti-Doping Education');
  const [status, setStatus] = useState('Active');
  const [profilePic, setProfilePic] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // Handle form inputs for changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'dob') setDob(value);
    if (name === 'sport') setSport(value);
    if (name === 'height') setHeight(value);
    if (name === 'weight') setWeight(value);
    if (name === 'email') setEmail(value);
    if (name === 'phone') setPhone(value);
    if (name === 'achievements') setAchievements(value);
    if (name === 'medicalHistory') setMedicalHistory(value);
    if (name === 'antiDopingCourses') setAntiDopingCourses(value);
    if (name === 'status') setStatus(value);
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  };

  // Handle form submission for updates
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditable(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <h2 style={styles.name}>{name}</h2>
          <button
            style={styles.editButton}
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div style={styles.profilePicContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={styles.fileInput}
          />
          {profilePic && <img src={profilePic} alt="Profile" style={styles.profilePic} />}
        </div>

        {isEditable ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sport:</label>
              <input
                type="text"
                name="sport"
                value={sport}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Height:</label>
              <input
                type="text"
                name="height"
                value={height}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Weight:</label>
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Achievements:</label>
              <input
                type="text"
                name="achievements"
                value={achievements}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Medical History:</label>
              <input
                type="text"
                name="medicalHistory"
                value={medicalHistory}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Anti-Doping Education:</label>
              <input
                type="text"
                name="antiDopingCourses"
                value={antiDopingCourses}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Athlete Status:</label>
              <input
                type="text"
                name="status"
                value={status}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.updateButton}>
              Update Information
            </button>
          </form>
        ) : (
          <div style={styles.info}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Date of Birth:</strong> {dob}</p>
            <p><strong>Sport:</strong> {sport}</p>
            <p><strong>Height:</strong> {height}</p>
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Achievements:</strong> {achievements}</p>
            <p><strong>Medical History:</strong> {medicalHistory}</p>
            <p><strong>Anti-Doping Education:</strong> {antiDopingCourses}</p>
            <p><strong>Athlete Status:</strong> {status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '800px',
    padding: '30px',
    margin: '10px',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#203c5c',
  },
  editButton: {
    backgroundColor: '#203c5c',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  profilePicContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  fileInput: {
    marginBottom: '10px',
  },
  profilePic: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  form: {
    width: '100%',
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  updateButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  info: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    marginTop: '20px',
  },
};

export default AthleteDashboard;