// import React from 'react';

// const Profile = ({ profileData }) => {
//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       <div className="profile-sections">
//         {Object.keys(profileData).map((section) => (
//           <section key={section} className="profile-section">
//             <h2>{section}</h2>
//             {typeof profileData[section] === 'object' ? (
//               <ul>
//                 {Object.keys(profileData[section]).map((item) => (
//                   <li key={item}>
//                     <strong>{item}:</strong> {profileData[section][item]}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>{profileData[section]}</p>
//             )}
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default Profile;