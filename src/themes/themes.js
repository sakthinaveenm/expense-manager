export const themeNames = {
    light : "light",
    dark : "dark"
}

export const themeOptions = [{
    label : "Light",
    value : themeNames.light
},  {
    label : "Dark",
    value : themeNames.dark
}];

const themes = [
    {
        name : themeNames.light,
        appearance : {
            backgroundColor : "#fff",
            txtColor : "#000",
            splashLoaderColor : "#000",
            inputPlaceHolder : "#000",
            logBtn : ["#000","#000","#000","#000"],
            logTxt : "#fff"
        }
    },
    {
        name : themeNames.dark,
        appearance : {
            backgroundColor : "#000",
            txtColor : "#fff",
            splashLoaderColor : "#fff",
            inputPlaceHolder : "#fff",
            logBtn : ["#000","#000","#000","#000"],
            logTxt : "#fff"
        }
    }
]

export default themes;