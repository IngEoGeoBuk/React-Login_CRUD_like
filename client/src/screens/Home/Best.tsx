import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Colors from '../../styles/Colors'
import ReactPaginate from 'react-paginate';
import ReadLikeDislike from '../../components/ReadLikeDislike';

import './Home.css';

const White = Colors.White;
const Indigo = Colors.Indigo;

interface postTypes {
    id?: number;
    title: string;
    contents: string;
}

const Best = () => {
    const [postList, setPostList] = useState<postTypes[]>([]);
    useEffect(() => {
        Axios.get('http://localhost:5000/readBest')
        .then((res) => setPostList(res.data));
    }, [])

    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 5;
    const pagesVisited = pageNumber * postPerPage;

    const displayPosts = postList
    .slice(pagesVisited, pagesVisited + postPerPage)
    .map((val : postTypes , key : number) => {
        return (
            <div>
                <Paper elevation={2} style={{ padding: '10px' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/team/${val.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ display: 'none' }}>{key}</h3>
                        <Typography style={{ color: Indigo }}>{val.title}</Typography>
                    </Link>
                    <ReadLikeDislike poId={val.id!}/>
                    </div>
                </Paper>
                <br/>                    
            </div>
        );
    });

    const pageCount = Math.ceil(postList.length / postPerPage);

    const changePage = ({ selected } : any) => {
        setPageNumber(selected);
    };

    return (
        <div className="App">
            {displayPosts}
            <div className="pagination">
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={pageCount}
                onPageChange={changePage}
                breakLabel={"..."}
                breakClassName={"break-me"}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                containerClassName={"pagination"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

            </div>
        </div>
    );

}

export default Best
