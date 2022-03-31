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
                <a style="float: none; text-decoration: underline" href="/documentation/initializer" class="red">Avocado Initializer</a>.
                Then project is ready to work.
            </p>
        `,
    }
];

export default articles;
