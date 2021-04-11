import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Paper, OutlinedInput, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function CreateTeam({ match } : any) {

    const email = JSON.parse(window.localStorage.getItem("userEmail") || "{}");  
    const getId = match.params.id;
    const id = `${getId}`;

    const [title, setTitle] = React.useState<string>("");
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        Axios.get(`http://localhost:5000/readOne/${id}`)
        .then((res) => 
            (
                setTitle(res.data[0].title),
                setContents(res.data[0].contents)
            )
        );
    }, [])

    const updatePost = () => {
        Axios.put(`http://localhost:5000/update/${id}`, { title, contents })
        window.location.replace("/");   
    }

    return (
        <Paper>
            <div style={{ padding: '10px' }}>
                <Typography>글쓴이: {email}</Typography>
                <br/><br/>
                <input 
                    type="text"
                    value={email}
                    readOnly
                    style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>제목</Typography>
                    <input
                        type="text"
                        onChange={(e) => {
                        setTitle(e.target.value);
                        }}
                        value={title}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>내용</Typography>
                    <OutlinedInput
                        type="text"
                        onChange={(e) => {
                            setContents(e.target.value);
                        }}
                        value={contents}
                    />
                </div>
                <br/><br/><br/>
                <Button variant="contained" onClick={updatePost}>글 수정</Button>
            </div>
        </Paper>
    )
}