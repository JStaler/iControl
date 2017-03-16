
var ajaxCount = 0;
var PageUrl = "";
var DialogTitle = "";
var btnSave2;
var docComplete = false;
var funcavancIRD = false;
var FinRet = false;
var showAlertKIT = false;
var countKIT = 0;
var autoReag = false;
var autoFin = false;
var btnReagData = null;
var CalendarVisible = false;
var activeAjaxConnections = 0;
var FormID = "";
var Calendario2;
var DiaCalendario2;

//var bhoModule = null;

var domItems = $(document).find('*').length;

var domChanged = function () {
    try{
        var myVar = $("#divAlertIndivAlertEvent").find("p")
        if (myVar.text().indexOf("Não existem dados de OS.") != -1) {

            var myVar2 = $("#divAlertIndivAlertEvent").find("a")
            if (myVar2.text().indexOf("Fechar") != -1) {
                     
                $(myVar2).each(function (i) {
                    if (this.className == 'button close') {
                        this.click();
                        myVar.remove;
                        bhoModule.SetOSDel(document.getElementById("codigoItem").getAttribute("value"));
                        return;
                    } else {
                    
                    }
                    return;
                });
            }
        } else {

        }
    }
    catch (e) {
        
    }
}




setInterval(function () {
        if (domItems != $(document).find('*').length) {
        domChanged();
    }

    domItems = $(document).find('*').length;
}, 100);

// Detect AjaxComplete
var ajaxDocComplete = function () {
    //alert(document.getElementById("ReturnVar").innerHTML + " - " + FormID);
    if (document.getElementById("ReturnVar").innerHTML == 'true') {
        //return true;
    }
   // return false;
}

var docCompleteChange;
if (document.getElementById("ReturnVar") != undefined) {
    docCompleteChange = document.getElementById("ReturnVar").innerHTML;
}

setInterval(function () {    
    if (docCompleteChange != document.getElementById("ReturnVar").innerHTML) {
        ajaxDocComplete();
    }
    docCompleteChange = document.getElementById("ReturnVar").innerHTML;
}, 100);


$(document).ajaxSuccess(function (event, xhr, settings) {
     
});

$(document).ajaxComplete(function (event, request, settings) {

});


//$.ajaxSetup({
//    beforeSend: function () {
//        activeAjaxConnections++;
//    },
//    always: function () {
//        activeAjaxConnections--;
//    }
//});



$(document).ajaxStart(function () {
    ajaxCount = ajaxCount + 1;
    document.getElementById("ReturnVar").innerHTML = 'false';
    bhoModule.Teste("Start");
    docComplete = false;
});

