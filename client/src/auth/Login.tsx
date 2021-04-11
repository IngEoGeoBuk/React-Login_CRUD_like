import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'; 
import Button from '@material-ui/core/Button';

interface UserTypes {
    name : string;
    email : string;
}

const Login = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // User data
    const [user, setUser] = useState<UserTypes>({
        name : "",
        email: ""
    })

    const responseGoogle = async (res : any ) => {
        const profile = await res.getBasicProfile();
        const name = profile.getName();
        const email = profile.getEmail();
        setUser({
            name: profile.getName(),    
            email: profile.getEmail()
        })
        window.localStorage.setItem("userEmail", JSON.stringify(email));
        window.localStorage.setItem("userName", JSON.stringify(name));
        // if(window.location.href != '/') {
        //     window.location.replace('/')
        // }
    }

    const logout = () => {
        setUser({
            name : "",
            email: ""
        })
        setIsAuthenticated(false);
        window.localStorage.removeItem("userEmail");
        window.localStorage.removeItem("userName");
    }

    useEffect(() => {
        if(user.email.length > 0 || user.name.length > 0) {
            setIsAuthenticated(true);
        }
    }, [user])

    return (
        <div>
            { isAuthenticated ? <AuthenticatedView logout={logout} user={user} /> : <UnAuthenticatedView responseGoogle = {responseGoogle} /> }
        </div>
    )
}

    const AuthenticatedView = ({ user, logout } : { user : UserTypes, logout: any} ) => {
        return (
            <GoogleLogout
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
                render={renderProps => (
                    <div onClick={renderProps.onClick} style={{ cursor: 'pointer', float: 'right' }}>
                        {user.email}님 반갑습니다.
                        &nbsp; &nbsp; 
                        <Button variant="outlined" 
                            onClick={renderProps.onClick}
                            style={{ cursor: 'pointer', width: '80px', height: '30px' }}
                            size='small'
                        >
                            <div onClick={() => {window.location.replace("/")}}>Logout</div>
                        </Button>
                    </div>
                )}
            />

        )
    }

    const UnAuthenticatedView = ({ responseGoogle } : { responseGoogle : any }) => {
        return (
            <GoogleLogin 
                clientId="1084057955908-a7lb771v4sblh8dnrmnmucnb1j97jkgg.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle} 
                isSignedIn={true}
                buttonText="Login"
                render={renderProps => (
                    <div style={{ float: 'right' }}>
                        로그인 해주세요.&nbsp; &nbsp; 
                        <Button variant="outlined" 
                            onClick={renderProps.onClick}
                            style={{ cursor: 'pointer', width: '80px', height: '30px' }}
                            size='small'
                        >
                            Login
                        </Button>
                    </div>
                )}
                // cookiePolicy={'single_host_origin'}
            />
        )
    }

export default Login