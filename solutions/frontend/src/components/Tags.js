import React from 'react';
import { Tag } from 'antd';

const Tags = ({ tags }) => {
    let tag = tags.split(" ")

    return (
        <>
            {tag.map((tags, index) => {
                return (
                    <Tag key={index} className="tags"  >
                        {tags}
                    </Tag>
                )
            })}
        </>
    );
}

export default Tags;
