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
                title: 'AvocadoRouter',
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
                        title: 'Router',
                        goto: '/documentation/router',
                        articleId: 'router',
                    },
                    {
                        title: 'Middleware',
                        goto: '/documentation/middleware',
                        articleId: 'router_middleware',
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
                        articleId: 'orm_attributes',
                    },
                    {
                        title: 'Settings',
                        goto: '/documentation/orm_settings',
                        articleId: 'orm_settings',
                    },
                    {
                        title: 'First model',
                        goto: '/documentation/first-model',
                        articleId: 'first_model',
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

function toggleNav() {
    const overflow = document.querySelector('.overflow');
    const nav = document.querySelector('nav');

    overflow.classList.toggle('overflow--hidden');
    overflow.classList.toggle('overflow--show');

    nav.classList.toggle('nav--hidden');
    nav.classList.toggle('nav--show');
}

function Route({ title, goto, subRoutes, articleId }) {
    const navigate = useNavigate();

    return (
        <div key={title} style={{ marginLeft: 30 }} title={title.toLowerCase().replace(' ', '-')}>
            <a onClick={() => {
                navigate(goto, { state: { articleId }});
                toggleNav()
            }}>{title}</a>
            {
                (subRoutes ?? []).map(route => <div key={route.title}><Route {...route} /></div>)
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
                        return <Route key={route.title} {...route} toggleNav={toggleNav} />
                    })
                }
                <div className={"toggle-nav"} onClick={() => toggleNav()}>
                    <i className="fa-solid fa-grip" />
                </div>
            </nav>
            <div className="overflow overflow--hidden" onClick={() => toggleNav()} />
        </>
    );
}
