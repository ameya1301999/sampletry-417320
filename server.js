// const express = require('express'); 
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// const app = express(); 

// const client = new SecretManagerServiceClient();
// //const PORT = 8080; 

// const projectId = 'sampletry-417320';
// const secretId = 'PORT';

//     // Access the secret
//     const [version] = client.accessSecretVersion({
//     name: `projects/${projectId}/secrets/${secretId}/versions/latest`,
//     });

//     // Get the payload data as a string
//     const PORT = version.payload.data.toString('utf8');

// app.get('/', (req, res)=>{ 
// 	res.status(200); 
// 	res.send("Welcome to root URL of Server"); 
// }); 
// app.get('/gauripagalhai', (req, res)=>{ 
// 	res.status(200); 
// 	res.send("Welcome to gauri pagal hai"); 
// }); 
// app.get('/ameyaacchahai', (req, res)=>{ 
// 	res.status(200); 
// 	res.send("Welcome to ameyaacchahai"); 
// }); 

// app.listen(PORT, (error) =>{ 
// 	if(!error) 
// 		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
// 	else
// 		console.log("Error occurred, server can't start", error); 
// 	} 
// );

const express = require('express');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const app = express();

async function startServer() {
    const client = new SecretManagerServiceClient();
    const projectId = 'sampletry-417320'; // Replace with your GCP project ID
    const secretId = 'PORT';
    
    try {
        // Access the secret
        const [version] = await client.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretId}/versions/latest`,
        });

        // Get the payload data as a string
        const PORT = version.payload.data.toString('utf8');

        // Start the server
        app.listen(PORT, (error) => {
            if (!error) 
                console.log("Server is successfully running, and App is listening on port " + PORT);
            else
                console.log("Error occurred, server can't start", error);
        });
    } catch (error) {
        console.error('Error occurred while accessing secret:', error);
    }
}

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/gauripagalhai', (req, res) => {
    res.status(200);
    res.send("Welcome to gauri pagal hai");
});

app.get('/ameyaacchahai', (req, res) => {
    res.status(200);
    res.send("Welcome to ameyaacchahai");
});

startServer(); // Call the async function to start the server
