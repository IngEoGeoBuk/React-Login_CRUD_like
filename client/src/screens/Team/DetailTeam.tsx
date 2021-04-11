import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateComment from './CreateComment';
import moment from 'moment';
import 'moment/locale/ko';

import { Paper, OutlinedInput } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Colors from '../../styles/Colors'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import ReportModal from '../../constants/emailjs/ReportModal'
import Like_DisLike from '../../components/Like_Dislike'

const Black = Colors.Black;
const Indigo = Colors.Indigo;

interface postTypes {
    id?: number;
    email: string;
    title: string;
    contents: string;
}

interface CommentTypes {
    id? : number;
    poId? : number;
    email: string;
    context: string;
    time: Date;
}

const IconStyles = {
    color: Indigo, cursor: 'pointer', display: 'flex'
}


const DetailTeam = ({match} : any) => {
    const getId = match.params.id;
    const id = `${getId}`;
    const getEmail = window.localStorage.getItem("userEmail")?.substr(1).slice(0,-1);

    const [postList, setPostList] = useState<postTypes[]>([]);
    const [commentList, setCommentList] = useState<CommentTypes[]>([]);
    const [targetComment, setTargetComment] = useState<number>();
    const [showUpdateComment, setShowUpdateComment] = useState<boolean>(false);

    const [newContext, setNewContext] = useState<string>('');
    const time = moment().format('YYYY-MM-DD:HH:mm:ss');

    const deleteEmployee = (id : number) => {
        Axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
            setPostList(
                postList.filter((val) => {
                return val.id != id;
            })
            );
        });
        alert('글이 삭제 되었습니다.')
        window.location.replace("/");
    };

    useEffect(() => {
        Axios.get(`http://localhost:5000/readOne/${id}`)
        .then((res) => setPostList(res.data));
        Axios.get(`http://localhost:5000/readComment/${id}`)
        .then((res) => setCommentList(res.data));
    }, [])

    const deleteComment = (id : number) => {
        Axios.delete(`http://localhost:5000/deleteComment/${id}`).then((res) => {
            setCommentList(
                commentList.filter((val) => {
                    return val.id != id;
                })
                );
            });
        window.location.reload();
    }

    const updateTargetCommentId = `${targetComment}`;
    const updateComment = () => {
        Axios.put(`http://localhost:5000/updateComment/${updateTargetCommentId}`, { newContext, time })
        window.location.reload(); 
    }
    
    return (
        <div>
            {postList.map((val, key : number ) => {
                return (
                    <div>
                        <Paper style={{ padding: '10px' }}>
                            <h3 style={{ display: 'none' }}>{key}</h3>
                            <div style={{ display: 'flex', justifyContent : 'space-between' }}>
                                <h3>Email: {val.email}</h3>
                                {getEmail == val.email ? 
                                <div style={IconStyles}>
                                    <div style={{display: 'flex' }} onClick={() => { deleteEmployee(val.id!)}}>
                                        <DeleteIcon />
                                        <Typography>삭제</Typography>
                                    </div>
                                    <Link to={`/updateTeam/${val.id}`} style={{ display: 'flex', textDecoration: 'none' }}>
                                        <EditIcon style={{ color: Indigo }}/>
                                        <Typography style={{ color: Indigo }}>수정</Typography>
                                    </Link>

                                </div>
                                : 
                                <div>
                                    {getEmail ?  
                                    <ReportModal poId={val.id!} poEmail={val.email} logedEmail={getEmail}/>
                                        : <div></div>
                                    }

                                </div>
                                }
                            </div>
                            <h3>Title: {val.title}</h3>
                            <h3>Contents: {val.contents}</h3>
                            <br/><br/>
                            <Like_DisLike email={getEmail!} poId={val.id!}/>
                        </Paper>
                        <br/>
                        <div>
                        {getEmail ?
                            <div>
                                <CreateComment 
                                    poId={val.id!}
                                    email={getEmail}
                                /> 
                            </div>
                            : <div></div>
                        }
                        {commentList.map((val, key : number ) => {
                            return (
                                <div>
                                <Paper style={{ padding: '10px' }} elevation={2}>
                                    <div>
                                        <h3 style={{ display: 'none' }}>{key}</h3>
                                        <div style={{ display: 'flex', justifyContent : 'space-between' }}>
                                            <div>
                                            <Typography variant="h5" style={{ color: Indigo }}>user: {val.email}</Typography>
                                            </div>
                                            <div>
                                            {/* 로그인한 계정과 댓글 작성자가 같을 경우 수정 취소 뜨게 함 */}
                                            {getEmail == val.email ? 
                                                <div style={IconStyles}>
                                                    <div style={{display: 'flex' }} onClick={() => deleteComment(val.id!)}>
                                                        <DeleteIcon />
                                                        <Typography>삭제</Typography>
                                                    </div>
                                                    <div style={{display: 'flex' }}
                                                        onClick={() => {
                                                        setTargetComment(val.id); 
                                                        setShowUpdateComment(!showUpdateComment);
                                                    }}>
                                                        <EditIcon/>   
                                                        <Typography>수정</Typography>
                                                    </div>
                                                </div> : 
                                                <div>
                                                    {getEmail ?  
                                                    <ReportModal coId={val.id} poEmail={val.email} logedEmail={getEmail}/>
                                                    : <div></div>
                                                    }
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        <Typography>{val.context}</Typography>
                                        {/* 댓글수정 눌렀을 경우 */}
                                        {val.id == targetComment && showUpdateComment ? 
                                        <div>
                                            <div>
                                            <OutlinedInput 
                                                type="text"
                                                style={{ width: '75%' }}
                                                onChange={(e) => {
                                                    setNewContext(e.target.value);
                                                }}
                                            />
                                            </div>
                                            <div style={{ display: 'flex', padding: '10px' }}>
                                                <div 
                                                    onClick={() => {updateComment()}} 
                                                    style={IconStyles}
                                                >
                                                    <CheckIcon/>
                                                    <Typography>수정하기</Typography>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setTargetComment(0); 
                                                        setShowUpdateComment(!showUpdateComment);
                                                    }}
                                                    style={IconStyles}
                                                >
                                                    <CloseIcon/>
                                                    <Typography>취소</Typography>
                                                </div>
                                                
                                            </div> 
                                        </div>
                                        : <div></div> 
                                        }
                                        <Typography>{val.time}</Typography>
                                    </div>
                                </Paper>
                                <br/>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
        </div> 
    )
}

export default DetailTeam