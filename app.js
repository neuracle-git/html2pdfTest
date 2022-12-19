// var wkhtmltopdf = require('wkhtmltopdf');
// var fs = require('fs');

var msg = 'Hello World';
console.log(msg);
// wkhtmltopdf.command = 'c:/wkhtmltopdf/bin/wkhtmltopdf.exe';

// // URL
// wkhtmltopdf('https://www.iwant2explore.com/agra-uttar-pradesh-2-nights-3-days-itinerary', 
//             { pageSize: 'A4', 
//                 // spawnOptions:{shell: true},
//                 javascriptDelay: 5000,
//                 // viewportSize: '1440x353',
//                 noStopSlowScripts :true,
//                 includeInOutline:true
//             })
//   .pipe(fs.createWriteStream('out.pdf'));
  
const puppeteer = require('puppeteer')
 
async function printPDF() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0});
//   let currentScreen = await page.evaluate(() => {
//     return {
//         width: window.screen.availWidth,
//         height: window.screen.availHeight,
//         deviceScaleFactor: 1
//     };
// });

// await page.setViewport({ width: 0, height: 0});

  await page.goto('https://www.iwant2explore.com/agra-uttar-pradesh-2-nights-3-days-itinerary', {waitUntil: 'networkidle0'});
  
  
  await page.waitForSelector('div > .grecaptcha-badge');
  await page.waitForSelector('.det');
  // Query for an element handle.
  const elHandleArray = await page.$$('summary');

  // Do something with element...
//   await element.click(); // Just an example.
    // elements.forEach(async element => {
    //     console.log(element);
    //     await element.click();
    // });
    for (const el of elHandleArray) {
        await el.click()
      }
      const allResultsSelector = 'summary';
//   await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);
  // Dispose of handle
//   await element.dispose();
//   await page.waitForSelector('.det');
//   await page.click('.det');
  await page.addStyleTag({ content: '::marker{color:black !important} .col-lg-8{width:100%} .content-section .section .container-fluid .container{margin:0;max-width:-webkit-fill-available} .activity{break-inside:avoid} .styles_scroll-to-top__2A70v {display:none} #headerId { display: none} .collapseContent { max-height: 100%} .readmore {display:none} .engagementSection{display:none} .widget{display:none} .footer{display:none} .footer-subscribe{display:none} .grecaptcha-badge{display:none;width:0px;height:0px} form{display:none}' })

  const pdf = await page.pdf({ path: 'tr.pdf', 
                                format: 'A4',
                                displayHeaderFooter: true,
                                headerTemplate: '<span style="font-size: 30px; width: 200px; height: 200px; background:none; color: white; margin: 20px;opacity:1"></span>',
                                footerTemplate: '<span style="font-size: 30px; width: 50px; height: 50px; background-color: red; color:black; margin: 20px;"></span>',
                                margin: { top: "50px"},
                                printBackground: true 
                              });
  // await page.pdf({ path: 'path/to/save/pdf', format: 'A4' });

  // await browser.close();
  // return ;
}
printPDF()