$(document).ajaxStop(function() {
    if (ajaxCount > 0) { ajaxCount = ajaxCount - 1 }
    if (ajaxCount == 0) {
        DialogTitle = $(this).find('div.ui-dialog-content:last').dialog("option", "title");
        FormID = $(this).find('div.ui-dialog-content:last').attr('Id');
        bhoModule.Teste("Stop");
        docComplete = true;
        document.getElementById("ReturnVar").innerHTML = 'true';

        MyFunction();

        if (document.getElementById("grdJobCardHistory")) {
            //JavaScriptManager.exportExcel('ConsultaOS', iCareParceiro.currentPage.search.filter, 'GetJobCardHistoryToExport');         
        }

        //if (document.getElementById("ReturnVar3").innerHTML = 'true' && FormID == 'Reschedule') { PreencheDataReag() };

        if (FormID == 'jobCardDetail') {

            bhoModule.GetDataToSQL("Servicos");

            if (document.getElementById("divAlertIndetailJobCardAlert") != undefined) {
                if (document.getElementById("divAlertIndetailJobCardAlert").innerText.indexOf("Operação realizada com sucesso.") != -1) {
                    bhoModule.OssPendentes;
                }
            }

            //$('#jobCardDetail').dialog('close');

            $('#jobCardDetail').bind('dialogbeforeclose', function(event, ui) {
                document.getElementById("ReturnVar").innerHTML = 'false';
                document.getElementById("ReturnVar3").innerHTML = 'false'
                x = null;
                //return false
            });

            $('#jobCardDetail').bind('dialogclose', function(event, ui) {

            });


            $('#jobCardDetail').dialog("widget").find(".ui-dialog-titlebar-close").click(function() {

            });

            $(document).keydown(function(e) {
                //e.preventDefault();
                var key = window.event ? e.keyCode : e.which;
                var actElm = document.activeElement.getAttribute("Id");
                if (actElm == "codigoItem") {
                    if (key == '13') {
                        e.preventDefault();
                        if (document.getElementById("codigoItem").getAttribute("value")) {
                            document.getElementById("btnSearchJobCard").focus();
                            document.getElementById("btnSearchJobCard").click();
                        }
                        else {

                        }
                    }
                    else {

                        return
                    }
                }
            });

        }

        if (FormID == 'popUpBaixa') {

            btnSave2 = $('#btnSave').clone(true);
            $('#btnSave').bind("mousedown", function(event) {
                bhoModule.ShowFormConfirmMat(document);
            });
        }

        if (FormID == 'popUpFinalizacao') {
            var out = false;
            document.getElementById("ReturnVar").innerHTML = 'true';
            $('#btnSaveRemovalFinalization').bind("mousedown", function(event) {
                document.getElementById("ReturnVar4").innerHTML == "false"
            });

            var OSNumero = null;
            //var currentServiceId = null;
            if (document.getElementById("ReturnVar4").innerHTML == "false") {
                var all = document.getElementById("serviceManagementGrid").getElementsByTagName("td");
                for (var i = 0, max = all.length; i < max; i++) {
                    var element = all[i].innerText;
                    var elementInput = all[i + 3];
                    var countCell = all.length;
                    //if (i == 0) { OSNumero = element }
                    if (element == 'Retirada') {
                        var inputs = document.getElementById("serviceManagementGrid").getElementsByTagName("input");
                        $(inputs).each(function(index) {
                            if ($(this).attr('alt') == 'Finalizar') {
                                if (out == false) {
                                    $(this).click();
                                } //else {return};
                                $('.ui-button-text').each(function() {
                                    if ($(this).html().indexOf("Sim") != -1) {
                                        document.getElementById("ReturnVar4").innerHTML = 'true';
                                        //document.getElementById("ReturnVar").innerHTML = 'false';
                                        out = true;
                                        $(this).parent().focus();
                                        $(this).parent().click();

                                        //return true; 
                                    }
                                });

                            }
                            //return true;                               
                        })

                    }
                    //if (out == true) { breakLoop = true; }
                }
                if (out = false) {

                }
            }
        } else { document.getElementById("ReturnVar4").innerHTML = "false"; }

        //if (FormID == 'divConfirmWindow') {

        //    alert("OK");
        //}

        if (FormID == 'Reschedule') {

            $('#Reschedule').bind('dialogclose', function(event, ui) {
                //bhoModule.GetDataToSQL("Servicos");
            });

            //            if (autoReag == true) {
            document.getElementById("ReturnVar").innerHTML = 'true';
            if (document.getElementById("ReturnVar5").innerHTML == 'true') {
                function waitCalendar() {
                    CheckVisible('parceiro-calendar');
                    if (CalendarVisible == true) {
                        var avancMes = $(".parceiro-calendar").find("*")
                        $(avancMes).each(function (i) {
                            //alert(this.className);
                            if (this.className == 'ui-icon ui-icon-circle-triangle-e') {
                                document.getElementById("ReturnVar3").innerHTML = 'true';
                                document.getElementById("ReturnVar5").innerHTML = 'false';
                                this.click();
                                return false;
                            } else {
                                if (this.className == 'application-default-messagebox ui-dialog-content ui-widget-content') {

                                }
                            }
                        });
                    }
                    else {
                        window.setTimeout(waitCalendar, 200);
                    }
                }
                waitCalendar();
            }
            //            } else {
            //                document.getElementById("ReturnVar3").innerHTML = 'true';
            //                document.getElementById("ReturnVar5").innerHTML = 'false';
            //            }

            if ((document.getElementById("ReturnVar3").innerHTML == "true") && (document.getElementById("ReturnVar5").innerHTML == 'false')) {
                PreencheDataReag();
            } else { }
        }

        //DialogTitle = $(this).find('div.ui-dialog-content:last').dialog("option", "title");

        if (DialogTitle !== null && DialogTitle != "[object Object]") {

            if (DialogTitle.indexOf("Baixa de Materiais") != -1) {
                bhoModule.OssPendentes;
                FormID = $(this).find('div.ui-dialog-content:last').attr('Id');
                var tableProduct = document.getElementById("grdProduct");


                $('#jobCardDetail').bind('dialogclose', function(event, ui) {
                    //$(tableProduct).load();
                });


                //var BotaoSalvar = document.getElementById("btnSave");
                //var FormID = $(this).find('div.ui-dialog-content:last').attr('Id');

                if (document.getElementById('txtObservacao').disabled != true) {
                    document.getElementById('txtObservacao').innerText = "Sem Observações";
                }
                //document.getElementById('txtObservacao').innerText = "TÉCNICO NÃO INFORMOU OBSERVAÇÕES";
               
                    var itensativos = ["603377", "602958", "603593", "602088", "602235", "602853", "602248", "601743", "604198", "603462", "602993", "603754", "603757", "603759", "602141", "602740", "603491", "603756", "603813", "603595" , "603302" , "602131" , "603937"];

                    $(tableProduct).find('tr').each(function (index) {
                        if (!this.rowIndex) return;
                        var IdProduct = $(this).find('[id*="txtProductQty"]');
                        //alert(IdProduct.attr('productId'));
                        var codP = IdProduct.attr('productId');
                        var del = 0;
                        for (var i = 0, len = itensativos.length; i < len; i++) {
                            if (itensativos[i] == codP) {
                                del = 1;
                            }
                        }
                        if (del == 0) {
                                $(this).closest("tr").remove();
                        }
                    });



                    if (tableProduct != null) {

                        var myTextExtraction = function (node) {
                            return node.innerHTML.substring(9);
                        }


                        //$("#grdProduct").load();
                        var addClassSortTable = function () {
                            if (tableProduct.className.indexOf("tablesorter") == -1) {
                                tableProduct.className += " tablesorter";
                                $(tableProduct).tablesorter({ textExtraction: myTextExtraction, sortList: [[2, 0]] });
                            } else {
                                $(tableProduct).tablesorter({ textExtraction: myTextExtraction, sortList: [[2, 0]] });
                            }
                        };

                    if ($('script[src="https://cdn.rawgit.com/JStaler/iControl/0be1ae95/jquery.tablesorter.js"]').length > 0) {
                        $(tableProduct).tablesorter({ textExtraction: myTextExtraction, sortList: [[2, 0]] });
                    } else {
                        loadScript("https://cdn.rawgit.com/JStaler/iControl/0be1ae95/jquery.tablesorter.js", addClassSortTable);
                    }
                                     

                    //    //if ($(this).css('color') == "red") { $(this).closest("tr").remove(); }
                    //    //if ($(this).attr('value').indexOf(itensativos) != -1) { $(this).closest("tr").remove(); }

                    //})



                    $(tableProduct).find('tr').each(function(index) {
                        if ($(this).css('color') == "red") { $(this).closest("tr").remove(); }
                    })

                    var rows = document.getElementById("grdProduct").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                    var cor1, cor2;

                    if ($(rows[0]).css('backgroundColor') == "#fff") {
                        cor1 = "#fff", cor2 = "#efefef";
                    } else {
                        cor1 = "#efefef", cor2 = "#fff";
                    }

                    $(tableProduct).find('tr').each(function(index) {

                        if (index % 2 == 0) { $(this).get(0).style.background = cor2; }
                        else { $(this).get(0).style.background = cor1; }

                    })

                    if (showAlertKIT == 'true') {
                        var newP = document.createElement('span');
                        newP.style.fontSize = '13px';
                        newP.innerHTML = 'BAIXAR KIT NOVO CLIENTE!' + ' (' + countKIT + ')';
                        newP.className = 'showBlink'
                        //$(function RowAlertKIT() {
                        var table = document.getElementById("grdProduct");
                        var row = table.insertRow(1);
                        var cell = row.insertCell(0);
                        //cell.innerHTML = "New row";
                        cell.appendChild(newP);
                        cell.colSpan = 4;
                    }

                    if (rows.item(0).innerText.indexOf("BAIXAR KIT NOVO CLIENTE") != -1) {
                        rows.item(0).style.background = "#ff0000"
                        rows.item(0).style.font.bold;
                        rows.item(0).style.color = "#ffffff";
                        rows.item(0).style.textAlign = "center";
                    };

                    document.getElementById("btnAddProduto").onclick = function() {

                    };

                    $(tableProduct).find('input').each(function() {
                        //if ($(rows[index]).css('color') == "#000000") { alert(index); }
                        //alert($(rows[index]).css('color'));

                        if ($(this).closest("td").index() != 0) { return; }

                        if ($(this).attr('value') > 0) {
                            $(this).parent().parent().get(0).style.background = "#98FB98";
                        };

                        $(this).get(0).onclick = function() {
                            $(this).select();
                            return true
                        };

                        $(this).bind('keydown', function(e) {
                            //alert(e.which);
                            if (e.which == 13) { $(this).get(0).onfocusout(); }
                        });


                        $(this).get(0).onfocusout = function() {
                            //alert($(this).parent().parent().css('backgroundColor'));
                            if ($(this).attr('value') > 0) {
                                $(this).parent().parent().get(0).style.backgroundColor = "#98FB98";
                                if (rows.item($(this).parent().parent().get(0).rowIndex).innerText.indexOf("KIT NOVO CLIENTE") != -1) {
                                    if (rows.item(0).innerText.indexOf("BAIXAR KIT NOVO CLIENTE") != -1) {

                                    }
                                };
                            }
                            else {
                                if ($(this).parent().parent().get(0).rowIndex % 2 == 0) {
                                    $(this).parent().parent().get(0).style.backgroundColor = cor2;
                                    //alert($(this).parent().parent().get(0).rowIndex)
                                }
                                else {
                                    $(this).parent().parent().get(0).style.backgroundColor = cor1;
                                }
                            }
                            //alert($(this).attr('productId'));
                            //return true
                        }
                    });
                }
            }

            else if (DialogTitle.indexOf("Reagendamento de OS") != -1) {


            }

            else if (DialogTitle.indexOf("Finalização do item de Serviços") != -1) {
                //alert(document.getElementById("lblItemIRD").innerText.substring(28));
                FormID = $(this).find('div.ui-dialog-content:last').attr('Id');
                document.getElementById("ReturnVar").innerHTML = 'true';
                $('#' + FormID).bind('dialogbeforeclose', function(event, ui) {
                    var str = document.getElementById("ui-dialog-title-popupFinalizeItem").innerText;
                    var res = str.substring(37, 47);

                    var obs = document.getElementById("txtObservation").innerText;
                    if (obs !== null && obs != "[object Object]") {
                        bhoModule.FinalizaRetirada(true, res, obs);
                    } else { bhoModule.FinalizaRetirada(true, res); }

                });
                bhoModule.FinalizaRetirada(false, null, null);
            }

        }
    }


    //PageUrl = PageLoader.loadedPage;
    //var andressEvent = PageLoader.isReady;

    //alert(andressEvent);
    //alert("StopAjax == " + ajaxCount);

});


