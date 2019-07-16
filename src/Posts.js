import React from 'react'
import {Link} from 'react-router-dom'

export default class Posts extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        const {match: {params: {userId}}} = this.props
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&skip=
        0&limit=10`)
        .then(res => res.json())
        .then(response => {
            this.setState({posts: response})
        }).catch(err=>
        {
            console.log(err)
        })
    }
    render() {
        const {location: {state: {username}}}=this.props;
        return <div className='post-list'>
            <h1>{username}</h1>
            {this.state.posts.map((post, i)=> {
                return <Link key={i} to={{pathname: `/post/${post.id}`}}><div className='post'>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div></Link>
            })}
            </div>
    }
}