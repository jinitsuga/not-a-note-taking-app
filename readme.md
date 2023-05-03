This is just another simple note taking app, mostly to practice backend stuff, like user administration, CRUD operations, etc.

CRUD Operations with notes - having built CRUD apps before, I'm fairly familiar with everything so far, except the addition of tests.

Backend testing --> checking for stuff like what type of content we expect from a request, or if functions/queries do exactly what we're expecting them to do.
Using superset to import the app into the test file so its endpoints can tested easily, and bcrypt to encrypt passwords in the server before saving them.
When we test for the Content's type, we use a regex to check for application/json, and what we exactly check for is that the content type _contains_ application/json, instead of a straight up string (which would make it so the content type has to exactly match the string 'application/json'), since the Content-Type can also contain other information, like char encoding

Using JWT for handling login (token based auth)
