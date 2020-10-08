import React, { useState } from 'react';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetchList } from '../helpers'
import Post from '../components/Post';
import Search from '../components/Search';

const PostList = () => {
    let query = ""
    const { data, loading, error } = useFetchList(api.posts.list) // Custom hook
    const [result, setResult] = useState([]);


    const submitResult = (info) => {
        query = info
        console.log("query => ", query)
        dataFilter()
    }

    const dataFilter = () => {
        let filteredResults = data.filter(data => data.title.includes(query))
        setResult(filteredResults)
    }

    return (
        <div>
            <h1 className="block-title">Problems</h1>
            {error && <Message color="red" message={error} />}
            {loading && <Loader />}
            <Search results={submitResult} />
            {
                !loading &&
                <>
                    {result.length == 0 ? <Post data={data} /> : <Post data={result} />}
                </>
            }
        </div>
    );
}

export default PostList;

