$('#postTextarea').keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();
    console.log(value);
});
