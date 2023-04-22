$('#postTextarea').keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitButton = $('#submitPostButton');

    if (submitButton.length == 0) return alert('No submit button found');

    if (value == '') {
        submitButton.prop('disabled', true);
        return;
    }

    submitButton.prop('disabled', false);
});

$('#submitPostButton').click(() => {
    var button = $(event.target);
    var textbox = $('#postTextarea');

    var data = {
        content: textbox.val(),
    };

    $.post('/api/posts', data, (postData) => {
        var html = createPostHtml(postData);
        $('.postsContainer').prepend(html);
        textbox.val('');
        button.prop('disabled', true);
    });
});

function createPostHtml(postData) {
    return postData.content;
}
