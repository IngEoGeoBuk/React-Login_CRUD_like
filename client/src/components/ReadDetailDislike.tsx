import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

interface getProps{
    poId: number;
}

interface dislikeTypes {
    dislike: number;
}

const ReadDetailDislike: React.FC<getProps> = ({ poId }) => {
    const [dislikeList, setDislikeList] = useState<dislikeTypes[]>([]);
    useEffect(() => {
        Axios.get(`http://localhost:5000/readDislike/${poId}`)
        .then((res) => (
            setDislikeList(res.data[0].count)
        ))
        .catch((error : any ) => console.log('이 영상엔 좋아요 또는 싫어요가 없습니다.'))
    }, [])

    return (
        <div>
            <Typography>{dislikeList}</Typography>
        </div>
    )
}

export default ReadDetailDislike
