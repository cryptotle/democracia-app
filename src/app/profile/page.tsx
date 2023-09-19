"use client";

import Header from "@/components/common/Header/header.component";
import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { User } from "@/types/database.types";


export default function ProfilePage() {
  const [user, setUser] = useState<User>()
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const respUser = await axios.get('/api/user');
        setUser(respUser.data.user);
      } catch (error) {
        console.error(error)
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Header/>
        <Profile user={user}/>
    </>
  );
}
