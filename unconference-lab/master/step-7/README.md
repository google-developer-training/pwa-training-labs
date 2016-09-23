# Step 7

**Improve engagement and re-engagement.**


## Objectives

* Add **Install Prompt** handling.

* Add push notifications.


## Instructions

* Chrome has heuristics for when to trigger the prompt for app installation. You might want to defer the prompt to a moment when the user appears to have been engaging with the site. Take a look at the `beforeinstallprompt` handling code in [main.js](js/main.js). You can simulate the `beforeinstallprompt` event from the Chrome DevTools Application Manifest panel. What might be a good time to offer your users to chance to install your app?


## Things to check

* When might be a good time to prompt a user to add to homescreen?

* How can you avoid 'push notification fatigue'? Hint: check out [Pete LePage's guidelines](https://www.youtube.com/watch?v=_dXBibRO0SM).


## Resources

* [Deep user engagement with web push notifications](https://www.youtube.com/watch?v=_dXBibRO0SM)

* [Enable Push Notifications for your Web App](https://codelabs.developers.google.com/codelabs/push-notifications/index.html?index=..%2F..%2Findex#0)