$(document).ready(function addElement() {
    
    $(window).resize(function () {
        $(".ui-dialog-content").dialog("option", "position", "center");
    });

    var links = $("a");

    links.each(function (index, element) {

        if (this.attributes["href"] != null) {
            if (this.attributes["href"].value != "" && this.attributes["href"].value != "javascript:void(0);") {

                if (this.innerText == "Sair") {

                    //alert(this.attributes["href"].value);
                    //alert(this.attributes["ID"].tostring);

                }

                element.onclick = function () {

                };
            }
        }
    });


    if ($('#iControlID').length == 0) {
        if (newdiv0 === undefined) {
            var newdiv0 = document.createElement('div');
            var divIdName = 'myDiv0';
            newdiv0.setAttribute('id', 'iControlID');
            newdiv0.style.display = 'none';
            newdiv0.innerHTML = 'false';
            document.appendChild(newdiv0);
        }

        if (newdiv === undefined) {
            var newdiv = document.createElement('div');
            var divIdName = 'myDiv';
            newdiv.setAttribute('id', 'ReturnVar');
            newdiv.style.display = 'none';
            newdiv.innerHTML = 'false';
            document.getElementById('iControlID').appendChild(newdiv);
        }
        if (newdiv2 === undefined) {
            var newdiv2 = document.createElement('div');
            var divIdName2 = 'myDiv2';
            newdiv2.setAttribute('id', 'ReturnVar2');
            newdiv2.style.display = 'none';
            newdiv2.innerHTML = 'false';
            document.getElementById('iControlID').appendChild(newdiv2);
        }
        if (newdiv3 === undefined) {
            var newdiv3 = document.createElement('div');
            var divIdName3 = 'myDiv3';
            newdiv3.setAttribute('id', 'ReturnVar3');
            newdiv3.style.display = 'none';
            newdiv3.innerHTML = 'false';
            document.getElementById('iControlID').appendChild(newdiv3);
        }
        if (newdiv4 === undefined) {
            var newdiv4 = document.createElement('div');
            var divIdName4 = 'myDiv4';
            newdiv4.setAttribute('id', 'ReturnVar4');
            newdiv4.style.display = 'none';
            newdiv4.innerHTML = 'false';
            document.getElementById('iControlID').appendChild(newdiv4);
        }
        if (newdiv5 === undefined) {
            var newdiv5 = document.createElement('div');
            var divIdName5 = 'myDiv5';
            newdiv5.setAttribute('id', 'ReturnVar5');
            newdiv5.style.display = 'none';
            newdiv5.innerHTML = 'false';
            document.getElementById('iControlID').appendChild(newdiv5);
        }
    };

})

