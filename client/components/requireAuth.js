import React from 'react'
import { hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/CurrentUser'

export default (WrappedComponent) => {
    class RequireAuth extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push('/login')
            }
        }
    }
    return graphql(currentUserQuery)(RequireAuth)
}
