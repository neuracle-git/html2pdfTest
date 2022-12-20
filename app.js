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
  
  
  // await page.waitForSelector('div > .grecaptcha-badge');
  await page.waitForSelector('.det');
  // Query for an element handle.

  await page.evaluate(()=>{
    document.body.innerHTML += '<div class="watermark">Visa 2 Explore</div>';
})

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
  await page.addStyleTag({ path: 'style.css' })

    //  content: '.watermark{position: absolute;top: 0;left: 0;bottom: 0;z-index: -1;transform: rotate(300deg);-webkit-transform: rotate(300deg);color: #c6afaf;}  .activity .row div{padding-right:0 !important;padding-left:0 !important} .quickinfoSection .row .col-12{width:25% !important} .quickinfoSection .row .col-sm-6{width:25% !important} ::marker{color:black !important} .col-lg-8{width:100%} .content-section .section .container-fluid .container{margin:0;max-width:-webkit-fill-available} .contentblock{break-inside:avoid} .overviewContent{break-inside:avoid} .day{break-inside:avoid} .activity{border:solid;border-width:thin !important; margin-top:20px !important;margin-bottom:30px !important;break-inside:avoid} .styles_scroll-to-top__2A70v {display:none} #headerId { display: none} .collapseContent { max-height: 100% !important} .readmore{display:none} .engagementSection{display:none} .widget{display:none} .footer{display:none} .footer-subscribe{display:none} .grecaptcha-badge{display:none !important;} form{display:none}' 

  const pdf = await page.pdf({ path: 'tr_v52.pdf', 
                                format: 'A4',
                                // displayHeaderFooter: true,
                                // headerTemplate: '<span style="font-size: 20px; width: 200px; height: 20px; color: black;">Visa 2 Explore</span>',
                                // footerTemplate: '<span style="font-size: 20px; width: 50px; height: 20px; color:black;">Visa 2 Explore</span>',
                                margin: { top: "20px"},
                                printBackground: true 
                              });
  // await page.pdf({ path: 'path/to/save/pdf', format: 'A4' });

  await browser.close();
  return ;
}
printPDF()
// https://stackoverflow.com/questions/53167644/injecting-css-into-site-with-puppeteer