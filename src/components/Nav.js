import React from "react";
import {useNavigate} from "react-router";

const routes = [
    {
        title: 'Main',
        goto: '/',
    },
    {
        title: 'Installation',
        goto: '/documentation/installation',
        articleId: 'installation_tutorial',
    },
    {
        title: 'Documentation',
        subRoutes: [
            {
                title: 'Router',
                subRoutes: [
                    {
                        title: 'Request',
                        goto: '/documentation/request',
                        articleId: 'router_request',
                    },
                    {
                        title: 'Response',
                        goto: '/documentation/response',
                        articleId: 'router_response',
                    },
                    {
                        title: 'Routing',
                        goto: '/documentation/routing',
                        articleId: 'routing',
                    },
                    {
                        title: 'Middleware',
                        goto: '/documentation/middleware',
                        articleId: 'router_middleware',
                    },
                    {
                        title: 'Reading JSON',
                        goto: '/documentation/reading-json',
                        articleId: 'reading_json_data',
                    },
                    {
                        title: 'Example',
                        goto: '/documentation/example',
                        articleId: 'example_of_router',
                    },
                ],
            },
            {
                title: 'ORM',
                subRoutes: [
                    {
                        title: 'Attributes',
                        goto: '/documentation/attributes',
                        articleId: 'attributes',
                    },
                    {
                        title: 'Database',
                        goto: '/documentation/database',
                        articleId: 'database_connection',
                    },
                    {
                        title: 'First model',
                        goto: '/documentation/first-model',
                        articleId: 'first_model',
                    },
                    {
                        title: 'Fetch option',
                        goto: '/documentation/fetch-option',
                        articleId: 'fetch_options',
                    },
                    {
                        title: 'Repository',
                        goto: '/documentation/repository',
                        articleId: 'repository',
                    },
                ],
            }
        ]
    },
    {
        title: 'About project',
        goto: '/documentation/about-project',
        articleId: 'about_project',
    },
    {
        title: 'Suggest',
        goto: '/documentation/suggest',
        articleId: 'suggest',
    },
    {
        title: 'Initializer',
        goto: '/documentation/initializer',
        articleId: 'initializer',
    }
];

function Route({ title, goto, subRoutes, articleId }) {
    const navigate = useNavigate();

    return (
        <div key={title} style={{ marginLeft: 30 }} title={title.toLowerCase().replace(' ', '-')}>
            <a onClick={() => navigate(goto, { state: { articleId } })}>{title}</a>
            {
                (subRoutes ?? []).map(route => <div key={route.title} ><Route {...route} /></div>)
            }
        </div>
    )
}

export default function Nav() {
    return (
        <>
            <nav className={"nav--hide"}>
                {
                    routes.map((route) => {
                        return <Route key={route.title} {...route} />
                    })
                }
                <div className={"toggle-nav"} onClick={(event) => {
                    const overflow = document.querySelector('.overflow');
                    const nav = event.target?.parentElement.parentElement;

                    overflow.classList.toggle('overflow--hidden');
                    overflow.classList.toggle('overflow--show');

                    nav.classList.toggle('nav--hidden');
                    nav.classList.toggle('nav--show');
                }}>
                    <i className="fa-solid fa-grip" />
                </div>
            </nav>
            <div className="overflow overflow--hidden" />
        </>
    );
}
