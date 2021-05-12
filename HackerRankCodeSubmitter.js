/**
 * Ye Project Ek Automation ka project h Jo ki Puppetter ke help se banaya gya h 

Puppeteer -> Puppeteer is a project from the Google Chrome team which enables us to control a Chrome 
            (or any other Chrome DevTools Protocol based browser) and execute common actions,
            much like in a real browser - programmatically, through a decent API. Put simply, 
            it’s a super useful and easy tool for automating, testing and scraping web pages 
            over a headless mode or headful either.

And ye project Hackerrank ke website pe kiya gya h jahan hum kisi ek module me jayenge and uske andar jitne bhi questions
hai un sablo automation se submit krenge

Yahan JS ke ek topic Promises ka Use hua h bhot deeeply
 */

//const { email, password } = require("../../../secrets");
const puppeteer = require("puppeteer");
let { answers } = require("./codes");
let cTab;
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})
browserOpenPromise.then(function (browser) {
        let alltabsArrpromise = browser.pages();
        //.pages() -> Will return An array of all open pages inside the Browser.
        return alltabsArrpromise;
    }).then(function (allTabsArr) {
         //Here -> .Pages() will return will only one page that is login page 
        cTab = allTabsArr[0];
        //login page ko open kro request forward krke
    let visiTloginPage = cTab.goto("https://www.hackerrank.com/auth/login");
    return visiTloginPage;
    }).then(function () {
      //yahan abhi email fill krenge
   let emailTypedPromise = cTab.type("input[name='username']","gopiv35319@kindbest.com",{delay:100});
//    // .type() -> it will take 3 arguments
//    //1st value kahan pe fill krni hai
//   //2nd value jo fill krni h
//   //3rd delay while filing the value
   return emailTypedPromise;
    }).then(function () {
    //ab yahan password fill hog
        let passwordWillTypedpromise = cTab.type("input[name='password']", "123456789sd",{delay:100});
        return passwordWillTypedpromise;
    }).then(function () {
        let loginPromise = cTab.click("button[data-analytics='LoginPassword']");
        return loginPromise;
    })
    // .then(function () {
    //     let waitForIpKit = cTab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled",
    //         { visible: true });
    //     return waitForIpKit;
    // })
    // .then(function () {
    //     let goToIPKit = cTab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    //     return goToIPKit;
    // })
    .then(function () {
        // Yahan hum IPKIT ke website ke UI pe aane ka wait bhi kr rhe and then jab wo UI pe load ho jayega tab hm uspe 
        //click bhi kr rhe
        let IpKitClickePromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        return IpKitClickePromise;
    })
    // .then(function () {
    //     let waitForWarmUp = cTab.waitForSelector("a[data-attr1= 'warmup']", { visible: true });
    //     return waitForWarmUp;
    // }).then(function () {
    //     let clickOnWarmUp = cTab.click("a[data-attr1='warmup']");
    //     return clickOnWarmUp;
    // })
    .then(function () {
        // Yahan hum warmUpPage ke website ke UI pe aane ka wait bhi kr rhe and then jab wo UI pe load ho jayega tab hm uspe 
        //click bhi kr rhe
        let warmUpPagePromise = waitAndClick("a[data-attr1='warmup']");
        return warmUpPagePromise;
    }).then(function () {
        // Yahan hum Questions ke website ke UI pe aane ka wait kr rhe
        let waitForQuestions = cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']", { visible: true });
        return waitForQuestions;
    })
    .then(function () {
        function ConsoleWalaFn() {
             //link -> of all questions
            let allElem = document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']")
            let linksArr = [];
            for (let i = 0; i < allElem.length; i++) {
                linksArr.push(allElem[i].getAttribute("href"));
            }
            return linksArr;
        }
        let linkArrPromise = cTab.evaluate(ConsoleWalaFn);
        return linkArrPromise;
        //link -> of all questions
        // serially question -> question solver -> question solve
    }).then(function (linksArr) {
        // console.log(linksArr);
        let questionWillBeSolvedPromise = questionSolver(linksArr[0], 0);
        return questionWillBeSolvedPromise;
        
    }).then(function () {
        console.log("Question printed code is moved to clipboard");
    }).catch(function(err){
console.log(err);
    })
