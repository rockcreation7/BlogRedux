import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom'

class PostShow extends Component{

    componentDidMount(){
        if(!this.props.post){
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        } 
    }

    /*
    helperFunction(){
        this.props.posts[this.props.match.parms.id];
    }
    */
    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/')
        }
    );
    }

    render(){
        // this.props.match.parms.id
        const { post } = this.props;

        if(!post){
            return <div>Loading...</div>;
        }

   

        return(
            <div>
                <Link to="/"> Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    // point at right/ this level this, onDeleteClick will be third level
                    onClick={this.onDeleteClick.bind(this)}
                > 
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories:{post.categories}</h6>
                <p>{post.content}</p>
                Post Show!
            </div>
        )
    }

}
// create props by state(posts) and send it as ownProps
// post could have some state, or nothing, it just return an post fake array
function mapStateToProps({ posts }, ownProps){
    return { post: posts[ownProps.match.params.id] }
}


export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow)
