import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useParams, useLocation } from "react-router";
import keyWords from "../keyWords";
import articles from "../articles";

export default function Documentation() {
    const { slug } = useParams();
    const { state } = useLocation();
    const [path, setPath] = useState([]);
    const [article, setArticle] = useState('');

    const colors = ['#D8AA33', '#45592B', '#92C58A'];

    useEffect(() => {
        function getPath(slug) {
            let lastPoint = document.querySelector(`[title="${slug}"]`);
            setArticle(articles.find(({ id }) => id === state?.articleId)?.content);

            let points = [];
            let pointsCount = 0;

            while (lastPoint.parentElement.tagName !== 'BODY') {
                if (lastPoint.hasAttribute('title')) {
                    points.unshift(lastPoint.getAttribute('title'));

                    lastPoint.firstElementChild.style.color = colors.reverse()[pointsCount]
                    pointsCount++;
                }
                lastPoint = lastPoint.parentElement;
            }

            points = points.map(point => `${point.charAt(0).toUpperCase() + point.slice(1)}`.replace('-', ' '));
            points = points.map((point, index) =>
                <>
                <span
                    style={{ color: colors.reverse()[index], width: 'fit-content', whiteSpace: 'pre-wrap' }}
                >
                    {point} { !(points.length - 1 === index) && '- ' }
                </span>
                </>
            );

            return points;
        }

        const timer = setTimeout(() => {
            setPath(getPath(slug));
            syntaxHighlight(keyWords)
        }, 50);

        return () => {
            clearTimeout(timer)
        }
    }, [slug, setPath])

    function syntaxHighlight(keyWords) {
        const codeSnippets = document.querySelectorAll('.code-snippet');

        for (const snippet of codeSnippets) {
            let content = snippet.textContent;

            for (const keyWord of keyWords) {
                content = content.replace(keyWord.word, `<span style="color: ${keyWord.color}">$&</span>`)
            }

            snippet.innerHTML = content;
        }
    }

    return (
        <>
            <Header>
                <div className={"path"}>{path}</div>
            </Header>
            <main className={"article"} dangerouslySetInnerHTML={{ __html: article }} />
            <Nav/>
        </>
    )
}
