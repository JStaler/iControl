
var iCareParceiro = {};
iCareParceiro.version = 'V6';
iCareParceiro.date = new Date(2011, (12 - 1), 12);
iCareParceiro.getVersionHash = function () { return iCareParceiro.version + iCareParceiro.date.getTime().toString() };
iCareParceiro.getDealer = function (e) {

    return (!PageLoader.getCurrentConfiguration()) ? { Id: 0, Name: "" } :
                        PageLoader.getCurrentConfiguration().DealerInformation;
};
iCareParceiro.isInternalUser = function (e) {
    return iCareParceiro.getDealer().Id == 0;
};
iCareParceiro.gridPageSize = 10;//tamanho de pagina padrao

iCareParceiro.getJobCardDetailUrl = function (jobCardId) {
    return "/JobCard/Detail/" + jobCardId;
};

iCareParceiro.currentPage = {};
iCareParceiro.initCurrentPageObjects = function () {
    if (iCareParceiro.currentPage.search && iCareParceiro.currentPage.search.init)
        iCareParceiro.currentPage.search.init();
    if (iCareParceiro.currentPage.action && iCareParceiro.currentPage.action.init)
        iCareParceiro.currentPage.action.init();
    if (iCareParceiro.currentPage.result && iCareParceiro.currentPage.result.init)
        iCareParceiro.currentPage.result.init();
};


iCareParceiro.Popup = {
    all: {},
    dispose: function (name) {
        eval("delete iCareParceiro.Popup.all." + name);
    },
    create: function (name) {
        var cont = eval("iCareParceiro.Popup.all." + name + " ={};");
        cont.id = name;
        cont.onLoadComplete = function () { };
        cont.onUnloadComplete = function () { };
        cont.returnContainer = { data: null, message: '', returnType: 'none' };
        cont.onUnload = function () { }; //Implementar na popup

        cont.dispose = function () {
            cont.onUnload();
            cont.onUnloadComplete();
            iCareParceiro.Popup.dispose(name);
        };

        cont.show = function (url, title, width, height) {
            openAsyncWindow(url, cont, title, height, width, cont.onLoadComplete, cont.dispose, cont.id);
        };

        cont.close = function () {
            closeByWindow(cont.id);
        };

        return cont;
    }
}


iCareParceiro.openJobCardDetail = function (jobCardId) {
    var popupDetail = iCareParceiro.Popup.create("jobCardDetail");
    popupDetail.jobCardId = jobCardId;
    popupDetail.show('JobCardDetail.htm', "Detalhe OS - " + jobCardId, 1000, 600);
};



