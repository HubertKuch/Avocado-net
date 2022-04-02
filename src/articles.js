const articles = [
    {
        id: "installation_tutorial",
        content: `
            <p class="article-h2 yellow" id="installation">
                <a href="#installation" class="hash--pin red">#</a>
                Installation
            </p>
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
            <p class="article-h2" id="example-app">
                <a href="#example-app" class="hash--pin red">#</a>
                Example app using Avocado router and HTTP methods:
            </p>
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
            <p id="what-is-request" class="article-h3">
                <a href="#what-is-request" class="hash--pin red"># </a>
                What is request?
            </p>
            <p class="article-h4">
                Request is it what incoming to our application, it is made by client and can contain some data for example:
                host name, headers, client ip address or data. HTTP request always store method (like GET, POST, PUT, DELETE) and path (like /api/v1/users/).
                To decode JSON post data check <a class="link red" href="/documentation/routing">Router methods</a>.
            </p><br>
            <p id="how-store-data-from-middleware" class="article-h3">
                <a href="#how-store-data-from-middleware" class="hash--pin red"># </a>
                How store data from middleware and pass it into route?
            </p>
            <p class="article-h4">
                In request you have special array named \`locals\`, in it, you can save your data and read it in route.
                For more check <a href="/documentation/middleware" class="link red">middleware</a> section.
            </p>
            <pre class="code-snippet">
function middleware(AvocadoRequest $req) {
    $req->locals['fullName'] = $req->body['username'].$req->body['lastname'];
    return true;
}

AvocadoRouter::GET('/', ['middleware'], function(AvocadoRequest $req, AvocadoResponse $res) {
    return $res->write($req->locals['fullName']);
});
</pre>
            
            <br>
            <p class="article-h3" id="request-properties">
                <a href="#request-properties" class="hash--pin red">#</a>
                Request has the following properties:   
            </p>
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
    },
    {
        id: "router_response",
        content: `
            <p class="article-h3" id="what-its-response">
                <a class="hash--pin red" href="#what-its-response"># </a>
                What it's response
            </p>
            <p class="article-h4">
                Response is made by server and send to client (opposite to request which is made by client send to server). 
                HTTP response has status code (200 - ok, 404 - not found, 201 - created etc, etc), optional data (for example user info) and cookies. 
                It informs client about successfully login, registered or get some resource.
            </p>
            <br>
            <p class="article-h3" id="how-response-works">
                <a href="#how-response-works" class="hash--pin red"># </a>
                How works response
            </p>
            <p class="article-h4">
                Request is incoming to server, it is checking and if all is correct controller do action and send response 
                with specific data to client. For example, let's take this problem. Client send request to \`/api/v1/users/login\`
                then specific controller will be run. It checks user data like username and password and if it is correct send
                to client \`response\` with authorization token. 
            </p>
            <br>
            <p class="article-h3" id="response-methods">
                <a href="#response-methods" class="hash--pin red"># </a>
                Response methods
            </p>
            <table class="table">
                <tr class="table__header">
                    <td class="table__column">Method</td>
                    <td class="table__column">Description</td>
                    <td class="table__column">Return type</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">write($data)</td>
                    <td class="table__column">Send array, object or other type values</td>
                    <td class="table__column">AvocadoResponse</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">json(array $data)</td>
                    <td class="table__column">Send data as json</td>
                    <td class="table__column">AvocadoResponse</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">withStatus(int $status)</td>
                    <td class="table__column">Set HTTP status code (200, 201, 400 etc)</td>
                    <td class="table__column">AvocadoResponse</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">withCookie(string $key, string $value, ?array $options)</td>
                    <td class="table__column">Options accept keys: int expire, string path, string domain, bool secure, bool httponly</td>
                    <td class="table__column">AvocadoResponse</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">setHeader(string $key, string $value)</td>
                    <td class="table__column">Set HTTP header like \`Content-Type: application-json\`</td>
                    <td class="table__column">AvocadoResponse</td>
                </tr>
            </table>
            <br>
            <p class="article-h3" id="using-response-example">
                <a href="#using-response-example" class="hash--pin red">#</a>
                Using response example  
            </p>
            <pre class="code-snippet">
Router::POST('/', [], function (AvocadoRequest $req, AvocadoResponse $res){
    // get data from request
    $username = $req->body['username'] ?? null;
    $password = $req->body['password'] ?? null;
    
    // check is username or password is not set
    if (!$username || $password) {
        // send information to client with bad request code (400)
        return $res->json(array(
            "message" => "Login data send incorrectly"
        ))->withStatus(400);
    }
    
    // generate token
    $token = generateToken($username);
    
    // send token and information to client
    $res -> json(array(
        "message" => "ok"
    )) -> withCookie("token", $token, array(
        "expire" => time() + 3600 * 24
    )) -> setHeader("Authorization", "Bearer $token");
});
</pre>
        `
    }
];

export default articles;