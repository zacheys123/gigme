"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";

export default function OnlineUsers({ id }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth",
      auth: {
        params: { user_id: id }, // Replace with a dynamic or unique user ID
      },
    });

    // Subscribe to a presence channel
    const channel = pusher.subscribe("presence-online-users");

    // Listen for subscription success event (when users are fetched)
    channel.bind("pusher:subscription_succeeded", (members) => {
      const users = [];
      members.each((member) => {
        users.push(member.id); // member.id is the user_id from the backend
      });
      setOnlineUsers(users);
    });

    // Listen for users joining
    channel.bind("pusher:member_added", (member) => {
      setOnlineUsers((prev) => [...prev, member.id]);
    });

    // Listen for users leaving
    channel.bind("pusher:member_removed", (member) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== member.id));
    });

    return () => {
      // Unsubscribe from the channel when the component is unmounted
      pusher.unsubscribe("presence-online-users");
    };
  }, []);

  return (
    <div>
      <h3>Online Users</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user}>{user} is online</li>
        ))}
      </ul>
    </div>
  );
}
