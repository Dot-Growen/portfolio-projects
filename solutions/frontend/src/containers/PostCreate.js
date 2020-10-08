import React, { useContext, useRef, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Form } from 'semantic-ui-react'
import { navigate } from "@reach/router"
import Message from '../components/Message';
import { api } from '../api'
import { authAxios, authenticationService } from '../services'
import Login from './Login';
import AuthContext from '../context/AuthContext';
import { Popover, Card, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const PostCreate = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [problem, setProblem] = useState("");
    const [solution, setSolution] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const fileInputRef = useRef()

    const { auth } = useContext(AuthContext);
    const { Panel } = Collapse;

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData()
        if (thumbnail) formData.append('thumbnail', thumbnail)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("problem", problem)
        formData.append("content", solution)
        formData.append("tags", tags)

        authAxios
            .post(api.posts.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError("Required fields - title, description, and markdown." || err)
                setLoading(false)
            })
    }

    if (!auth) {
        console.log(authenticationService.isAuthenticated)
        return <Login path='/login' />
    }

    function addIFrame() {
        return {
            __html: iframe
        }
    }

    const iframe = '<iframe height="600px" width="100%" src="https://repl.it/@DotGrowen/Write-the-code?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>'

    return (
        <div>
            <h2 className="create-title">Create a new solution</h2>
            {error && <Message color='red' message={error} />}
            <Card bordered={false} className='create-join' hoverable>
                <Form onSubmit={handleSubmit}>


                    <Form.Field>
                        <p className="create-label text-white">Title</p>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Title of your problem'
                        />
                    </Form.Field>
                    <Form.Field>
                        <p className="create-label text-white">Description</p>
                        <input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder='Short description for your problem'
                        />
                    </Form.Field>
                    <Form.Field>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="create-label text-white">Tags</p>
                            <Popover content={`Enter with spaces, not commas ( Python JavaScript C# )`} trigger="click">
                                <QuestionCircleOutlined className="text-white" />
                            </Popover>
                        </div>

                        <input
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            placeholder='Add some tags'
                        />
                    </Form.Field>

                    <Collapse className="panels" bordered={false} accordion>
                        <Panel header="2. Create your solution" key="2">
                            <Form.Field>
                                <p className="create-label">First solve the problem <a href="https://guides.github.com/features/mastering-markdown/">(Learn Markdown)</a></p>
                                <Card bordered={false} className='create-join' hoverable>
                                    <MdEditor
                                        className="create-markdown"
                                        placeholder="Solve problem here (pseudocode)"
                                        value={problem}
                                        style={{ height: "500px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={({ text }) => setProblem(text)}
                                    />
                                </Card>
                            </Form.Field>
                            <Form.Field>
                                <p className="create-label">Then write the code</p>
                                <Card bordered={false} className='create-join' hoverable>
                                    <div dangerouslySetInnerHTML={addIFrame()} />
                                </Card>
                            </Form.Field>
                        </Panel>
                        <Panel header="3. Save your work" key="3">
                            <Form.Field>
                                <p className="create-label">Save your code here! <a href="https://guides.github.com/features/mastering-markdown/">(Learn Markdown)</a></p>
                                <Card bordered={false} className='create-join' hoverable>
                                    <MdEditor
                                        className="create-markdown"
                                        placeholder="
                         Example code:
                        ```
                        import time
                        # Quick, count to ten!
                        for i in range(10):
                        # (but not *too* quick)
                        time.sleep(0.5)
                        print(i)
                        ```
                        "
                                        value={solution}
                                        style={{ height: "500px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={({ text }) => setSolution(text)}
                                    />
                                </Card>
                            </Form.Field>
                            <Form.Field>
                                <Button
                                    fluid
                                    type='button'
                                    content='Choose a thumbnail'
                                    labelPosition='left'
                                    icon='file'
                                    onClick={() => fileInputRef.current.click()}
                                />
                                {thumbnail && <Message color='blue' message={`Selected image ${thumbnail.name}`} />}
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    hidden
                                    onChange={e => setThumbnail(e.target.files[0])}
                                />
                            </Form.Field>
                            <Button primary fluid loading={loading} disabled={loading} type='submit'>Submit</Button>
                        </Panel>
                    </Collapse>

                </Form>
            </Card>
        </div>
    )
}

export default PostCreate
