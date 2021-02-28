
function Login() {
    return (
    <div class="form">
        <ul class="tab-group">
            <li class="tab active"><a href="/">Log In</a></li>
            <li class="tab"><a href="/signup">Sign Up</a></li>
        </ul>
        
        <div class="tab-content">
            <div id="login">   
                <h1>Welcome Back!</h1>
                <form action="/" method="post">
                    <div class="field-wrap">
                        <input type="email"required autocomplete="off"/>
                        <label>
                            Email<span class="req">*</span>
                        </label>
                    </div>
                    <div class="field-wrap">
                        <input type="password"required autocomplete="off"/>
                        <label>
                            Password<span class="req">*</span>
                        </label>
                    </div>
                    <p class="forgot"><a href="#">Forgot Password?</a></p>
                    <button class="button button-block">Log In</button>                
                </form>
            </div>
        </div>
    </div>
    );
}

export default Login;