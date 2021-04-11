import React, { useState, useEffect } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

interface getProps{
    poId: number;
}

interface likeTypes {
    like: number;
}

interface dislikeTypes {
    dislike: number;
}

const ReadLikeDislike: React.FC<getProps> = ({ poId }) => {

    const [likeList, setLikeList] = useState<likeTypes[]>([]);
    const [dislikeList, setDislikeList] = useState<dislikeTypes[]>([]);

    useEffect(() => {
        Axios.get(`http://localhost:5000/readLike/${poId}`)
        .then((res : any) => (
            setLikeList(res.data[0].count)
        ))
        .catch((error : any ) => console.log('이 영상엔 좋아요 또는 싫어요가 없습니다.'))
        Axios.get(`http://localhost:5000/readDislike/${poId}`)
        .then((res) => (
            setDislikeList(res.data[0].count)
        ))
        .catch((error : any ) => console.log('이 영상엔 좋아요 또는 싫어요가 없습니다.'))
    }, [])

    return (
        <div style={{ display: 'flex', padding: '0 10px' }}>
            <div style={{ display: 'flex' }}>
                <ThumbUpAltIcon style={{ padding: '0 5px' }}  />
                <Typography>{likeList}</Typography>
            </div>
            <div style={{ display: 'flex', padding: '0 10px' }}>
                <ThumbDownIcon style={{ padding: '0 5px' }} />
                <Typography>{dislikeList}</Typography>
            </div>
        </div>
    )
}

export default ReadLikeDislike
