const blue = '#5179DE';
const green = '#92C58A';
const yellow = '#D8AA33';
const pink = '#DF62E1';
const red = '#ff6158';

const keyWords = [
    {
        word: /GET/,
        color: blue,
    },
    {
        word: /POST/,
        color: blue
    },
    {
        word: /PATCH/,
        color: blue
    },
    {
        word: /DELETE/,
        color: blue
    },
    {
        word: /AvocadoRouter/,
        color: yellow
    },
    {
        word: /json/,
        color: blue,
    },
    {
        word: /withStatus/,
        color: blue,
    },
    {
        word: /function/,
        color: pink
    },
    {
        word: /'(.*)'/,
        color: green
    },
    {
        word: /\$req(.*?)/,
        color: yellow
    },
    {
        word: /\$res(.*?)/,
        color: yellow
    },
    {
        word: /AvocadoRepository(.*?)/,
        color: yellow
    },
    {
        word: /listen/,
        color: blue
    },
    {
        word: /composer/,
        color: red,
    },
    {
        word: /hubert\/avocado/,
        color: green
    },
    {
        word: /https:\/\/(.*).git$/,
        color: green
    },
    {
        word: /"(.*)":/,
        color: red
    },
];

export default keyWords;