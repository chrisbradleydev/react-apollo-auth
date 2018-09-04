import React from 'react'
import { Link } from 'react-router'
import { graphql, compose } from 'react-apollo'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this._renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
    _renderButtons() {
        const { loading, user } = this.props.data
        if (loading) return <div />

        /* eslint-disable react/jsx-no-bind */
        if (user) {
            return (
                <li>
                    <a onClick={this._onLogoutClick.bind(this)}>Logout</a>
                </li>
            )
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )
        }
    }
    _onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query }],
        })
    }
}

export default compose(
    graphql(query),
    graphql(mutation))(Header)
