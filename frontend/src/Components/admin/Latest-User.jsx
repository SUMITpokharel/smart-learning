import React, { useEffect, useState } from "react";
import axios from "axios";


const TUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/user/getAllUsers`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return <div></div>;
};

export default TUsers;
