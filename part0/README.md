# Part0

## Exercise 0.4

Create a diagram where the user creates a new note on page [https://studies.cs.helsinki.fi/exampleapp/new_note](https://studies.cs.helsinki.fi/exampleapp/new_note)

```
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note [note: new note]
server-->browser: HTTP 302 redirect. Location: /exampleapp/notes
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser js-code requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"new note","date":"2021-11-04T08:22:37.978Z"}, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![new note diagram](./images/new_note.png)

## Exercise 0.5

Create a diagram where the user goes to the [single page app](https://studies.cs.helsinki.fi/exampleapp/spa)

```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser js-code requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"new note","date":"2021-11-04T08:22:37.978Z"}, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![single page app diagram](./images/spa.png)

## Exercise 0.6

Create a diagram depicting the situation where the user creates a new note using the [single page version of the app](https://studies.cs.helsinki.fi/exampleapp/spa)

```
note over browser:
on form submit, browser executes js-code
that renders notes to display and send a POST request
to the server with the new note created
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{content: "spa note", date: "2021-11-04T09:54:14.879Z"}]

note over server:
server js-code save the note on the database (data.json)
and responds with a code indicating the result of the request
end note

server-->browser: HTTP 201 created. [{"message":"note created"}]
```

![new note on spa diagram](./images/spa_new_note.png)