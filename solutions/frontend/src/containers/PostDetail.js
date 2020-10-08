import React from 'react'
import { Container, Divider, Image } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetch } from '../helpers'
import { Link } from '@reach/router'
import { Button } from 'antd'
import DeleteModal from '../components/DeleteModal'

const Blockquote = props => {
    console.log(props)
    return (
        <Message
            color='black'
            message={props.value ? props.value : props.children}
        />
    )
}

const Code = props => {
    console.log(props)
    return (
        <pre className='code-blocks'>
            <code>{props.value ? props.value : props.children}</code>
        </pre>
    )
}

const Renderers = {
    blockquote: Blockquote,
    code: Code
}

const PostDetail = props => {

    const { data, loading, error } = useFetch(api.posts.retrieve(props.postSlug)) // Custom hook

    return (
        <Container className='detail-container' >
            {error && <Message color="red" message={error} />}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image className='detail-img' src={data.thumbnail} />
                    <h1 className='detail-header'>{data.title}</h1>
                    <h6 className='detail-date'> Last updated at{' '}
                        {`${new Date(data.updated_at).toLocaleDateString()}`}
                    </h6>

                    
                    <ReactMarkdown
                        className='detail-content'
                        source={data.problem}
                        renderers={Renderers}
                    />
                    <ReactMarkdown
                        className='detail-content'
                        source={data.content}
                        renderers={Renderers}
                    />
                    <Divider />
                    {data.is_author && (
                        <>
                            <Link to={`/posts/${props.postSlug}/update`}>
                                <Button className='btn-update btn'>Update</Button>
                            </Link>
                            <DeleteModal
                                postSlug={props.postSlug}
                                title={data.title}
                                thumbnail={data.thumbnail}
                            />
                        </>
                    )}
                </div>
            )}
        </Container>
    )
}

export default PostDetail