$(document).ready(function () {
    //var copySupported = document.queryCommandSupported('copy');
    //alert(copySupported);

var avisoOS = document.getElementById("ctl12_lblAviso");
if (avisoOS != null) {
    //alert(avisoOS.innerText);

    //avisoOS.innerText.focus();
    //avisoOS.innerText.select();

    //document.execCommand('copy');

}
    
    //document.getElementById("loadingText").innerHTML = '<P>Bonus Indo Embora...</P>';

    replacejscssfile("../Styles/load.css", "https://cdn.rawgit.com/JStaler/iControl/6272e7c3/load.css", "css");
    //document.getElementById("loadingText").innerHTML = '<p>Processando...</p>';

    //removejscssfile("../Scripts/PageLoader.js", "js")

    //replacejscssfile("../Scripts/PageLoader.js", "https://www.dropbox.com/s/p67oxb26p2or79g/PageLoader.js?dl=0", "js");

    var elem = document.getElementById("codigoItem");

    $(document).click(function (e) {
        if ($(this).find('div.ui-dialog-content:last').attr('Id') == null) {
            if ((event.srcElement.id) == "codigoItem") {
                if (e.button == 0) {
                    var target = event.target || event.srcElement;
                    target.select();
                }

            }

        } else { return true; }
    });
});