// create 
function waitAndClick(selector) {
    // wait +click-> promise
    return new Promise(function (resolve, reject) {
        // P1
        let waitForElementPromise = cTab.waitForSelector(selector, { visible: true });
        waitForElementPromise
            .then(function () {
                let clickPromise = cTab.click(selector);
                return clickPromise;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })

    })
}


// Ab hum yahan pe Questions ko solve krne ka Logic likhenge , How ?? ->

//1. go to page
//2. input box wait and click
//3. text box data input
//4.     // ctrl A
        // ctrl X
        // Code editor code paste->
//5.    selector wait 
        //  code paste 
        // submit

/*
Hume website pe questions submit krne h and wo codes hamare ek file pe stored hai
to hame us code ko phle us file se lena hoga us question ke liye and then copy krna hoga
but jahan hme code submit krna h wahan pe phle se kch default codes likhe hue h to hame
phle use remove krna hoga and then apna code coy krna hoga

    Steps->
            1.Sabse phle hum apna code wahan pe jo custom input check krne ke liye
            box h usme paste krenge(with Pressing Ctrl+a then Ctrl+x then Ctrl+a then Ctrl+v)
                cTab.keyboard.down("Control");
                cTab.keyboard.press("a");
                cTab.keyboard.press("x");
                cTab.keyboard.press("v");

            2.Now Editor pe click krenge and Editor ke default code ko remove kre (with Pressing Clrt+x)
                   ye code paste kr denge ab iske liye hum puppeteer ka help lenge

*/
function questionSolver(url, idx) {
    return new Promise(function (resolve, reject) {
        // go to page
        let fullLink = `https://www.hackerrank.com${url}`;
        let goToQuestionPagePromise = cTab.goto(fullLink);
        goToQuestionPagePromise
            .then(function () {
                console.log(1);
                let waitForCheckBoxAndClick = waitAndClick(".checkbox-input");
                return waitForCheckBoxAndClick;
                // input box wait and click
            }).then(function () {
                console.log(2);
                let waitForTextBox = cTab.waitForSelector(".custominput", { visible: true });
                return waitForTextBox;
                // text box data input 
            }).then(function () {
                console.log(3);
                let codeWillBeAddedPromise = cTab.type(".custominput", answers[idx], /*{ delay: 10 }*/ );
                return codeWillBeAddedPromise;
            }).then(function () {
                console.log(4);
                let ctrWillBeDownPromise = cTab.keyboard.down("Control");
                return ctrWillBeDownPromise;
            }).then(function () {
                let aWillBepressedPromise = cTab.keyboard.press("a");
                return aWillBepressedPromise;
            }).then(function () {
                let xWillBepressedPromise = cTab.keyboard.press("x");
                return xWillBepressedPromise;
            }).then(function () {
                let pointerWillBeclicked = cTab.click(".monaco-editor.no-user-select.vs");
                return pointerWillBeclicked;
            }).then(function () {
                let awillBePressedOnpinter = cTab.keyboard.press("a");
                return awillBePressedOnpinter;
            }).then(function () {
                let codePastePromise = cTab.keyboard.press("v");
                return codePastePromise;
            }).then(function () {
                let submitWillClickedPromise = cTab.click(".hr-monaco-submit");
                return submitWillClickedPromise;
            }).then(function () {
                let ctrWillBeDownPromise = cTab.keyboard.up("Control");
                return ctrWillBeDownPromise;
            })
            // ctrl A
            // ctrl X
            // Code editor code paste-> 
            .then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
        // selector wait 
        //  code paste 
        // submit
    })
}
    // dynamic site -> id change

    // create new promise -> wait ->