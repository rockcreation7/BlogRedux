import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createPost } from '../actions'

// must add loader during fetch

class PostsNew extends Component{

    // field wire up as central reduxForm handler
    renderField(field){

        const {meta:{touched, error}} = field
        const className = `form-group ${touched && error ? 'has-danger': ''}`

        return(
            <div className={className}>
                <label> {field.label} </label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''} 
                </div>
            </div>
        )
    } 

    onSubmit(values){
        // this === component
        console.log(values)
        this.props.createPost(values, () =>{
            this.props.history.push('/')
        }
        );
    }

    render(){
        // redux form added this one
        const { handleSubmit } = this.props;

        return(
            // callback handleSubmit if everything ok
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                 
                <Link className="btn btn-danger" to="/">
                    Cancel
                </Link>
            
            </form>
        )
    }
}

function validate(values){
    const errors = {};
 
    // if(!values.title || values.title.length < 3){
    if(!values.title) { 
        errors.title = "Enter a title that is at least 3 character!"
    }
    if(!values.categories){
        errors.categories = "Enter some categories!"
    }
    if(!values.content){
        errors.content = "Enter some content please"
    }

    return errors;
}

export default reduxForm({
    // just unique name
    validate,
    form: 'PostsNewFrom'
})(
   connect(null, {createPost})(PostsNew)
);