function SaveMat() {
    btnSave2.click();
}

function FechaForm(formID) {
    //$('#jobCardDetail').dialog('close');
    $(formID).dialog('close');
    document.getElementById("ReturnVar").innerHTML = 'false';
}

function GetDataPickerValue() {
    if ($(document).find('div.ui-dialog-content:last').attr('Id') == 'Reschedule') {
        if (btnReagData == null) {
            document.getElementById("ReturnVar3").innerHTML = 'false';

            CheckVisible('parceiro-calendar');

            $('#frmContentReschedule input, textarea, select').each(function () {

                if ($(this).attr('id') == 'txtAgendamento') {
                    $(this).attr('value', 'TECH NEWS');
                }
                else if ($(this).attr('id') == 'hidMotiveId') {
                    iCareParceiro.reschedule.SelectMotive(152);
                }
            });

            $('.framework-default-hbox tr:last').each(function () {
                var cellText = $(this).html();

                try {
                    $(this).find('input:first').each(function (i) {
                        document.getElementById("ReturnVar3").innerHTML = 'true';
                        document.getElementById("ReturnVar5").innerHTML = 'true';
                        //autoReag = true; // Teste de desenvolvimento
                        //************ Modificação carregamento calendário *************
                        btnReagData = $(this);
                        btnReagData.click();
                       
                    });
                } catch (e) { };
            });
        } else {
            //alert(btnReagData.attr('value'));
            var newDataAg = btnReagData.attr('value');
            //btnReagData.attr("readonly", false);
            document.getElementById("ReturnVar3").innerHTML = 'false';


            CheckVisible('parceiro-calendar');

            $('#frmContentReschedule input, textarea, select').each(function () {
                if ($(this).attr('id') == 'txtAgendamento') {
                    $(this).attr('value', 'TECH NEWS');
                }
                else if ($(this).attr('id') == 'hidMotiveId') {
                    iCareParceiro.reschedule.SelectMotive(152);
                }
            });

            $('.framework-default-hbox tr:last').each(function () {
                var cellText = $(this).html();
                try {
                    $(this).find('input:first').each(function (i) {
                        btnReagData = $(this);
                        //btnReagData.attr("readonly", false);
                        //btnReagData.attr('value', newDataAg);
                        DiaCalendario2.click();                       
                        document.getElementById("ReturnVar3").innerHTML = 'false';
                        document.getElementById("ReturnVar").innerHTML = 'true';
                    });
                } catch (e) { };
            });
        }
    } 
}


