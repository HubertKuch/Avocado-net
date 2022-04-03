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
    // in body array at request is stored all incoming data
    $req -> body['KEY']; 
    // also in params is stored URL variables like /hello/:name, 
    // /hello/andrzej. In this situation name is andrzej
    $name = $req->params['name']; 
    
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
    },
    {
        id: "router",
        content: `
            <p class="article-h2" id="what-it-is-router">
                <a href="#what-it-is-router" class="hash--pin red">#</a>
                What is it router?
            </p>
            <p class="article-h4">
                Router it is container for all defined routes. All us controllers are stored in router which decide which controller run based on HTTP method (GET, POST...) 
                and path (/, /api/v1/users).
            </p>
            <p class="article-h4">
                If you want use AvocadoRouter on the end of all defined routes you must call static \`listen\` method on AvocadoRouter class. 
            </p>
            <br><br>
            <p class="article-h2" id="router-methods">
                <a href="#router-methods" class="hash--pin red">#</a>
                Router methods
            </p><br>
            <table class="table">
                <tr class="table__header">
                    <td class="table__column">Method</td>
                    <td class="table__column">Description</td>
                    <td class="table__column">Return type</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">use(callable $setting)</td>
                    <td class="table__column">Accept callback which be called before routes</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">useJSON()</td>
                    <td class="table__column">Decode JSON post data and set it to request body</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">GET(string $endpoint, array $middleware, callable $callback)</td>
                    <td class="table__column">Define GET route</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">POST(string $endpoint, array $middleware, callable $callback)</td>
                    <td class="table__column">Define POST route</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">PATCH(string $endpoint, array $middleware, callable $callback)</td>
                    <td class="table__column">Define PATCH route</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">DELETE(string $endpoint, array $middleware, callable $callback)</td>
                    <td class="table__column">Define DELETE route</td>
                    <td class="table__column">void</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">listen()</td>
                    <td class="table__column">Listen on defined routes</td>
                    <td class="table__column">void</td>
                </tr>
            </table>
            <br>
            <p class="article-h3" id="router-example">
                <a href="#router-example" class="hash--pin red">#</a>
                Router example    
            </p>
            <pre class="code-snippet">
// check is token is send
AvocadoRouter::use(function(AvocadoRequest $req, AvocadoResponse $res){
    return isset($req->headers['Authorization']);
});
            
// send information to client with status code 200 (ok)
AvocadoRouter::GET('/api/v1/users', [], function(AvocadoRequest $req, AvocadoResponse $res){
        $res 
            -> json(array(
                "message" => "Hello from API"
            ))
            -> withStatus(200);
});

AvocadoRouter::listen();
</pre>
        `,
    },
    {
        id: "router_middleware",
        content: `
            <p class="article-h3" id="what-is-middleware">
                <a href="#what-is-middleware" class="red hash--pin">#</a>
                What is middleware?
            </p>
            <p class="article-h4">
                Middleware is a function who will be called before router callback, if middleware returns true router callback will be call also when 
                middleware returns false you can specify error message and callback was not called.
            </p>
            <p class="article-h3" id="two-types-of-middleware">
                <a href="#two-types-of-middleware" class="red hash--pin">#</a>
                Two types of middleware in Avocado    
            </p>    
            <p class="article-h4">
                First is application level middleware. It is global for our application and common for 
                all routes (GET, POST...). To define application level middleware you can use \`use\` function
                on AvocadoRouter. It accepts AvocadoRequest and AvocadoResponse.
            </p>
            <pre class="code-snippet">
AvocadoRouter::use(function(AvocadoRequest $req, AvocadoResponse $res){
    $req->locals['HELLO'] = 'FROM MIDDLEWARE';
    // if you want stop next routes 
    // you can use AvocadoRouter::stopNext(); function
});</pre>
            <p class="article-h4">
                Next type of middleware is route level middleware. It will be called before invoke callback. If return true (it doesn't have to be boolean type),
                callback will be call, otherwise it not.
            </p>
            <p class="article-h4">
                Request and response is common to middleware and callback. It means you can manipulate data in middleware,
                and it will be the same in callback.
            </p>
            <p class="article-h4">
            Middleware is passed as string to middleware array. 
        </p>
            <pre class="code-snippet">
function middleware(AvocadoRequest $req, AvocadoRequest $res) {
    $token = $res->headers['Authorization'] ?? null;
    
    // if token will be null
    // callback will not be called
    return $token;
}

Router::GET('/api/v1/users', ['middleware'], function (){
    // callback
});</pre>
            <p class="article-h3" id="pass-data-from-middleware-to-callback">
                <a href="#pass-data-from-middleware-to-callback" class="red hash--pin">#</a>
                Pass data from middleware to callback
            </p>
            <p class="article-h4">
        If you want pass data from middleware to callback you can save it into \`locals\` attribute from request. 
        In middleware pass data to locals, and they will be accessible in callback request.
    </p>
        <pre class="code-snippet">
function findUser(AvocadoRequest $req, AvocadoResponse $res) {
    $token = $req->headers['Authorization'] ?? null;
    
    if ($token && str_starts_with('Bearer ', $token)) {
        $token = str_replace('Bearer ', '', $token);
        $req -> locals['formattedToken'] = $token;
        return true;
    }
}

Router::GET('/api/v1/user/', ['findUser'], function (AvocadoRequest $req, AvocadoResponse $res){
    $res->status(200)->json(array(
        "user" => $req->locals['user']
    ));
});</pre>
        <p class="article-h3" id="how-decode-json-post-data">
            <a href="#how-decode-json-post-data" class="hash--pin red">#</a>
            How decode JSON post data
        </p>
        <p class="article-h4">
            To decode incoming JSON data you can use \`useJSON\` function on top of application. Decoded data is store
            in body array in request.
        </p>
        <code class="code-snippet">AvocadoRouter::useJSON()</code>
        <p class="article-h4">Then your data will be in</p>
        <code class="code-snippet">$req->body[];</code>
        `
    },
    {
        id: 'orm_attributes',
        content: `
            <p class="article-h3" id="list-of-orm-attributes">
                <a href="#list-of-orm-attributes" class="hash--pin red">#</a>
                List of ORM attributes
            </p>
            <p class="article-h4">
                In AvocadoORM we have a few attributes which you can specify database table, primary key or entity field.<br>
                List of them you see below
            </p>
            <table class="table">
                <tr class="table__header">
                    <td class="table__column">Attribute</td>
                    <td class="table__column">Description</td>
                    <td class="table__column">Param</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">Table</td>
                    <td class="table__column">Specify table name</td>
                    <td class="table__column">Optional alternative name</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">Id</td>
                    <td class="table__column">Specify primary key for entity</td>
                    <td class="table__column">Alternative primary key name</td>
                </tr>
                <tr class="table__row">
                    <td class="table__column">Field</td>
                    <td class="table__column">Specify entity field</td>
                    <td class="table__column">Alternative field name</td>
                </tr>
            </table><br>
            <p class="article-h3" id="table-attribute"><a href="#table-attribute" class="hash--pin red">#</a> Table</p>
            <p class="article-h4">
                This attribute specify table name for entity. Accept one string argument. If arguments will be empty table name is class name in
                which attribute is set. You can specify one Table attribute for model.
            </p>
            <p class="article-h4">In this case model table name is \`User\`.</p>
            <pre class="code-snippet">
#[Table]
class User {
...
}
</pre>  
<p class="article-h4">But when we specify like this, then table name is \`users\`.</p>
            <pre class="code-snippet">
#[Table('users')]
class User {
...
}
</pre><br>
            <p class="article-h3" id="id-attribute"><a href="#id-attribute" class="hash--pin red">#</a> Id</p>
            <p class="article-h4">
                Id attribute specify primary key for entity. Like in table attribute if arguments is empty
                primary key for model is class property name for which Id attribute is set. You can specify
                only one primary key for one entity. Two or more Id attributes set for one entity throws \`AvocadoModelException\`.
                Id attribute must be provided to entity in this version of Avocado.
            </p>
            <p class="article-h4">Example model without passing primary key name. In this case Id is \`id\`</p>
            <pre class="code-snippet">
#[Table('users')]
class User {
    #[Id]
    private int $id;
}
</pre>
            <p class="article-h4">But we can specify other name passing it to \`Id\` constructor. In this case primary key is \`otherNameForId\`</p>
            <pre class="code-snippet">
#[Table('users')]
class User {
    #[Id('otherNameForId')]
    private int $id;
}
</pre>
            <p class="article-h3" id="field-attribute"><a href="#field-attribute" class="hash--pin red">#</a> Field</p>
            <p class="article-h4">
                Last attribute is \`Field\`. It specifies fields for our entity. 
                These fields are used to finding and saving entities in database.
                If you do not specify any other name for field like the above attributes
                name for field is property for which is set.
            </p>
            <p class="article-h4">In this case default field name is property name, that is \`username\`</p>
            <p class="article-h4">If you want to use other name for entity field enough pass it into constructor</p>   
            <pre class="code-snippet">
#[Table('users')]
class User {
    #[Id]
    private int #id;
    #[Field]
    private string $username;
    #[Field('hashedPassword')]
    private string $password;
}</pre>
                 
<br><br>
        `
    }
];

export default articles;