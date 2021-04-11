import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { Paper, OutlinedInput, Button } from '@material-ui/core';

interface getProps{
    poId: number;
    email: string;
}

interface CommentTypes {
    id? : number;
    poId? : number;
    email: string;
    context: string;
    time: string;
}

const CreateComment: React.FC<getProps> = ({ poId, email }) => {
    const [context, setContext] = useState<string>("");
    const time = moment().format('YYYY-MM-DD:HH:mm:ss');
    const [commentList, setCommentList] = useState<CommentTypes[]>([]);

    const addComment = () => {
        Axios.post('http://localhost:5000/createComment', {
            poId, email, context, time
        }).then(() => {
            setCommentList([
                ...commentList,
                {poId, email, context, time},
            ])
        })
        window.location.reload();
    }

    return (
        <div>
            <div style={{ paddingBottom: '10px' }}>
                <OutlinedInput
                    style={{ width: '75%' }}
                    type="text"
                    onChange={(e) => {
                        setContext(e.target.value);
                    }}
                />
            </div>
            <Button variant="contained" onClick={addComment}>댓글</Button>
            <br/><br/>
        </div>
    )
}

export default CreateComment
