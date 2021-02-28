function Signup() {
    return (<div class="form">
        <ul class="tab-group">
            <li class="tab"><a href="/">Log In</a></li>
            <li class="tab active"><a href="/signup">Sign Up</a></li>
        </ul>
        
        <div class="tab-content">
            <div id="signup">   
                <h1>Sign Up for Free</h1>
                <form action="/" method="post">
                    <div class="top-row">
                        <div class="field-wrap">
                            <input type="text" required autocomplete="off" />
                            <label>
                                Name<span class="req">*</span>
                            </label>
                        </div>
                        <div class="field-wrap">
                            <input type="text"required autocomplete="off"/>
                            <label>
                                User Name<span class="req">*</span>
                            </label>
                        </div>
                    </div>
                    <div class="field-wrap">
                        <input type="email"required autocomplete="off"/>
                        <label>
                            Email Address<span class="req">*</span>
                        </label>
                    </div>
                
                    <div class="field-wrap">
                        <input type="password"required autocomplete="off"/>
                        <label>
                            Enter Password<span class="req">*</span>
                        </label>
                    </div>

                    <div class="field-wrap">
                        <input type="password"required autocomplete="off"/>
                        <label>
                            Confirm Password<span class="req">*</span>
                        </label>
                    </div>
                
                    <button type="submit" class="button button-block">Get Started</button>
                </form>
            </div>
        </div>
    </div>)
}

export default Signup;