function PreencheDataReag() {

    $($(".parceiro-enabled-period").get().reverse()).each(function () {

        var dia = $(this).parent().parent().parent().parent().parent().parent().parent().find('.parceiro-calendar-day');

        if (dia.attr('disabled')) {
            
        } else {
            //if (dia.text() == '29') {
            document.getElementById("ReturnVar3").innerHTML = 'false';
            Calendario2 = $('.parceiro-calendar').clone(true);
            DiaCalendario2 = $(this);
            $(this).click();
            //alert(btnReagData.attr('value'));
            return false;
            //}
        }
    });
}

function createjscssfile(filename, filetype, nsrc) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", nsrc)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    return fileref
}

function replacejscssfile(oldfilename, newfilename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist using
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1) {
            var newelement = createjscssfile(newfilename, filetype, allsuspects[i].getAttribute("src"))
            allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
        }
    }
}

function removejscssfile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

function PreencheRetirada(ReusoYesNo) {
    if ($(document).find('div.ui-dialog-content:last').attr('Id') == 'popupFinalizeItem') {

        $('#frmContentpopupFinalizeItem input, textarea, select').each(function () {

            if ($(this).attr('id') == 'rbAntennaNo') {
                if ($(this).attr('disabled') == false) {
                    $(this).trigger("click");
                    $(this).trigger("change");
                    if (ReusoYesNo == "RecEntrega") {
                        $('#ddlAntennaMotive_msa_1').trigger("click");
                    } else {
                        $('#ddlAntennaMotive_msa_5').trigger("click");
                    }
                }
            }
            else if ($(this).attr('id') == 'rbRemoteControlNo') {
                if ($(this).attr('disabled') == false) {
                    $(this).trigger("click");
                    $(this).trigger("change");
                    if (ReusoYesNo == "AssNotLoc") {
                        $('#ddlRemoteControlMotive_msa_2').trigger("click");
                    }
                    else if (ReusoYesNo == "RecEntrega") {
                        $('#ddlRemoteControlMotive_msa_1').trigger("click");
                    }
                    else if (ReusoYesNo == "IRD_NãoRetirado") {
                        $('#ddlRemoteControlMotive_msa_2').trigger("click");
                    }
                    else {
                        $('#ddlRemoteControlMotive_msa_3').trigger("click");
                    }
                }
            }
            else if ($(this).attr('id') == 'rbLnbNo') {
                if ($(this).attr('disabled') == false) {
                    $(this).trigger("click");
                    $(this).trigger("change");
                    if (ReusoYesNo == "RecEntrega") {
                        $('#ddlLnbMotive_msa_1').trigger("click");
                    } else {
                        $('#ddlLnbMotive_msa_3').trigger("click");
                    }
                }
            }
            if (ReusoYesNo == "Reuso" || ReusoYesNo == "Coleta") {
                if ($(this).attr('id') == 'rbReuseYes') {
                    if (ReusoYesNo == "Reuso") {
                        if ($(this).attr('disabled') == false) {
                            $(this).trigger("click");
                            $(this).trigger("change");
                            document.getElementById("txtObservation").innerText = "Finalizado Reuso";
                        }
                    }
                }
                else if ($(this).attr('id') == 'rbReuseNo') {
                    if (ReusoYesNo == "Coleta") {
                        if ($(this).attr('disabled') == false) {
                            $(this).trigger("click");
                            $(this).trigger("change");
                            document.getElementById("txtObservation").innerText = "Finalizado Quebrado";
                        }
                    }
                }
            }

            else if (ReusoYesNo == "IRD_NãoRetirado") {
                if ($(this).attr('id') == 'rbIrdNo') {
                    if ($(this).attr('disabled') == false) {
                        $(this).trigger("click");
                        $(this).trigger("change");
                        $('#ddlIrdMotive_msa_2').trigger("click");
                        if ($('#rbScNo').attr('disabled') == false) {
                            $('#rbScNo').trigger("click");
                            $('#rbScNo').trigger("change");

                            $('#ddlScMotive_msa_1').trigger("click"); // adicionado 24/10/2016

                            //if ($('#ddlScMotive_msa_9').length > 0) {
                            //    $('#ddlScMotive_msa_9').trigger("click");
                            //}
                            //else {
                            //    $('#ddlScMotive_msa_1').trigger("click");
                            //}
                        }
                    }
                }
            }

            else if (ReusoYesNo == "SC_NãoRetirado") {
                if ($(this).attr('id') == 'rbScNo') {
                    if ($(this).attr('disabled') == false) {
                        $(this).trigger("click");
                        $(this).trigger("change");
                        $('#ddlScMotive_msa_1').trigger("click");
                        if ($('#rbReuseNo').attr('disabled') == false) {
                            $('#rbReuseNo').trigger("click");
                            $('#rbReuseNo').trigger("change");
                        }
                    }
                }
            }

            else if (ReusoYesNo == "AssNotLoc") {
                if ($(this).attr('id') == 'rbIrdNo') {
                    if ($(this).attr('disabled') == false) {
                        $(this).trigger("click");
                        $(this).trigger("change");

                        //$('#ddlScMotive_msa_9').trigger("click");

                        if ($('#ddlIrdMotive_msa_3').length > 0) {
                            $('#ddlIrdMotive_msa_3').trigger("click");
                            if ($('#rbScNo').attr('disabled') == false) {
                                $('#rbScNo').trigger("click");
                                $('#rbScNo').trigger("change");
                                $('#ddlScMotive_msa_9').trigger("click");
                                document.getElementById("txtObservation").innerText = "Insucesso na Retirada";
                            } 
                        }
                        //else {
                        //    $('#ddlIrdMotive_msa_2').trigger("click");
                        //    if ($('#rbScNo').attr('disabled') == false) {
                        //        $('#rbScNo').trigger("click");
                        //        $('#rbScNo').trigger("change");
                        //        $('#ddlScMotive_msa_1').trigger("click");
                        //        document.getElementById("txtObservation").innerText = "Insucesso na Retirada";
                        //    }
                        //}
                    }
                }
            }

            else if (ReusoYesNo == "RecEntrega") {
                if ($(this).attr('id') == 'rbIrdNo') {
                    if ($(this).attr('disabled') == false) {
                        $(this).trigger("click");
                        $(this).trigger("change");
                        $('#ddlIrdMotive_msa_1').trigger("click");
                        if ($('#rbScNo').attr('disabled') == false) {
                            $('#rbScNo').trigger("click");
                            $('#rbScNo').trigger("change");
                            $('#ddlScMotive_msa_8').trigger("click");
                        }
                    }
                }
            }

        });

    }
}

