const puppeteer=require("puppeteer");
let browseropenP=puppeteer.launch({             // here puppeteer promising to launch the browser.
    headless:false                     // means browser open hokr aapko dikhega if hm headless true kr dete to nii dikhta
})
browseropenP.then(function(browser){
    console.log("browser opened");
    let alltabspromise=browser.pages();
    alltabspromise.then(function(tabs){     // here promising to give all tab access
        let page=tabs[0];
        let googlehomepageopenpromise=page.goto("https://www.google.com");
        googlehomepageopenpromise.then(function()
        {
            console.log("google home page opened");
        })
    })
})