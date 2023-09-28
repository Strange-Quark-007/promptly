"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from '@components/Form';

const EditPrompt = () => {

    const Router = useRouter();
    const searchParams = useSearchParams();

    const promptId = searchParams.get('id');

    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: '', tag: '' });


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();

            setPost({ prompt: data.prompt, tag: data.tag });
        };

        if (promptId)
            getPromptDetails();

    }, [promptId]);


    const updatePrompt = async (e) => {
        e.preventDefault();

        setsubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
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

    return (
        promptId ?
            <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
            : <div className="mt-20 text-lg text-gray-800 text-bl sm:text-xl max-w-2xl text-center">Prompt ID not found. <br />Login to edit prompt or select prompt to edit from profile page.</div>
    );
};

export default EditPrompt;