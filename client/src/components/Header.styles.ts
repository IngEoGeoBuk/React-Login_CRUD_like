import styled, { createGlobalStyle } from 'styled-components';
import Colors from '../styles/Colors'

const Red = Colors.Red;
const White = Colors.White;
const Indigo = Colors.Indigo;

export const Container = styled.div`
    header {
        width:100%;
        height:80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${Indigo}
    }

    ul {
        list-style: none;
    }

    .LinkStyles {
        color: ${White};
    }

    a {
        text-decoration: none;
        outline: none;
    }

    header > h2 {
        margin-left:20px;
        color: ${White};
    }

    header > nav {
        margin-right: 20px;
        height:100%;
    }

    header ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    header ul > li {
        font-size:20px;
        height: 100%;
        margin: 0 10px;
        display: flex;
        align-items: center;
        color: ${White};
    }
`;