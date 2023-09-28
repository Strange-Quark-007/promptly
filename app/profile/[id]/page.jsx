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


    return (
        <Profile name={`${user?.username}`} desc={`${user?.username} personalized profile`} data={posts} />
    );
};

export default UserProfile;