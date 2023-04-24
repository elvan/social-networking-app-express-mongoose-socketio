$(document).ready(() => {
    loadPosts();
});

function loadPosts() {
    $.get('/api/posts', { postedBy: profileUserId, isReply: false }, (results) => {
        outputPosts(results, $('.postsContainer'));
    });
}
