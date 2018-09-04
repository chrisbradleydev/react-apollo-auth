import React from 'react'

class AuthForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '' }
        this._onSubmit = this._onSubmit.bind(this)
    }
    render() {
        return (
            <div className="row">
                <form onSubmit={this._onSubmit} className="col s4">
                    <div className="input-field">
                        <input type="text" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="errors">
                        {this.props.errors.map(error => <div key={error}>{error}</div>)}
                    </div>
                    <input type="submit" value="Submit" className="waves-effect waves-light btn" />
                </form>
            </div>
        )
    }
    _onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }
}

export default AuthForm