function PageLoader(jsm) {
    this.javaScriptManager = jsm;
    var currentTotalTemplates = 0;
    var currentLoadedPages = 0;
    PageLoader.currentParameters = undefined;
    PageLoader.currentConfiguration = undefined;
    PageLoader.isReady = false;
    PageLoader.callback = null;
    PageLoader.addressEvent = null;
    PageLoader.afterReady = [];

    PageLoader.callAfterReady = function () {
        var fn = null;
        while (PageLoader.afterReady.length > 0) {
            fn = PageLoader.afterReady.pop();
            if (fn) {
                fn.call();
            }
        }
    }

    PageLoader.ready = function () {

        $(javaScriptManager.pageForm).deserialize(PageLoader.addressEvent.parameters);
        if (!PageLoader.cancelUpdateAfterDetail) {
            javaScriptManager.onPageLoaderReady(PageLoader.addressEvent);
            if (PageLoader.callback) {
                PageLoader.callback(PageLoader.addressEvent);
            }
            PageLoader.isReady = true;

            window.CollectGarbage();//IE only
        }
        else {
            PageLoader.isReady = true;
            PageLoader.cancelUpdateAfterDetail = false;
        }
        PageLoader.callAfterReady();



    };

    PageLoader.searchLoaded = false;
    PageLoader.actionLoaded = false;
    PageLoader.resultLoaded = false;

    PageLoader.loadedPage = "";

    PageLoader.cancelUpdateAfterDetail = false;
    this.init = function (call) {

        PageLoader.callback = call;

        $("#loading").ajaxSend(function () {
            PageLoader.countSend();
        }).ajaxComplete(function (e, xhr, settings) {
            PageLoader.countComplete();

            if (settings.dataType == 'json') {
                var data = jQuery.parseJSON(xhr.responseText);
                if (data && data.RedirectTo && data.RedirectTo != '' && data.RedirectTo.indexOf("login.aspx") == -1) {
                    window.open(data.RedirectTo, '_self');
                    cancelEvent(e);
                }
            }

        });

        $.address.init(function (event) {
            $(document).ready(function () {
                var data = new JSON();
                $(javaScriptManager.pageForm).address();
                data.addPair("HandleAction", "GetTemplatesForPage", data.type.string);
                data.addStringArray("PathValues", $.address.pathNames().toString().split(','), data.type.string);
                data.addArray("Parameters", event.parameters, data.type.object);
                getData(handlerPath + 'Configuration.ashx', data.getString(), bindTemplates, displayLoadError);
                PageLoader.loadedPage = $.address.path();
                PageLoader.addressEvent = event;
            });
        }).change(function (event) {

            for (var p in event.parameters)
                if (p != null && p != undefined)
                    event.parameters[p] = decodeURIComponent(event.parameters[p].toString().replace(/\+/g, ' '));

            PageLoader.addressEvent = event;
            //$(javaScriptManager.pageForm).deserialize(event.parameters);
            if (PageLoader.loadedPage != $.address.path()) {
                var data = new JSON();
                data.addPair("HandleAction", "GetTemplatesForPage", data.type.string);
                data.addStringArray("PathValues", $.address.pathNames().toString().split(','), data.type.string);
                data.addArray("Parameters", event.parameters, data.type.object);
                getData(handlerPath + 'Configuration.ashx', data.getString(), bindTemplates, displayLoadError);
                PageLoader.loadedPage = $.address.path();
                PageLoader.currentParameters = new JSON(event.parameters).getString();
            }

            else if (PageLoader.currentParameters != new JSON(event.parameters).getString()) {
                PageLoader.callback(event);
            }
            else if (PageLoader.isReady) {
                PageLoader.callback(event);
            }
        });
    };

    var bindTemplates = function (data) {
        var firstLoad = !PageLoader.currentConfiguration;

        $("#divAlertEvent").html('');
        if (PageLoader.cancelUpdateAfterDetail) return PageLoader.ready();
        if (firstLoad) {
            PageLoader.currentConfiguration = data;
        }


        var loadSearch, loadResult, loadAction, loadDetail = false;
        currentTotalTemplates = 0;
        currentLoadedPages = 0;


        if (!firstLoad) {
            if (!data.DetailTemplate && (!data.SearchTemplate || data.SearchTemplate == '')) {
                $('#divSearch script[type=\'text/x-jquery-tmpl\']').remove();
                $("#divSearch").text('');
                delete iCareParceiro.currentPage.Search;
                delete iCareParceiro.currentPage.search;
                PageLoader.searchLoaded = false;
            }
            if (!data.DetailTemplate && (!data.ActionTemplate || data.ActionTemplate == '') && !(data.DetailTemplate)) {
                $('#divAction script[type=\'text/x-jquery-tmpl\']').remove();
                $("#divAction").text('');
                delete iCareParceiro.currentPage.Action;
                delete iCareParceiro.currentPage.action;
                PageLoader.actionLoaded = false;
            }
            if (!data.DetailTemplate && (!data.ResultTemplate || data.ResultTemplate == '') && !(data.DetailTemplate)) {
                $('#divResult script[type=\'text/x-jquery-tmpl\']').remove();
                $("#divResult").text('');
                delete iCareParceiro.currentPage.Result;
                delete iCareParceiro.currentPage.result;
                PageLoader.resultLoaded = false;
                JavaScriptManager.ClearOrderPagedList();
            }
        }

        if ((firstLoad && !data.DetailTemplate) || ($.address.parameterNames() && $.address.parameterNames().length == 0) || (data.SearchTemplate && PageLoader.currentConfiguration.SearchTemplate != data.SearchTemplate)) {
            JavaScriptManager.RequestInformationFromHistory = function (e, initPage, actualPage, orderedField) { };

            if (data.SearchTemplate) {
                currentTotalTemplates++;
                loadSearch = true;
                delete iCareParceiro.currentPage.Search;
                delete iCareParceiro.currentPage.search;
            }

        }


        if ((firstLoad && !data.DetailTemplate) || ($.address.parameterNames() && $.address.parameterNames().length == 0) || (data.ActionTemplate && PageLoader.currentConfiguration.ActionTemplate != data.ActionTemplate)) {

            JavaScriptManager.SetActionFromHistory = function (e) { };
            if (data.ActionTemplate) {
                currentTotalTemplates++;
                loadAction = true;
                delete iCareParceiro.currentPage.Action;
                delete iCareParceiro.currentPage.action;
            }

        }

        if ((firstLoad && !data.DetailTemplate) || ($.address.parameterNames() && $.address.parameterNames().length == 0) || (PageLoader.currentConfiguration.ResultTemplate != data.ResultTemplate)) {

            JavaScriptManager.RetrieveInformationFromHistory = function (e) { };

            if (data.ResultTemplate) {
                currentTotalTemplates++;
                loadResult = true;
                delete iCareParceiro.currentPage.Result;
                delete iCareParceiro.currentPage.result;
                JavaScriptManager.ClearOrderPagedList();
            }
        }

        if (firstLoad || data.DetailTemplate) {

            JavaScriptManager.onLoadDetail = function (e) { };

            if (data.DetailTemplate) {
                data.DetailTemplate += "?" + iCareParceiro.getVersionHash();
                loadDetail = true;


            }
        }

        if (!data.DetailTemplate && data.Title) {
            $("#divTitle").text(data.Title);
            $("#divTitle").show();
        }
        else
            $("#divTitle").hide();

        if (!data.DetailTemplate && data.ShowBack == "true") {
            $("#linkBack").show();
        }
        else
            $("#linkBack").hide();


        if (loadSearch) getHTMLTemplate(data.SearchTemplate, null, loadSearchHTML, displayLoadErrorSearch);
        if (loadResult) getHTMLTemplate(data.ResultTemplate, null, loadResultHTML, displayLoadErrorResult);
        if (!loadDetail && loadAction) getHTMLTemplate(data.ActionTemplate, null, loadActionHTML, displayLoadErrorAction);
        if (loadDetail) openDetailWindow(data);
        PageLoader.currentConfiguration = data;

        if (currentTotalTemplates == 0) PageLoader.ready(this.callback);

    };

    var openDetailWindow = function (data) {

        openAsyncDetailWindow(data.DetailTemplate, null, data.Title, /*$(window).height() - 40*/600/*Width e Height TELA DETALHE*/, /*$(window).width() - 50*/980,
        function (e) {
            $(data.Title + "<div id='divActionDetail'></div>").insertBefore($("#contentDetailDiv")[0].firstChild);
            getHTMLTemplate(data.ActionTemplate, null, loadDetailActionHTML, function (e, m) { skyAlert(m, "Erro") });
        },
        function (e) {
            JavaScriptManager.RetrieveInformationFromHistory = function (e) { };
            JavaScriptManager.onLoadDetail = function (e) { };
            PageLoader.cancelUpdateAfterDetail = true;
            history.back();
            javaScriptManager.removeObjectContext('jobCard');
        }
        );
    };



    PageLoader.getCurrentConfiguration = function () {
        return PageLoader.currentConfiguration;

    };


    var loadSearchHTML = function (data) {
        $("#divSearch").html(data);
        PageLoader.searchLoaded = true;
        if (++currentLoadedPages == currentTotalTemplates) PageLoader.ready(this.callback);

    };

    var loadResultHTML = function (data) {
        $("#divResult > *").empty();
        $("#divResult").html(data);
        $('#divResult').fadeIn(200);
        PageLoader.resultLoaded = true;
        if (++currentLoadedPages == currentTotalTemplates) PageLoader.ready(this.callback);

    };

    var loadActionHTML = function (data) {
        $("#divAction").html(data);
        PageLoader.actionLoaded = true;
        if (++currentLoadedPages == currentTotalTemplates) PageLoader.ready(this.callback);

    };


    var loadDetailActionHTML = function (data) {
        $("#divActionDetail").html(data);
        PageLoader.actionLoaded = true;
        JavaScriptManager.onLoadDetail(PageLoader.addressEvent);
        iCareParceiro.initCurrentPageObjects();
        PageLoader.callAfterReady();

    };

    var displayLoadErrorSearch = function () { $("#divSearch").attr('path', ''); displayLoadError(); }
    var displayLoadErrorAction = function () { $("#divAction").attr('path', ''); displayLoadError(); }
    var displayLoadErrorResult = function () { $("#divResult").attr('path', ''); displayLoadError(); }
    var fullAjaxComplete;

    var displayLoadError = function () {
        alert("Ocorreu um erro ao carregar a tela. Por favor entre em contato com o administrador do sistema informando o problema.");
    };
    PageLoader.ajaxRequests = 0;
    PageLoader.countSend = function () {
        PageLoader.ajaxRequests++;

        if (sessionEnded)
            return $('#loadingText p').html('.: Sess&atilde;o expirada :.').show().parent().parent().show();
        if (PageLoader.ajaxRequests == 1)

            $("#loading").show();
    };

    PageLoader.countComplete = function () {
        if (PageLoader.ajaxRequests > 0)
            fullAjaxComplete = false;
            PageLoader.ajaxRequests--;
        if (sessionEnded)
            return $('#loadingText p').html('.: Sess&atilde;o expirada :.').show().parent().parent().show();
        if (PageLoader.ajaxRequests == 0)
            fullAjaxComplete = true;
            $("#loading").hide();
            alert(fullAjaxComplete);
    };
    
}
