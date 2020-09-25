This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Production URL

http://vacations-project-server.herokuapp.com/

### `Vacations Sorted by Followed / not Followed`

This sorting is only done once on retrieval of the vacations and in the server. I chose to do it this way
because I found it very uncomfortable to look at a real time sorting whenever I clicked to follow / unfollow a vacation.
Therefore I chose to only sort once, on each retrieval.

### `Sockets`

All connected clients will be notified when any of the following actions occur: "Adding a Vacation, Editing a Vacation, Deleting a Vacation".
And the data will be updated accordingly, regardless of the following status of the vacation (Followed / Unfollowed).
I found it wrong to present incorrect info simply because the user wasn't following that exact vacation. The information must always be up to date

### `Vacations - Get All`

All of the vacations are retrieved at once after a successul login to the site and therefore, the search bar functions as a client side search,
due to everything already being there and there's no point in sending any requests to the server.

### `Admin Restriction`

Admins can not follow or unfollow a vacation.
