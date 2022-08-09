import React from 'react';

const CommentsList = ({ comments })=>{

    const renderedComments = comments.map(comment => {
        let content = comment.commentStatus === 'approved' ? comment.content:'This comment has been moderated.'
         
        //key must be here as we are creating list
        return<li key={comment.id}>{content}</li>;
    });

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentsList;