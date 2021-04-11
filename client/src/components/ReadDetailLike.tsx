import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

interface getProps{
    poId: number;
}

interface likeTypes {
    like: number;
}

const ReadDetailLike: React.FC<getProps> = ({ poId }) => {
    const [likeList, setLikeList] = useState<likeTypes[]>([]);
    useEffect(() => {
        Axios.get(`http://localhost:5000/readLike/${poId}`)
        .then((res : any) => (
            setLikeList(res.data[0].count)
        ))
        .catch((error : any ) => console.log('이 영상엔 좋아요 또는 싫어요가 없습니다.'))
    }, [])

    return (
        <div>
            <Typography>{likeList}</Typography>
        </div>
    )
}

export default ReadDetailLike