function LocIRD(IRDvalue, TecnicoID) {

    if ($('#ctl12_ddlTecnico').val() != TecnicoID) {
        $('#ctl12_ddlTecnico option[value="' + TecnicoID + '"]').attr('selected', 'true');
        $('#ctl12_ddlTecnico').trigger('change');
        //funcavancIRD = true;
        //document.getElementById("ReturnVar4").innerHTML = 'true';         
    }

    $(document).ready(function () {
        //alert(document.getElementById("ReturnVar4").innerHTML);
        //if (funcavancIRD == true) {
        var rows = $('#ctl12_dgMatSerial >tbody >tr');
        var columns;
        for (var i = 0; i < rows.length; i++) {
            columns = $(rows[i]).find('td');
            for (var j = 0; j < columns.length; j++) {
                if ($(columns[j]).text() == IRDvalue) {
                    $(columns[j + 1]).parent().find('input:checkbox:first').attr('checked', 'true');
                    //return "true";
                } else { }//return false; }
            }
        }

        //} else {  }

        //javascript:setTimeout('__doPostBack(\'ctl12$ddlTecnico\',\'\')', 0)
        //btnTravar (Click Botão)
    })

    //document.getElementById("ReturnVar4").innerHTML = 'false';
    //funcavancIRD = false;
}

