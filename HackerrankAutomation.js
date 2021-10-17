// node HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json
// npm init -y
// npm install minimist
// npm i puppeteer-core


let minimist = require("minimist")
let fs = require("fs");
let puppeteer = require('puppeteer');


let args = minimist(process.argv);
let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);


async function run() {           // await use kiya hai  toh sab await ko yek hi function mai hona hoga

    let browser = await puppeteer.launch({              // await - it actually launch browser it does not give
        headless: false,                      // headless false - means we are able to see it and when it is true we cannot see it
        args: [
            '--start-maximised'           // for full screen
        ],
        defaultViewport: null           // not for mobile and not for pc it will adjust automatically
    });


    let pages = await browser.pages();
    let page = pages[0];                 //  first tab(page[0]) ko page maaan liyaa 

    await page.goto(args.url);          // it will go to  www.hackerrank.com   websitee


    // waitforselector -  means wo site open hone ke baag jo cookies and that hote hai unko load hone taak rukee 
    await page.waitForSelector("a[data-event-action='Login']")  // first login button
    await page.click("a[data-event-action='Login']", { delay: 500 })


    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");    // click on second login
    await page.click("a[href='https://www.hackerrank.com/login']", { delay: 500 })


    await page.waitForSelector("input[name='username']")                  // username type karne ke liyeeee
    await page.type("input[name='username']", configJSO.userid, { delay: 100 })


    await page.waitForSelector("input[name='password']")                        // password type karne ke liyeee
    await page.type("input[name='password']", configJSO.password, { delay: 100 });


    await page.waitForSelector("button[data-analytics='LoginPassword']");  //userid and passowrd type karne ke baag wala login //final login button
    await page.click("button[data-analytics='LoginPassword']", { delay: 500 });


    await page.waitForSelector("a[data-analytics='NavBarContests']")   
    await page.click("a[data-analytics='NavBarContests']", { delay: 500 });


    await page.waitForSelector("a[href='/administration/contests/']")  // to click on contests button
    await page.click("a[href='/administration/contests/']", { delay: 500 });


    await page.waitForSelector("p.mmT")
    await page.click("p.mmT");

    await page.waitFor(1000);


    await page.waitForSelector("li[data-tab='moderators']")   // to click on moderator button
    await page.click("li[data-tab='moderators']");


    await page.waitForSelector("input#moderator") 
    await page.click("input#moderator", configJSO.moderator, { delay: 100 });


    await page.keyboard.press("Enter");



    // await browser.close();
    // console.log("Browser Closed");
}
run();         // calling function