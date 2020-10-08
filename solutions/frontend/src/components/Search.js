import React, { useState } from 'react';
import { Input } from 'antd';

const Search = ({results}) => {
    const { Search } = Input;
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = () => {
        results(searchResults)
        console.log(searchResults)
    }   

    return (
        <div>
            <Search
                className="input"
                placeholder="Search titles (case sensitive)"
                onSearch={handleSearch}
                onChange={e => setSearchResults(e.target.value)}
                enterButton />
        </div>
    );
}

export default Search;
