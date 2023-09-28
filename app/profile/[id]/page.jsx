"use client";

import { useState, useEffect } from "react";

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState('');


    useEffect(() => {
        const fetchPosts = async () => {
            const response_post = await fetch(`/api/users/${params.id}/posts`);
            const user_res = await fetch(`/api/users/${params.id}`);
            const data = await response_post.json();
            const user = await user_res.json();
            setPosts(data);
            setUser(user);
        };
        if (params.id)
            fetchPosts();
    }, [params]);


    return (user &&
        <Profile name={`${user?.username}`} desc={`Welcome to ${user?.username}'s profile page. Explore ${user?.username}'s prompts and be inspired by their imagination.`} data={posts} />
    );
};

export default UserProfile;