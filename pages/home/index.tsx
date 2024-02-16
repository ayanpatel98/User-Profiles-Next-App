"use client"
import UserData from '@/app/components/user-data';
import { fetchUsers } from '@/app/services/api';
import React from 'react'
import { useState, useEffect } from 'react';
import "../../app/globals.css"

const index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    getUsers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">User Profiles</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user: any) => (
          <UserData key={user.id} user={user} />
        ))}
      </div>
    </div>

  )
}

export default index