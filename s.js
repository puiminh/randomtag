// s.js

const a = {
    "pc": "rpin,shin",
    "subscription": {
        "active": true,
        "edition": "BASIC",
        "tier": "basic",
        "reducedBranding": false,
        "insightsEnabled": false
    },
    "customMessageTemplates": "[]",
    "config": {
        "_default": {
            "widgets": {
                "rpin": {
                    "orientation": "horizontal",
                    "widgetId": "8chu",
                    "promotedUrls": "[]",
                    "title": "Recommended for you",
                    "__hideOnHomepage": false,
                    "numrows": 1,
                    "elements": ".addthis_relatedposts_inline",
                    "creationTimestamp": 1496063384792,
                    "theme": "light",
                    "hideDevice": "none",
                    "id": "rpin",
                    "maxitems": 4,
                    "toolName": "Inline"
                },
                "shin": {
                    "countsFontSize": "60px",
                    "hideEmailSharingConfirmation": false,
                    "counts": "one",
                    "widgetId": "zagr",
                    "shareCountThreshold": 10,
                    "originalServices": "facebook_like,tweet,pinterest_pinit,google_plusone,counter",
                    "label": "SHARES",
                    "__hideOnHomepage": false,
                    "numPreferredServices": 6,
                    "size": "32px",
                    "borderRadius": "0px",
                    "titleFontSize": "18px",
                    "responsive": "979px",
                    "elements": ".addthis_inline_share_toolbox",
                    "counterColor": "#666666",
                    "iconColor": "#FFFFFF",
                    "creationTimestamp": 1496063664465,
                    "style": "responsive",
                    "hideDevice": "none",
                    "id": "shin",
                    "toolName": "Inline (2)",
                    "hideLabel": true
                }
            }
        }
    },
    "perConfig": {}
}

// plustitial
// : 
// "1665872142367"
// plustitial_display_counter
// : 
// "39"
// plustitial_first_run
// : 
// "1636733506402"
// plustitial_last_run
// : 
// "1665826345015"
// plustitial_page_views
// : 
// "5058"
// prestitial
// : 
// "1643891182128"
// prestitial_display_counter
// : 
// "27"
// prestitial_first_run
// : 
// "1636733506406"
// prestitial_last_run
// : 
// "1643890806069"
// prestitial_page_views
// : 
// "4077"
// ------
// at-rand
// : 
// "0.6566723379924104"
// plustitial
// : 
// "1665872685342"
// plustitial_display_counter
// : 
// "39"
// plustitial_first_run
// : 
// "1636733506402"
// plustitial_last_run
// : 
// "1665826345015"
// plustitial_page_views
// : 
// "5059"
// prestitial
// : 
// "1643891182128"
// prestitial_display_counter
// : 
// "27"
// prestitial_first_run
// : 
// "1636733506406"
// prestitial_last_run
// : 
// "1643890806069"
// prestitial_page_views
// : 
// "4077"

window.prestitialData = document.currentScript;

