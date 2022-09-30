

    // let repo = null, page = 0, results = [];
    
    // do {
    //     repo = axios.get(`https://capi-v2.sankakucomplex.com/tags?lang=en&page=${page++}`).then(res => 
    //     {
    //         console.log(results);
    //         results = results.concat(res.data);
    //     }
    // );
    // } while (page < 20)

// Init a bigData array to push new data on each iteration
let bigData = [];
let bigDataSend = [];
let array = [];

async function fetchWiki(keyword) {
    try {
        let fetchWikiURL = `https://capi-v2.sankakucomplex.com/tag-and-wiki/name/${keyword}`;
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(fetchWikiURL);
        console.log('Running: ',`https://capi-v2.sankakucomplex.com/tag-and-wiki/name/${keyword}`);
        const { data } = response;
        const cutOffData = data.wiki.body.split('h4.')[0].split('h6.')[0].split('h5.')[0].split('For example')[0].split('See also')[0].split('Related tags:')[0].split('[i]Note')[0].split('Note that')[0].split('* [[')[0];
        if(cutOffData.length > 550) cutOffData = cutOffData.slice(0, 10)+'...';
        if(cutOffData.length == 0) cutOffData = 'No useful information';
        return cutOffData;
    }
    catch (err) {
        console.log('err at fetchWiki'+keyword,err);
        return 'no-wiki-found'
    }
}

async function fetchArrayWiki(data) {
    const handCombineArray = [];
    const arrayWiki = await Promise.all(data.map(async (tag) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await fetchWiki(tag.name_en).then((res) => {
                let newObj = {
                    wiki: res,
                    ...tag
                }
                console.log(tag.name_en,newObj);
                handCombineArray.push(newObj);
                return newObj    
            })
    }))
    return handCombineArray;
}


async function fetchByExcel(
    pageKey = 0 /** init by default page index 0 */,
) {
    try {
        const fetchURL = `https://capi-v2.sankakucomplex.com/tags?lang=en&page=${pageKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response; // Your api should give you a total page count, result or something to setup your iteration
        // let arrayTag = data.map(({ name }) => name)
        await fetchArrayWiki(data).then((res) => {
            array = array.concat(res);
            console.log("concat "+pageKey+"array length "+array.length) 
            if (array.length >= 50) 
            {
                try {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", 'https://script.google.com/macros/s/AKfycbxttRJFSpP7hVbHLRwg0CDPb1QoKImMyBTrT_CD3M_WyX-wekKl3d24IqZKWtVOGdn1wQ/exec', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(array));
                    array = [];
                } catch (error) {
                    console.error("Error when post: ",error, pageKey);
                }

            }
        });
        // bigData = bigData.concat(arrayTag); // push on big data response data

        // if current page isn't the last, call the fetch feature again, with page + 1
        if (
            pageKey < 600// (this is a test dev condition to limit for 10 result) */
        ) {
            pageKey++;
            await new Promise((resolve) => setTimeout(resolve, 5000)); // setup a sleep depend your api request/second requirement.
            console.log('Now process: ',pageKey)
            return await fetchByExcel(pageKey);
        }
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
        console.log(pageKey);
    }
}

fetchByExcel().then(() => {
});  





