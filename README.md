### How to request data from the microservice:

1. Send a GET HTTP request to the microservice's endpath. The endpath for this microservice is '/', and the port is is hosted locally on is defined as 5004.

Example call:

```JavaScript

const getCleanCatData = {

    // Sends GET request to endpath where service is being hosted locally.
    // This example uses fetch, a JavaScript method for HTTP requests.
    // Fetch defaults to GET.
    const response = fetch("http://localhost:5004/");
}
```

```JavaScript

// Next, call the method to begin the request:
fetchData();
```

### How to receive data from the microservice:

1. When the microservice receives the request, it will process the data it receives at the endpath defined in the GET request shown above.

2. The processed data will be returned by the microservice as a response.

3. The main program will receive the processed data as a response from the microservice. By saving the received data to a reference variable, it can now be used in your program.

Example call:

```Python

#  How the processed data is returned from the microservice:
return jsonify(data), 200

```

```JavaScript

// Method to call for and receive processed data from microservice

async function getCleanCatData() {

    // Calls for the service to process the data with fetch (a GET request).
    const response = await fetch("http://localhost:5004");

    // Once processing is complete, the processed data is returned to the main program as a response (of JSON objects).
    const cleanCatData = await response.json();

    // Converts cleanCatData to JSON string format.
    const catData = JSON.stringify(cleanCatData, null, 2);

```

The processed data is now available for your use within the catData variable.

UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your teammate (and your grader) will understand.


Write a mitigation plan by answering these questions:

For which teammate did you implement “Microservice A”?

What is the current status of the microservice? Hopefully, it’s done!

If the microservice isn’t done, which parts aren’t done and when will they be done?

How is your teammate going to access your microservice? Should they get your code from GitHub (if so, provide a link to your public or private repo)? Should they run your code locally? Is your microservice hosted somewhere? Etc.

If your teammate cannot access/call YOUR microservice, what should they do? Can you be available to help them? What’s your availability?

If your teammate cannot access/call your microservice, by when do they need to tell you?

Is there anything else your teammate needs to know? Anything you’re worried about? Any assumptions you’re making? Any other mitigations / backup plans you want to mention or want to discuss with your teammate?
