"use client";
import { useState, useEffect } from "react";
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map((post) => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
            }
        </div>
    );
};



const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);


    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleTagClick = () => {

    };


    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="search here..." className="search_input peer"
                    value={searchText} onChange={handleSearchChange} required></input>
            </form>

            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;