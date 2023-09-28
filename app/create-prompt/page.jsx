"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '@components/Form';

const CreatePrompt = () => {

    const Router = useRouter();
    const { data: session } = useSession();

    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });

    const createPrompt = async (e) => {
        e.preventDefault();

        setsubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    })
                });

            if (response.ok) {
                Router.push('/');
            }

        } catch (error) {
            // console.log(error);
        } finally {
            setsubmitting(false);
        }

    };

    return (session ?
        <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
        : <div className="mt-20 text-lg text-gray-800 text-bl sm:text-xl max-w-2xl text-center">Please Login to Create Prompt</div>
    );
};

export default CreatePrompt;