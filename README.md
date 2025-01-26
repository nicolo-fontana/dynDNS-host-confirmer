# dynDNS host confirmer
Automatic bot written in node.js that automatically confirms free dynDNS.it host.

## Installation
- Open the terminal in the project folder
- Run the command `npm install`

## Configuration
- Open file `app/constants.js`
- Set `user` with your dyndns.it user
- Set `password` with your dyndns.it password

If you want you can change:
- `expirationDays` to set the threshold of days from which it should do the host confirmation (by default is 15 days)
- `scheduleTime` to set how often it should do the check (by default is every day at 00:00)

## Start
- Run the command `npm run start`