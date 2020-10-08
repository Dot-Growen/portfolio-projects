import React from 'react';
import { List } from 'antd';
import Tags from './Tags';

const Post = (props) => {
    console.log("datataaa", props.data)

    return (
        <div>
            <List 
            ordered="list"
                itemLayout="vertical"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                }}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item
                        className="list-block"
                        key={item.title}
                    >
                        <List.Item.Meta
                            className="mb-2"
                            title={<a className='text-white block-header' href={`/posts/${item.slug}`}>{item.title}</a>}
                            description={<h6 className="block-desc">{item.description}</h6>}
                        />
                        <Tags tags={item.tags} />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Post;
