"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';
import { useRouter } from "next/navigation";

const UserProfile = ({ params }) => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const [loader, setLoader] = useState('show');
    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {

        if (session?.user.id === params.id)
            router.push('/profile');

    }, [session]);



    useEffect(() => {

        const fetchPosts = async () => {
            const user_res = await fetch(`/api/users/${params.id}`);


            if (user_res.status == 200) {
                const user = await user_res.json();
                setUser(user);
                const response_post = await fetch(`/api/users/${params.id}/posts`);
                const data = await response_post.json();
                setPosts(data);
            }
            else {
                setLoader('hide');
            }


        };
        if (params.id)
            fetchPosts();

    }, [params]);


    return (user ?
        <Profile name={`${user?.username}`} desc={`Welcome to ${user?.username}'s profile page. Explore ${user?.username}'s prompts and be inspired by their imagination.`} data={posts} /> : loader == 'show' ? <Image src="../assets/icons/loader.svg" width={100} height={100} className="m-auto mt-20" /> :
            <div className="mt-20 text-lg text-gray-800 text-bl sm:text-xl max-w-2xl text-center">
                User does not exist. <br />Please check user ID!
            </div>
    );
};

export default UserProfile;