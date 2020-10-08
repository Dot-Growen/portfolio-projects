import React, { useState } from 'react'
import { Image } from 'semantic-ui-react'
import Message from '../components/Message'
import { api } from '../api'
import { navigate } from '@reach/router'
import { authAxios } from '../services/authentication.service'
import { Modal, Button } from 'antd'

const DeleteModal = ({ title, postSlug, thumbnail }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [visible, setVisisble] = useState(false)

    function handleSubmit() {
        setLoading(true)
        authAxios
            .delete(api.posts.delete(postSlug))
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError(err.message || err)
                setLoading(false)
            })
    }

    const showModal = () => {
        setVisisble(true)
    }

    const handleCancel = e => {
        console.log(e)
        setVisisble(false)
    }

    return (
        <>
            <Button
                className='float-right btn-update btn'
                loading={loading}
                disabled={loading}
                type='primary'
                onClick={showModal}
            >
                Delete Post
      </Button>
            <Modal
                className='text-center'
                title={title}
                visible={visible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button className='btn-modal2 btn' key='back' onClick={handleCancel}>
                        Return
          </Button>,
                    <Button
                        className='btn-modal1 btn'
                        key='submit'
                        type='primary'
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Confirm Deletion
          </Button>
                ]}
            >
                <Image className='mx-auto' src={thumbnail} />
                {error && <Message color='red' message={error} />}
                <h3 className='text-center mt-3 text-dark'>
                    Are you sure you want to delete this post?
        </h3>
            </Modal>
        </>
    )
}

export default DeleteModal;
