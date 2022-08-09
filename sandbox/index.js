var commentsByPostId = {};

commentsByPostId = commentsByPostId['x'] || [];


commentsByPostId.push({id: '12', content:'Content', commentStatus:'pending'});
commentsByPostId.push({id: '12', content:'Last', commentStatus:'pending'});


var listOfComments = [];

listOfComments['1'] = commentsByPostId;

console.log(`Verify list of comments: ${listOfComments['1']}`);
