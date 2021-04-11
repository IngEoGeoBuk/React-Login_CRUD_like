import React, { useState, useEffect } from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ReadDetailLike from './ReadDetailLike';
import ReadDetailDislike from './ReadDetailDislike';

interface getProps{
    poId: number;
    email: string;
}

interface likeTypes {
    id: number;
    poId: number;
    email: string;
    liked: number;
    disliked: number;
}

const Like_Dislike: React.FC<getProps> = ({ poId, email }) => {

    const [yourLiked, setYourLiked] = useState<likeTypes[]>([]);
    
    // DB 쿼리로부터 받아온 데이터들
    const [likeId, setLikeId] = useState<number>(0);
    const [ifLiked, setIfLiked] = useState<number>(0);
    const [ifDisliked, setIfDisliked] = useState<number>(0);
    const [fromEmail, setFromEmail] = useState<string>('');

    useEffect(() => {
        Axios.get(`http://localhost:5000/readYourLike/${poId}/${email}`)
        .then((res) => (
            console.log(JSON.stringify(res.data[0])),
            setYourLiked(res.data),
            setLikeId(res.data[0].id),
            setIfLiked(res.data[0].liked),
            setIfDisliked(res.data[0].disliked),
            setFromEmail(res.data[0].email)
        ))
        .catch((error : any ) => console.log('당신은 이 영상에 좋아요를 누르지 않았습니다.'))
    }, [])

    const upLike = () => {
        if(!email) {
            alert('로그인을 하셔야 가능합니다.');
            return false;
        }
        else {
            Axios.post('http://localhost:5000/upLike', {
                poId, email
            })
            Axios.delete(`http://localhost:5000/unDislike/${likeId}`)
            window.location.reload();
        }
    }

    const unLike = () => {
        Axios.delete(`http://localhost:5000/unLike/${likeId}`)
        window.location.reload();
    }

    const unDislike = () => {
        Axios.delete(`http://localhost:5000/unDislike/${likeId}`)
        window.location.reload();
    }

    const upDislike = () => {
        if(!email) {
            alert('로그인을 하셔야 가능합니다.');
            return false;
        }
        else {
            Axios.post('http://localhost:5000/upDislike', {
                poId, email
            })
            Axios.delete(`http://localhost:5000/unLike/${likeId}`)
            window.location.reload();
        }
    }

    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            {email == fromEmail && ifLiked == 1 && ifDisliked == 0 ?
            <ThumbUpAltIcon 
                style={{padding: '10px', cursor: 'pointer'}}
                onClick={() => unLike()}
            /> : 
            <ThumbUpAltOutlinedIcon 
                style={{padding: '10px', cursor: 'pointer'}}
                onClick={() => upLike()}
            />
            } 
            {email == fromEmail && ifLiked == 0 && ifDisliked == 1 ?
            <ThumbDownIcon 
                style={{padding: '10px', cursor: 'pointer'}}
                onClick={() => unDislike()}
            /> :        
            <ThumbDownAltOutlinedIcon 
                style={{padding: '10px', cursor: 'pointer'}}
                onClick={() => upDislike()} 
            />     
            }
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <Typography style={{ padding: '0px 10px' }}>
                <ReadDetailLike poId={poId} />
            </Typography>
            <Typography style={{ padding: '0px 10px' }}>
                <ReadDetailDislike poId={poId} />
            </Typography>
            </div>

        </div>
        
    )
}

export default Like_Dislike