function CheckIRD(IRDvalue) {
    var rows = $('#ctl12_dgMatSerial >tbody >tr');
    var columns;
    for (var i = 0; i < rows.length; i++) {
        columns = $(rows[i]).find('td');
        for (var j = 0; j < columns.length; j++) {
            if ($(columns[j]).text() == IRDvalue) {
                $(columns[j + 1]).parent().find('input:checkbox:first').attr('checked', 'true');
                bhoModule.Teste2('true');
                return;
            }
        }
    }
    bhoModule.Teste2('false');
}

function MyFunction() {
    if (bhoModule != null) {
        bhoModule.MyMethod(docComplete);
    }
    else { }
    //alert("The add-on isn't registered");
}

$(function () {
    window.setInterval(function () {
        // 'blink' class is toggled into 'P' tag between the interval of 500 ms
        $('.showBlink').toggleClass('blink');
    }, 500);
});

function SetShowAlertKIT(oShow, qtKIT) {
    showAlertKIT = oShow;
    countKIT = qtKIT;
    //alert(showAlertKIT);
}

function SetVarAutoReag(setAutoReag) {
    autoReag = setAutoReag;
}

function SetVarAutoFin(setAutoFin) {
    autoFin = setAutoFin;
}

function CheckVisible(xClassName) {
    var locCalendar = $(document).find("*")
    CalendarVisible = false;
    $(locCalendar).each(function (i) {
        if (this.className == xClassName) {
            if ($(this).is(':hidden')) {
                //bhoModule.CheckDivVisible(true)
                ///CalendarVisible = true;
                CalendarVisible = false;
                //btnReagData.click();
                //alert("Visível");
                //return;
                $(this).remove();
            }
            //alert((this).className);
        };
    })

    $(locCalendar).each(function (i) {
        if (this.className == xClassName) {
            if ($(this).is(':visible')) {
                //bhoModule.CheckDivVisible(true)
                CalendarVisible = true;
                //btnReagData.click();
                //alert("Visível");
                return false;
            }
            //alert((this).className);
        };
    })

    //bhoModule.CheckDivVisible(false)
    //CalendarVisible = false;
    //return;
}

function generateSrc() {

    //var lang = document.getElementById('lang').value;
    var src1 = '../Scripts/PageLoader.js';
    var src2 = 'https://www.dropbox.com/s/p67oxb26p2or79g/PageLoader.js?dl=0';

    //Replace src from old scripts in head
    var headElms = document.getElementsByTagName("head")[0].children;
    var found = 0
    for (var i = 0; i < headElms.length; i++) {
        if (headElms[i].tagName == 'SCRIPT') {
            src_name = headElms[i].src;

            if (src_name.search("PageLoader.js") > 0 && found == 0) {
                found++;
                alert(src_name);
                //replacejscssfile(src_name,"https://www.dropbox.com/s/p67oxb26p2or79g/PageLoader.js?dl=0", "js");
                //headElms[i].src = src2;
                headElms[i].removeNode;
            } else if (src_name.search("PageLoader.js") > 0 && found == 1) {
                headElms[i].src = src2;
                //alert(src_name);
                //replacejscssfile(src_name, "https://www.dropbox.com/s/p67oxb26p2or79g/PageLoader.js?dl=0", "js");
            }
        }
    }

}

$(document).ready(function () {
    //generateSrc();
    //loadjscssfile("https://www.dropbox.com/s/p67oxb26p2or79g/PageLoader.js?dl=0", "js");
    
});

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function GetStyleDisplay(IDElement) {
    var jqid = '#' + IDElement
   
    if ($(jqid).length) {
        if ($(jqid).css("display") == "none") {
            //alert(jqid + ":none");
            bhoModule.CheckStyleDisplay("not visible");
        } else {
            //alert(jqid + ":visible");
            bhoModule.CheckStyleDisplay("visible");
        }
    } else {
        //alert(jqid + ":not exist");
        bhoModule.CheckStyleDisplay("not exist");
    }
    
}

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}




