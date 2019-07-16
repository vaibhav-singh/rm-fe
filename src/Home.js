import React from 'react'
import { Link} from 'react-router-dom'

function UserTile(props) {
    return <div className='tile'>
        <h3>{props.name}</h3>
        <h5>{props.company}</h5>
        <Link to={{
            pathname: `/posts/${props.id}`, 
            state: {
                username: props.name,
            }
            }}>Blog Posts</Link>
    </div>
}

export default class Home extends React.Component {

    constructor() {
        super()
        this.state = {users: []}
    }
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(response => {
            this.setState({users: response})
        }).catch(err=>
        {
            console.log(err)
        })
    }

    render() {
        const {users} = this.state
        return <div className="flex-layout">
        {users.map((user, i)=>{
            return <UserTile key={i} id={user.id} name={user.name} company={user.company.name}/>
        })}
        </div>
    }
}