import React from "react";

const routes = [
    {
        title: 'Installation',
        goto: '/installation',
    },
    {
        title: 'Documentation',
        subRoutes: [
            {
                title: 'Router',
                subRoutes: [
                    {
                        title: 'Getting started',
                        goto: '/documentation/getting-started',
                    },
                    {
                        title: 'Example',
                        goto: '/documentation/example',
                    },
                    {
                        title: 'Request',
                        goto: '/documentation/request',
                    },
                    {
                        title: 'Response',
                        goto: '/documentation/response',
                    },
                    {
                        title: 'Routing',
                        goto: '/documentation/routing',
                    },
                    {
                        title: 'Middleware',
                        goto: '/documentation/middleware',
                    },
                    {
                        title: 'Reading JSON',
                        goto: '/documentation/reading-json',
                    }
                ],
            },
            {
                title: 'ORM',
                subRoutes: [
                    {
                        title: 'Attributes',
                        goto: '/documentation/attributes',
                    },
                    {
                        title: 'Database',
                        goto: '/documentation/database',
                    },
                    {
                        title: 'First model',
                        goto: '/documentation/first-model',
                    },
                    {
                        title: 'Fetch option',
                        goto: '/documentation/fetch-option',
                    },
                    {
                        title: 'Repository',
                        goto: '/documentation/repository',
                    },
                ],
            }
        ]
    },
    {
        title: 'About project',
        goto: '/about-project',
    },
    {
        title: 'Suggest',
        goto: '/suggest',
    },
    {
        title: 'Initializer',
        goto: '/initializer',
    }
];

function Route({ title, goto, subRoutes }) {
    return (
        <div key={title} style={{ marginLeft: 30 }} title={title.toLowerCase().replace(' ', '-')}>
            <a href={goto}>{title}</a>
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
