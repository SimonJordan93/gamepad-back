# gamepad-back

Games Routes:

- [x] GET/games
- [x] GET/game/:gameId
- [x] GET/platforms
- [x] GET/genres
- [x] GET/stores

User Routes:

- [x] POST/signup
- [x] POST/signin
- [x] GET/profile
- [x] PATCH/update/email
- [x] PATCH/update/username
- [x] PATCH/update/password
- [ ] PATCH/update/avatar
- [x] POST/delete
- [x] DELETE/delete

Review Routes:

- [x] POST/review/create
- [x] GET/review/:gameId
- [x] GET/review/:userId
- [x] PUT/review/:reviewId
- [x] DELETE/review/:reviewId
- [x] POST/review/vote/:reviewId

Favourites Routes:

- [x] POST/favourites/add/:gameId
- [x] DELETE/favourites/remove/:gameId
- [x] GET/favourites/user/:userId
- [x] GET/favourites/exists/:userId/:gameId
