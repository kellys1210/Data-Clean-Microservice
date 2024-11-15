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

### UML Sequence Diagram:



![UML](CS361-A8-UML.png)

In this example, you see the Main Program server obtaining the JSON data by reading from a JSON file. If you are using a database instead of a JSON file, you will replace with file system read with a call to your database.
