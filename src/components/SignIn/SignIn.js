import React from 'react'
/*

1.create a function for user name and password
2.on submit call the api for login
3. based on the response route or show error

*/

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorLoggingIn:false
        }
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });

    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSignIn = () => {
        fetch('http://localhost:4000/signin', {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.props.loadUser(data)
                    this.props.onRouteChange('Home')
                }
                else {
                    this.setState({ errorLoggingIn: true});
                    console.log('error occured')
                }
            })


    }

    render() {


        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}

                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="tc">
                            <input

                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSignIn}
                            />

                        </div>
                        <div className="lh-copy mt3 tc">
                            {
                                this.state.errorLoggingIn
                                ?<div>
                                    <p className="f6 link dim black db pointer" onClick={() => onRouteChange('Register')} >Register</p>
                                    <p className='red'>username and password combination is incorrect</p>
                                </div>
                                :<p className="f6 link dim black db pointer" onClick={() => onRouteChange('Register')} >Register</p>
                            }
                            
                        </div>
                    </div>
                </main>
            </article>
        );

    }


}




export default SignIn;