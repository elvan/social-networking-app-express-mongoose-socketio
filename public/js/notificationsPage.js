$(document).ready(() => {
    $.get('/api/notifications', (data) => {
        outputNotificationList(data, $('.resultsContainer'));
    });
});

function outputNotificationList(notifications, container) {
    notifications.forEach((notification) => {
        var html = createNotificationHtml(notification);
        container.append(html);
    });

    if (notifications.length == 0) {
        container.append("<span class='noResults'>Nothing to show.</span>");
    }
}

function createNotificationHtml(notification) {
    var userFrom = notification.userFrom;
    var text = getNotificationText(notification);

    return `
        <a href='#' class='resultListItem notification'>
            <div class='resultsImageContainer'>
                <img src='${userFrom.profilePic}'>
            </div>
            <div class='resultsDetailsContainer ellipsis'>
                <span class='ellipsis'>${text}</span>
            </div>
        </a>
    `;
}

function getNotificationText(notification) {
    var userFrom = notification.userFrom;

    if (!userFrom.firstName || !userFrom.lastName) {
        return alert('user from data not populated');
    }

    var userFromName = `${userFrom.firstName} ${userFrom.lastName}`;

    var text;

    if (notification.notificationType == 'retweet') {
        text = `${userFromName} retweeted one of your posts`;
    } else if (notification.notificationType == 'postLike') {
        text = `${userFromName} liked one of your posts`;
    } else if (notification.notificationType == 'reply') {
        text = `${userFromName} replied to one of your posts`;
    } else if (notification.notificationType == 'follow') {
        text = `${userFromName} followed you`;
    }

    return `<span class='ellipsis'>${text}</span>`;
}
