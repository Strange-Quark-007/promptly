"use client";
import { useState, useEffect } from "react";
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        data && <div className="mt-16 prompt_layout">
            {
                data.map((post) => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
            }
        </div>
    );
};


const Feed = () => {

    const [searchText, setSearchText] = useState();
    const [allPosts, setAllPosts] = useState();
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt/all', { method: 'POST', cache: 'no-store' });
            const data = await response.json();
            setAllPosts(data);

            if (response.status == 404) {
                setTimeout(() => {
                    // location.reload();
                }, 1000);
            }
        };
        fetchPosts();
    }, []);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i");
        return allPosts.filter((item) => (
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        ));
    };

    const handleSearchChange = (e) => {

        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);

        const searchResult = filterPrompts(tag);
        setSearchedResults(searchResult);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="search here..." className="search_input peer"
                    value={searchText} onChange={handleSearchChange} required></input>
            </form>
            {searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick} /> :
                <PromptCardList data={allPosts} handleTagClick={handleTagClick} />}

        </section>
    );
};

export default Feed;