import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import UserInfoContext from '../../context/UserInfoContext';
import { Paper, OutlinedInput, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface postTypes {
    id?: number;
    email?: string;
    title: string;
    contents: string;
}

// ? 표시로 인해 해당값이 없을수도있다 라는 의미를 부여함
// !로 인해 해당값은 무조건 존재한다라는 의미를 부여람

// 밑에 val.id! 한 것 처럼
// 로컬스토레이지에서 아이디 비번 뽑아올떄도 뒤에 ! 붙여보자

export default function CreateTeam() {

    const email = window.localStorage.getItem("userEmail")?.substr(1).slice(0,-1);
    const [title, setTitle] = React.useState<string>("");
    const [contents, setContents] = useState<string>("");
    const [postList, setPostList] = useState<postTypes[]>([]);

    const addPost = () => {
        if(!title) {
            alert('제목을 입력하세요.');
            return false;
        }

        if(!contents) {
            alert('내용을 입력하세요.');
            return false;
        }

        Axios.post('http://localhost:5000/create', {
            email, title, contents
        }).then(() => {
            setPostList([
                ...postList,
                {email, title, contents},
            ])
        })
        window.location.replace("/");
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/read')
        .then((res) => setPostList(res.data));
    }, [])

    return (
        <Paper>
            {email ? 
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
                            maxLength={20}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>내용</Typography>
                        <OutlinedInput
                            type="text"
                            onChange={(e) => {
                            setContents(e.target.value);
                        }}
                        />
                    </div>
                    <br/><br/><br/>
                    <Button variant="contained" onClick={addPost}>글 작성</Button>
                </div> : 
                <div>로그인 하셔야 이용 가능합니다.</div>  
            }
        </Paper>
    )
}