document.addEventListener("DOMContentLoaded", function(e){
    var scriptId = window.prestitialData.dataset.id || 'plustitial';

    var msgContainer = {
        container: null,
        backdrop: null,
        content: null,
        closeBtnContainer: null,
        zIndex: 1000000,
        requiredWait: 0,    // how much to wait until can close popup
        startedAt: null,            //
        waitTimeIntervalId: null,
        displayCounter: null,

        contentUrl: "",
        deferDays: 0,
        deferPages: 5,
        recurring: true,
        interval: 216000,
        showOnUnload: false,

        unloadFired: false,

        init: function() {
            var now = (new Date()).getTime();
            this.startedAt = now;

            window.localStorage.setItem(scriptId, now);

            // if configuration attributes are present, pull them
            if (window.prestitialData.dataset.deferDays) {
                this.deferDays = parseInt(window.prestitialData.dataset.deferDays);
            }
            if (window.prestitialData.dataset.deferPages) {
                this.deferDays = parseInt(window.prestitialData.dataset.deferDays);
            }
            if (window.prestitialData.dataset.recurring) {
                this.recurring = window.prestitialData.dataset.recurring=="0" ? false : true;
            }
            if (window.prestitialData.dataset.interval) {
                this.interval = parseInt(window.prestitialData.dataset.interval);
            }
            if (window.prestitialData.dataset.postitial) {
                this.showOnUnload = window.prestitialData.dataset.postitial=="0" ? false : true;
            }

            // figure out the content URL accounting for browser language
            var navLang = window.navigator.language;
            var configKey = "contentUrl" + navLang.substring(0,1).toUpperCase() + navLang.substring(1,2).toLowerCase();
            if (window.prestitialData.dataset[configKey]) {
                this.contentUrl = window.prestitialData.dataset[configKey];
            } else {
                this.contentUrl = window.prestitialData.dataset.contentUrl;
            }

            // count page views
            this.incrementPageViews();

            if (this.getPageViews()<=1) {
                localStorage.setItem(scriptId+"_first_run", now.toString());
            }

            // if non-recurrent and not at first visit, quit early.
            if (!this.recurring && this.getPrestViews()>0) {
                return ;
            }

            // compute deferred view conditions and run if due for any
            if (
                this.deferDays>0 && this.secondsSince(localStorage.getItem(scriptId+"_first_run"))<this.deferDays*86400
                && this.deferPages>0 && this.getPageViews()<this.deferPages
            ) {
                console.log("Need to defer some more");
                // not yet. wait some more.
                return ;
            }

            if (this.recurring && this.secondsSince(localStorage.getItem(scriptId+"_last_run"))<this.interval) {
                console.log("Have shown not too long ago.")
                return ;
            }

            // we're done. looks like we need to show at this point
            if (this.showOnUnload) {
                console.log("Scheduling triggering of the popup..");
                //window.addEventListener("beforeunload", msgContainer.triggerPopupOnUnload)
                document.addEventListener("click", msgContainer.triggerPopupOnUnload)
            } else {
                console.log("Triggering popup now..");
                this.triggerPopup();
            }
        },

        triggerPopupOnUnload: function(e) {
            var clickedElement = e.currentTarget ? e.currentTarget.activeElement : false;
            if (!clickedElement) {
                clickedElement = e.target
            }

            if (clickedElement.tagName != "A" || msgContainer.unloadFired) {
                return ;
            }

            console.log("un onload code executing..");

            msgContainer.unloadFired = true;

            e.preventDefault();
            e.returnValue = '';

            msgContainer.triggerPopup();

            return "";
        },

        triggerPopup: function() {
            this.insertStylesheet();
            this.initDom();
            this.incrementPrestViews();
            localStorage.setItem(scriptId+"_last_run", (new Date()).getTime());
        },

        secondsSince: function(timeInMsecs) {
            return Math.round(((new Date()).getTime() - parseInt(timeInMsecs))/1000);
        },

        getPrestViews: function() {
            var views = parseInt(localStorage.getItem(scriptId+"_display_counter"));
            if (!views) {
                views = 0;
            }
            return views;
        },

        incrementPrestViews: function() {
            console.log("Incrementing prestitial views: " + (this.getPrestViews()+1));
            localStorage.setItem(scriptId+"_display_counter", (this.getPrestViews()+1).toString());
        },

        getPageViews: function() {
            var views = parseInt(localStorage.getItem(scriptId+"_page_views"));
            if (!views) {
                views = 0;
            }
            return views;
        },

        incrementPageViews() {
            //console.log("Incrementing page views: " + (this.getPageViews()+1));
            localStorage.setItem(scriptId+"_page_views", (this.getPageViews()+1).toString());
        },

        mobileCheck: function() {
            if (document.documentElement.clientWidth < 1024) {
                return true;
            }

            return navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i);
        },

        insertStylesheet: function() {
            var head = document.head;
            var link = document.createElement("link");

            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = window.prestitialData.src.substr(0, window.prestitialData.src.lastIndexOf("/")+1) + "s.css?v4";

            head.appendChild(link);
        },

        initDom: function() {

            this.container = document.createElement("div");
            this.container.setAttribute("id", "sank-prestitial");
            window.document.body.appendChild(this.container);

            this.backdrop = document.createElement("div");
            this.backdrop.classList.add("backdrop");
            this.container.appendChild(this.backdrop);

            this.content = document.createElement("main");
            this.container.appendChild(this.content);


            document.body.classList.add("no-scroll");
            this.container.style.zIndex = this.zIndex;
            this.content.style.zIndex = this.zIndex+1;

            this.closeBtnContainer = document.createElement("div");
            this.closeBtnContainer.classList.add("close-btn");

            this.closeBtn = document.createElement("a");
            this.closeBtn.setAttribute("href", '#');
            //this.closeBtn.classList.add("h")
            this.closeBtn.appendChild(document.createTextNode("Close"));
            this.closeBtnContainer.appendChild(this.closeBtn);

            this.content.appendChild(this.closeBtnContainer);


            var that = this;

            this.closeBtn.addEventListener("click", function(e){
                that.closePrestitial();

                e.preventDefault();
                return false;
            });

            this.scheduleCloseBtnAppearance();

            this.insertContentAdmode();
        },

        canClose: function() {
            return Date.now() > this.startedAt + this.requiredWait*1000;
        },

        closePrestitial: function() {
            if (!this.canClose()) {
                console.log("Can not close yet ;)");
                return ;
            }
            this.container.style.display = "none";
            document.body.classList.remove("no-scroll");
        },

        refreshWaitTime: function() {
            var wait = this.startedAt + this.requiredWait*1000 - Date.now();
            if (wait<=0) {
                window.clearInterval(this.waitTimeIntervalId);
                this.closeBtn.find(".wait-time").hide();
                return ;
            }
            this.closeBtn.find(".timer").text(Math.round(wait/1000));
        },

        scheduleCloseBtnAppearance: function() {
            var that = this;

            window.setTimeout(function(){
                //that.closeBtn.removeClass("hidden");
            }, this.requiredWait*1000);
        },

        insertContent: function() {
            var iframe = document.createElement("iframe");

            //iframe.setAttribute("name", this.content);
            iframe.setAttribute("src", this.contentUrl);
            iframe.addEventListener("load", function(obj){
                this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
            })

            this.content.appendChild(iframe);
        },

        insertContentAdmode: function() {
            var iframeData = {
                mobile: {
                    name: "a327e30e",
                    src: "https://chan.sankakucomplex.com/javascripts/sp/vi/plus.html",
                    class: "mobile"
                },
                desktop: {
                    name: "a5398ed6",
                    src: "https://chan.sankakucomplex.com/javascripts/sp/vi/plus.html",
                    class: "desktop"
                }
            }

            var iframe = document.createElement("iframe");

            if (this.mobileCheck()) {
                var key = 'mobile';
            } else {
                var key = 'desktop';
            }

            iframe.setAttribute("name", iframeData[key].name);
            iframe.setAttribute("src", iframeData[[key]].src);
            iframe.classList.add(iframeData[key].class);

            this.content.appendChild(iframe);
        }
    }

    console.log("Dom content loaded.");
    msgContainer.init();
});