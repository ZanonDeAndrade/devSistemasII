import React from "react";

const Login: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;