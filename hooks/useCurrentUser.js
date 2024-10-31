"use client";

import { cache, useEffect, useState } from "react";

export function useCurrentUser(userId) {
  let url = `/api/user/getuser/${userId}`;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(() => {
        // Safely parse user data from localStorage.
        try {
          return JSON.parse(window.localStorage.getItem("user")) || {};
        } catch (e) {
          console.error("Failed to parse user data from localStorage:", e);
          return {};
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setUser({});
      return;
    }

    const getUser = cache(async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          // Handle non-2xx responses.
          console.error(`Failed to fetch user: ${res.statusText}`);
          setUser({});
          return;
        }

        const fetchedUser = await res.json();
        setUser(fetchedUser);
        console.log(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser({});
      } finally {
        setLoading(false);
      }
    });

    getUser();
  }, [userId, url]);

  return { loading, user, setUser };
}
