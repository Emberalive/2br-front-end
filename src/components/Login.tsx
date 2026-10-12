import * as React from "react";

type propTypes = {
    setActiveView: React.Dispatch<React.SetStateAction<string>>;
    api: string
    setUser: React.Dispatch<React.SetStateAction<object>>;
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Login({setActiveView, api, setUser, setSessionId}: propTypes) {
    const [loginView, setLoginView] = React.useState<boolean>(true);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!username && !password) return;
        const url = `${api}user/${loginView? "login" : "register"}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (!response.ok) return;
        const resData = await response.json();
        if (!resData.success) return;
        setActiveView("bookcase")
        setUser({
            username: resData.user.username,
            id: resData.user.id
        });
        setSessionId(resData.sessionId);
        localStorage.setItem('sessionId', resData.sessionId);
    }

    return (
        <div className="component__wrapper">
            <div className="component__container">
                <header>
                    <h1>{loginView? "Login" : "Register"}</h1>
                </header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-element">
                        <label>Username:</label>
                        <input id={"username"} type={"text"} placeholder={"my_username"} value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}></input>
                    </div>
                    <div className="form-element">
                        <label>Password:</label>
                        <input id={"password"} type={"password"} placeholder={"password1234"} value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}></input>
                    </div>
                    <div className="buttons">
                        <button>{loginView ? "Login" : "Register"}</button>
                        <button onClick={() => {
                            setActiveView("bookcase")
                        }}>cancel</button>
                    </div>
                    <div className="link__buttons">
                        <p className={"link-button"} onClick={() => {
                            setLoginView(prev => !prev);
                        }}>{loginView ? "Register" : "Login"}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}