const blue = '#5179DE';
const green = '#92C58A';
const dark_green = '#597239';
const yellow = '#D8AA33';
const pink = '#DF62E1';
const red = '#ff6158';

const keyWords = [{
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
        word: /write/,
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
        word: /'(.*)'/gm,
        color: green
    },
    {
        word: /\$req(.*?)/gm,
        color: yellow
    },
    {
        word: /\$res(.*?)/gm,
        color: yellow
    },
    {
        word: /AvocadoRepository(.*?)/gm,
        color: yellow
    },
    {
        word: /listen/gm,
        color: blue
    },
    {
        word: /composer/gm,
        color: red,
    },
    {
        word: /hubert\/avocado/gm,
        color: green
    },
    {
        word: /https:\/\/(.*).git$/,
        color: green
    },
    {
        word: /"(.*)":/gm,
        color: red
    },
    {
        word: /"(.*)" /gm,
        color: red
    },
    {
        word: /use /gm,
        color: blue
    },
    {
        word: /(\/\/)(.+?)(?=[\n\r]|\*\))/gm,
        color: '#747474'
    },
    {
        word: /return/gm,
        color: pink
    },
    {
        word: /generateToken/gi,
        color: blue
    },
    {
        word: /time/,
        color: blue
    },
    {
        word: "setHeader",
        color: blue
    },
    {
        word: /str_starts_with/,
        color: blue
    },
    {
        word: /str_replace/,
        color: blue
    },
    {
        word: /useJSON/,
        color: blue
    }
];

export default keyWords;