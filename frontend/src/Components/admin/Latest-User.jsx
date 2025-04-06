import React, { useEffect, useState } from "react";
import axios from "axios";

import { Avatar, Card, Row, Col, Divider } from "antd";
import { EyeOutlined, MinusCircleOutlined } from "@ant-design/icons"; // Use @ant-design/icons for icons

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

  return (
    <div>
      <Card>
        <div className="pa-3">
          <p className="text-h6 indigo--text mb-0">Recent Users</p>
          <span className="caption">
            List of all the recent registered Users
          </span>
        </div>
        <Divider />
        {users.map((user) => (
          <Card key={user.id} className="ma-3 mt-7">
            <Row className="pa-2" gutter={16}>
              <Col span={4}>
                {user.image ? (
                  <Avatar size={36} src={user.image} />
                ) : (
                  <Avatar size={36}>{user.name[0]}</Avatar>
                )}
              </Col>
              <Col span={12}>
                <p className="subtitle-2 mb-0">{user.name}</p>
                <p className="caption">{user.email}</p>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <EyeOutlined style={{ marginRight: 8 }} />
                <MinusCircleOutlined />
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default TUsers;
