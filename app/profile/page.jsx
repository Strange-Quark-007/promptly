"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();
    const [loader, setLoader] = useState('show');

    const [modified, setModified] = useState(0);


    useEffect(() => {
        setLoader('show');
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        };
        if (session?.user.id)
            fetchPosts();

        setTimeout(() => {
            setModified(0);
            setLoader('hide');
        }, 2000);
    }, [modified, session]);


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post) => {

        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });
                setModified(2);
            } catch (error) {
                // console.log(error);
            }
        }
    };

    return (session ?
        <Profile name="My" desc="Welcome to your personalized profile" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} /> : loader == 'show' ? <Image src="../assets/icons/loader.svg" width={100} height={100} className="m-auto mt-20" /> :
            <div className="mt-20 text-lg text-gray-800 text-bl sm:text-xl max-w-2xl text-left">
                Please Login to view your Profile
            </div>
    );
};

export default MyProfile;