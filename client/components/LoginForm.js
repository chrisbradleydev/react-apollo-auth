import React from 'react'
import { hashHistory } from 'react-router'
import { graphql, compose } from 'react-apollo'
import AuthForm from './AuthForm'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Login'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { errors: [] }
        this._onSubmit = this._onSubmit.bind(this)
    }
    render() {
        return (
            <div>
                <h4>Login</h4>
                <AuthForm errors={this.state.errors} onSubmit={this._onSubmit} />
            </div>
        )
    }
    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard')
        }
    }
    _onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }],
        }).catch(resp => {
            const errors = resp.graphQLErrors.map(error => error.message)
            this.setState({ errors })
        })
    }
}

export default compose(
    graphql(query),
    graphql(mutation))(LoginForm)
