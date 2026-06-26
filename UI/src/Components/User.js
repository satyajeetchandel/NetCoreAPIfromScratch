// import React, { useEffect, useState } from "react";
// import { fetchWithAuth } from "../api";

// function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchWithAuth("http://localhost:5294/api/Users")
//       .then(res => res.json())
//       .then(setUsers)
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Users</h2>
//       <ul>
//         {users.map(u => (
//           <li key={u.userId}>{u.userName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Users;

import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5294/api/Users");
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Users from API:", data); // 👀 debug
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.userId}>{u.userName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;

