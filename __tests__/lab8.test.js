describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0 || plainValue.date.length == 0 || plainValue.content.length == 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toContain('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entryJSON = await page.$eval('entry-page', (entry) => {
      return entry.entry;
    });
    expect(Object.keys(entryJSON).length).toBe(4);
    expect(Object.keys(entryJSON.image).length).toBe(2);
    expect(entryJSON.title).toBe('You like jazz?');
    expect(entryJSON.date).toBe('4/25/2021');
    expect(entryJSON.content).toBe(
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."
    );
    expect(entryJSON.image.src).toBe(
      'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455'
    );
    expect(entryJSON.image.alt).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyClasses = await page.$eval('body', (bodyElement) => {
      return bodyElement.classList;
    });
    expect(bodyClasses[0]).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toContain('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyClasses = await page.$eval('body', (bodyElement) => {
      return bodyElement.classList;
    });
    expect(bodyClasses[0]).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toContain('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be "Journal Entries"', async () => {
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    const bodyClasses= await page.$eval('body', (bodyElement) => {
      return bodyElement.classList.length;
    });
    expect(bodyClasses).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.click('journal-entry:nth-of-type(2)');
    expect(page.url()).toContain('/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const entryJSON = await page.$eval('entry-page', (entry) => {
      return entry.entry;
    });
    expect(Object.keys(entryJSON).length).toBe(4);
    expect(Object.keys(entryJSON.image).length).toBe(2);
    expect(entryJSON.title).toBe('Run, Forrest! Run!');
    expect(entryJSON.date).toBe('4/26/2021');
    expect(entryJSON.content).toBe(
      "Mama always said life was like a box of chocolates. You never know what you're gonna get."
    );
    expect(entryJSON.image.src).toBe(
      'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg'
    );
    expect(entryJSON.image.alt).toBe('forrest running');
  }, 10000);

  // create your own test 17
  it('Test17: Verify the entry page contents is correct when clicking on the sixth entry', async () => {
    await page.goBack();
    await page.click('journal-entry:nth-of-type(6)');
    const entryJSON = await page.$eval('entry-page', (entry) => {
      return entry.entry;
    });
    expect(Object.keys(entryJSON).length).toBe(4);
    expect(Object.keys(entryJSON.image).length).toBe(2);
    expect(entryJSON.title).toBe('I am... Iron Man');
    expect(entryJSON.date).toBe('4/30/2021');
    expect(entryJSON.content).toBe(
      "Big man in a suit of armour. Take that off, what are you? Genius, billionaire, playboy, philanthropist."
    );
    expect(entryJSON.image.src).toBe(
      'https://i.ytimg.com/vi/gAZKhM4OWXQ/maxresdefault.jpg'
    );
    expect(entryJSON.image.alt).toBe('captain america face to face with iron man');
  }, 10000);

  // create your own test 18
  it('Test18: Verify the title is correct when clicking on the sixth entry', async () => {
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Entry 6');
  });

  // create your own test 19
  it('Test20: Verify the url is correct when clicking on the seventh entry', async () => {
    await page.goBack();
    await page.click('journal-entry:nth-of-type(7)');
    expect(page.url()).toContain('/#entry7');
  });

  // create your own test 20
  it('Test20: Verify the url is correct when clicking on the third entry', async () => {
    await page.goBack();
    await page.click('journal-entry:nth-of-type(3)');
    expect(page.url()).toContain('/#entry3');
  });
});