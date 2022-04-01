const articles = [
    {
        id: "installation_tutorial",
        content: `
            <p class="article-h2 yellow">Installation</p>
            <p class="article-h4">
                You have three options to install Avocado. <span class="blue">Firstly</span> you have to install it as a composer package:
            </p>
            <code class="code-snippet">composer require hubert/avocado</code>
            <p class="article-h4">
                 <span class="light-green">Second</span> is manually clone Avocado repository
            </p>
            <code class="code-snippet">git clone https://github.com/Avocado.git</code>
            <p class="article-h4">
                Then if you have installed package in composer.json in autoload section put 
                psr-4 property to Avocado exactly like that
            </p>
            <pre class="code-snippet">
{ 
    "psr-4": {
        "Avocado\\": "src/",
        "Avocado\\ORM\\": "src/AvocadoORM/",
        "Avocado\\Router\\": "src/AvocadoRouter/"
    }
}</pre>
            <p class="article-h4">
                In the end you must reload composer autoloader.
                <code class="code-snippet">composer dump-autoload</code>
            </p>
            <p class="article-h4">                
                And the last method is using 
                <a href="/documentation/initializer" class="red link">Avocado Initializer</a>.
                Then project is ready to work.
            </p>
        `,
    },
    {
        id: "example_of_router",
        content: `
            <p class="article-h2">Example app using Avocado router and HTTP methods:</p>
            <p class="article-h4 yellow">GET</p>
<pre class="code-snippet">
use Avocado\\Router\\AvocadoRouter;
use Avocado\\Router\\AvocadoRequest;
use Avocado\\Router\\AvocadoResponse;

AvocadoRouter::GET('/hello', [], function(AvocadoRequest $req, AvocadoResponse $res){
    $res -> write('Hello from API') -> withStatus(200);
});

AvocadoRouter::listen();</pre>
            <p class="article-h4">
                That short code listen to <span class="blue">GET</span> endpoint and respond <span class="blue">'hello'</span> with status 200. 
                Important is use listen function on AvocadoRouter class after define all endpoints.
            </p>
            <br>
            <p class="article-h4 yellow">POST</p>
            <pre class="code-snippet">
use Avocado\\Router\\AvocadoRouter;
use Avocado\\Router\\AvocadoRequest;
use Avocado\\Router\\AvocadoResponse;

// incoming URL: /hello/andrzej
AvocadoRouter::POST('/hello/:name', [], function(AvocadoRequest $req, AvocadoResponse $res){
    $req -> body['KEY']; // in body array at request is stored all incoming data
    $name = $req->params['name']; // also in params is stored URL variables like /hello/:name, /hello/andrzej. In this situation name is andrzej
    
    $req->json(array(
        "message" => "Hello, $name"
    ))->withStatus(200); // response is "Hello, andrzej"
});

AvocadoRouter::listen();</pre>
        `
    },
    {
        id: "router_request",
        content: `
            <p class="article-h3">What is request?</p>
            <p class="article-h4">
                Request is it what incoming to our application, it is made by client and can contain some data for example:
                host name, headers, client ip address or data. HTTP request always store method (like GET, POST, PUT, DELETE) and path (like /api/v1/users/).
                To decode JSON post data check <a class="link red" href="/documentation/routing">Router methods</a>.
            </p><br>
            <p class="article-h3">Request has the following properties:</p>
            <table class="table">
                <tr class="table__header">
                    <td class="table__column">Property</td>
                    <td class="table__column">Description</td>
                    <td class="table__column">Type</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">body</td>
                    <td class="table__column">contain data from client (from form etc)</td>
                    <td class="table__column">array</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">params</td>
                    <td class="table__column">path params like /:name /john </td>
                    <td class="table__column">array</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">query</td>
                    <td class="table__column">has path variables for example /user?id=2</td>
                    <td class="table__column">array</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">cookies</td>
                    <td class="table__column">contain cookies from client</td>
                    <td class="table__column">array</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">headers</td>
                    <td class="table__column">HTTP headers like CORS, Content-Type</td>
                    <td class="table__column">array</td>
                </tr>
            </table>
            <br>
            <p class="article-h4">Example</p>
            <pre class="code-snippet">Router::POST('/api/v1/users/:id', [], function(AvocadoRequest $req, AvocadoResponse $res) {
   $username = $req->body['username']; // username property from incoming post data
   $id = $req->params['id']; // for: \`/api/v1/users/1\` is 1
   $friendName = $req->query['friend']; // for \`/api/v1/users/1?friend=john\` is 'john'
   $token = $req->cookies['token']; // \`token: 123.456.789\` is 123.456.789
   $contentType = $req->headers['content-type']; // for \`Content-Type: application-json\` value is application-json  
});</pre>  
        `
    }
];

export default articles;