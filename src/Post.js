import React from 'react'
import {Link} from 'react-router-dom'

export default class Post extends React.Component {

    constructor() {
        super()
        this.state = {
            post: {},
            comments: [],
        }
    }
    componentDidMount() {
        const {match: {params: {postId}}} = this.props
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(response => {
            this.setState({post: response})
        }).catch(err=>
        {
            console.log(err)
        })
    }

    deletePost = () => {
        console.log(this.props)
        const {match: {params: {postId}}} = this.props
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "delete"
        }).then(res => {
            this.props.history.goBack()
        }).catch((err)=>{
            this.props.history.goBack()
        })
    }

    getComments = () => {
        const {match: {params: {postId}}} = this.props
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json())
        .then((response)=>{this.setState({comments: response})}).catch((err)=>{
            console.log(err)
        })
    }

    hideComments = () => {
        this.setState({comments: []})
    }

    render() {
        console.log(this.state)
        return <div className='post-list'>
           <h1>{this.state.post && this.state.post.title} <button onClick={this.deletePost}>Delete</button></h1>
           <p>{this.state.post && this.state.post.body}</p>
           {
               <div className="button-box">
                    <button onClick={this.getComments}>Comments</button>
           {this.state.comments.length>0 && <button onClick={this.hideComments}>Hide Comments</button>}
               </div>
           }
           {this.state.comments.map((c,i)=>{
               return <div className="comment-box" key={i}>
                   <h4>{c.name}</h4>
                   <p>{c.body}
                   </p>
                   <p>--By {c.email}</p>
               </div>
           })}
            </div>
    }
}