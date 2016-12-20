/*
Stimulsoft.Reports.JS
Version: 2016.3
Build date: 2016.12.09
*/

StiJsViewer.prototype.ShowAnimationVerticalMenu = function (menu, finishPos, endTime) {
    var currentPos = menu.innerContent.offsetTop;
    clearTimeout(menu.animationTimer);

    var d = new Date();
    var t = d.getTime();
    var step = Math.round((finishPos - currentPos) / ((Math.abs(endTime - t) + 1) / 30));

    // Last step
    if (Math.abs(step) > Math.abs(finishPos - currentPos)) step = finishPos - currentPos;

    currentPos = currentPos + step;
    var resultPos;

    if (t < endTime) {
        resultPos = currentPos;
        menu.animationTimer = setTimeout(function () { menu.jsObject.ShowAnimationVerticalMenu(menu, finishPos, endTime) }, 30);
    }
    else {
        resultPos = finishPos;
        menu.style.overflow = "visible";
        menu.animationTimer = null;
    }

    menu.innerContent.style.top = resultPos + "px";
}

StiJsViewer.prototype.ShowAnimationForm = function (form, endTime) {
    if (!form.flag) { form.currentOpacity = 1; form.flag = true; }
    clearTimeout(form.animationTimer);

    var d = new Date();
    var t = d.getTime();
    var step = Math.round((100 - form.currentOpacity) / ((Math.abs(endTime - t) + 1) / 30));

    // Last step
    if (Math.abs(step) > Math.abs(100 - form.currentOpacity)) step = 100 - form.currentOpacity;

    form.currentOpacity = form.currentOpacity + step;
    var resultOpacity;
    
    if (t < endTime) {
        resultOpacity = form.currentOpacity;
        form.animationTimer = setTimeout(function () { form.jsObject.ShowAnimationForm(form, endTime) }, 30);
    }
    else {
        resultOpacity = 100;
        form.flag = false;
        form.animationTimer = null;
    }

    form.style.opacity = resultOpacity / 100;
}

StiJsViewer.prototype.ShowAnimationForScroll = function (reportPanel, finishScrollTop, endTime, completeFunction) {
    if (!reportPanel) return;
    var currentScrollTop = 0;
    if (reportPanel.jsObject.options.appearance.scrollbarsMode) currentScrollTop = reportPanel.scrollTop;
    else {
        currentScrollTop = document.documentElement.scrollTop;
        if (currentScrollTop == 0) currentScrollTop = document.getElementsByTagName('BODY')[0].scrollTop;
    }

    clearTimeout(reportPanel.animationTimer);
    var d = new Date();
    var t = d.getTime();
    var step = Math.round((finishScrollTop - currentScrollTop) / ((Math.abs(endTime - t) + 1) / 30));

    // Last step
    if (Math.abs(step) > Math.abs(finishScrollTop - currentScrollTop)) step = finishScrollTop - currentScrollTop;

    currentScrollTop += step;
    var resultScrollTop;
    var this_ = this;

    if (t < endTime) {
        resultScrollTop = currentScrollTop;        
        reportPanel.animationTimer = setTimeout(function () {
            this_.ShowAnimationForScroll(reportPanel, finishScrollTop, endTime, completeFunction);
        }, 30);
    }
    else {
        resultScrollTop = finishScrollTop;
        if (completeFunction) completeFunction();
    }

    if (reportPanel.jsObject.options.appearance.scrollbarsMode)
        reportPanel.scrollTop = resultScrollTop;
    else
        window.scrollTo(0, resultScrollTop);
}

StiJsViewer.prototype.easeInOutQuad = function (t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

StiJsViewer.prototype.animation = function (timstamp) {
    var now = new Date().getTime();
    for (var i in window.this_.options.animations) {
        var an = window.this_.options.animations[i];
        var el = an.el;
        if (an.duration <= now - an.start) {
            for (var j in an.animations) {
                var ann = an.animations[j];
                el.style[ann.style] = parseFloat(ann.end) + ann.postfix;
            }
            if (ann.finish) ann.finish();
            window.this_.options.animations.splice(i, 1);
        } else {
            for (var i in an.animations) {
                var ann = an.animations[i];
                el.style[ann.style] = parseFloat(ann.start) + window.this_.easeInOutQuad((now - parseFloat(an.start)) / an.duration) * (parseFloat(ann.end) - parseFloat(ann.start)) + ann.postfix;
                console.log(el.style[ann.style]);
            }
        }
    }
    if (window.this_.options.animations.length > 0) {
        window.requestAnimationFrame(window.this_.animation);
    }
}

StiJsViewer.prototype.animate = function (element, animation) {
    element.style.transitionDuration = animation.duration + "ms";
    var prop = "";
    for (var i in animation.animations) {
        prop += ((prop != "") ? ", " : "") + (animation.animations[i].property || animation.animations[i].style);
    }
    element.style.transitionProperty = prop;
    for (var i in animation.animations) {
        var an = animation.animations[i];
        element.style[an.style] = an.end + an.postfix;
        if (an.finish) {
            setTimeout(function () {
                an.finish();
            }, animation.duration);
        }
    }
    setTimeout(function () {
        element.style.transitionDuration = "";
    }, animation.duration * 2);


}

//Document MouseUp
StiJsViewer.prototype.DocumentMouseUp = function (event) {
    this.options.formInDrag = false;
}

//Document Mouse Move
StiJsViewer.prototype.DocumentMouseMove = function (event) {
    if (this.options.formInDrag) this.options.formInDrag[4].move(event);
}

StiJsViewer.prototype.SetEditableMode = function (state) {
    this.options.editableMode = state;
    if (this.controls.buttons.Editor) this.controls.buttons.Editor.setSelected(state);

    if (state)
        this.ShowAllEditableFields();
    else
        this.HideAllEditableFields();
}

StiJsViewer.prototype.ShowAllEditableFields = function () {
    this.options.editableFields = [];
    var pages = this.controls.reportPanel.pages;

    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var pageElements = page.getElementsByTagName('*');

        for (k = 0; k < pageElements.length; k++) {
            var editableStrAttr = pageElements[k].getAttribute("editable");
            if (editableStrAttr) {
                var attrArray = editableStrAttr.split(";");
                var params = {};
                params.compIndex = attrArray[0];
                params.pageIndex = i.toString();
                params.type = attrArray[1];

                if (params.type == "CheckBox") {
                    this.ShowCheckBoxEditableField(pageElements[k], params, attrArray);
                }
                else if (params.type == "Text") {
                    this.ShowTextEditableField(pageElements[k], params);
                }
                else if (params.type == "RichText") {
                    this.ShowRichTextEditableField(pageElements[k], params);
                }
            }
        }
    }
}

StiJsViewer.prototype.HideAllEditableFields = function () {
    var editableFields = this.options.editableFields;
    if (this.options.currentEditableTextArea) this.options.currentEditableTextArea.onblur();

    for (var i = 0; i < editableFields.length; i++) {
        editableFields[i].className = editableFields[i].className.replace(" stiEditableField stiEditableFieldSelected", "");
        editableFields[i].onclick = null;
        editableFields[i].style.outline = "";
    }
}

StiJsViewer.prototype.ShowCheckBoxEditableField = function (editableCell, params, attrArray) {
    if (!editableCell.sizes) {
        var imgElements = editableCell.getElementsByTagName('IMG');
        if (imgElements.length == 0) imgElements = editableCell.getElementsByTagName('SVG');
        var imgElement = (imgElements.length > 0) ? imgElements[0] : null;
        if (!imgElement) return;
        editableCell.sizes = {
            inPixels: imgElement.offsetWidth > imgElement.offsetHeight ? imgElement.offsetHeight : imgElement.offsetWidth,
            widthStyle: imgElement.style.width,
            heightStyle: imgElement.style.height
        }
    }

    if (this.getNavigatorName() != "Google Chrome") editableCell.style.outline = "1px solid gray";
    editableCell.style.textAlign = "center";
    editableCell.className += " stiEditableField stiEditableFieldSelected";

    var trueSvgImage = this.GetSvgCheckBox(attrArray[3], attrArray[5], this.StrToInt(attrArray[6]), attrArray[7], editableCell.sizes.inPixels);
    var falseSvgImage = this.GetSvgCheckBox(attrArray[4], attrArray[5], this.StrToInt(attrArray[6]), attrArray[7], editableCell.sizes.inPixels);
    params.falseImage = "<div style='width:" + editableCell.sizes.widthStyle + ";height:" + editableCell.sizes.heightStyle + ";'>" + trueSvgImage + "</div>";
    params.trueImage = "<div style='width:" + editableCell.sizes.widthStyle + ";height:" + editableCell.sizes.heightStyle + ";'>" + falseSvgImage + "</div>";
    params.checked = attrArray[2] == "true" || attrArray[2] == "True";
    editableCell.params = params;
    editableCell.jsObject = this;

    if (!editableCell.hasChanged) {
        editableCell.checked = params.checked;
        editableCell.innerHTML = params.checked ? params.trueImage : params.falseImage;
    }

    editableCell.onclick = function () {
        this.checked = !this.checked;
        this.innerHTML = this.checked ? params.trueImage : params.falseImage;
        this.hasChanged = true;
        this.jsObject.AddEditableParameters(this);
    }
    this.options.editableFields.push(editableCell);
}

StiJsViewer.prototype.ShowTextEditableField = function (editableCell, params) {

    editableCell.className += " stiEditableField stiEditableFieldSelected";
    if (this.getNavigatorName() != "Google Chrome") editableCell.style.outline = "1px solid gray";
    editableCell.params = params;
    editableCell.jsObject = this;

    editableCell.onclick = function () {
        if (this.editMode) return;
        if (this.jsObject.options.currentEditableTextArea) this.jsObject.options.currentEditableTextArea.onblur();
        this.editMode = true;

        var textArea = document.createElement("textarea");
        textArea.jsObject = this.jsObject;
        textArea.style.width = (this.offsetWidth - 5) + "px";
        textArea.style.height = (this.offsetHeight - 5) + "px";
        textArea.style.maxWidth = (this.offsetWidth - 5) + "px";
        textArea.style.maxHeight = (this.offsetHeight - 5) + "px";
        textArea.className = this.className.replace(" stiEditableField stiEditableFieldSelected", "") + " stiEditableTextArea";
        textArea.style.border = "0px";

        textArea.value = this.innerHTML;
        this.appendChild(textArea);
        textArea.focus();
        this.jsObject.options.currentEditableTextArea = textArea;

        textArea.onblur = function () {
            editableCell.editMode = false;
            editableCell.innerHTML = this.value;
            this.jsObject.options.currentEditableTextArea = null;
            this.jsObject.AddEditableParameters(editableCell);
        }
    }
    this.options.editableFields.push(editableCell);
}

StiJsViewer.prototype.ShowRichTextEditableField = function (editableCell, params) {
    //TO DO
}

StiJsViewer.prototype.AddEditableParameters = function (editableCell) {
    if (!this.reportParams.editableParameters) this.reportParams.editableParameters = {};
    var params = {};
    params.type = editableCell.params.type;
    if (params.type == "CheckBox") params.checked = editableCell.checked;
    if (params.type == "Text") params.text = editableCell.innerHTML;

    if (!this.reportParams.editableParameters[editableCell.params.pageIndex]) this.reportParams.editableParameters[editableCell.params.pageIndex] = {};
    this.reportParams.editableParameters[editableCell.params.pageIndex][editableCell.params.compIndex] = params;
}

StiJsViewer.prototype.GetSvgCheckBox = function (style, contourColor, size, backColor, width) {
    var head = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" width=\"" + width + "px\" height=\"" + width + "px\">";
    var path = "<path stroke=\"" + contourColor + "\" stroke-width=\"" + size + "\" fill=\"" + backColor +
        "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" transform=\"scale(" + (1 / (200 / width)) + ")\" d=\"";

    var shape = "";
    switch (style) {
        case "Cross":
            shape = "m 62.567796,147.97593 c -0.55,-0.14223 -2.162828,-0.5128 -3.584062,-0.82348 -3.647667,-0.79738 -9.670499,-5.83775 -14.242817,-11.91949 l " +
                        "-3.902341,-5.19058 5.080199,-1.13481 c 7.353071,-1.64253 13.640456,-5.71752 21.826811,-14.14646 l 7.208128,-7.42171 " +
                        "-6.410736,-7.513354 c -11.773129,-13.79803 -14.346726,-23.01954 -8.627769,-30.91434 2.894109,-3.9952 11.818482,-12.369333 " +
                        "13.182086,-12.369333 0.411356,0 1.063049,1.6875 1.448207,3.750003 0.980474,5.25038 6.456187,16.76587 10.936694,23 2.075266,2.8875 " +
                        "3.991125,5.25 4.257464,5.25 0.266339,0 3.775242,-3.4875 7.797566,-7.75 16.397034,-17.37615 29.674184,-19.76481 38.280564,-6.88699 " +
                        "4.15523,6.21753 4.18631,8.07093 0.14012,8.3552 -5.84833,0.41088 -17.16241,8.5342 -25.51465,18.319104 l -4.63153,5.42599 " +
                        "4.87803,4.31529 c 6.55108,5.79533 18.8991,11.89272 25.84076,12.76002 3.0455,0.38051 5.53727,1.10582 5.53727,1.6118 0,2.7809 " +
                        "-9.26611,14.41872 -13.03,16.36511 -7.96116,4.11687 -16.36991,0.71207 -32.764584,-13.26677 l -4.985957,-4.25125 -7.086791,8.97188 c " +
                        "-3.897736,4.93454 -8.82141,10.1198 -10.9415,11.52281 -3.906121,2.58495 -8.86588,4.41339 -10.691162,3.94136 z";
            break;

        case "Check":
            shape = "M 60.972125,162.49704 C 51.172676,136.72254 43.561975,123.37669 35.370344,117.6027 l -4.45827,-3.14248 2.75159,-2.89559 c 3.875121,-4.07793 " +
                        "10.034743,-7.49924 14.902472,-8.27747 3.859874,-0.61709 4.458306,-0.38024 8.535897,3.37835 2.660692,2.45254 6.265525,7.60856 9.167226,13.11196 " +
                        "2.630218,4.98849 4.910542,9.06999 5.067388,9.06999 0.156846,0 2.31372,-3.0375 4.793052,-6.75 C 96.259164,91.956015 129.68299,58.786374 157.56485,41.281603 l " +
                        "8.84913,-5.555656 2.2633,2.631238 2.26329,2.631237 -7.76266,6.294183 C 139.859,66.19023 108.01682,105.51363 89.042715,138.83563 c -6.680477,11.73214 " +
                        "-7.172359,12.31296 -15.090788,17.81963 -4.501873,3.13071 -9.044031,6.30443 -10.093684,7.05271 -1.708923,1.21826 -2.010678,1.09165 -2.886118,-1.21093 z";
            break;

        case "CrossRectangle":
            shape = "m 24.152542,102.04237 0,-72.499996 74.5,0 74.499998,0 0,72.499996 0,72.5 -74.499998,0 -74.5,0 0,-72.5 z m 133.758188,0.25 -0.25819,-57.249996 " +
                        "-58.999998,0 -59,0 -0.259695,55.999996 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 13.207991,1.25 59.517885,1.25 l " +
                        "59.039573,0 -0.25819,-57.25 z m -90.574091,43.18692 c -1.823747,-0.3912 -4.926397,-1.85716 -6.894778,-3.25768 -3.319254,-2.36169 -12.289319,-12.40741 " +
                        "-12.289319,-13.76302 0,-0.32888 2.417494,-1.13897 5.372209,-1.80021 7.185193,-1.60797 13.747505,-5.93496 21.803114,-14.3763 l 6.675323,-6.99496 " +
                        "-6.379078,-7.31436 C 64.931387,85.71231 61.643682,76.29465 65.471903,68.89169 67.054097,65.83207 78.56175,54.542374 80.098251,54.542374 c 0.45744,0 " +
                        "1.146839,1.6875 1.531997,3.75 0.980474,5.250386 6.456187,16.765876 10.936694,22.999996 2.075266,2.8875 3.991125,5.25 4.257464,5.25 0.266339,0 " +
                        "3.775244,-3.4875 7.797564,-7.75 16.39704,-17.376139 29.67419,-19.764806 38.28057,-6.88698 4.15523,6.21752 4.18631,8.07092 0.14012,8.35519 -5.82996,0.40959 " +
                        "-18.23707,9.34942 -25.91566,18.67328 -3.90068,4.73647 -3.97203,4.95414 -2.2514,6.86861 3.19054,3.54997 13.7039,10.54321 18.97191,12.61967 2.83427,1.11716 " +
                        "7.43737,2.33421 10.22912,2.70455 2.79175,0.37034 5.07591,0.9956 5.07591,1.38947 0,2.11419 -8.37504,13.20895 -11.6517,15.4355 -8.39423,5.70403 " +
                        "-16.63203,2.77 -34.14289,-12.16054 l -4.985955,-4.25125 -7.086791,8.97188 c -9.722344,12.3085 -16.524852,16.55998 -23.948565,14.96754 z";
            break;

        case "CheckRectangle":
            shape = "m 19.915254,103.5 0,-72.5 71.942245,0 71.942241,0 6.55727,-4.11139 6.55726,-4.11139 1.96722,2.36139 c 1.08197,1.298765 1.98219,2.644166 2.00049,2.98978 " +
                        "0.0183,0.345615 -2.44173,2.53784 -5.46673,4.87161 l -5.5,4.243219 0,69.378391 0,69.37839 -74.999991,0 -75.000005,0 0,-72.5 z m 133.999996,3.87756 c " +
                        "0,-49.33933 -0.12953,-53.514947 -1.62169,-52.276568 -2.78014,2.307312 -15.68408,17.90053 -24.32871,29.399008 -10.4919,13.955575 -23.47926,33.53736 " +
                        "-29.514025,44.5 -4.457326,8.09707 -5.134776,8.80812 -14.291256,15 -5.28667,3.575 -9.903486,6.62471 -10.259592,6.77712 -0.356107,0.15242 -1.912439,-2.99758 " +
                        "-3.458515,-7 -1.546077,-4.00241 -5.258394,-12.41205 -8.249593,-18.68809 -4.285436,-8.99155 -6.676569,-12.64898 -11.27758,-17.25 C 47.70282,104.62757 " +
                        "44.364254,102 43.495254,102 c -2.798369,0 -1.704872,-1.66044 3.983717,-6.049158 5.593548,-4.31539 13.183139,-7.091307 16.801313,-6.145133 3.559412,0.930807 " +
                        "9.408491,8.154973 13.919775,17.192241 l 4.46286,8.94025 4.54378,-6.83321 C 95.518219,96.605618 108.21371,81.688517 125.80695,63.75 L 143.21531,46 l " +
                        "-53.650021,0 -53.650035,0 0,57.5 0,57.5 59.000005,0 58.999991,0 0,-53.62244 z";
            break;

        case "CrossCircle":
            shape = "M 83.347458,173.13597 C 61.069754,168.04956 42.193415,152.8724 32.202285,132.01368 23.4014,113.63986 23.679644,89.965903 32.91889,71.042373 " +
                        "41.881579,52.685283 60.867647,37.139882 80.847458,31.799452 c 10.235111,-2.735756 31.264662,-2.427393 40.964762,0.600679 26.18668,8.174684 " +
                        "46.06876,28.926852 51.62012,53.879155 2.43666,10.952327 1.56754,28.058524 -1.98036,38.977594 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 " +
                        "-6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033911,0.23456 -15.484931,-0.10267 -19.500002,-1.01939 z M 112.4138,158.45825 c 17.13137,-3.13002 " +
                        "33.71724,-15.96081 41.41353,-32.03742 14.8975,-31.119027 -1.10807,-67.659584 -34.40232,-78.540141 -6.71328,-2.193899 -9.93541,-2.643501 " +
                        "-19.07755,-2.661999 -9.354252,-0.01893 -12.16228,0.37753 -18.768532,2.649866 -17.155451,5.900919 -29.669426,17.531424 -36.438658,33.866137 " +
                        "-2.152301,5.193678 -2.694658,8.35455 -3.070923,17.89744 -0.518057,13.139047 0.741843,19.201887 6.111644,29.410237 4.106815,7.80733 15.431893,19.09359 " +
                        "23.36818,23.28808 12.061362,6.37467 27.138828,8.6356 40.864629,6.1278 z M 69.097458,133.41654 c -2.8875,-2.75881 -5.25,-5.35869 -5.25,-5.77751 " +
                        "0,-0.41882 5.658529,-6.30954 12.57451,-13.0905 l 12.57451,-12.329 L 76.198053,89.392633 63.399628,76.565738 68.335951,71.554056 c 2.714978,-2.756426 " +
                        "5.304859,-5.011683 5.75529,-5.011683 0.450432,0 6.574351,5.611554 13.608709,12.470121 l 12.78974,12.470119 4.42889,-4.553471 c 2.43588,-2.50441 " +
                        "8.39186,-8.187924 13.23551,-12.630032 l 8.80663,-8.076559 5.34744,5.281006 5.34743,5.281007 -12.96155,12.557899 -12.96154,12.557897 13.13318,13.16027 " +
                        "13.13319,13.16027 -5.18386,4.66074 c -2.85112,2.5634 -5.70472,4.66073 -6.34134,4.66073 -0.63661,0 -6.5434,-5.4 -13.12621,-12 -6.58281,-6.6 -12.3871,-12 " +
                        "-12.89844,-12 -0.511329,0 -6.593363,5.60029 -13.515627,12.44509 l -12.585935,12.44508 -5.25,-5.016 z";
            break;

        case "DotCircle":
            shape = "M 81.652542,170.5936 C 59.374838,165.50719 40.498499,150.33003 30.507369,129.47131 21.706484,111.09749 21.984728,87.42353 31.223974,68.5 " +
                        "40.186663,50.14291 59.172731,34.597509 79.152542,29.257079 89.387653,26.521323 110.4172,26.829686 120.1173,29.857758 c 26.18668,8.174684 " +
                        "46.06876,28.926852 51.62012,53.879152 2.43666,10.95233 1.56754,28.05853 -1.98036,38.9776 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 " +
                        "-6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033907,0.23456 -15.484927,-0.10267 -19.499998,-1.01939 z m 29.999998,-15.098 c 20.68862,-4.34363 " +
                        "38.01874,-20.45437 44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.0187 0,-30 C 150.08927,65.371023 134.63549,50.297336 114.65254,44.412396 " +
                        "106.5531,42.027127 90.741304,42.026386 82.695253,44.4109 62.460276,50.407701 46.686742,66.039241 41.6053,85.13096 c -1.948821,7.32201 -1.86506,23.11641 " +
                        "0.158766,29.93754 8.730326,29.42481 38.97193,46.91812 69.888474,40.4271 z M 90.004747,122.6703 C 76.550209,117.63801 69.825047,101.82445 " +
                        "75.898143,89.5 c 2.136718,-4.33615 7.147144,-9.356192 11.754399,-11.776953 5.578622,-2.931141 16.413098,-2.927504 22.052908,0.0074 18.03,9.382663 " +
                        "19.07573,32.784373 1.91442,42.841563 -5.57282,3.26589 -15.830952,4.2617 -21.615123,2.09829 z";
            break;

        case "DotRectangle":
            shape = "m 23.847458,101.19491 0,-72.499995 74.5,0 74.499992,0 0,72.499995 0,72.5 -74.499992,0 -74.5,0 0,-72.5 z m 133.999992,-0.008 0,-57.507925 " +
                        "-59.249992,0.25793 -59.25,0.25793 -0.25819,57.249995 -0.258189,57.25 59.508189,0 59.508182,0 0,-57.50793 z m -94.320573,33.85402 c -0.37368,-0.37368 " +
                        "-0.679419,-15.67942 -0.679419,-34.01275 l 0,-33.333335 35.513302,0 35.51329,0 -0.2633,33.749995 -0.2633,33.75 -34.570573,0.26275 c -19.013819,0.14452 " +
                        "-34.876319,-0.043 -35.25,-0.41666 z";
            break;

        case "NoneCircle":
            shape = "M 83.5,170.5936 C 61.222296,165.50719 42.345957,150.33003 32.354827,129.47131 23.553942,111.09749 23.832186,87.423523 33.071432,68.5 " +
                        "42.034121,50.14291 61.020189,34.597509 81,29.257079 c 10.235111,-2.735756 31.26466,-2.427393 40.96476,0.600679 26.18668,8.174684 46.06876,28.926852 " +
                        "51.62012,53.879155 2.43666,10.95232 1.56754,28.058527 -1.98036,38.977597 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 -6.3909,2.08202 " +
                        "-10.18566,2.59644 -21.27805,2.88446 -9.033909,0.23456 -15.484929,-0.10267 -19.5,-1.01939 z m 30,-15.098 c 20.68862,-4.34363 38.01874,-20.45437 " +
                        "44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.018707 0,-29.999997 C 151.93673,65.371023 136.48295,50.297336 116.5,44.412396 108.40056,42.027127 " +
                        "92.588762,42.026386 84.542711,44.410896 64.307734,50.407697 48.5342,66.039237 43.452758,85.130959 c -1.948821,7.322 -1.86506,23.116411 " +
                        "0.158766,29.937541 8.730326,29.42481 38.97193,46.91812 69.888476,40.4271 z";
            break;

        case "NoneRectangle":
            shape = "m 24.152542,102.04237 0,-72.499997 74.5,0 74.500008,0 0,72.499997 0,72.5 -74.500008,0 -74.5,0 0,-72.5 z m 133.758198,0.25 " +
                        "-0.25819,-57.249997 -59.000008,0 -59,0 -0.259695,55.999997 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 " +
                        "13.207991,1.25 59.517885,1.25 l 59.039583,0 -0.25819,-57.25 z";
            break;
    }

    return head + path + shape + "\" /></svg>";
}


StiJsViewer.prototype.FindPosX = function (obj, mainClassName, noScroll) {
    var curleft = noScroll ? 0 : this.GetScrollXOffset(obj, mainClassName);
    if (obj.offsetParent) {
        while (obj.className != mainClassName) {            
            curleft += obj.offsetLeft;
            if (!obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
            
        }
    } else if (obj.x) {
        curleft += obj.x;
    }
    return curleft;
}

StiJsViewer.prototype.FindPosY = function (obj, mainClassName, noScroll) {
    var curtop = noScroll ? 0 : this.GetScrollYOffset(obj, mainClassName);
    if (obj.offsetParent) {
        while (obj.className != mainClassName) {
            curtop += obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    } else if (obj.y) {
        curtop += obj.y;
    }
    return curtop;
}

StiJsViewer.prototype.GetScrollXOffset = function (obj, mainClassName) {
    var scrollleft = 0;
    if (obj.parentElement) {
        while (obj.className != mainClassName) {
            if ("scrollLeft" in obj) { scrollleft -= obj.scrollLeft }
            if (!obj.parentElement) {
                break;
            }
            obj = obj.parentElement;
        }
    }
    
    return scrollleft;
}

StiJsViewer.prototype.GetScrollYOffset = function (obj, mainClassName) {
    var scrolltop = 0;
    if (obj.parentElement) {
        while (obj.className != mainClassName) {
            if ("scrollTop" in obj) { scrolltop -= obj.scrollTop }
            if (!obj.parentElement) {
                break;
            }
            obj = obj.parentElement;
        }
    }
    
    return scrolltop;
}

StiJsViewer.prototype.scrollToAnchor = function (anchor) {
    for (var i = 0; i < document.anchors.length; i++) {
        if (document.anchors[i].name == anchor) {
            var anchorElement = document.anchors[i];
            var anchorParent = anchorElement.parentElement || anchorElement;
            var targetTop = this.FindPosY(anchorElement, this.options.appearance.scrollbarsMode ? "stiJsViewerReportPanel" : null, true) - anchorParent.offsetHeight * 2;

            var d = new Date();
            var endTime = d.getTime() + this.options.scrollDuration;
            var this_ = this;
            this.ShowAnimationForScroll(this.controls.reportPanel, targetTop, endTime,
            function () {
                var page = this_.getPageFromAnchorElement(anchorElement);                
                var anchorParentTopPos = this_.FindPosY(anchorParent, "stiJsViewerReportPanel", true);
                var pageTopPos = page ? this_.FindPosY(page, "stiJsViewerReportPanel", true) : anchorParentTopPos;

                var label = document.createElement("div");
                this_.controls.bookmarksLabel = label;
                label.className = "stiJsViewerBookmarksLabel";
                var labelMargin = 20 * (this_.reportParams.zoom / 100);
                var labelWidth = page ? page.offsetWidth - labelMargin - 6 : anchorParent.offsetWidth;
                var labelHeight = anchorParent.offsetHeight - 3;
                label.style.width = labelWidth + "px";
                label.style.height = labelHeight + "px";

                var pageLeftMargin = page.margins ? this_.StrToInt(page.margins[3]) : 0;
                label.style.marginLeft = (labelMargin / 2 - pageLeftMargin) + "px";
                var pageTopMargin = page.margins ? this_.StrToInt(page.margins[0]) : 0;
                label.style.marginTop = (anchorParentTopPos - pageTopPos - pageTopMargin - (this_.reportParams.zoom / 100)) + "px";

                page.insertBefore(label, page.childNodes[0]);
            });
            break;
        }
    }
}

StiJsViewer.prototype.isWholeWord = function (str, word) {
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var index = str.indexOf(word);
    var preSymbol = str.substring(index - 1, index);
    var nextSymbol = str.substring(index + word.length, index + word.length + 1);

    return ((preSymbol == "" || symbols.indexOf(preSymbol) == -1) && (nextSymbol == "" || symbols.indexOf(nextSymbol) == -1));
}

StiJsViewer.prototype.goToFindedElement = function (findLabel) {
    if (findLabel && findLabel.ownerElement) {
        var targetTop = this.FindPosY(findLabel.ownerElement, this.options.appearance.scrollbarsMode ? "stiJsViewerReportPanel" : null, true) - findLabel.ownerElement.offsetHeight - 50;
        var d = new Date();
        var endTime = d.getTime() + this.options.scrollDuration;
        var this_ = this;
        this.ShowAnimationForScroll(this.controls.reportPanel, targetTop, endTime, function () { });
    }
}

StiJsViewer.prototype.hideFindLabels = function () {
    for (var i = 0; i < this.controls.findHelper.findLabels.length; i++) {
        this.controls.findHelper.findLabels[i].parentElement.removeChild(this.controls.findHelper.findLabels[i]);
    }
    this.controls.findHelper.findLabels = [];
    this.options.findMode = false;
}

StiJsViewer.prototype.showFindLabels = function (text) {
    this.hideFindLabels();
    this.options.findMode = true;
    this.options.changeFind = false;
    this.controls.findHelper.lastFindText = text;
    var matchCase = this.controls.findPanel && this.controls.findPanel.controls.matchCase.isSelected;
    var matchWholeWord = this.controls.findPanel && this.controls.findPanel.controls.matchWholeWord.isSelected;
    var pages = this.controls.reportPanel.pages;

    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var pageElements = page.getElementsByTagName('*');
        for (k = 0; k < pageElements.length; k++) {
            var innerText = pageElements[k].innerHTML;
            if (innerText && pageElements[k].childNodes.length == 1 && pageElements[k].childNodes[0].nodeName == "#text") {
                if (!matchCase) {
                    innerText = innerText.toLowerCase();
                    text = text.toLowerCase();
                }
                if (innerText.indexOf(text) >= 0) {
                    if (matchWholeWord && !this.isWholeWord(innerText, text)) {
                        continue;
                    }
                    var label = document.createElement("div");
                    label.ownerElement = pageElements[k];
                    label.className = "stiJsViewerFindLabel";
                    label.style.width = (pageElements[k].offsetWidth - 4) + "px";
                    var labelHeight = pageElements[k].offsetHeight - 4;
                    label.style.height = labelHeight + "px";
                    label.style.marginTop = (-4 * (this.reportParams.zoom / 100)) + "px";
                    pageElements[k].insertBefore(label, pageElements[k].childNodes[0]);

                    label.setSelected = function (state) {
                        this.isSelected = state;
                        this.style.border = "2px solid " + (state ? "red" : "#8a8a8a");
                    }

                    if (this.controls.findHelper.findLabels.length == 0) label.setSelected(true);
                    this.controls.findHelper.findLabels.push(label);
                }
            }
        }
    }

    if (this.controls.findHelper.findLabels.length > 0) this.goToFindedElement(this.controls.findHelper.findLabels[0]);
}

StiJsViewer.prototype.selectFindLabel = function (direction) {
    var labels = this.controls.findHelper.findLabels;
    if (labels.length == 0) return;
    var selectedIndex = 0;
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].isSelected) {
            labels[i].setSelected(false);
            selectedIndex = i;
            break;
        }
    }
    if (direction == "Next") {
        selectedIndex++;
        if (selectedIndex > labels.length - 1) selectedIndex = 0;
    }
    else {
        selectedIndex--;
        if (selectedIndex < 0) selectedIndex = labels.length - 1;
    }
    labels[selectedIndex].setSelected(true);
    this.goToFindedElement(labels[selectedIndex]);
}

StiJsViewer.prototype.scrollToPage = function (pageNumber) {
    var commonPagesHeight = 0;
    for (i = 0; i < pageNumber; i++) {
        commonPagesHeight += this.controls.reportPanel.pages[i].offsetHeight + 20;
    }
    if (!this.options.appearance.scrollbarsMode) commonPagesHeight += this.FindPosY(this.controls.reportPanel, null, true);

    var d = new Date();
    var endTime = d.getTime() + this.options.scrollDuration;
    this.ShowAnimationForScroll(this.controls.reportPanel, commonPagesHeight, endTime);
}

StiJsViewer.prototype.removeBookmarksLabel = function () {
    if (this.controls.bookmarksLabel) {
        this.controls.bookmarksLabel.parentElement.removeChild(this.controls.bookmarksLabel);
        this.controls.bookmarksLabel = null;
    }
}

StiJsViewer.prototype.getPageFromAnchorElement = function (anchorElement) {
    var obj = anchorElement;
    while (obj.parentElement) {
        if (obj.className && obj.className.indexOf("stiJsViewerPage") == 0) {
            return obj;
        }
        obj = obj.parentElement;
    }
    return obj;
}

StiJsViewer.prototype.isContainted = function (array, item) {
    for (var index in array)
        if (item == array[index]) return true;

    return false;
}

StiJsViewer.prototype.IsTouchDevice = function () {
    return ('ontouchstart' in document.documentElement);
}

StiJsViewer.prototype.SetZoom = function (zoomIn) {
    zoomValues = ["25", "50", "75", "100", "150", "200"];

    for (var i = 0; i < zoomValues.length; i++)
        if (zoomValues[i] == this.reportParams.zoom) break;

    if (zoomIn && i < zoomValues.length - 1) this.postAction("Zoom" + zoomValues[i + 1]);
    if (!zoomIn && i > 0) this.postAction("Zoom" + zoomValues[i - 1]);
}

StiJsViewer.prototype.getCssParameter = function (css) {
    if (css.indexOf(".gif]") > 0 || css.indexOf(".png]") > 0) return css.substr(css.indexOf("["), css.indexOf("]") - css.indexOf("[") + 1);
    return null;
}

StiJsViewer.prototype.newGuid = (function () {
    var CHARS = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    return function (len, radix) {
        var chars = CHARS, uuid = [], rnd = Math.random;
        radix = radix || chars.length;

        if (len) {
            for (var i = 0; i < len; i++) uuid[i] = chars[0 | rnd() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            for (var i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | rnd() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
                }
            }
        }

        return uuid.join('');
    };
})();

StiJsViewer.prototype.generateKey = function () {
    return this.newGuid().replace(/-/g, '');
}

StiJsViewer.prototype.Item = function (name, caption, imageName, key) {
    var item = {
        "name": name,
        "caption": caption,
        "imageName": imageName,
        "key": key
    }

    return item;
}

StiJsViewer.prototype.StrToInt = function (value) {   
    var result = parseInt(value);
    if (result) return result;
    return 0;
}

StiJsViewer.prototype.formatDate = function (formatDate, formatString) {
    var yyyy = formatDate.getFullYear();
    var yy = yyyy.toString().substring(2);
    var m = formatDate.getMonth() + 1;
    var mm = m < 10 ? "0" + m : m;
    var d = formatDate.getDate();
    var dd = d < 10 ? "0" + d : d;

    var h = formatDate.getHours();
    var hh = h < 10 ? "0" + h : h;
    var n = formatDate.getMinutes();
    var nn = n < 10 ? "0" + n : n;
    var s = formatDate.getSeconds();
    var ss = s < 10 ? "0" + s : s;

    formatString = formatString.replace(/yyyy/i, yyyy);
    formatString = formatString.replace(/yy/i, yy);
    formatString = formatString.replace(/mm/i, mm);
    formatString = formatString.replace(/m/i, m);
    formatString = formatString.replace(/dd/i, dd);
    formatString = formatString.replace(/d/i, d);
    formatString = formatString.replace(/hh/i, hh);
    formatString = formatString.replace(/h/i, h);
    formatString = formatString.replace(/nn/i, nn);
    formatString = formatString.replace(/n/i, n);
    formatString = formatString.replace(/ss/i, ss);
    formatString = formatString.replace(/s/i, s);

    return formatString;
}

StiJsViewer.prototype.stringToTime = function (timeStr) {
    var timeArray = timeStr.split(":");
    var time = { hours: 0, minutes: 0, seconds: 0 };

    time.hours = this.StrToInt(timeArray[0]);
    if (timeArray.length > 1) time.minutes = this.StrToInt(timeArray[1]);
    if (timeArray.length > 2) time.seconds = this.StrToInt(timeArray[2]);

    if (time.hours < 0) time.hours = 0;
    if (time.minutes < 0) time.minutes = 0;
    if (time.seconds < 0) time.seconds = 0;

    if (time.hours > 23) time.hours = 23;
    if (time.minutes > 59) time.minutes = 59;
    if (time.seconds > 59) time.seconds = 59;

    return time;
}

StiJsViewer.prototype.dateTimeObjectToString = function (dateTimeObject, typeDateTimeObject) {    
    var date = new Date(dateTimeObject.year, dateTimeObject.month - 1, dateTimeObject.day, dateTimeObject.hours, dateTimeObject.minutes, dateTimeObject.seconds);

    if (this.options.appearance.parametersPanelDateFormat != "") return this.formatDate(date, this.options.appearance.parametersPanelDateFormat);

    return this.DateToLocaleString(date, typeDateTimeObject);
}

StiJsViewer.prototype.getStringKey = function (key, parameter) {
    var stringKey = (parameter.params.type == "DateTime")
        ? this.dateTimeObjectToString(key, parameter.params.dateTimeType)
        : key;

    return stringKey;
}

StiJsViewer.prototype.getCountObjects = function (objectArray) {
    var count = 0;
    if (objectArray)
        for (var singleObject in objectArray) { count++ };
    return count;
}

StiJsViewer.prototype.getNowDateTimeObject = function (date) {
    if (!date) date = new Date();
    dateTimeObject = {};
    dateTimeObject.year = date.getFullYear();
    dateTimeObject.month = date.getMonth() + 1;
    dateTimeObject.day = date.getDate();
    dateTimeObject.hours = date.getHours();
    dateTimeObject.minutes = date.getMinutes();
    dateTimeObject.seconds = date.getSeconds();

    return dateTimeObject;
}

StiJsViewer.prototype.getNowTimeSpanObject = function () {
    date = new Date();
    timeSpanObject = {};
    timeSpanObject.hours = date.getHours();
    timeSpanObject.minutes = date.getMinutes();
    timeSpanObject.seconds = date.getSeconds();

    return timeSpanObject;
}

StiJsViewer.prototype.copyObject = function (o) {
    if (!o || "object" !== typeof o) {
        return o;
    }
    var c = "function" === typeof o.pop ? [] : {};
    var p, v;
    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            if (v && "object" === typeof v) {
                c[p] = this.copyObject(v);
            }
            else c[p] = v;
        }
    }
    return c;
}

StiJsViewer.prototype.getNavigatorName = function () {
    var useragent = navigator.userAgent;
    var navigatorname = "Unknown";
    if (useragent.indexOf('MSIE') != -1) {
        navigatorname = "MSIE";
    }
    else if (useragent.indexOf('Gecko') != -1) {
        if (useragent.indexOf('Chrome') != -1)
            navigatorname = "Google Chrome";
        else navigatorname = "Mozilla";
    }
    else if (useragent.indexOf('Mozilla') != -1) {
        navigatorname = "old Netscape or Mozilla";
    }
    else if (useragent.indexOf('Opera') != -1) {
        navigatorname = "Opera";
    }

    return navigatorname;
}

StiJsViewer.prototype.showHelpWindow = function (url) {
    var helpLanguage;
    switch (this.options.cultureName) {
        case "ru": helpLanguage = "ru";
        //case "de": helpLanguage = "de";
        default: helpLanguage = "en";
    }
    this.openNewWindow("http://www.stimulsoft.com/" + helpLanguage + "/documentation/online/" + url);
}

StiJsViewer.prototype.setObjectToCenter = function (object, defaultTop) {
    var leftPos = (this.controls.viewer.offsetWidth / 2 - object.offsetWidth / 2);
    var topPos = this.options.appearance.fullScreenMode ? (this.controls.viewer.offsetHeight / 2 - object.offsetHeight / 2) : (defaultTop ? defaultTop : 250);
    object.style.left = leftPos > 0 ? leftPos + "px" : 0;
    object.style.top = topPos > 0 ? topPos + "px" : 0;
}

StiJsViewer.prototype.strToInt = function (value) {
    var result = parseInt(value);
    if (result) return result;
    return 0;
}

StiJsViewer.prototype.strToCorrectPositiveInt = function (value) {
    var result = this.strToInt(value);
    if (result >= 0) return result;
    return 0;
}

StiJsViewer.prototype.helpLinks = {
    "Print": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "Save": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "SendEmail": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "Bookmarks": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "Parameters": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "FirstPage": "user-manual/index.html?report_internals_appearance_borders_simple_borders.htm",
    "PrevPage": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "NextPage": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "LastPage": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "FullScreen": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "Zoom": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "ViewMode": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    "Editor": "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm"
}

StiJsViewer.prototype.getHTMLColor = function (color) {
    if (color.indexOf(",") > 0) return "rgb(" + color + ")";
    return color;
}

StiJsViewer.prototype.clearStyles = function (object) {
    object.className = "stiJsViewerClearAllStyles";
}

StiJsViewer.prototype.getDefaultExportSettings = function (exportFormat) {
    var exportSettings = null;
    switch (exportFormat) {
        case "Document": { exportSettings = {}; break; }
        case "Pdf": { exportSettings = this.options.exports.defaultSettings["StiPdfExportSettings"]; break; }
        case "Xps": { exportSettings = this.options.exports.defaultSettings["StiXpsExportSettings"]; break; }
        case "Ppt2007": { exportSettings = this.options.exports.defaultSettings["StiPpt2007ExportSettings"]; break; }
        case "Html":
        case "Html5":
        case "Mht": { exportSettings = this.options.exports.defaultSettings["StiHtmlExportSettings"]; break; }
        case "Text": { exportSettings = this.options.exports.defaultSettings["StiTxtExportSettings"]; break; }
        case "Rtf": { exportSettings = this.options.exports.defaultSettings["StiRtfExportSettings"]; break; }
        case "Word2007": { exportSettings = this.options.exports.defaultSettings["StiWord2007ExportSettings"]; break; }
        case "Odt": { exportSettings = this.options.exports.defaultSettings["StiOdtExportSettings"]; break; }
        case "Excel":
        case "ExcelXml":
        case "Excel2007": { exportSettings = this.options.exports.defaultSettings["StiExcelExportSettings"]; break; }
        case "Ods": { exportSettings = this.options.exports.defaultSettings["StiOdsExportSettings"]; break; }
        case "ImageBmp":
        case "ImageGif":
        case "ImageJpeg":
        case "ImagePcx":
        case "ImagePng":
        case "ImageTiff":
        case "ImageSvg":
        case "ImageSvgz":
        case "ImageEmf": { exportSettings = this.options.exports.defaultSettings["StiImageExportSettings"]; break; }
        case "Xml":
        case "Csv":
        case "Dbf":
        case "Dif":
        case "Sylk": { exportSettings = this.options.exports.defaultSettings["StiDataExportSettings"]; break; }
    }

    return exportSettings;
}

StiJsViewer.prototype.changeFullScreenMode = function (fullScreenMode) {
    this.options.appearance.scrollbarsMode = fullScreenMode || this.options.appearance.userScrollbarsMode;
    this.options.appearance.fullScreenMode = fullScreenMode;
    if (this.options.toolbar.visible && this.options.toolbar.showFullScreenButton) this.controls.toolbar.controls.FullScreen.setSelected(fullScreenMode);

    if (fullScreenMode) {
        this.controls.viewer.style.zIndex = "1000000";
        this.controls.viewer.style.position = "absolute";

        if (this.controls.viewer.style.width) {
            this.controls.viewer.style.userWidth = this.controls.viewer.style.width;
            this.controls.viewer.style.width = null;
        }

        if (this.controls.viewer.style.height) {
            this.controls.viewer.style.userHeight = this.controls.viewer.style.height;
            this.controls.viewer.style.height = null;
        }

        this.controls.reportPanel.style.position = "absolute";
        this.controls.reportPanel.style.top = this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + "px" : 0;

        document.body.prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }
    else {
        this.controls.viewer.style.zIndex = "auto";
        this.controls.viewer.style.position = "";
        if (this.controls.viewer.style.userWidth) this.controls.viewer.style.width = this.controls.viewer.style.userWidth;
        if (this.controls.viewer.style.userHeight) this.controls.viewer.style.height = this.controls.viewer.style.userHeight;

        this.controls.reportPanel.style.position = this.options.viewerHeightType != "Percentage" || this.options.appearance.scrollbarsMode ? "absolute" : "relative";
        this.controls.reportPanel.style.top =
            this.options.toolbar.visible ? (this.options.viewerHeightType != "Percentage" || this.options.appearance.scrollbarsMode ? this.controls.toolbar.offsetHeight + "px" : 0) : 0;

        if (typeof document.body.prevOverflow != "undefined") {
            document.body.style.overflow = document.body.prevOverflow;
            delete document.body.prevOverflow;
        }
    }

    this.controls.reportPanel.style.overflow = this.options.appearance.scrollbarsMode ? "auto" : "hidden";
}

StiJsViewer.prototype.addEvent = function (element, eventName, fn) {
    if (element.addEventListener) element.addEventListener(eventName, fn, false);
    else if (element.attachEvent) element.attachEvent('on' + eventName, fn);
}

StiJsViewer.prototype.lowerFirstChar = function (text) {
    return text.charAt(0).toLowerCase() + text.substr(1);
}

StiJsViewer.prototype.addHoverEventsToMenus = function () {
    if (this.options.toolbar.showMenuMode == "Hover") {
        var buttonsWithMenu = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"];
        for (var i = 0; i < buttonsWithMenu.length; i++) {
            var button = this.controls.toolbar.controls[buttonsWithMenu[i]];
            if (button) {
                var menu = this.controls.menus[this.lowerFirstChar(button.name) + "Menu"];
                if (menu) {
                    menu.buttonName = button.name;

                    menu.onmouseover = function () {
                        clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"]);
                    }

                    menu.onmouseout = function () {
                        var thisMenu = this;
                        this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"] = setTimeout(function () {
                            thisMenu.changeVisibleState(false);
                        }, this.jsObject.options.menuHideDelay);
                    }
                }
            }
        }
    }
}

StiJsViewer.prototype.GetXmlValue = function (xml, key) {
    var string = xml.substr(0, xml.indexOf("</" + key + ">"));
    return string.substr(xml.indexOf("<" + key + ">") + key.length + 2);
}

StiJsViewer.prototype.DateToLocaleString = function (date, dateTimeType) {
    //debugger;
    var timeString = date.toLocaleTimeString();
    var isAmericanFormat = timeString.toLowerCase().indexOf("am") >= 0 || timeString.toLowerCase().indexOf("pm") >= 0;
    var formatDate = isAmericanFormat ? "MM/dd/yyyy" : "dd.MM.yyyy";

    var yyyy = date.getFullYear();
    var yy = yyyy.toString().substring(2);
    var M = date.getMonth() + 1;
    var MM = M < 10 ? "0" + M : M;
    var d = date.getDate();
    var dd = d < 10 ? "0" + d : d;

    formatDate = formatDate.replace(/yyyy/i, yyyy);
    formatDate = formatDate.replace(/yy/i, yy);
    formatDate = formatDate.replace(/MM/i, MM);
    formatDate = formatDate.replace(/M/i, M);
    formatDate = formatDate.replace(/dd/i, dd);
    formatDate = formatDate.replace(/d/i, d);

    if (dateTimeType == "Time") return timeString;
    if (dateTimeType == "Date") return formatDate;
    return formatDate + " " + timeString;
}

StiJsViewer.prototype.UpdateAllHyperLinks = function () {
    if (this.reportParams.viewMode == "WholeReport") return;
    var aHyperlinks = this.controls.reportPanel.getElementsByTagName("a");

    if (this.controls.bookmarksPanel) {
        var aBookmarks = this.controls.bookmarksPanel.getElementsByTagName("a");

        for (var i = 0; i < aHyperlinks.length; i++) {
            if (aHyperlinks[i].getAttribute("href")) {
                aHyperlinks[i].anchorName = aHyperlinks[i].getAttribute("href").replace("#", "");

                aHyperlinks[i].onclick = function () {
                    for (var k = 0; k < aBookmarks.length; k++) {
                        var clickFunc = aBookmarks[k].getAttribute("onclick");
                        if (clickFunc && clickFunc.indexOf("'" + this.anchorName + "'") > 0) {
                            try {
                                eval(clickFunc);
                                return false;
                            }
                            catch (e) { }
                        }
                    }
                }
            }
        }
    }
}

StiJsViewer.prototype.openNewWindow = function (url) {
    var win = window.open(url);
    return win;
}

StiJsViewer.prototype.GetImageTypesItems = function () {
    var items = [];
    if (this.options.exports.showExportToImageBmp) items.push(this.Item("Bmp", "Bmp", null, "Bmp"));
    if (this.options.exports.showExportToImageGif) items.push(this.Item("Gif", "Gif", null, "Gif"));
    if (this.options.exports.showExportToImageJpeg) items.push(this.Item("Jpeg", "Jpeg", null, "Jpeg"));
    if (this.options.exports.showExportToImagePcx) items.push(this.Item("Pcx", "Pcx", null, "Pcx"));
    if (this.options.exports.showExportToImagePng) items.push(this.Item("Png", "Png", null, "Png"));
    if (this.options.exports.showExportToImageTiff) items.push(this.Item("Tiff", "Tiff", null, "Tiff"));
    if (this.options.exports.showExportToImageMetafile) items.push(this.Item("Emf", "Emf", null, "Emf"));
    if (this.options.exports.showExportToImageSvg) items.push(this.Item("Svg", "Svg", null, "Svg"));
    if (this.options.exports.showExportToImageSvgz) items.push(this.Item("Svgz", "Svgz", null, "Svgz"));
    
    return items;
}

StiJsViewer.prototype.GetDataTypesItems = function () {
    var items = [];
    if (this.options.exports.showExportToCsv) items.push(this.Item("Csv", "Csv", null, "Csv"));
    if (this.options.exports.showExportToDbf) items.push(this.Item("Dbf", "Dbf", null, "Dbf"));
    if (this.options.exports.showExportToXml) items.push(this.Item("Xml", "Xml", null, "Xml"));
    if (this.options.exports.showExportToDif) items.push(this.Item("Dif", "Dif", null, "Dif"));
    if (this.options.exports.showExportToSylk) items.push(this.Item("Sylk", "Sylk", null, "Sylk"));

    return items;
}

StiJsViewer.prototype.GetExcelTypesItems = function () {
    var items = [];
    if (this.options.exports.showExportToExcel2007) items.push(this.Item("Excel2007", "Excel", null, "Excel2007"));
    if (this.options.exports.showExportToExcel) items.push(this.Item("ExcelBinary", "Excel 97-2003", null, "ExcelBinary"));    
    if (this.options.exports.showExportToExcelXml) items.push(this.Item("ExcelXml", "Excel Xml 2003", null, "ExcelXml"));

    return items;
}

StiJsViewer.prototype.GetHtmlTypesItems = function () {
    var items = [];
    if (this.options.exports.showExportToHtml) items.push(this.Item("Html", "Html", null, "Html"));
    if (this.options.exports.showExportToHtml5) items.push(this.Item("Html5", "Html5", null, "Html5"));
    if (this.options.exports.showExportToMht) items.push(this.Item("Mht", "Mht", null, "Mht"));

    return items;
}

StiJsViewer.prototype.GetZoomItems = function () {
    var items = [];
    var values = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];    
    for (var i = 0; i < values.length; i++)
        items.push(this.Item("item" + i, (values[i] * 100) + "%", null, values[i].toString()));

    return items;
}

StiJsViewer.prototype.GetImageFormatForHtmlItems = function () {
    var items = [];
    items.push(this.Item("item0", "Jpeg", null, "Jpeg"));
    items.push(this.Item("item1", "Gif", null, "Gif"));
    items.push(this.Item("item2", "Bmp", null, "Bmp"));
    items.push(this.Item("item3", "Png", null, "Png"));

    return items;
}

StiJsViewer.prototype.GetExportModeItems = function () {
    var items = [];
    items.push(this.Item("item0", "Table", null, "Table"));
    items.push(this.Item("item1", "Span", null, "Span"));
    items.push(this.Item("item2", "Div", null, "Div"));

    return items;
}

StiJsViewer.prototype.GetImageResolutionItems = function () {
    var items = [];
    var values = ["10", "25", "50", "75", "100", "200", "300", "400", "500"];
    for (var i = 0; i < values.length; i++)
        items.push(this.Item("item" + i, values[i], null, values[i]));

    return items;
}

StiJsViewer.prototype.GetImageCompressionMethodItems = function () {
    var items = [];
    items.push(this.Item("item0", "Jpeg", null, "Jpeg"));
    items.push(this.Item("item1", "Flate", null, "Flate"));

    return items;
}

StiJsViewer.prototype.GetImageQualityItems = function () {
    var items = [];
    var values = [0.25, 0.5, 0.75, 0.85, 0.9, 0.95, 1];
    for (var i = 0; i < values.length; i++)
        items.push(this.Item("item" + i, (values[i] * 100) + "%", null, values[i].toString()));

    return items;
}

StiJsViewer.prototype.GetBorderTypeItems = function () {
    var items = [];
    items.push(this.Item("item0", this.collections.loc["BorderTypeSimple"], null, "Simple"));
    items.push(this.Item("item1", this.collections.loc["BorderTypeSingle"], null, "UnicodeSingle"));
    items.push(this.Item("item2", this.collections.loc["BorderTypeDouble"], null, "UnicodeDouble"));

    return items;
}

StiJsViewer.prototype.GetEncodingDataItems = function () {
    var items = [];
    for (var i = 0; i < this.collections.encodingData.length; i++) {
        var item = this.collections.encodingData[i];
        items.push(this.Item("item" + i, item.value, null, item.key));
    }

    return items;
}

StiJsViewer.prototype.GetImageFormatItems = function (withoutMonochrome) {
    var items = [];
    items.push(this.Item("item0", this.collections.loc["ImageFormatColor"], null, "Color"));
    items.push(this.Item("item1", this.collections.loc["ImageFormatGrayscale"], null, "Grayscale"));
    if (!withoutMonochrome) items.push(this.Item("item2", this.collections.loc["ImageFormatMonochrome"], null, "Monochrome"));

    return items;
}

StiJsViewer.prototype.GetMonochromeDitheringTypeItems = function () {
    var items = [];
    items.push(this.Item("item0", "None", null, "None"));
    items.push(this.Item("item1", "FloydSteinberg", null, "FloydSteinberg"));
    items.push(this.Item("item2", "Ordered", null, "Ordered"));

    return items;
}

StiJsViewer.prototype.GetTiffCompressionSchemeItems = function () {
    var items = [];
    items.push(this.Item("item0", "Default", null, "Default"));
    items.push(this.Item("item1", "CCITT3", null, "CCITT3"));
    items.push(this.Item("item2", "CCITT4", null, "CCITT4"));
    items.push(this.Item("item3", "LZW", null, "LZW"));
    items.push(this.Item("item4", "None", null, "None"));
    items.push(this.Item("item5", "Rle", null, "Rle"));

    return items;
}

StiJsViewer.prototype.GetEncodingDifFileItems = function () {
    var items = [];
    items.push(this.Item("item0", "437", null, "437"));
    items.push(this.Item("item1", "850", null, "850"));
    items.push(this.Item("item2", "852", null, "852"));
    items.push(this.Item("item3", "857", null, "857"));
    items.push(this.Item("item4", "860", null, "860"));
    items.push(this.Item("item5", "861", null, "861"));
    items.push(this.Item("item6", "862", null, "862"));
    items.push(this.Item("item7", "863", null, "863"));
    items.push(this.Item("item8", "865", null, "865"));
    items.push(this.Item("item9", "866", null, "866"));
    items.push(this.Item("item10", "869", null, "869"));

    return items;
}

StiJsViewer.prototype.GetExportModeRtfItems = function () {
    var items = [];
    items.push(this.Item("item0", this.collections.loc["ExportModeRtfTable"], null, "Table"));
    items.push(this.Item("item1", this.collections.loc["ExportModeRtfFrame"], null, "Frame"));

    return items;
}

StiJsViewer.prototype.GetEncodingDbfFileItems = function () {
    var items = [];
    items.push(this.Item("item0", "Default", null, "Default"));
    items.push(this.Item("item1", "437 U.S. MS-DOS", null, "USDOS"));
    items.push(this.Item("item2", "620 Mazovia(Polish) MS-DOS", null, "MazoviaDOS"));
    items.push(this.Item("item3", "737 Greek MS-DOS(437G)", null, "GreekDOS"));
    items.push(this.Item("item4", "850 International MS-DOS", null, "InternationalDOS"));
    items.push(this.Item("item5", "852 Eastern European MS-DOS", null, "EasternEuropeanDOS"));
    items.push(this.Item("item6", "857 Turkish MS-DOS", null, "TurkishDOS"));
    items.push(this.Item("item7", "861 Icelandic MS-DOS", null, "IcelandicDOS"));
    items.push(this.Item("item8", "865 Nordic MS-DOS", null, "NordicDOS"));
    items.push(this.Item("item9", "866 Russian MS-DOS", null, "RussianDOS"));
    items.push(this.Item("item10", "895 Kamenicky(Czech) MS-DOS", null, "KamenickyDOS"));
    items.push(this.Item("item11", "1250 Eastern European Windows", null, "EasternEuropeanWindows"));
    items.push(this.Item("item12", "1251 Russian Windows", null, "RussianWindows"));
    items.push(this.Item("item13", "1252 WindowsANSI", null, "WindowsANSI"));
    items.push(this.Item("item14", "1253 GreekWindows", null, "GreekWindows"));
    items.push(this.Item("item15", "1254 TurkishWindows", null, "TurkishWindows"));
    items.push(this.Item("item16", "10000 StandardMacintosh", null, "StandardMacintosh"));
    items.push(this.Item("item17", "10006 GreekMacintosh", null, "GreekMacintosh"));
    items.push(this.Item("item18", "10007 RussianMacintosh", null, "RussianMacintosh"));
    items.push(this.Item("item19", "10029 EasternEuropeanMacintosh", null, "EasternEuropeanMacintosh"));
    
    return items;
}

StiJsViewer.prototype.GetAllowEditableItems = function () {
    var items = [];
    items.push(this.Item("item0", this.collections.loc["NameYes"], null, "Yes"));
    items.push(this.Item("item1", this.collections.loc["NameNo"], null, "No"));

    return items;
}

StiJsViewer.prototype.GetEncryptionKeyLengthItems = function () {
    var items = [];
    items.push(this.Item("item0", "40 bit", null, "Bit40"));
    items.push(this.Item("item1", "128 bit", null, "Bit128"));

    return items;
}

StiJsViewer.prototype.GetDataExportModeItems = function () {
    var items = [];
    items.push(this.Item("item0", this.collections.loc["BandsFilterAllBands"], null, "AllBands"));
    items.push(this.Item("item1", this.collections.loc["BandsFilterDataOnly"], null, "Data"));
    items.push(this.Item("item2", this.collections.loc["BandsFilterDataAndHeadersFooters"], null, "DataAndHeadersFooters"));

    return items;
}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

StiJsViewer.prototype.InitializeAboutPanel = function () {
    var aboutPanel = document.createElement("div");
    this.controls.aboutPanel = aboutPanel;
    this.controls.mainPanel.appendChild(aboutPanel);
    aboutPanel.jsObject = this;
    aboutPanel.className = "stiJsViewerAboutPanel";
    aboutPanel.style.background = "white url(" + this.collections.images["AboutInfo.png"] + ")";
    aboutPanel.style.display = "none";

    var version = document.createElement("div");
    version.innerHTML = this.collections.loc["Version"] + ": " + this.options.productVersion;
    aboutPanel.appendChild(version);
    version.style.fontFamily = "Arial";
    version.style.fontSize = "10pt";
    version.style.color = "#000000";
    version.style.padding = "60px 20px 5px 25px";

    var copyRight = document.createElement("div");
    copyRight.innerHTML = "Copyright 2003-" + new Date().getFullYear() + " by Stimulsoft, All rights reserved.";
    aboutPanel.appendChild(copyRight);
    copyRight.style.fontFamily = "Arial";
    copyRight.style.fontSize = "10pt";
    copyRight.style.color = "#000000";
    copyRight.style.padding = "118px 20px 0px 25px";

    aboutPanel.ontouchstart = function () { this.changeVisibleState(false); }
    aboutPanel.onmousedown = function () { this.changeVisibleState(false); }

    aboutPanel.changeVisibleState = function (state) {
        this.style.display = state ? "" : "none";
        this.jsObject.setObjectToCenter(this);
        this.jsObject.controls.disabledPanels[2].changeVisibleState(state);
    }
}

StiJsViewer.prototype.InitializeBookmarksPanel = function () {
    var createAndShow = true;
    if (this.controls.bookmarksPanel) {
        if (!this.controls.bookmarksPanel.visible) createAndShow = false;
        this.controls.bookmarksPanel.changeVisibleState(false);
        this.controls.mainPanel.removeChild(this.controls.bookmarksPanel);
        delete this.controls.bookmarksPanel;
    }
    if (this.options.toolbar.visible && this.options.toolbar.showBookmarksButton) {
        this.controls.toolbar.controls.Bookmarks.setEnabled(this.reportParams.bookmarksContent != null);
    }
    if (!this.reportParams.bookmarksContent) return;

    var bookmarksPanel = document.createElement("div");
    this.controls.mainPanel.appendChild(bookmarksPanel);
    this.controls.bookmarksPanel = bookmarksPanel;
    bookmarksPanel.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") bookmarksPanel.style.color = this.options.toolbar.fontColor;
    bookmarksPanel.jsObject = this;
    bookmarksPanel.id = this.controls.viewer.id + "_BookmarksPanel";
    bookmarksPanel.className = "stiJsViewerBookmarksPanel";
    bookmarksPanel.style.display = "none";
    bookmarksPanel.visible = false;
    bookmarksPanel.style.width = (this.options.appearance.bookmarksTreeWidth - 1) + "px";
    bookmarksPanel.style.top = ((this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + 2 : 2) +
        (this.controls.parametersPanel ? this.controls.parametersPanel.offsetHeight - 2 : 0) +
        (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0) + this.controls.drillDownPanel.offsetHeight) + "px";
    bookmarksPanel.style.bottom = "2px";
    bookmarksPanel.container = document.createElement("div");
    bookmarksPanel.container.className = "stiJsViewerBookmarksContainer";
    if (this.options.toolbar.backgroundColor != "") bookmarksPanel.container.style.background = this.options.toolbar.backgroundColor;
    if (this.options.toolbar.borderColor != "") bookmarksPanel.container.style.border = "1px solid " + this.options.toolbar.borderColor;
    bookmarksPanel.appendChild(bookmarksPanel.container);

    bookmarksPanel.changeVisibleState = function (state) {
        var options = this.jsObject.options;
        this.style.display = state ? "" : "none";
        this.visible = state;
        if (options.toolbar.visible && options.toolbar.showBookmarksButton) this.jsObject.controls.toolbar.controls.Bookmarks.setSelected(state);
        this.jsObject.controls.reportPanel.style.marginLeft = state ? (this.jsObject.options.appearance.bookmarksTreeWidth + 2) + "px" : 0;
    }

    bookmarksPanel.addContent = function (content) {
        this.container.innerHTML = content;
    }

    var imagesForBookmarks = this.GetImagesForBookmarks();
    var bookmarksContent = this.reportParams.bookmarksContent.replace("imagesForBookmarks", imagesForBookmarks);
    eval(bookmarksContent);
    bookmarksPanel.addContent(bookmarks);
    if (createAndShow) bookmarksPanel.changeVisibleState(true);
}

StiJsViewer.prototype.GetImagesForBookmarks = function () {
    var names = ["root", "folder", "folderOpen", "node", "empty", "line", "join", "joinBottom", "plus", "plusBottom", "minus", "minusBottom"]
    var imagesForBookmarks = {};
    for (var i = 0; i < names.length; i++) {
        imagesForBookmarks[names[i]] = this.collections.images["Bookmarks" + names[i] + ".png"];
    }
    return JSON.stringify(imagesForBookmarks);
}

// Node object
function stiTreeNode(id, pid, name, url, title) {
    this.id = id;
    this.pid = pid;
    this.name = name;
    this.url = url ? url.replace(/'/g, "\\\'") : url;
    this.title = title;
    this.page == null;
    if (title) this.page = parseInt(title.substr(5)) - 1;
    this.target = null;
    this.icon = null;
    this.iconOpen = null;
    this._io = false; // Open
    this._is = false;
    this._ls = false;
    this._hc = false;
    this._ai = 0;
    this._p;
}

// Tree object
function stiTree(objName, mobileViewerId, currentPageNumber, imagesForBookmarks) {

    this.config = {
        target: null,
        folderLinks: true,
        useSelection: true,
        useCookies: false,
        useLines: true,
        useIcons: true,
        useStatusText: false,
        closeSameLevel: false,
        inOrder: false
    }
    this.icon = {
        nlPlus: 'img/nolines_plus.gif',
        nlMinus: 'img/nolines_minus.gif'
    };

    for (var imageName in imagesForBookmarks) {
        this.icon[imageName] = imagesForBookmarks[imageName];
    }

    this.obj = objName;
    this.mobileViewerId = mobileViewerId;
    this.currentPageNumber = currentPageNumber;
    this.aNodes = [];
    this.aIndent = [];
    this.root = new stiTreeNode(-1);
    this.selectedNode = null;
    this.selectedFound = false;
    this.completed = false;
}

// Adds a new node to the node array
stiTree.prototype.add = function (id, pid, name, url, title, page) {
    this.aNodes[this.aNodes.length] = new stiTreeNode(id, pid, name, url, title, page);
}

// Open/close all nodes
stiTree.prototype.openAll = function () {
    this.oAll(true);
}

stiTree.prototype.closeAll = function () {
    this.oAll(false);
}

// Outputs the tree to the page
stiTree.prototype.toString = function () {
    var str = '<div class="stiTree">\n';
    if (document.getElementById) {
        if (this.config.useCookies) this.selectedNode = this.getSelected();
        str += this.addNode(this.root);
    } else str += 'Browser not supported.';
    str += '</div>';
    if (!this.selectedFound) this.selectedNode = null;
    this.completed = true;
    return str;
}

// Creates the tree structure
stiTree.prototype.addNode = function (pNode) {
    var str = '';
    var n = 0;
    if (this.config.inOrder) n = pNode._ai;
    for (n; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == pNode.id) {
            var cn = this.aNodes[n];
            cn._p = pNode;
            cn._ai = n;
            this.setCS(cn);
            if (!cn.target && this.config.target) cn.target = this.config.target;
            if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
            if (!this.config.folderLinks && cn._hc) cn.url = null;
            if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
                cn._is = true;
                this.selectedNode = n;
                this.selectedFound = true;
            }
            str += this.node(cn, n);
            if (cn._ls) break;
        }
    }
    return str;
}

// Creates the node icon, url and text
stiTree.prototype.node = function (node, nodeId) {
    var str = '<div class="stiTreeNode">' + this.indent(node, nodeId);
    if (this.config.useIcons) {
        if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
        if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
        if (this.root.id == node.pid) {
            node.icon = this.icon.root;
            node.iconOpen = this.icon.root;
        }
        str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
    }
    if (node.url) {
        str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '"';
        if (node.target) str += ' target="' + node.target + '"';
        if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';

        var clc = "";
        if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)) clc += this.obj + ".s(" + nodeId + ");";
        if (node.page != null) clc += "document.getElementById('" + this.mobileViewerId + "').jsObject.postAction('BookmarkAction'," + node.page + ",'" + node.url.substr(1) + "');";
        if (clc.length > 0 && node.page >= 0) str += ' onclick="' + clc + '"';

        str += '>';
    }
    else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
        str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
    str += node.name;
    if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
    str += '</div>';
    if (node._hc) {
        str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
        str += this.addNode(node);
        str += '</div>';
    }
    this.aIndent.pop();
    return str;
}

// Adds the empty and line icons
stiTree.prototype.indent = function (node, nodeId) {
    var str = '';
    if (this.root.id != node.pid) {
        for (var n = 0; n < this.aIndent.length; n++)
            str += '<img src="' + ((this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty) + '" alt="" />';
        (node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
        if (node._hc) {
            str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
            if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
            else str += ((node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus));
            str += '" alt="" /></a>';
        } else str += '<img src="' + ((this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join) : this.icon.empty) + '" alt="" />';
    }
    return str;
}

// Checks if a node has any children and if it is the last sibling
stiTree.prototype.setCS = function (node) {
    var lastId;
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id) node._hc = true;
        if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
    }
    if (lastId == node.id) node._ls = true;
}

// Returns the selected node
stiTree.prototype.getSelected = function () {
    var sn = this.getCookie('cs' + this.obj);
    return (sn) ? sn : null;
}

// Highlights the selected node
stiTree.prototype.s = function (id) {
    if (!this.config.useSelection) return;
    var cn = this.aNodes[id];
    if (cn._hc && !this.config.folderLinks) return;
    if (this.selectedNode != id) {
        if (this.selectedNode || this.selectedNode == 0) {
            eOld = document.getElementById("s" + this.obj + this.selectedNode);
            eOld.className = "node";
        }
        eNew = document.getElementById("s" + this.obj + id);
        eNew.className = "nodeSel";
        this.selectedNode = id;
        if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
    }
}

// Toggle Open or close
stiTree.prototype.o = function (id) {
    //debugger;
    var cn = this.aNodes[id];
    this.nodeStatus(!cn._io, id, cn._ls);
    cn._io = !cn._io;
    if (this.config.closeSameLevel) this.closeLevel(cn);
    if (this.config.useCookies) this.updateCookie();
}

// Open or close all nodes
stiTree.prototype.oAll = function (status) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
            this.nodeStatus(status, n, this.aNodes[n]._ls)
            this.aNodes[n]._io = status;
        }
    }
    if (this.config.useCookies) this.updateCookie();
}

// Opens the tree to a specific node
stiTree.prototype.openTo = function (nId, bSelect, bFirst) {
    if (!bFirst) {
        for (var n = 0; n < this.aNodes.length; n++) {
            if (this.aNodes[n].id == nId) {
                nId = n;
                break;
            }
        }
    }
    var cn = this.aNodes[nId];
    if (cn.pid == this.root.id || !cn._p) return;
    cn._io = true;
    cn._is = bSelect;
    if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
    if (this.completed && bSelect) this.s(cn._ai);
    else if (bSelect) this._sn = cn._ai;
    this.openTo(cn._p._ai, false, true);
}

// Closes all nodes on the same level as certain node
stiTree.prototype.closeLevel = function (node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
            this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Closes all children of a node
stiTree.prototype.closeAllChildren = function (node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
            if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Change the status of a node(open or closed)
stiTree.prototype.nodeStatus = function (status, id, bottom) {
    eDiv = document.getElementById('d' + this.obj + id);
    eJoin = document.getElementById('j' + this.obj + id);
    if (this.config.useIcons) {
        eIcon = document.getElementById('i' + this.obj + id);
        eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
    }
    eJoin.src = (this.config.useLines) ?
	((status) ? ((bottom) ? this.icon.minusBottom : this.icon.minus) : ((bottom) ? this.icon.plusBottom : this.icon.plus)) :
	((status) ? this.icon.nlMinus : this.icon.nlPlus);
    eDiv.style.display = (status) ? 'block' : 'none';
}

// [Cookie] Clears a cookie
stiTree.prototype.clearCookie = function () {
    var now = new Date();
    var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    this.setCookie('co' + this.obj, 'cookieValue', yesterday);
    this.setCookie('cs' + this.obj, 'cookieValue', yesterday);
}

// [Cookie] Sets value in a cookie
stiTree.prototype.setCookie = function (cookieName, cookieValue, expires, path, domain, secure) {
    document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

// [Cookie] Gets a value from a cookie
stiTree.prototype.getCookie = function (cookieName) {
    var cookieValue = '';
    var posName = document.cookie.indexOf(escape(cookieName) + '=');
    if (posName != -1) {
        var posValue = posName + (escape(cookieName) + '=').length;
        var endPos = document.cookie.indexOf(';', posValue);
        if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
        else cookieValue = unescape(document.cookie.substring(posValue));
    }
    return (cookieValue);
}

// [Cookie] Returns ids of open nodes as a string
stiTree.prototype.updateCookie = function () {
    var str = '';
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
            if (str) str += '.';
            str += this.aNodes[n].id;
        }
    }
    this.setCookie('co' + this.obj, str);
}

// [Cookie] Checks if a node id is in a cookie
stiTree.prototype.isOpen = function (id) {
    var aOpen = this.getCookie('co' + this.obj).split('.');
    for (var n = 0; n < aOpen.length; n++)
        if (aOpen[n] == id) return true;
    return false;
}

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
    Array.prototype.push = function array_push() {
        for (var i = 0; i < arguments.length; i++)
            this[this.length] = arguments[i];
        return this.length;
    }
}

if (!Array.prototype.pop) {
    Array.prototype.pop = function array_pop() {
        lastElement = this[this.length - 1];
        this.length = Math.max(this.length - 1, 0);
        return lastElement;
    }
}

StiJsViewer.prototype.CheckBox = function (name, captionText, toolTip) {
    var checkBox = this.CreateHTMLTable();
    checkBox.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") checkBox.style.color = this.options.toolbar.fontColor;
    checkBox.jsObject = this;
    checkBox.isEnabled = true;
    checkBox.isChecked = false;
    checkBox.id = this.generateKey();
    checkBox.name = name;
    checkBox.captionText = captionText;
    if (toolTip) checkBox.setAttribute("title", toolTip);
    checkBox.className = "stiJsViewerCheckBox";
    checkBox.style.boxSizing = "content-box";
    if (name) {
        if (!this.controls.checkBoxes) this.controls.checkBoxes = {};
        this.controls.checkBoxes[name] = checkBox;
    }

    //Image
    checkBox.imageBlock = document.createElement("div");
    var size = this.options.isTouchDevice ? "16px" : "13px";
    checkBox.imageBlock.style.width = size;
    checkBox.imageBlock.style.height = size;
    checkBox.imageBlock.style.boxSizing = "content-box";
    checkBox.imageBlock.className = "stiJsViewerCheckBoxImageBlock"
    var imageBlockCell = checkBox.addCell(checkBox.imageBlock);
    if (this.options.isTouchDevice) imageBlockCell.style.padding = "1px 3px 1px 1px";

    checkBox.image = document.createElement("img");
    checkBox.image.src = this.collections.images["CheckBox.png"];
    checkBox.image.style.visibility = "hidden";
    checkBox.image.style.verticalAlign = "baseline";
    var imgTable = this.CreateHTMLTable();
    imgTable.style.width = "100%";
    imgTable.style.height = "100%";
    checkBox.imageBlock.appendChild(imgTable);
    imgTable.addCell(checkBox.image).style.textAlign = "center";

    //Caption
    if (captionText != null) {
        checkBox.captionCell = checkBox.addCell();
        if (!this.options.isTouchDevice) checkBox.captionCell.style.padding = "1px 0 0 4px";
        checkBox.captionCell.style.whiteSpace = "nowrap";
        checkBox.captionCell.innerHTML = captionText;
    }

    checkBox.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    checkBox.onmouseenter = function () {
        if (!this.isEnabled) return;
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlockOver";
    }

    checkBox.onmouseleave = function () {
        if (!this.isEnabled) return;
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlock";
    }

    checkBox.onclick = function () {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick) return;
        this.setChecked(!this.isChecked);
        this.action();
    }

    checkBox.ontouchend = function () {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved) return;
        var this_ = this;
        this.isTouchEndFlag = true;
        clearTimeout(this.isTouchEndTimer);
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlockOver";
        
        setTimeout(function () {
            this_.imageBlock.className = "stiJsViewerCheckBoxImageBlock";
            this_.setChecked(!this_.isChecked);
            this_.action();
        }, 150);

        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    checkBox.ontouchstart = function () {
        this.jsObject.options.fingerIsMoved = false;
    }

    checkBox.setEnabled = function (state) {
        this.image.style.opacity = state ? "1" : "0.5";
        this.isEnabled = state;
        this.className = state ? "stiJsViewerCheckBox" : "stiJsViewerCheckBoxDisabled";
        this.imageBlock.className = state ? "stiJsViewerCheckBoxImageBlock" : "stiJsViewerCheckBoxImageBlockDisabled";
    }

    checkBox.setChecked = function (state) {
        this.image.style.visibility = (state) ? "visible" : "hidden";
        this.isChecked = state;
        this.onChecked();
    }

    checkBox.onChecked = function () { }
    checkBox.action = function () { }

    return checkBox;
}

StiJsViewer.prototype.InitializeDatePicker = function (doubleDatePicker) {
    var datePicker = this.BaseMenu(null, null, "Down", "stiJsViewerDropdownMenu");
    datePicker.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") datePicker.style.color = this.options.toolbar.fontColor;
    datePicker.style.zIndex = "36";
    datePicker.parentDataControl = null;
    datePicker.dayButtons = [];
    datePicker.showTime = false;
    datePicker.doubleDatePicker = doubleDatePicker;
    datePicker.key = new Date();
    if (!doubleDatePicker) {
        this.controls.datePicker = datePicker;
        this.controls.mainPanel.appendChild(datePicker);
    }

    //Add Header Buttons
    var headerButtonsTable = this.CreateHTMLTable();
    datePicker.innerContent.appendChild(headerButtonsTable);

    //Prev Month
    datePicker.prevMonthButton = this.SmallButton(null, null, "ArrowLeft.png");
    datePicker.prevMonthButton.style.margin = "1px 2px 0 1px";
    datePicker.prevMonthButton.datePicker = datePicker;
    datePicker.prevMonthButton.action = function () {
        var month = this.datePicker.key.getMonth();
        var year = this.datePicker.key.getFullYear();
        month--;
        if (month == -1) { month = 11; year--; }
        var countDaysInMonth = this.jsObject.GetCountDaysOfMonth(year, month);
        if (countDaysInMonth < this.datePicker.key.getDate()) this.datePicker.key.setDate(countDaysInMonth);
        this.datePicker.key.setMonth(month); this.datePicker.key.setYear(year);
        this.datePicker.fill();
        this.datePicker.action();
    };
    headerButtonsTable.addCell(datePicker.prevMonthButton);

    //Month DropDownList
    datePicker.monthDropDownList = this.DropDownList(null, this.options.isTouchDevice ? 79 : 81, null, this.GetMonthesForDatePickerItems(), true);
    datePicker.monthDropDownList.style.margin = "1px 2px 0 0";
    datePicker.monthDropDownList.datePicker = datePicker;
    datePicker.monthDropDownList.action = function () {
        var countDaysInMonth = this.jsObject.GetCountDaysOfMonth(this.datePicker.key.getFullYear(), parseInt(this.key));
        if (countDaysInMonth < this.datePicker.key.getDate()) this.datePicker.key.setDate(countDaysInMonth);
        this.datePicker.key.setMonth(parseInt(this.key));
        this.datePicker.repaintDays();
        this.datePicker.action();
    };
    headerButtonsTable.addCell(datePicker.monthDropDownList);

    //Override menu
    datePicker.monthDropDownList.menu.style.zIndex = "37";
    datePicker.monthDropDownList.menu.datePicker = datePicker;
    datePicker.monthDropDownList.menu.onmousedown = function () {
        if (!this.isTouchEndFlag) this.ontouchstart(true);
    }
    datePicker.monthDropDownList.menu.ontouchstart = function (mouseProcess) {
        var this_ = this;
        this.isTouchEndFlag = mouseProcess ? false : true;
        clearTimeout(this.isTouchEndTimer);
        this.jsObject.options.dropDownListMenuPressed = this;
        this.datePicker.ontouchstart();
        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    //Year TextBox
    datePicker.yearTextBox = this.TextBox(null, 40, "Year");
    datePicker.yearTextBox.style.margin = "1px 2px 0 0";
    datePicker.yearTextBox.datePicker = datePicker;
    datePicker.yearTextBox.action = function () {
        var year = this.jsObject.strToCorrectPositiveInt(this.value);
        this.value = year;
        this.datePicker.key.setYear(year);
        this.datePicker.repaintDays();
        this.datePicker.action();
    };
    headerButtonsTable.addCell(datePicker.yearTextBox);

    //Next Month
    datePicker.nextMonthButton = this.SmallButton(null, null, "ArrowRight.png");
    datePicker.nextMonthButton.datePicker = datePicker;
    datePicker.nextMonthButton.style.margin = "1px 1px 0 0";
    datePicker.nextMonthButton.action = function () {
        var month = this.datePicker.key.getMonth();
        var year = this.datePicker.key.getFullYear();
        month++;
        if (month == 12) { month = 0; year++; }
        var countDaysInMonth = this.jsObject.GetCountDaysOfMonth(year, month);
        if (countDaysInMonth < this.datePicker.key.getDate()) this.datePicker.key.setDate(countDaysInMonth);
        this.datePicker.key.setMonth(month); this.datePicker.key.setYear(year);
        this.datePicker.fill();
        this.datePicker.action();
    };
    headerButtonsTable.addCell(datePicker.nextMonthButton);

    //Separator
    var separator = document.createElement("div");
    separator.style.margin = "2px 0 2px 0";
    separator.className = "stiJsViewerDatePickerSeparator";
    datePicker.innerContent.appendChild(separator);

    datePicker.daysTable = this.CreateHTMLTable();
    datePicker.innerContent.appendChild(datePicker.daysTable);

    //Add Day Of Week
    if (this.options.appearance.datePickerFirstDayOfWeek == "Sunday") {
        this.collections.dayOfWeek.splice(6, 1);
        this.collections.dayOfWeek.splice(0, 0, "Sunday");
    }

    for (var i = 0; i < 7; i++) {
        var dayOfWeekCell = datePicker.daysTable.addCell();
        dayOfWeekCell.className = "stiJsViewerDatePickerDayOfWeekCell";
        var dayName = this.collections.loc["Day" + this.collections.dayOfWeek[i]];
        if (dayName) dayOfWeekCell.innerHTML = dayName.toString().substring(0, 1).toUpperCase();
        if (i == (this.options.appearance.datePickerFirstDayOfWeek == "Sunday" ? 6 : 5)) dayOfWeekCell.style.color = "#0000ff";
        if (i == (this.options.appearance.datePickerFirstDayOfWeek == "Sunday" ? 0 : 6)) dayOfWeekCell.style.color = "#ff0000";
    }

    //Add Day Cells    
    datePicker.daysTable.addRow();
    var rowCount = 1;
    for (var i = 0; i < 42; i++) {
        var dayButton = this.DatePickerDayButton();
        dayButton.datePicker = datePicker;
        dayButton.style.margin = "1px";
        datePicker.dayButtons.push(dayButton);
        datePicker.daysTable.addCellInRow(rowCount, dayButton);
        if ((i + 1) % 7 == 0) { datePicker.daysTable.addRow(); rowCount++ }
    }

    //Separator2
    var separator2 = document.createElement("div");
    separator2.style.margin = "2px 0 2px 0";
    separator2.className = "stiJsViewerDatePickerSeparator";
    datePicker.innerContent.appendChild(separator2);

    //Time
    var timeTable = this.CreateHTMLTable();
    timeTable.style.width = "100%";
    datePicker.innerContent.appendChild(timeTable);
    timeTable.addTextCell(this.collections.loc.Time + ":").style.padding = "0 4px 0 4px";
    var timeControl = this.TextBox(null, 90);
    timeControl.style.margin = "1px 2px 2px 2px";
    var timeControlCell = timeTable.addCell(timeControl);
    timeControlCell.style.width = "100%";
    timeControlCell.style.textAlign = "right";
    datePicker.time = timeControl;

    timeControl.action = function () {
        var time = this.jsObject.stringToTime(this.value);
        datePicker.key.setHours(time.hours);
        datePicker.key.setMinutes(time.minutes);
        datePicker.key.setSeconds(time.seconds);
        this.value = this.jsObject.formatDate(datePicker.key, "h:nn:ss");
        datePicker.action();
    };

    datePicker.repaintDays = function () {
        var month = this.key.getMonth();
        var year = this.key.getFullYear();
        var countDaysInMonth = this.jsObject.GetCountDaysOfMonth(year, month);
        var firstDay = this.jsObject.GetDayOfWeek(year, month, 1);
        if (this.jsObject.options.appearance.datePickerFirstDayOfWeek == "Monday") firstDay--;
        else if (firstDay == 7 && this.jsObject.options.appearance.datePickerFirstDayOfWeek == "Sunday") firstDay = 0;

        for (var i = 0; i < 42; i++) {
            var numDay = i - firstDay + 1;
            var isSelectedDay = (numDay == this.key.getDate());
            var dayButton = this.dayButtons[i];

            if (!((i < firstDay) || (i - firstDay > countDaysInMonth - 1))) {
                dayButton.numberOfDay = numDay;
                dayButton.caption.innerHTML = numDay;
                dayButton.setEnabled(true);
                dayButton.setSelected(isSelectedDay);
            }
            else {
                dayButton.caption.innerHTML = "";
                dayButton.setEnabled(false);
            }
        }
    }

    datePicker.fill = function () {
        this.yearTextBox.value = this.key.getFullYear();
        this.monthDropDownList.setKey(this.key.getMonth());
        this.repaintDays();
        if (this.showTime) {
            this.time.value = this.jsObject.formatDate(this.key, "h:nn:ss");
        }
    }

    datePicker.onshow = function () {
        this.key = new Date();
        if (this.ownerValue) {
            this.key = new Date(this.ownerValue.year, this.ownerValue.month - 1, this.ownerValue.day,
            this.ownerValue.hours, this.ownerValue.minutes, this.ownerValue.seconds);
        }
        separator2.style.display = this.showTime ? "" : "none";
        timeTable.style.display = this.showTime ? "" : "none";
        this.fill();
    };

    datePicker.action = function () {
        if (!this.ownerValue) this.ownerValue = this.jsObject.getNowDateTimeObject();
        this.ownerValue.year = this.key.getFullYear();
        this.ownerValue.month = this.key.getMonth() + 1;
        this.ownerValue.day = this.key.getDate();
        this.ownerValue.hours = this.key.getHours();
        this.ownerValue.minutes = this.key.getMinutes();
        this.ownerValue.seconds = this.key.getSeconds();
        if (this.parentDataControl)
            this.parentDataControl.value = this.jsObject.dateTimeObjectToString(datePicker.ownerValue, this.parentDataControl.parameter.params.dateTimeType);
    };

    //Ovveride Methods
    datePicker.onmousedown = function () {
        if (!this.isTouchStartFlag) this.ontouchstart(true);
    }

    datePicker.ontouchstart = function (mouseProcess) {
        var this_ = this;
        this.isTouchStartFlag = mouseProcess ? false : true;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.datePickerPressed = this;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    datePicker.changeVisibleState = function (state) {
        var mainClassName = "stiJsViewerMainPanel";
        if (state) {
            this.onshow();
            this.style.display = "";
            this.visible = true;
            this.style.overflow = "hidden";
            this.parentDataControl.setSelected(true);
            this.parentButton.setSelected(true);
            this.jsObject.options.currentDatePicker = this;
            this.style.width = this.innerContent.offsetWidth + "px";
            this.style.height = this.innerContent.offsetHeight + "px";
            this.style.left = (this.jsObject.FindPosX(this.parentButton, mainClassName)) + "px";
            this.style.top = (this.jsObject.FindPosY(this.parentButton, mainClassName) + this.parentButton.offsetHeight + 1) + "px";
            this.innerContent.style.top = -this.innerContent.offsetHeight + "px";

            var d = new Date();
            var endTime = d.getTime();
            if (this.jsObject.options.toolbar.menuAnimation) endTime += this.jsObject.options.menuAnimDuration;
            this.jsObject.ShowAnimationVerticalMenu(this, 0, endTime);
        }
        else {
            clearTimeout(this.innerContent.animationTimer);
            this.showTime = false;
            this.visible = false;
            this.parentDataControl.setSelected(false);
            this.parentButton.setSelected(false);
            this.style.display = "none";
            if (this.jsObject.options.currentDatePicker == this) this.jsObject.options.currentDatePicker = null;
        }
    }

    return datePicker;
}

StiJsViewer.prototype.DatePickerDayButton = function () {
    var button = this.SmallButton(null, "0", null, null, null, "stiJsViewerDatePickerDayButton");
    var size = this.options.isTouchDevice ? "25px" : "23px";
    button.style.width = size;
    button.style.height = size;
    button.caption.style.textAlign = "center";
    button.innerTable.style.width = "100%";
    button.caption.style.padding = "0px";
    button.numberOfDay = 1;
    button.action = function () {
        this.datePicker.key.setDate(parseInt(this.numberOfDay));
        this.setSelected(true);
        this.datePicker.action();
        if (!this.datePicker.doubleDatePicker) this.datePicker.changeVisibleState(false);
    }

    button.setSelected = function (state) {
        if (state) {
            if (this.datePicker.selectedButton) this.datePicker.selectedButton.setSelected(false);
            this.datePicker.selectedButton = this;
        }
        this.isSelected = state;
        this.className = this.styleName + " " + this.styleName +
            (state ? "Selected" : (this.isEnabled ? (this.isOver ? "Over" : "Default") : "Disabled"));
    }

    return button;
}


//Helper Methods
StiJsViewer.prototype.GetDayOfWeek = function (year, month) {
    var result = new Date(year, month, 1).getDay();
    if (result == 0) result = 7;
    return result;
}

StiJsViewer.prototype.GetCountDaysOfMonth = function (year, month) {
    var countDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var count = countDaysInMonth[month];

    if (month == 1)
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
            count = 29;
        else
            count = 28;
    return count;
}

/* Monthes */
StiJsViewer.prototype.GetMonthesForDatePickerItems = function () {
    var items = [];
    for (var i = 0; i < this.collections.months.length; i++)
        items.push(this.Item("Month" + i, this.collections.loc["Month" + this.collections.months[i]], null, i));

    return items;
}

/* DayOfWeek */
StiJsViewer.prototype.GetDayOfWeekItems = function () {
    var items = [];
    for (var i = 0; i < this.collections.dayOfWeek.length; i++) {
        items.push(this.Item("DayOfWeekItem" + i, this.collections.loc["Day" + this.collections.dayOfWeek[i]], null, this.collections.dayOfWeek[i]));
    }

    return items;
}

StiJsViewer.prototype.GetFirstDayOfWeek = function () {
    var date = new Date();
    var timeString = date.toLocaleTimeString();
    return (timeString.toLowerCase().indexOf("am") >= 0 || timeString.toLowerCase().indexOf("pm") >= 0 ? 0 : 1);
}

StiJsViewer.prototype.InitializeDisabledPanels = function () {
    this.controls.disabledPanels = {};
    for (var i = 1; i < 5; i++) {
        var disabledPanel = document.createElement("div");
        disabledPanel.jsObject = this;
        disabledPanel.style.display = "none";
        this.controls.mainPanel.appendChild(disabledPanel);
        this.controls.disabledPanels[i] = disabledPanel;
        disabledPanel.style.zIndex = 10 * i;
        disabledPanel.className = "stiJsViewerDisabledPanel"; 

        disabledPanel.changeVisibleState = function (state) {
            this.style.display = state ? "" : "none";
        }

        disabledPanel.onmousedown = function () {
            if (!this.isTouchStartFlag) disabledPanel.ontouchstart(true);
        }

        disabledPanel.ontouchstart = function (mouseProcess) {
            var this_ = this;
            this.isTouchStartFlag = mouseProcess ? false : true;
            clearTimeout(this.isTouchStartTimer);
            disabledPanel.jsObject.options.disabledPanelPressed = true;
            this.isTouchStartTimer = setTimeout(function () {
                this_.isTouchStartFlag = false;
            }, 1000);
        }
    }
}

StiJsViewer.prototype.InitializeDrillDownPanel = function () {
    var drillDownPanel = document.createElement("div");
    this.controls.drillDownPanel = drillDownPanel;
    this.controls.mainPanel.appendChild(drillDownPanel);
    drillDownPanel.jsObject = this;
    drillDownPanel.className = "stiJsViewerToolBar";
    drillDownPanel.style.display = "none";

    var drillDownInnerContent = document.createElement("div");
    drillDownPanel.appendChild(drillDownInnerContent);
    drillDownInnerContent.style.padding = "0 2px 2px 2px";

    var drillDownInnerTable = this.CreateHTMLTable();
    drillDownInnerTable.className = "stiJsViewerToolBarTable";
    drillDownInnerContent.appendChild(drillDownInnerTable);
    drillDownInnerTable.style.margin = "0px";
    if (this.options.toolbar.fontColor != "") drillDownInnerTable.style.color = this.options.toolbar.fontColor;
    drillDownInnerTable.style.fontFamily = this.options.toolbar.fontFamily;

    var buttonsTable = this.CreateHTMLTable();
    drillDownInnerTable.addCell(buttonsTable);

    drillDownPanel.buttonsRow = buttonsTable.rows[0];
    drillDownPanel.buttons = {};
    drillDownPanel.selectedButton = null;

    drillDownPanel.changeVisibleState = function (state) {
        this.style.display = state ? "" : "none";
        var drillDownPanelHeight = this.offsetHeight;
        var parametersPanelHeight = this.jsObject.controls.parametersPanel ? this.jsObject.controls.parametersPanel.offsetHeight : 0;
        var toolBarHeight = this.jsObject.options.toolbar.visible ? this.jsObject.controls.toolbar.offsetHeight : 0;

        if (this.jsObject.controls.parametersPanel) {
            this.jsObject.controls.parametersPanel.style.top = (toolBarHeight + drillDownPanelHeight) + "px";
        }
        if (this.jsObject.controls.bookmarksPanel) {
            this.jsObject.controls.bookmarksPanel.style.top = (toolBarHeight + parametersPanelHeight + drillDownPanelHeight) + "px";
        }
        this.jsObject.controls.reportPanel.style.marginTop = (this.jsObject.controls.reportPanel.style.position == "relative"
            ? parametersPanelHeight
            : (drillDownPanelHeight + parametersPanelHeight)) + "px";
    }

    drillDownPanel.addButton = function (caption, reportParams) {
        var name = "button" + (drillDownPanel.buttonsRow.children.length + 1);
        var button = drillDownPanel.jsObject.SmallButton(name, caption);
        button.style.display = "inline-block";
        button.reportParams = reportParams ? reportParams : this.reportParams = {};
        drillDownPanel.buttons[name] = button;
        button.style.margin = "2px 1px 2px 2px";

        var cell = buttonsTable.addCell(button);
        cell.style.padding = "0px";
        cell.style.border = "0px";
        cell.style.lineHeight = "0px";

        button.select = function () {
            if (drillDownPanel.selectedButton) drillDownPanel.selectedButton.setSelected(false);
            this.setSelected(true);
            drillDownPanel.selectedButton = this;
            drillDownPanel.jsObject.reportParams = this.reportParams;
        }

        button.action = function () {
            if (this.style.display != "none") {
                this.select();
                drillDownPanel.jsObject.postAction("Refresh");
            }
        };

        button.select();

        if (name != "button1") {
            var closeButton = drillDownPanel.jsObject.SmallButton(null, null, "CloseForm.png");
            closeButton.style.display = "inline-block";
            closeButton.style.margin = "0 2px 0 0";
            closeButton.image.style.margin = "1px 0 0 -1px";
            closeButton.imageCell.style.padding = 0;
            closeButton.style.width = drillDownPanel.jsObject.options.isTouchDevice ? "22px" : "17px";
            closeButton.style.height = closeButton.style.width;
            closeButton.reportButton = button;
            button.innerTable.addCell(closeButton);

            closeButton.action = function () {
                this.reportButton.style.display = "none";
                if (this.reportButton.isSelected) drillDownPanel.buttons["button1"].action();
            };

            closeButton.onmouseenter = function (event) {
                this.reportButton.onmouseoutAction();
                this.onmouseoverAction();
                if (event) event.stopPropagation();
            }
        }
    }

    drillDownPanel.reset = function () {
        if (buttonsTable.tr[0].childNodes.length > 0) {
            drillDownPanel.buttons = {};
            while (buttonsTable.tr[0].childNodes.length > 0) {
                buttonsTable.tr[0].removeChild(buttonsTable.tr[0].childNodes[buttonsTable.tr[0].childNodes.length - 1]);
            }
        }
        drillDownPanel.changeVisibleState(false);
    }

    return drillDownPanel;
}

StiJsViewer.prototype.DropDownList = function (name, width, toolTip, items, readOnly, showImage) {
    var dropDownList = this.CreateHTMLTable();
    dropDownList.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") dropDownList.style.color = this.options.toolbar.fontColor;
    dropDownList.jsObject = this;
    dropDownList.name = name;
    dropDownList.key = null;
    dropDownList.imageCell = null;
    dropDownList.readOnly = readOnly;
    dropDownList.items = (items == null) ? {} : items;
    dropDownList.isEnabled = true;
    dropDownList.isSelected = false;
    dropDownList.isOver = false;
    dropDownList.isFocused = false;
    dropDownList.fullWidth = width + 3;
    if (toolTip) dropDownList.setAttribute("title", toolTip);
    var textBoxWidth = width - (this.options.isTouchDevice ? 23 : 15) - (showImage ? 38 : 0);
    dropDownList.className = "stiJsViewerDropDownList";
    if (name) {
        if (!this.controls.dropDownLists) this.controls.dropDownLists = {};
        this.controls.dropDownLists[name] = dropDownList;
    }

    //Image
    if (showImage) {
        dropDownList.image = document.createElement("div");
        dropDownList.image.dropDownList = dropDownList;
        dropDownList.image.jsObject = this;
        dropDownList.image.className = "stiJsViewerDropDownListImage";
        dropDownList.imageCell.style.lineHeight = "0";
        dropDownList.imageCell = dropDownList.addCell(dropDownList.image);
        if (readOnly) {
            dropDownList.image.onclick = function () {
                if (!this.isTouchEndFlag && !this.jsObject.options.isTouchClick) 
                    this.dropDownList.button.onclick();
            }
            dropDownList.image.ontouchend = function () {
                var this_ = this;
                this.isTouchEndFlag = true;
                clearTimeout(this.isTouchEndTimer);
                this.dropDownList.button.ontouchend();
                this.isTouchEndTimer = setTimeout(function () {
                    this_.isTouchEndFlag = false;
                }, 1000);
            }
        }
    }

    //TextBox
    dropDownList.textBox = document.createElement("input");
    dropDownList.textBox.jsObject = this;
    dropDownList.addCell(dropDownList.textBox);
    dropDownList.textBox.style.width = textBoxWidth + "px";
    dropDownList.textBox.dropDownList = dropDownList;
    dropDownList.textBox.readOnly = readOnly;
    dropDownList.textBox.style.border = 0;
    dropDownList.textBox.style.cursor = readOnly ? "default" : "text";
    dropDownList.textBox.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") dropDownList.textBox.style.color = this.options.toolbar.fontColor;
    dropDownList.textBox.style.height = this.options.isTouchDevice ? "23px" : "18px";
    dropDownList.textBox.style.lineHeight = dropDownList.textBox.style.height;
    dropDownList.textBox.className = "stiJsViewerDropDownList_TextBox";
    if (readOnly) {
        dropDownList.textBox.onclick = function () {
            if (!this.isTouchEndFlag && !this.jsObject.options.isTouchDevice && !this.jsObject.options.isTouchClick)
                this.dropDownList.button.onclick();
        }
        dropDownList.textBox.ontouchend = function () {
            var this_ = this;
            this.isTouchEndFlag = true;
            clearTimeout(this.isTouchEndTimer);
            this.dropDownList.button.ontouchend();
            this.isTouchEndTimer = setTimeout(function () {
                this_.isTouchEndFlag = false;
            }, 1000);
        }
    }
    dropDownList.textBox.action = function () { if (!this.dropDownList.readOnly) { this.dropDownList.setKey(this.value); this.dropDownList.action(); } }
    dropDownList.textBox.onfocus = function () { this.isFocused = true; this.dropDownList.isFocused = true; this.dropDownList.setSelected(true); }
    dropDownList.textBox.onblur = function () { this.isFocused = false; this.dropDownList.isFocused = false; this.dropDownList.setSelected(false); this.action(); }
    dropDownList.textBox.onkeypress = function (event) {
        if (this.dropDownList.readOnly) return false;
        if (event && event.keyCode == 13) {
            this.action();
            return false;
        }
    }

    //DropDownButton
    dropDownList.button = this.SmallButton(null, null, "ButtonArrowDown.png", null, null, "stiJsViewerDropDownListButton");
    dropDownList.button.style.height = this.isTouchDevice ? "26px" : "21px";
    dropDownList.addCell(dropDownList.button);
    dropDownList.button.dropDownList = dropDownList;
    dropDownList.button.action = function () {
        if (!this.dropDownList.menu.visible) {
            if (this.dropDownList.menu.isDinamic) this.dropDownList.menu.addItems(this.dropDownList.items);
            this.dropDownList.menu.changeVisibleState(true);
        }
        else
            this.dropDownList.menu.changeVisibleState(false);
    }


    //Menu
    dropDownList.menu = this.DropDownListMenu(dropDownList);
    this.controls.mainPanel.appendChild(dropDownList.menu);
    dropDownList.menu.isDinamic = (items == null);
    if (items != null) dropDownList.menu.addItems(items);

    dropDownList.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    dropDownList.onmouseenter = function () {
        if (!this.isEnabled) return;
        this.isOver = true;
        if (!this.isSelected && !this.isFocused) this.className = "stiJsViewerDropDownListOver";
    }

    dropDownList.onmouseleave = function () {
        if (!this.isEnabled) return;
        this.isOver = false;
        if (!this.isSelected && !this.isFocused) this.className = "stiJsViewerDropDownList";
    }

    dropDownList.setEnabled = function (state) {
        this.isEnabled = state;
        this.button.setEnabled(state);
        this.textBox.disabled = !state;
        this.textBox.style.visibility = state ? "visible" : "hidden";
        this.className = state ? "stiJsViewerDropDownList" : "stiJsViewerDropDownListDisabled";
        if (this.imageCell) this.image.style.visibility = state ? "visible" : "hidden";
    }

    dropDownList.setSelected = function (state) {
        this.isSelected = state;
        this.className = state ? "stiJsViewerDropDownListOver" :
            (this.isEnabled ? (this.isOver ? "stiJsViewerDropDownListOver" : "stiJsViewerDropDownList") : "stiJsViewerDropDownListDisabled");
    }

    dropDownList.setKey = function (key) {
        this.key = key;
        for (var itemName in this.items)
            if (key == this.items[itemName].key) {
                this.textBox.value = this.items[itemName].caption;
                if (this.image) this.image.style.background = "url(" + this.jsObject.collections.images[this.items[itemName].imageName] + ")";
                return;
            }
        this.textBox.value = key.toString();
    }

    dropDownList.haveKey = function (key) {
        for (var num in this.items)
            if (this.items[num].key == key) return true;
        return false;
    }

    dropDownList.action = function () { }

    return dropDownList;
}

StiJsViewer.prototype.DropDownListMenu = function (dropDownList) {
    var menu = this.VerticalMenu(dropDownList.name, dropDownList.button, "Down", dropDownList.items, "stiJsViewerMenuStandartItem", "stiJsViewerDropdownMenu");
    menu.dropDownList = dropDownList;
    menu.innerContent.style.minWidth = dropDownList.fullWidth + "px";

    menu.changeVisibleState = function (state) {
        var mainClassName = "stiJsViewerMainPanel";
        if (state) {
            this.onshow();
            this.style.display = "";
            this.visible = true;
            this.style.overflow = "hidden";
            this.parentButton.dropDownList.setSelected(true);
            this.parentButton.setSelected(true);
            this.jsObject.options.currentDropDownListMenu = this;
            this.style.width = this.innerContent.offsetWidth + "px";
            this.style.height = this.innerContent.offsetHeight + "px";
            this.style.left = (this.jsObject.FindPosX(this.parentButton.dropDownList, mainClassName)) + "px";
            this.style.top = (this.jsObject.FindPosY(this.parentButton.dropDownList, mainClassName) + this.parentButton.offsetHeight + 3) + "px";
            this.innerContent.style.top = -this.innerContent.offsetHeight + "px";

            d = new Date();
            var endTime = d.getTime();
            if (this.jsObject.options.toolbar.menuAnimation) endTime += this.jsObject.options.menuAnimDuration;
            this.jsObject.ShowAnimationVerticalMenu(this, 0, endTime);
        }
        else {
            clearTimeout(this.innerContent.animationTimer);
            this.visible = false;
            this.parentButton.dropDownList.setSelected(false);
            this.parentButton.setSelected(false);
            this.style.display = "none";
            if (this.jsObject.options.currentDropDownListMenu == this) this.jsObject.options.currentDropDownListMenu = null;
        }
    }

    menu.onmousedown = function () {
        if (!this.isTouchStartFlag) this.ontouchstart(true);
    }

    menu.ontouchstart = function (mouseProcess) {
        var this_ = this;
        this.isTouchStartFlag = mouseProcess ? false : true;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.dropDownListMenuPressed = this;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }  

    menu.action = function (menuItem) {
        this.changeVisibleState(false);
        this.dropDownList.key = menuItem.key;
        this.dropDownList.textBox.value = menuItem.caption.innerHTML;
        if (this.dropDownList.image) this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[menuItem.imageName] + ")";
        this.dropDownList.action();
    }

    menu.onshow = function () {
        if (this.dropDownList.key == null) return;
        for (var itemName in this.items) {
            if (this.dropDownList.key == this.items[itemName].key) {
                this.items[itemName].setSelected(true);
                return;
            }
            else
                this.items[itemName].setSelected(false);
        }
    }

    return menu;
}

StiJsViewer.prototype.InitializeFindPanel = function () {
    var findPanel = document.createElement("div");
    findPanel.style.display = "none";
    findPanel.controls = {};
    this.controls.findPanel = findPanel;
    this.controls.mainPanel.appendChild(findPanel);
    findPanel.jsObject = this;
    findPanel.className = "stiJsViewerToolBar";

    var findPanelInnerContent = document.createElement("div");
    findPanel.innerContent = findPanelInnerContent;
    findPanel.appendChild(findPanelInnerContent);
    findPanelInnerContent.style.padding = "0 3px 3px 3px";

    var findPanelBlock = document.createElement("div");
    findPanelInnerContent.appendChild(findPanelBlock);
    findPanelBlock.className = "stiJsViewerToolBarTable";

    var controlsTable = this.CreateHTMLTable();
    findPanelBlock.appendChild(controlsTable);

    var controlProps = [
        ["close", this.SmallButton(null, null, "CloseFindPanel.png", null), "2px"],
        ["text", this.TextBlock(this.collections.loc.FindWhat), "2px"],
        ["findTextBox", this.TextBox(null, 170), "2px"],
        ["findPreviows", this.SmallButton(null, this.collections.loc.FindPrevious, "ArrowUpBlue.png"), "2px"],
        ["findNext", this.SmallButton(null, this.collections.loc.FindNext, "ArrowDownBlue.png"), "2px"],
        ["matchCase", this.SmallButton(null, this.collections.loc.MatchCase.replace("&", ""), null), "2px"],
        ["matchWholeWord", this.SmallButton(null, this.collections.loc.MatchWholeWord.replace("&", ""), null), "2px"]
    ]
    
    for (var i = 0; i < controlProps.length; i++) {
        findPanel.controls[controlProps[i][0]] = controlProps[i][1];
        controlsTable.addCell(controlProps[i][1]);
        controlProps[i][1].style.margin = controlProps[i][2];
    }

    var find = function (direction) {
        if (findPanel.controls.findTextBox.value == "") {
            findPanel.jsObject.hideFindLabels();
            return;
        }
        if (findPanel.jsObject.controls.findHelper.lastFindText != findPanel.controls.findTextBox.value || findPanel.jsObject.options.changeFind)
            findPanel.jsObject.showFindLabels(findPanel.controls.findTextBox.value);
        else
            findPanel.jsObject.selectFindLabel(direction);
    }

    findPanel.controls.close.action = function () { findPanel.changeVisibleState(false); }
    findPanel.controls.findTextBox.onkeyup = function (e) { if (e && e.keyCode == 13) find("Next"); }
    findPanel.controls.matchCase.action = function () {
        this.setSelected(!this.isSelected);
        this.jsObject.options.changeFind = true; 
    }
    findPanel.controls.matchWholeWord.action = function () {
        this.setSelected(!this.isSelected);
        this.jsObject.options.changeFind = true;
    }
    findPanel.controls.findPreviows.action = function () { find("Previows"); }
    findPanel.controls.findNext.action = function () { find("Next"); }

    findPanel.changeVisibleState = function (state) {
        var options = this.jsObject.options;
        var controls = this.jsObject.controls;
        if (!state) this.jsObject.hideFindLabels();
        this.style.display = state ? "" : "none";
        if (state) {
            findPanel.controls.findTextBox.value = "";
            findPanel.controls.findTextBox.focus();
        }
        if (options.toolbar.showFindButton) {
            controls.toolbar.controls.Find.setSelected(state);
        }
        if (controls.parametersPanel) {
            controls.parametersPanel.style.top = (options.toolbar.visible ? controls.toolbar.offsetHeight : 0) + (controls.findPanel ? controls.findPanel.offsetHeight : 0) + "px";
        }
        if (controls.bookmarksPanel) {
            controls.bookmarksPanel.style.top = (options.toolbar.visible ? controls.toolbar.offsetHeight : 0) + (controls.findPanel ? controls.findPanel.offsetHeight : 0) +
                (controls.parametersPanel ? controls.parametersPanel.offsetHeight : 0) + "px";
        }
        controls.reportPanel.style.marginTop = (controls.parametersPanel ? controls.parametersPanel.offsetHeight : 0) +
                (controls.reportPanel.style.position == "absolute" && controls.findPanel ? controls.findPanel.offsetHeight : 0) + "px";
    }
}



StiJsViewer.prototype.FormButton = function (name, caption, imageName, minWidth) {
    var button = this.SmallButton(name, caption || "", imageName, null, null, "stiJsViewerFormButton");
    button.innerTable.style.width = "100%";
    button.style.minWidth = (minWidth || 80) + "px";
    button.caption.style.textAlign = "center";
    
    return button;
}

StiJsViewer.prototype.GroupPanel = function (caption, isOpened, width, innerPadding) {
    var groupPanel = document.createElement("div");
    groupPanel.style.fontFamily = this.options.toolbar.fontFamily;
    groupPanel.style.color = this.options.toolbarFontColor;
    groupPanel.jsObject = this;
    if (width) groupPanel.style.minWidth = width + "px";
    groupPanel.style.overflow = "hidden";
    groupPanel.isOpened = isOpened;
    var header = this.FormButton(null, caption, isOpened ? "ArrowDownGray.png" : "ArrowRight.png");
    header.imageCell.style.width = "1px";
    if (header.caption) {
        header.caption.style.textAlign = "left";
        header.caption.style.padding = "0 15px 0 5px";
    }

    groupPanel.appendChild(header);
    var container = document.createElement("div");
    if (innerPadding) container.style.padding = innerPadding;
    container.style.display = isOpened ? "" : "none";
    container.className = "stiJsViewerGroupPanelContainer";
    groupPanel.container = container;
    groupPanel.appendChild(container);

    groupPanel.changeOpeningState = function (state) {
        groupPanel.isOpened = state;
        header.image.src = groupPanel.jsObject.collections.images[state ? "ArrowDownGray.png" : "ArrowRight.png"];
        container.style.display = state ? "" : "none";
    }

    header.action = function () {
        groupPanel.isOpened = !groupPanel.isOpened;
        header.image.src = groupPanel.jsObject.collections.images[groupPanel.isOpened ? "ArrowDownGray.png" : "ArrowRight.png"];
        groupPanel.style.height = (groupPanel.isOpened ? header.offsetHeight : header.offsetHeight + container.offsetHeight) + "px";
        if (groupPanel.isOpened) container.style.display = "";
        groupPanel.jsObject.animate(groupPanel, {
            duration: 150,
            animations: [{
                style: "height",
                start: groupPanel.isOpened ? header.offsetHeight : header.offsetHeight + container.offsetHeight,
                end: groupPanel.isOpened ? header.offsetHeight + container.offsetHeight : header.offsetHeight,
                postfix: "px",
                finish: function () {
                    container.style.display = groupPanel.isOpened ? "" : "none";
                    groupPanel.style.height = "";
                }
            }]
        });
    }

    return groupPanel;
}

StiJsViewer.prototype.CreateHTMLTable = function (rowsCount, cellsCount) {
    var table = document.createElement("table");
    table.jsObject = this;
    this.clearStyles(table);
    table.cellPadding = 0;
    table.cellSpacing = 0;
    table.tbody = document.createElement("tbody");
    table.appendChild(table.tbody);
    table.tr = [];
    table.tr[0] = document.createElement("tr");
    this.clearStyles(table.tr[0]);
    table.tbody.appendChild(table.tr[0]);

    table.addCell = function (control) {
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[0].appendChild(cell);
        if (control) cell.appendChild(control);

        return cell;
    }

    table.addCellInNextRow = function (control) {
        var rowCount = this.tr.length;
        this.tr[rowCount] = document.createElement("tr");
        this.jsObject.clearStyles(this.tr[rowCount]);
        this.tbody.appendChild(this.tr[rowCount]);
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[rowCount].appendChild(cell);
        if (control) cell.appendChild(control);

        return cell;
    }

    table.addCellInLastRow = function (control) {
        var rowCount = this.tr.length;
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[rowCount - 1].appendChild(cell);
        if (control) cell.appendChild(control);

        return cell;
    }

    table.addTextCellInLastRow = function (text) {
        var rowCount = this.tr.length;
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[rowCount - 1].appendChild(cell);
        cell.innerHTML = text;

        return cell;
    }

    table.addCellInRow = function (rowNumber, control) {
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[rowNumber].appendChild(cell);
        if (control) cell.appendChild(control);

        return cell;
    }

    table.addTextCell = function (text) {
        var cell = document.createElement("td");
        this.jsObject.clearStyles(cell);
        this.tr[0].appendChild(cell);
        cell.innerHTML = text;

        return cell;
    }

    table.addRow = function () {
        var rowCount = this.tr.length;
        this.tr[rowCount] = document.createElement("tr");
        this.jsObject.clearStyles(this.tr[rowCount]);
        this.tbody.appendChild(this.tr[rowCount]);

        return this.tr[rowCount];
    }

    return table;
}

StiJsViewer.prototype.TextBlock = function (text) {
    var textBlock = document.createElement("div");
    textBlock.style.fontFamily = this.options.toolbar.fontFamily
    textBlock.style.fontSize = "12px";
    textBlock.innerHTML = text;

    return textBlock;
}

StiJsViewer.prototype.InitializeInteractions = function (page) {

    page.getComponentOffset = function (component) {
        var offsetX = 0;
        var offsetY = 0;
        var startComponent = component;
        while (component && !isNaN(component.offsetLeft) && !isNaN(component.offsetTop)
                && (component == startComponent || component.style.position == "" || component.style.position == "static")) {
            offsetX += component.offsetLeft - component.scrollLeft;
            offsetY += component.offsetTop - component.scrollTop;
            component = component.offsetParent;
        }
        return { top: offsetY, left: offsetX };
    }

    page.paintSortingArrow = function (component, sort) {
        var arrowImg = document.createElement("img");
        arrowImg.src = sort == "asc" ? this.jsObject.collections.images["ArrowDown.png"] : this.jsObject.collections.images["ArrowUp.png"];
        var arrowWidth = (this.jsObject.reportParams.zoom / 100) * 9;
        var arrowHeight = (this.jsObject.reportParams.zoom / 100) * 5;        
        arrowImg.style.position = "absolute";
        arrowImg.style.width = arrowWidth + "px";
        arrowImg.style.height = arrowHeight + "px";
        component.appendChild(arrowImg);

        var oldPosition = component.style.position;
        var oldClassName = component.className;
        component.style.position = "relative";
        if (!oldClassName) component.className = "stiSortingParentElement";

        var arrowLeftPos = this.jsObject.FindPosX(arrowImg, component.className);
        var arrowTopPos = this.jsObject.FindPosY(arrowImg, component.className);
        
        arrowImg.style.marginLeft = (component.offsetWidth - arrowLeftPos - arrowWidth - ((this.jsObject.reportParams.zoom / 100) * 3)) + "px";
        arrowImg.style.marginTop = (component.offsetHeight / 2 - arrowHeight / 2 - arrowTopPos) + "px";
        component.style.position = oldPosition;
        component.className = oldClassName;
    }

    page.paintCollapsingIcon = function (component, collapsed) {
        var collapsImg = document.createElement("img");
        collapsImg.src = collapsed ? this.jsObject.collections.images["CollapsingPlus.png"] : this.jsObject.collections.images["CollapsingMinus.png"];
        collapsImg.style.position = "absolute";
        var collapsWidth = (this.jsObject.reportParams.zoom / 100) * 10;
        var collapsHeight = (this.jsObject.reportParams.zoom / 100) * 10;
        collapsImg.style.width = collapsWidth + "px";
        collapsImg.style.height = collapsHeight + "px";
        component.appendChild(collapsImg);

        var componentOffset = page.getComponentOffset(component);
        var collapsOffset = page.getComponentOffset(collapsImg);
        collapsImg.style.marginLeft = (componentOffset.left - collapsOffset.left + collapsWidth / 3) + "px";
        collapsImg.style.marginTop = (componentOffset.top - collapsOffset.top + collapsWidth / 3) + "px";
    }

    page.postInteractionSorting = function (component, isCtrl) {
        var params = {
            "action": "Sorting",
            "sortingParameters": {
                "ComponentName": component.getAttribute("interaction") + ";" + isCtrl.toString(),
                "DataBand": component.getAttribute("databandsort")
            }
        };

        if (this.jsObject.controls.parametersPanel) {
            params.variables = this.jsObject.controls.parametersPanel.getParametersValues();
        }

        this.jsObject.postInteraction(params);
    }

    page.postInteractionDrillDown = function (component) {
        var params = {
            "action": "DrillDown",
            "drillDownParameters": {
                "ComponentIndex": component.getAttribute("compindex"),
                "PageIndex": component.getAttribute("pageindex"),
                "PageGuid": component.getAttribute("pageguid"),
                "ReportFile": null
            }
        };

        this.jsObject.postInteraction(params);
    }

    page.postInteractionCollapsing = function (component) {
        var componentName = component.getAttribute("interaction");
        var collapsingIndex = component.getAttribute("compindex");
        var collapsed = component.getAttribute("collapsed") == "true" ? false : true;

        if (!this.jsObject.reportParams.interactionCollapsingStates) this.jsObject.reportParams.interactionCollapsingStates = {};
        if (!this.jsObject.reportParams.interactionCollapsingStates[componentName]) this.jsObject.reportParams.interactionCollapsingStates[componentName] = {};
        this.jsObject.reportParams.interactionCollapsingStates[componentName][collapsingIndex] = collapsed;

        var params = {
            "action": "Collapsing",
            "collapsingParameters": {
                "ComponentName": componentName,
                "InteractionCollapsingStates": this.jsObject.reportParams.interactionCollapsingStates
            }
        };

        if (this.jsObject.controls.parametersPanel) {
            params.variables = this.jsObject.controls.parametersPanel.getParametersValues();
        }

        this.jsObject.postInteraction(params);
    }

    var elems = page.getElementsByTagName('TD');
    var collapsedHash = [];
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute("interaction") && (
                elems[i].getAttribute("pageguid") ||
                elems[i].getAttribute("collapsed") ||
                elems[i].getAttribute("databandsort"))) {

            elems[i].style.cursor = "pointer";
            elems[i].jsObject = this;

            var sort = elems[i].getAttribute("sort");
            if (sort) {
                page.paintSortingArrow(elems[i], sort);
            }

            var collapsed = elems[i].getAttribute("collapsed");
            if (collapsed) {
                var compId = elems[i].getAttribute("compindex") + "|" + elems[i].getAttribute("interaction");
                if (collapsedHash.indexOf(compId) < 0) {
                    page.paintCollapsingIcon(elems[i], collapsed == "true");
                    collapsedHash.push(compId);
                }
            }

            elems[i].onclick = function (e) {
                if (this.getAttribute("pageguid")) page.postInteractionDrillDown(this);
                else if (this.getAttribute("collapsed")) page.postInteractionCollapsing(this);
                else page.postInteractionSorting(this, e.ctrlKey);
            }
        }
    }
}

StiJsViewer.prototype.InitializeJsViewer = function () {
    this.controls.viewer.jsObject = this;

    this.controls.viewer.pressedDown = function () {
        var options = this.jsObject.options;

        this.jsObject.removeBookmarksLabel();

        //Close Current Menu
        if (options.currentMenu != null)
            if (options.menuPressed != options.currentMenu && options.currentMenu.parentButton != options.buttonPressed && !options.datePickerPressed && !options.dropDownListMenuPressed)
                options.currentMenu.changeVisibleState(false);

        //Close Current DropDownList
        if (options.currentDropDownListMenu != null)
            if (options.dropDownListMenuPressed != options.currentDropDownListMenu && options.currentDropDownListMenu.parentButton != options.buttonPressed)
                options.currentDropDownListMenu.changeVisibleState(false);

        //Close Current DatePicker
        if (options.currentDatePicker != null)
            if (options.datePickerPressed != options.currentDatePicker && options.currentDatePicker.parentButton != options.buttonPressed)
                options.currentDatePicker.changeVisibleState(false);

        options.buttonPressed = false;
        options.menuPressed = false;
        options.formPressed = false;
        options.dropDownListMenuPressed = false;
        options.disabledPanelPressed = false;
        options.datePickerPressed = false;
        options.fingerIsMoved = false;
    }

    this.controls.viewer.onmousedown = function () {
        if (this.isTouchStartFlag) return;
        this.jsObject.options.isTouchClick = false;
        this.pressedDown();
    }

    this.controls.viewer.ontouchstart = function () {
        var this_ = this;
        this.isTouchStartFlag = true;
        clearTimeout(this.isTouchStartTimer);
        if (this.jsObject.options.buttonsTimer) {
            clearTimeout(this.jsObject.options.buttonsTimer[2]);
            this.jsObject.options.buttonsTimer[0].className = this.jsObject.options.buttonsTimer[1];
            this.jsObject.options.buttonsTimer = null;
        }
        this.jsObject.options.isTouchClick = true;
        this.pressedDown();
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    this.controls.viewer.onmouseup = function () {
        if (this.isTouchEndFlag) return;
        this.ontouchend();
    }

    this.controls.viewer.ontouchend = function () {
        var this_ = this;
        this.isTouchEndFlag = true;
        clearTimeout(this.isTouchEndTimer);
        this.jsObject.options.fingerIsMoved = false;
        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    this.controls.viewer.ontouchmove = function () {
        this.jsObject.options.fingerIsMoved = true;
    }
}

StiJsViewer.prototype.CreateParameter = function (params) {
    var parameter = this.CreateHTMLTable();
    this.options.parameters[params.name] = parameter;
    parameter.params = params;
    parameter.controls = {};
    parameter.jsObject = this;
    parameter.params.isNull = false;
    parameter.menu = null;

    parameter.addCell = function (control) {
        var cell = document.createElement("td");
        cell.style.height = parameter.jsObject.options.parameterRowHeight + "px";
        cell.style.padding = "0px 2px 0 2px";
        this.tr[0].appendChild(cell);
        if (control) cell.appendChild(control);

        return cell;
    }

    //boolCheckBox
    if (parameter.params.type == "Bool" && (parameter.params.basicType == "Value" || parameter.params.basicType == "NullableValue"))
        parameter.addCell(this.CreateBoolCheckBox(parameter));
    //labelFrom
    if (parameter.params.basicType == "Range") parameter.addCell().innerHTML = this.collections.loc["RangeFrom"];
    //firstTextBox
    if (parameter.params.type != "Bool" || parameter.params.basicType == "List") parameter.addCell(this.CreateFirstTextBox(parameter));
    //firstDateTimeButton
    if (parameter.params.type == "DateTime" && parameter.params.allowUserValues && parameter.params.basicType != "List" && parameter.params.basicType != "Range")
        parameter.addCell(this.CreateFirstDateTimeButton(parameter));
    //firstGuidButton
    if (parameter.params.type == "Guid" && parameter.params.allowUserValues && parameter.params.basicType != "List") parameter.addCell(this.CreateFirstGuidButton(parameter));
    //labelTo
    if (parameter.params.basicType == "Range") parameter.addCell().innerHTML = this.collections.loc["RangeTo"];
    //secondTextBox
    if (parameter.params.basicType == "Range") parameter.addCell(this.CreateSecondTextBox(parameter));
    //secondDateTimeButton
    if (parameter.params.basicType == "Range" && parameter.params.type == "DateTime" && parameter.params.allowUserValues) parameter.addCell(this.CreateSecondDateTimeButton(parameter));
    //secondGuidButton
    if (parameter.params.basicType == "Range" && parameter.params.type == "Guid" && parameter.params.allowUserValues) parameter.addCell(this.CreateSecondGuidButton(parameter));
    //dropDownButton
    if (parameter.params.items != null || (parameter.params.basicType == "List" && parameter.params.allowUserValues)) parameter.addCell(this.CreateDropDownButton(parameter));
    //nullableCheckBox
    if (parameter.params.basicType == "NullableValue" && parameter.params.allowUserValues) parameter.addCell(this.CreateNullableCheckBox(parameter));
    //nullableText
    if (parameter.params.basicType == "NullableValue" && parameter.params.allowUserValues) {
        var nullableCell = parameter.addCell();
        nullableCell.innerHTML = "Null";
        nullableCell.style.padding = "0px";
    }

    parameter.setEnabled = function (state) {
        this.params.isNull = !state;
        for (var controlName in this.controls) {
            this.controls[controlName].setEnabled(state);
        }
    }

    parameter.changeVisibleStateMenu = function (state) {
        if (state) {
            var menu = null;
            switch (this.params.basicType) {
                case "Value":
                case "NullableValue":
                    menu = this.jsObject.parameterMenuForValue(this);
                    break;

                case "Range":
                    menu = this.jsObject.parameterMenuForRange(this);
                    break;

                case "List":
                    menu = (this.params.allowUserValues) ? this.jsObject.parameterMenuForEditList(this) : this.jsObject.parameterMenuForNotEditList(this);
                    break;
            }

            if (menu != null) menu.changeVisibleState(true);
        }
        else {
            if (parameter.menu != null) {
                if (parameter.params.allowUserValues && parameter.params.basicType == "List") parameter.menu.updateItems();
                parameter.menu.changeVisibleState(false);
            }
        }
    }

    parameter.getStringDateTime = function (object) {
        return object.month + "/" + object.day + "/" + object.year + " " +
            (object.hours > 12 ? object.hours - 12 : object.hours) + ":" + object.minutes + ":" + object.seconds + " " +
            (object.hours < 12 ? "AM" : "PM");
    }

    parameter.getValue = function () {
        var value = null;
        if (parameter.params.isNull) return null;

        if (parameter.params.basicType == "Value" || parameter.params.basicType == "NullableValue") {
            if (parameter.params.type == "Bool") return parameter.controls.boolCheckBox.isChecked;
            if (parameter.params.type == "DateTime") return this.getStringDateTime(parameter.params.key);
            value = parameter.params.allowUserValues ? parameter.controls.firstTextBox.value : parameter.params.key;
        }

        if (parameter.params.basicType == "Range") {
            value = {};
            value.from = (parameter.params.type == "DateTime") ? this.getStringDateTime(parameter.params.key) : parameter.controls.firstTextBox.value;
            value.to = (parameter.params.type == "DateTime") ? this.getStringDateTime(parameter.params.keyTo) : parameter.controls.secondTextBox.value;
        }

        if (parameter.params.basicType == "List") {
            value = []
            if (parameter.params.allowUserValues)
                for (var index in parameter.params.items) value[index] =
                    (parameter.params.type == "DateTime")
                        ? this.getStringDateTime(parameter.params.items[index].key)
                        : parameter.params.items[index].key;
            else {
                num = 0;
                for (var index in parameter.params.items)
                    if (parameter.params.items[index].isChecked) {
                        value[num] = (parameter.params.type == "DateTime")
                            ? this.getStringDateTime(parameter.params.items[index].key)
                            : parameter.params.items[index].key;
                        num++;
                    }
            }
        }

        return value;
    };

    //Methods For Reports Server

    parameter.getDateTimeForReportServer = function (value) {
        var date = new Date(value.year, value.month - 1, value.day, value.hours, value.minutes, value.seconds);
        return (parameter.jsObject.options.cloudReportsClient.options.const_dateTime1970InTicks + date * 10000).toString();
    }

    parameter.getTimeSpanForReportServer = function (value) {
        var jsObject = parameter.jsObject;

        var timeArray = value.split(":");
        var daysHoursArray = timeArray[0].split(".");
        var days = (daysHoursArray.length > 1) ? jsObject.strToInt(daysHoursArray[0]) : 0;
        var hours = jsObject.strToInt((daysHoursArray.length > 1) ? daysHoursArray[1] : daysHoursArray[0]);
        var minutes = (timeArray.length > 1) ? jsObject.strToInt(timeArray[1]) : 0;
        var seconds = (timeArray.length > 2) ? jsObject.strToInt(timeArray[2]) : 0;

        return ((days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000) * 10000).toString();
    }

    parameter.getSingleValueForReportServer = function () {
        var value = null;
        if (parameter.params.isNull) return null;

        if (parameter.params.basicType == "Value" || parameter.params.basicType == "NullableValue") {
            if (parameter.params.type == "Bool") return parameter.controls.boolCheckBox.isChecked ? "True" : "False";
            if (parameter.params.type == "DateTime") return parameter.getDateTimeForReportServer(parameter.params.key);
            value = parameter.params.allowUserValues ? parameter.controls.firstTextBox.value : parameter.params.key;
            if (parameter.params.type == "TimeSpan") value = parameter.getTimeSpanForReportServer(value);
        }

        return value;
    };

    parameter.getRangeValuesForReportServer = function () {
        var values = {};
        values.from = (parameter.params.type == "DateTime")
            ? parameter.getDateTimeForReportServer(parameter.params.key)
            : (parameter.params.type == "TimeSpan") ? parameter.getTimeSpanForReportServer(parameter.controls.firstTextBox.value) : parameter.controls.firstTextBox.value;

        values.to = (parameter.params.type == "DateTime")
            ? parameter.getDateTimeForReportServer(parameter.params.keyTo)
            : (parameter.params.type == "TimeSpan") ? parameter.getTimeSpanForReportServer(parameter.controls.secondTextBox.value) : parameter.controls.secondTextBox.value;

        return values;
    };

    parameter.getListValuesForReportServer = function () {
        var values = [];
        var num = 0;

        for (var index in parameter.params.items) {
            var valuesItem = {};
            valuesItem.Ident = "Single";

            if (parameter.params.allowUserValues || (!parameter.params.allowUserValues && parameter.params.items[index].isChecked)) {
                valuesItem.Value = (parameter.params.type == "DateTime")
                    ? parameter.getDateTimeForReportServer(parameter.params.items[index].key)
                    : (parameter.params.type == "TimeSpan")
                        ? parameter.getTimeSpanForReportServer(parameter.params.items[index].key)
                        : parameter.params.items[index].key;
                valuesItem.Type = (valuesItem.Value == null) ? null : parameter.getSingleType();
                values.push(valuesItem);
            }
        }

        return values;
    };

    parameter.getParameterObjectForReportServer = function () {
        var parameterObject = {};
        parameterObject.Ident = parameter.params.basicType.indexOf("Value") != -1 ? "Single" : parameter.params.basicType;
        parameterObject.Name = parameter.params.name;

        switch (parameterObject.Ident) {
            case "Single":
                parameterObject.Value = parameter.getSingleValueForReportServer();
                parameterObject.Type = (parameterObject.Value == null) ? null : parameter.getSingleType();
                break;

            case "Range":
                var values = parameter.getRangeValuesForReportServer();
                parameterObject.FromValue = values.from;
                parameterObject.ToValue = values.to;
                parameterObject.RangeType = parameter.params.type + "Range";
                parameterObject.FromType = (parameterObject.FromValue == null) ? null : parameter.getSingleType();
                parameterObject.ToType = (parameterObject.ToValue == null) ? null : parameter.getSingleType();
                break;

            case "List":
                parameterObject.ListType = parameter.params.type + "List";
                parameterObject.Values = parameter.getListValuesForReportServer();
                break;
        }

        return parameterObject;
    };

    parameter.getSingleType = function () {
        var type = parameter.params.type;
        if (type != "DateTime" && type != "TimeSpan" && type != "Guid" && type != "Decimal") return type.toLowerCase();

        return type;
    }

    return parameter;
}

// ---------------------  Controls   ----------------------------

//boolCheckBox
StiJsViewer.prototype.CreateBoolCheckBox = function (parameter) {
    var checkBox = this.ParameterCheckBox(parameter);
    parameter.controls.boolCheckBox = checkBox;
    checkBox.setChecked((typeof (parameter.params.value) == "boolean" && parameter.params.value) || parameter.params.value == "true" || parameter.params.value == "True");
    checkBox.setEnabled(parameter.params.allowUserValues);

    return checkBox;
}

//firstTextBox
StiJsViewer.prototype.CreateFirstTextBox = function (parameter) {
    var textBox = this.ParameterTextBox(parameter);
    parameter.controls.firstTextBox = textBox;
    textBox.setReadOnly(/*parameter.params.type == "DateTime" || */parameter.params.basicType == "List" || !parameter.params.allowUserValues)

    //Value
    if (parameter.params.basicType == "Value" || parameter.params.basicType == "NullableValue") {
        if (parameter.params.type == "DateTime" && parameter.params.value == null) {
            var nowDateTimeObject = this.getNowDateTimeObject(new Date);
            parameter.params.key = nowDateTimeObject;
        }

        textBox.value =
            (parameter.params.type == "DateTime")
            ? this.getStringKey(parameter.params.key, parameter)
            : parameter.params.value;
    }

    //Range
    if (parameter.params.basicType == "Range") {        
        if (parameter.params.type == "DateTime" && parameter.params.key && parameter.params.key.isNull) {
            var nowDateTimeObject = this.getNowDateTimeObject(new Date);
            parameter.params.key = nowDateTimeObject;
        }
        textBox.value = this.getStringKey(parameter.params.key, parameter);
    }

    //List
    if (parameter.params.basicType == "List") {
        for (var index in parameter.params.items) {
            var isChecked = true;
            if (parameter.params.value instanceof Array && !parameter.params.value.contains(parameter.params.items[index].value)) isChecked = false;

            parameter.params.items[index].isChecked = isChecked;
            if (isChecked) {
                if (textBox.value != "") textBox.value += ";";

                if (parameter.params.allowUserValues)
                    textBox.value += this.getStringKey(parameter.params.items[index].key, parameter);
                else
                    textBox.value += parameter.params.items[index].value != "" ? parameter.params.items[index].value : this.getStringKey(parameter.params.items[index].key, parameter);
            }
        }
    }

    return textBox;
}

//firstDateTimeButton
StiJsViewer.prototype.CreateFirstDateTimeButton = function (parameter) {
    var dateTimeButton = this.ParameterButton("DateTimeButton", parameter);
    parameter.controls.firstDateTimeButton = dateTimeButton;
    dateTimeButton.action = function () {
        var datePicker = dateTimeButton.jsObject.controls.datePicker;
        datePicker.ownerValue = this.parameter.params.key;
        datePicker.showTime = this.parameter.params.dateTimeType != "Date";
        datePicker.parentDataControl = this.parameter.controls.firstTextBox;
        datePicker.parentButton = this;
        datePicker.changeVisibleState(!datePicker.visible);
    }

    return dateTimeButton;
}

//firstGuidButton
StiJsViewer.prototype.CreateFirstGuidButton = function (parameter) {
    var guidButton = this.ParameterButton("GuidButton", parameter);
    parameter.controls.firstGuidButton = guidButton;
    guidButton.action = function () {
        this.parameter.controls.firstTextBox.value = this.parameter.jsObject.newGuid();
    }

    return guidButton;
}

//secondTextBox
StiJsViewer.prototype.CreateSecondTextBox = function (parameter) {
    var textBox = this.ParameterTextBox(parameter);
    parameter.controls.secondTextBox = textBox;
    textBox.setReadOnly(!parameter.params.allowUserValues);
    if (parameter.params.type == "DateTime" && parameter.params.keyTo && parameter.params.keyTo.isNull) {
        var nowDateTimeObject = this.getNowDateTimeObject(new Date);
        parameter.params.keyTo = nowDateTimeObject;
    }
    textBox.value = this.getStringKey(parameter.params.keyTo, parameter);

    return textBox;
}

//secondDateTimeButton
StiJsViewer.prototype.CreateSecondDateTimeButton = function (parameter) {
    var dateTimeButton = this.ParameterButton("DateTimeButton", parameter);
    parameter.controls.secondDateTimeButton = dateTimeButton;
    dateTimeButton.action = function () {
        var datePickerParams = {
            showTime: this.parameter.params.dateTimeType != "Date",
            firstParentDataControl: this.parameter.controls.firstTextBox,
            firstParentButton: this.parameter.controls.firstDateTimeButton,
            firstOwnerValue: this.parameter.params.key,            
            secondParentDataControl: this.parameter.controls.secondTextBox,
            secondParentButton: this,
            secondOwnerValue: this.parameter.params.keyTo            
        }

        var datePicker = dateTimeButton.jsObject.InitializeDoubleDatePicker(datePickerParams);        
        datePicker.changeVisibleState(!datePicker.visible, null, true);
    }

    return dateTimeButton;
}

//secondGuidButton
StiJsViewer.prototype.CreateSecondGuidButton = function (parameter) {
    var guidButton = this.ParameterButton("GuidButton", parameter);
    parameter.controls.secondGuidButton = guidButton;
    guidButton.action = function () {
        this.parameter.controls.secondTextBox.value = this.parameter.jsObject.newGuid();
    }

    return guidButton;
}

//dropDownButton
StiJsViewer.prototype.CreateDropDownButton = function (parameter) {
    var dropDownButton = this.ParameterButton("DropDownButton", parameter);
    parameter.controls.dropDownButton = dropDownButton;
    dropDownButton.action = function () {
        this.parameter.changeVisibleStateMenu(this.parameter.menu == null);
    }

    return dropDownButton;
}

//nullableCheckBox
StiJsViewer.prototype.CreateNullableCheckBox = function (parameter) {
    var checkBox = this.ParameterCheckBox(parameter);
    checkBox.onChecked = function () {
        this.parameter.setEnabled(!this.isChecked);
    }

    return checkBox;
}

StiJsViewer.prototype.InitializeParametersPanel = function () {
    if (this.controls.parametersPanel) {
        this.controls.parametersPanel.changeVisibleState(false);
        this.controls.mainPanel.removeChild(this.controls.parametersPanel);
        delete this.controls.parametersPanel;
    }
    if (this.options.toolbar.visible && this.options.toolbar.showParametersButton) {
        this.controls.toolbar.controls.Parameters.setEnabled(this.options.paramsVariables != null);
    }
    if (this.options.paramsVariables == null) return;

    var parametersPanel = document.createElement("div");
    parametersPanel.menus = {};
    this.controls.parametersPanel = parametersPanel;
    this.controls.mainPanel.appendChild(parametersPanel);
    parametersPanel.className = "stiJsViewerParametersPanel";
    parametersPanel.id = this.controls.viewer.id + "_ParametersPanel";
    parametersPanel.style.display = "none";
    parametersPanel.visible = false;
    parametersPanel.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") parametersPanel.style.color = this.options.toolbar.fontColor;
    parametersPanel.jsObject = this;
    parametersPanel.currentOpeningParameter = null;
    parametersPanel.dropDownButtonWasClicked = false;
    parametersPanel.dateTimeButtonWasClicked = false;

    var innerPanel = document.createElement("div");
    parametersPanel.appendChild(innerPanel);
    innerPanel.style.padding = "0 2px 2px 2px";
    parametersPanel.style.top = (this.controls.drillDownPanel.offsetHeight +
        (this.options.toolbar.visible ? this.controls.toolbar.offsetHeight : 0) +
        (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0)) + "px";

    //Container
    parametersPanel.container = document.createElement("div");
    innerPanel.appendChild(parametersPanel.container);
    parametersPanel.container.className = "stiJsViewerInnerContainerParametersPanel";
    if (this.options.toolbar.backgroundColor != "") parametersPanel.container.style.background = this.options.toolbar.backgroundColor;
    if (this.options.toolbar.borderColor != "") parametersPanel.container.style.border = "1px solid " + this.options.toolbar.borderColor;
    parametersPanel.container.id = parametersPanel.id + "Container";
    parametersPanel.container.style.maxHeight = this.options.appearance.parametersPanelMaxHeight + "px";
    parametersPanel.container.jsObject = this;

    //Buttons
    var mainButtons = this.CreateHTMLTable();
    parametersPanel.mainButtons = mainButtons;
    mainButtons.setAttribute("align", "right");
    mainButtons.style.margin = "5px 0 10px 0";
    mainButtons.ID = parametersPanel.id + "MainButtons";

    parametersPanel.mainButtons.reset = this.FormButton("Reset", this.collections.loc["Reset"], null, 80);
    parametersPanel.mainButtons.submit = this.FormButton("Submit", this.collections.loc["Submit"], null, 80);
    mainButtons.addCell(parametersPanel.mainButtons.reset);
    mainButtons.addCell(parametersPanel.mainButtons.submit).style.paddingLeft = "10px";

    if (!this.options.isTouchDevice) {
        parametersPanel.container.onscroll = function () { parametersPanel.hideAllMenus(); }
    }

    parametersPanel.changeVisibleState = function (state) {
        var options = parametersPanel.jsObject.options;
        var controls = parametersPanel.jsObject.controls;
        parametersPanel.style.display = state ? "" : "none";
        parametersPanel.visible = state;
        if (options.toolbar.visible && options.toolbar.showParametersButton) controls.toolbar.controls.Parameters.setSelected(state);
        controls.reportPanel.style.marginTop = (controls.reportPanel.style.position == "relative"
            ? parametersPanel.offsetHeight
            : (controls.drillDownPanel.offsetHeight + parametersPanel.offsetHeight)) + "px";
        if (controls.bookmarksPanel != null)
            controls.bookmarksPanel.style.top = ((options.toolbar.visible ? controls.toolbar.offsetHeight : 0) +
                controls.drillDownPanel.offsetHeight + (controls.findPanel ? controls.findPanel.offsetHeight : 0) + parametersPanel.offsetHeight) + "px";
    }

    parametersPanel.addParameters = function () {
        var paramsVariables = this.jsObject.copyObject(parametersPanel.jsObject.options.paramsVariables);
        var countParameters = this.jsObject.getCountObjects(paramsVariables);
        var countColumns = (countParameters <= 5) ? 1 : parametersPanel.jsObject.options.appearance.parametersPanelColumnsCount;
        var countInColumn = parseInt(countParameters / countColumns);
        if (countInColumn * countColumns < countParameters) countInColumn++;

        var table = document.createElement("table");
        table.cellPadding = 0;
        table.cellSpacing = 0;
        table.style.border = 0;
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        this.container.appendChild(table);

        var cellsVar = {};
        for (var indexRow = 0; indexRow < countInColumn + 1; indexRow++) {
            var row = document.createElement("tr");
            tbody.appendChild(row);

            for (indexColumn = 0; indexColumn < countColumns; indexColumn++) {
                var cellForName = document.createElement("td");
                cellForName.style.padding = "0 10px 0 " + ((indexColumn > 0) ? "30px" : 0);
                row.appendChild(cellForName);

                var cellForControls = document.createElement("td");
                cellForControls.style.padding = 0;
                row.appendChild(cellForControls);

                cellsVar[indexRow + ";" + indexColumn + "name"] = cellForName;
                cellsVar[indexRow + ";" + indexColumn + "controls"] = cellForControls;
            }
        }

        var indexColumn = 0;
        var indexRow = 0;

        for (var index = 0; index < countParameters; index++) {
            cellsVar[indexRow + ";" + indexColumn + "name"].style.whiteSpace = "nowrap";
            cellsVar[indexRow + ";" + indexColumn + "name"].innerHTML = paramsVariables[index].alias;
            cellsVar[indexRow + ";" + indexColumn + "controls"].appendChild(parametersPanel.jsObject.CreateParameter(paramsVariables[index]));
            indexRow++;
            if (index == countParameters - 1) cellsVar[indexRow + ";" + indexColumn + "controls"].appendChild(parametersPanel.mainButtons);
            if (indexRow == countInColumn) { indexRow = 0; indexColumn++; }
        }
    }

    parametersPanel.clearParameters = function () {
        while (parametersPanel.container.childNodes[0]) {
            parametersPanel.container.removeChild(parametersPanel.container.childNodes[0]);
        }
    }

    parametersPanel.getParametersValues = function () {
        parametersValues = {};

        for (var name in parametersPanel.jsObject.options.parameters) {
            var parameter = parametersPanel.jsObject.options.parameters[name];
            parametersValues[name] = parameter.getValue();
        }

        return parametersValues;
    }

    parametersPanel.hideAllMenus = function () {
        if (parametersPanel.jsObject.options.currentMenu) parametersPanel.jsObject.options.currentMenu.changeVisibleState(false);
        if (parametersPanel.jsObject.options.currentDatePicker) parametersPanel.jsObject.options.currentDatePicker.changeVisibleState(false);
    }

    this.options.parameters = {};
    parametersPanel.addParameters();
    parametersPanel.changeVisibleState(true);
}

//Button
StiJsViewer.prototype.ParameterButton = function (buttonType, parameter) {
    var button = this.SmallButton(null, null, buttonType + ".png", null, null, "stiJsViewerFormButton");
    button.style.height = this.options.isTouchDevice ? "26px" : "21px";
    button.style.height = this.options.isTouchDevice ? "26px" : "21px";
    button.innerTable.style.width = "100%";
    button.imageCell.style.textAlign = "center";
    button.parameter = parameter;
    button.buttonType = buttonType;

    return button;
}

//TextBox
StiJsViewer.prototype.ParameterTextBox = function (parameter) {
    var textBox = this.TextBox(null, null, null, true);
    textBox.parameter = parameter;
    if (parameter.params.type == "Char") textBox.maxLength = 1;

    var width = "210px";
    if (parameter.params.basicType == "Range") {
        width = "140px";
        if (parameter.params.type == "Guid" || parameter.params.type == "String") width = "190px";
        if (parameter.params.type == "DateTime") width = "235px";
        if (parameter.params.type == "Char") width = "60px";
    }
    else {
        if (parameter.params.type == "Guid") width = "265px"; else width = "210px";
    }
    textBox.style.width = width;

    if (parameter.params.type == "DateTime") {
        textBox.action = function () {
            if (this.oldValue == this.value) return;
            try {
                var timeString = new Date().toLocaleTimeString();
                var isAmericanFormat = timeString.toLowerCase().indexOf("am") >= 0 || timeString.toLowerCase().indexOf("pm") >= 0;
                var formatDate = isAmericanFormat ? "MM/dd/yyyy" : "dd.MM.yyyy";
                var format = formatDate + " hh:mm:ss";
                if (textBox.parameter.params.dateTimeType == "Date") format = formatDate;
                if (textBox.parameter.params.dateTimeType == "Time") format = "hh:mm:ss";
                var date = textBox.jsObject.GetDateTimeFromString(this.value, format);
                var dateTimeObject = textBox.jsObject.getNowDateTimeObject(date);
                textBox.parameter.params[textBox.parameter.controls.secondTextBox == textBox ? "keyTo" : "key"] = dateTimeObject;
                textBox.value = textBox.jsObject.dateTimeObjectToString(dateTimeObject, textBox.parameter.params.dateTimeType);
            }
            catch (e) {
                alert(e);
            }
        }
    }

    return textBox;
}

//CheckBox
StiJsViewer.prototype.ParameterCheckBox = function (parameter) {
    var checkBox = this.CheckBox();
    checkBox.parameter = parameter;

    return checkBox;
}

//Menu
StiJsViewer.prototype.ParameterMenu = function (parameter) {
    var menu = this.BaseMenu(null, parameter.controls.dropDownButton, "Down", "stiJsViewerDropdownMenu");
    menu.parameter = parameter;

    menu.changeVisibleState = function (state, parentButton) {
        var mainClassName = "stiJsViewerMainPanel";
        if (parentButton) {
            this.parentButton = parentButton;
            parentButton.haveMenu = true;
        }
        if (state) {
            this.onshow();
            this.style.display = "";
            this.visible = true;
            this.style.overflow = "hidden";
            this.parentButton.setSelected(true);
            this.jsObject.options.currentMenu = this;
            this.style.width = this.innerContent.offsetWidth + "px";
            this.style.height = this.innerContent.offsetHeight + "px";
            this.style.left = (this.jsObject.FindPosX(parameter, mainClassName)) + "px";
            this.style.top = (this.animationDirection == "Down")
                ? (this.jsObject.FindPosY(this.parentButton, mainClassName) + this.parentButton.offsetHeight + 2) + "px"
                : (this.jsObject.FindPosY(this.parentButton, mainClassName) - this.offsetHeight) + "px";
            this.innerContent.style.top = ((this.animationDirection == "Down" ? -1 : 1) * this.innerContent.offsetHeight) + "px";
            parameter.menu = this;

            d = new Date();
            var endTime = d.getTime();
            if (this.jsObject.options.toolbar.menuAnimation) endTime += this.jsObject.options.menuAnimDuration;
            this.jsObject.ShowAnimationVerticalMenu(this, (this.animationDirection == "Down" ? 0 : -1), endTime);
        }
        else {
            this.onHide();
            clearTimeout(this.innerContent.animationTimer);
            this.visible = false;
            this.parentButton.setSelected(false);
            this.style.display = "none";
            this.jsObject.controls.mainPanel.removeChild(this);
            parameter.menu = null;
            if (this.jsObject.options.currentMenu == this) this.jsObject.options.currentMenu = null;
        }
    }

    var table = this.CreateHTMLTable();
    table.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") table.style.color = this.options.toolbar.fontColor;
    table.style.fontSize = "12px";
    table.style.width = (parameter.offsetWidth - 5) + "px";
    table.className = "stiJsViewerClearAllStyles stiJsViewerParametersMenuInnerTable";
    menu.innerContent.appendChild(table);
    menu.innerTable = table;

    return menu;
}

//MenuItem
StiJsViewer.prototype.parameterMenuItem = function (parameter) {
    var menuItem = document.createElement("div");
    menuItem.jsObject = this;
    menuItem.parameter = parameter;
    menuItem.isOver = false;
    menuItem.className = "stiJsViewerParametersMenuItem";
    menuItem.style.height = this.options.isTouchDevice ? "30px" : "24px";

    var table = this.CreateHTMLTable();
    table.className = "stiJsViewerClearAllStyles stiJsViewerParametersMenuItemInnerTable";
    menuItem.appendChild(table);

    menuItem.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    menuItem.onmouseenter = function () {
        this.className = "stiJsViewerParametersMenuItemOver";
        this.isOver = true;
    }
    menuItem.onmouseleave = function () {
        this.className = "stiJsViewerParametersMenuItem";
        this.isOver = false;
    }

    menuItem.onmousedown = function () {
        if (this.isTouchStartFlag) return;
        this.className = "stiJsViewerParametersMenuItemPressed";
    }

    menuItem.ontouchstart = function () {
        var this_ = this;
        this.isTouchStartFlag = true;
        clearTimeout(this.isTouchStartTimer);
        this.parameter.jsObject.options.fingerIsMoved = false;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    menuItem.onmouseup = function () {
        if (this.isTouchEndFlag) return;
        this.parameter.jsObject.TouchEndMenuItem(this.id, false);
    }

    menuItem.ontouchend = function () {
        var this_ = this;
        this.isTouchEndFlag = true;
        clearTimeout(this.isTouchEndTimer);
        this.parameter.jsObject.TouchEndMenuItem(this.id, true);
        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    menuItem.innerContainer = table.addCell();
    menuItem.innerContainer.style.padding = "0 5px 0 5px";

    return menuItem;
}

StiJsViewer.prototype.TouchEndMenuItem = function (menuItemId, flag) {
    var menuItem = document.getElementById(menuItemId);
    if (!menuItem || menuItem.parameter.jsObject.options.fingerIsMoved) return;

    if (flag) {
        menuItem.className = "stiJsViewerParametersMenuItemPressed";
        if (typeof event !== "undefined" && ('preventDefault' in event)) event.preventDefault();
        setTimeout("js" + menuItem.parameter.jsObject.controls.viewer.id + ".TouchEndMenuItem('" + menuItem.id + "', false)", 200);
        return;
    }

    menuItem.className = menuItem.isOver ? "stiJsViewerParametersMenuItemOver" : "stiJsViewerParametersMenuItem";
    if (menuItem.action != null) menuItem.action();
}

//MenuSeparator
StiJsViewer.prototype.parameterMenuSeparator = function () {
    var separator = document.createElement("Div");
    separator.className = "stiJsViewerParametersMenuSeparator";

    return separator;
}

//Menu For Value
StiJsViewer.prototype.parameterMenuForValue = function (parameter) {
    var menuParent = this.ParameterMenu(parameter);
    for (var index in parameter.params.items) {
        var cell = menuParent.innerTable.addCellInNextRow();
        var menuItem = this.parameterMenuItem(parameter);
        cell.appendChild(menuItem);

        menuItem.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "Item" + index;
        menuItem.parameter = parameter;
        menuItem.key = parameter.params.items[index].key;
        menuItem.value = parameter.params.items[index].value;
        menuItem.innerContainer.innerHTML =
            (menuItem.value != "" && parameter.params.type != "DateTime" && parameter.params.type != "TimeSpan" && parameter.params.type != "Bool")
                ? menuItem.value
                : this.getStringKey(menuItem.key, menuItem.parameter);

        menuItem.action = function () {
            this.parameter.params.key = this.key;
            if (this.parameter.params.type != "Bool")
                this.parameter.controls.firstTextBox.value = (this.parameter.params.type == "DateTime" || this.parameter.params.type == "TimeSpan")
                    ? this.parameter.jsObject.getStringKey(this.key, this.parameter)
                    : (this.parameter.params.allowUserValues ? this.key : (this.value != "" ? this.value : this.key));
            else
                this.parameter.controls.boolCheckBox.setChecked(this.key == "True");
            this.parameter.changeVisibleStateMenu(false);

            if (this.parameter.params.binding) {
                var params = { action: "InitVars", variables: this.jsObject.controls.parametersPanel.getParametersValues() };
                this.jsObject.postInteraction(params);
            }
        }
    }

    return menuParent;
}

//Menu For Range
StiJsViewer.prototype.parameterMenuForRange = function (parameter) {
    var menuParent = this.ParameterMenu(parameter);

    for (var index in parameter.params.items) {
        var cell = menuParent.innerTable.addCellInNextRow();
        var menuItem = this.parameterMenuItem(parameter);
        cell.appendChild(menuItem);

        menuItem.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "Item" + index;
        menuItem.parameter = parameter;
        menuItem.value = parameter.params.items[index].value;
        menuItem.key = parameter.params.items[index].key;
        menuItem.keyTo = parameter.params.items[index].keyTo;
        menuItem.innerContainer.innerHTML = menuItem.value + " [" + this.getStringKey(menuItem.key, menuItem.parameter) +
            " - " + this.getStringKey(menuItem.keyTo, menuItem.parameter) + "]";

        menuItem.action = function () {
            this.parameter.params.key = this.key;
            this.parameter.params.keyTo = this.keyTo;
            this.parameter.controls.firstTextBox.value = this.parameter.jsObject.getStringKey(this.key, this.parameter);
            this.parameter.controls.secondTextBox.value = this.parameter.jsObject.getStringKey(this.keyTo, this.parameter);
            this.parameter.changeVisibleStateMenu(false);
        }
    }

    return menuParent;
}

//Menu For ListNotEdit
StiJsViewer.prototype.parameterMenuForNotEditList = function (parameter) {
    var menuParent = this.ParameterMenu(parameter);
    menuParent.menuItems = {};
    var selectedAll = true;

    for (var index in parameter.params.items) {
        var cell = menuParent.innerTable.addCellInNextRow();
        menuItem = this.parameterMenuItem(parameter);
        cell.appendChild(menuItem);

        menuItem.action = null;
        menuItem.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "Item" + index;
        menuItem.parameter = parameter;
        menuItem.value = parameter.params.items[index].value;
        menuItem.key = parameter.params.items[index].key;
        menuParent.menuItems[index] = menuItem;

        var innerTable = this.CreateHTMLTable();
        menuItem.innerContainer.appendChild(innerTable);
        var cellCheck = innerTable.addCell();

        var checkBox = this.ParameterCheckBox(parameter);
        checkBox.style.marginRight = "5px";
        cellCheck.appendChild(checkBox);
        checkBox.menuParent = menuParent;
        checkBox.setChecked(parameter.params.items[index].isChecked);
        menuItem.checkBox = checkBox;
        if (!checkBox.isChecked) selectedAll = false;

        checkBox.onChecked = function () {
            this.parameter.params.items = {};
            this.parameter.controls.firstTextBox.value = "";
            var selectAll = true;

            for (var index in this.menuParent.menuItems) {
                this.parameter.params.items[index] = {};
                this.parameter.params.items[index].key = this.menuParent.menuItems[index].key;
                this.parameter.params.items[index].value = this.menuParent.menuItems[index].value;
                this.parameter.params.items[index].isChecked = this.menuParent.menuItems[index].checkBox.isChecked;

                if (selectAll && !this.menuParent.menuItems[index].checkBox.isChecked) {
                    selectAll = false;
                }

                if (this.parameter.params.items[index].isChecked) {
                    if (this.parameter.controls.firstTextBox.value != "") this.parameter.controls.firstTextBox.value += ";";
                    this.parameter.controls.firstTextBox.value += this.menuParent.menuItems[index].value != "" ? this.menuParent.menuItems[index].value : this.parameter.jsObject.getStringKey(this.menuParent.menuItems[index].key, this.parameter);
                }
            }

            menuParent.checkBoxSelectAll.setChecked(selectAll);
        }

        var cellText = innerTable.addCell();
        cellText.style.whiteSpace = "nowrap";
        cellText.innerHTML = menuItem.value != "" ? menuItem.value : this.getStringKey(menuItem.key, menuItem.parameter);

        if (index == this.getCountObjects(parameter.params.items) - 1) {
            var closeButton = this.parameterMenuItem(parameter);
            closeButton.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "ItemClose";
            closeButton.innerContainer.innerHTML = this.collections.loc["Close"];
            closeButton.innerContainer.style.paddingLeft = "13px";
            closeButton.action = function () { this.parameter.changeVisibleStateMenu(false); }
            cell.appendChild(this.parameterMenuSeparator());
            var checkBoxSelectAll = this.CheckBox(null, this.collections.loc["SelectAll"]);
            menuParent.checkBoxSelectAll = checkBoxSelectAll;
            checkBoxSelectAll.style.margin = "8px 7px 8px 7px";
            cell.appendChild(checkBoxSelectAll);
            cell.appendChild(this.parameterMenuSeparator());
            cell.appendChild(closeButton);
            checkBoxSelectAll.setChecked(selectedAll);
            checkBoxSelectAll.action = function () {
                var selectAll = this.isChecked;
                for (var index in parameter.params.items) {
                    menuParent.menuItems[index].checkBox.setChecked(selectAll);
                }
            }
        }
    }

    return menuParent;
}

//Menu For ListEdit
StiJsViewer.prototype.parameterMenuForEditList = function (parameter) {
    var menuParent = this.ParameterMenu(parameter);

    //New Item Method
    menuParent.newItem = function (item, parameter) {
        var menuItem = parameter.jsObject.parameterMenuItem(parameter);
        //cell.appendChild(menuItem);
        menuItem.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "Item" + parameter.jsObject.newGuid().replace(/-/g, '');
        menuItem.onmouseover = null;
        menuItem.onmousedown = null;
        menuItem.ontouchend = null;
        menuItem.action = null;
        menuItem.parameter = parameter;
        menuItem.value = item.value;
        menuItem.key = item.key;

        var innerTable = menuItem.jsObject.CreateHTMLTable();
        menuItem.innerContainer.appendChild(innerTable);

        //Text Box        
        var textBox = parameter.jsObject.ParameterTextBox(parameter);
        menuItem.textBox = textBox;
        //textBox.setReadOnly(parameter.params.type == "DateTime");
        textBox.value = parameter.jsObject.getStringKey(menuItem.key, menuItem.parameter);
        textBox.thisMenu = menuParent;
        innerTable.addCell(textBox).style.padding = "0 1px 0 0";

        //DateTime Button
        if (parameter.params.type == "DateTime") {
            var dateTimeButton = parameter.jsObject.ParameterButton("DateTimeButton", parameter);
            dateTimeButton.id = menuItem.id + "DateTimeButton";
            dateTimeButton.parameter = parameter;
            dateTimeButton.thisItem = menuItem;
            innerTable.addCell(dateTimeButton).style.padding = "0 1px 0 1px";

            dateTimeButton.action = function () {
                var datePicker = dateTimeButton.jsObject.controls.datePicker;
                datePicker.ownerValue = this.thisItem.key;
                datePicker.parentDataControl = this.thisItem.textBox;
                datePicker.parentButton = this;                
                datePicker.changeVisibleState(!datePicker.visible);
            }
        }

        //Guid Button
        if (parameter.params.type == "Guid") {
            var guidButton = parameter.jsObject.ParameterButton("GuidButton", parameter);
            guidButton.id = menuItem.id + "GuidButton";
            guidButton.thisItem = menuItem;
            guidButton.thisMenu = menuParent;
            innerTable.addCell(guidButton).style.padding = "0 1px 0 1px";

            guidButton.action = function () {
                this.thisItem.textBox.value = this.parameter.jsObject.newGuid();
                this.thisMenu.updateItems();
            }
        }

        //Remove Button                        
        var removeButton = parameter.jsObject.ParameterButton("RemoveItemButton", parameter);
        removeButton.id = menuItem.id + "RemoveButton";
        removeButton.itemsContainer = this.itemsContainer;
        removeButton.thisItem = menuItem;
        removeButton.thisMenu = menuParent;
        innerTable.addCell(removeButton).style.padding = "0 1px 0 1px";
        removeButton.action = function () {
            this.itemsContainer.removeChild(this.thisItem);
            this.thisMenu.updateItems();
        }

        return menuItem;
    }

    //Update Items
    menuParent.updateItems = function () {
        this.parameter.params.items = {};
        this.parameter.controls.firstTextBox.value = "";
        for (index = 0; index < this.itemsContainer.childNodes.length; index++) {
            itemMenu = this.itemsContainer.childNodes[index];
            this.parameter.params.items[index] = {};
            this.parameter.params.items[index].key =
                (this.parameter.params.type == "DateTime")
                ? itemMenu.key
                : itemMenu.textBox.value;
            this.parameter.params.items[index].value = itemMenu.value;
            if (this.parameter.controls.firstTextBox.value != "") this.parameter.controls.firstTextBox.value += ";";
            this.parameter.controls.firstTextBox.value += this.parameter.jsObject.getStringKey(this.parameter.params.items[index].key, this.parameter);
        }

        if (this.parameter.menu.innerTable.offsetHeight > 400) this.parameter.menu.style.height = "350px;"
        else this.parameter.menu.style.height = this.parameter.menu.innerTable.offsetHeight + "px";
    }

    //New Item Button
    var newItemButton = this.parameterMenuItem(parameter);
    menuParent.innerTable.addCell(newItemButton);
    newItemButton.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "ItemNew";
    newItemButton.innerContainer.innerHTML = this.collections.loc["NewItem"];
    newItemButton.thisMenu = menuParent;
    newItemButton.action = function () {
        var item_ = {};
        if (this.parameter.params.type == "DateTime") {
            item_.key = this.parameter.jsObject.getNowDateTimeObject();
            item_.value = this.parameter.jsObject.dateTimeObjectToString(item_.key, this.parameter);
        }
        else if (this.parameter.params.type == "TimeSpan") {
                item_.key = "00:00:00";
                item_.value = "00:00:00";
            }
            else if (this.parameter.params.type == "Bool") {
                    item_.key = "False";
                    item_.value = "False";
                }
                else {
                    item_.key = "";
                    item_.value = "";
                }        
        var newItem = this.thisMenu.newItem(item_, this.parameter);
        this.thisMenu.itemsContainer.appendChild(newItem);
        if ("textBox" in newItem) newItem.textBox.focus();
        this.thisMenu.updateItems();
    }

    //Add Items
    var cellItems = menuParent.innerTable.addCellInNextRow();
    menuParent.itemsContainer = cellItems;

    for (var index in parameter.params.items) {
        cellItems.appendChild(menuParent.newItem(parameter.params.items[index], parameter));
    }

    var cellDown = menuParent.innerTable.addCellInNextRow();

    //Remove All Button
    var removeAllButton = this.parameterMenuItem(parameter);
    cellDown.appendChild(removeAllButton);
    removeAllButton.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "ItemRemoveAll";
    removeAllButton.innerContainer.innerHTML = this.collections.loc["RemoveAll"];
    removeAllButton.thisMenu = menuParent;
    removeAllButton.action = function () {
        while (this.thisMenu.itemsContainer.childNodes[0]) {
            this.thisMenu.itemsContainer.removeChild(this.thisMenu.itemsContainer.childNodes[0]);
        }
        this.thisMenu.updateItems();
    }

    //Close Button
    cellDown.appendChild(this.parameterMenuSeparator());
    var closeButton = this.parameterMenuItem(parameter);
    cellDown.appendChild(closeButton);
    closeButton.id = parameter.jsObject.controls.viewer.id + parameter.params.name + "ItemClose";
    closeButton.innerContainer.innerHTML = this.collections.loc["Close"];
    closeButton.action = function () { this.parameter.changeVisibleStateMenu(false); }

    return menuParent;
}

StiJsViewer.prototype.ReplaceMonths = function (value) {
    for (var i = 1; i <= 12; i++) {
        var enName = "";
        var locName = "";
        switch (i) {
            case 1:
                enName = "January";
                locName = this.collections.loc.MonthJanuary;
                break;

            case 2:
                enName = "February";
                locName = this.collections.loc.MonthFebruary;
                break;

            case 3:
                enName = "March";
                locName = this.collections.loc.MonthMarch;
                break;

            case 4:
                enName = "April";
                locName = this.collections.loc.MonthApril;
                break;

            case 5:
                enName = "May";
                locName = this.collections.loc.MonthMay;
                break;

            case 6:
                enName = "June";
                locName = this.collections.loc.MonthJune;
                break;

            case 7:
                enName = "July";
                locName = this.collections.loc.MonthJuly;
                break;

            case 8:
                enName = "August";
                locName = this.collections.loc.MonthAugust;
                break;

            case 9:
                enName = "September";
                locName = this.collections.loc.MonthSeptember;
                break;

            case 10:
                enName = "October";
                locName = this.collections.loc.MonthOctober;
                break;

            case 11:
                enName = "November";
                locName = this.collections.loc.MonthNovember;
                break;

            case 12:
                enName = "December";
                locName = this.collections.loc.MonthDecember;
                break;
        }

        var enShortName = enName.substring(0, 3);
        var locShortName = locName.substring(0, 3);
        value = value.replace(enName, i).replace(enName.toLowerCase(), i).replace(enShortName, i).replace(enShortName.toLowerCase(), i);
        value = value.replace(locName, i).replace(locName.toLowerCase(), i).replace(locShortName, i).replace(locShortName.toLowerCase(), i);

    }

    return value;
}

StiJsViewer.prototype.GetDateTimeFromString = function (value, format) {
    var charIsDigit = function (char) {
        return ("0123456789".indexOf(char) >= 0);
    }

    if (!value) return new Date();
    value = this.ReplaceMonths(value);

    var dateTime = new Date();

    // If the date format is not specified, then deserializator for getting date and time is applied
    if (format == null) format = "dd.MM.yyyy hh:mm:ss";
    // Otherwise the format is parsed. Now only numeric date and time formats are supported

    var year = 1970;
    var month = 1;
    var day = 1;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var millisecond = 0;

    var char = "";
    var pos = 0;
    var values = [];

    // Parse date and time into separate numeric values
    while (pos < value.length) {
        char = value.charAt(pos);
        if (charIsDigit(char)) {
            values.push(char);
            pos++;

            while (pos < value.length && charIsDigit(value.charAt(pos))) {
                values[values.length - 1] += value.charAt(pos);
                pos++;
            }

            values[values.length - 1] = this.StrToInt(values[values.length - 1]);
        }

        pos++;
    }

    pos = 0;
    var charCount = 0;
    var index = -1;
    var is12hour = false;

    // Parsing format and replacement of appropriate values of date and time
    while (pos < format.length && index + 1 < values.length) {
        char = format.charAt(pos);
        charCount = 0;

        if (char == "Y" || char == "y" || char == "M" || char == "d" || char == "h" || char == "H" ||
						char == "m" || char == "s" || char == "f" || char == "F" || char == "t" || char == "z") {
            index++;

            while (pos < format.length && format.charAt(pos) == char) {
                pos++;
                charCount++;
            }
        }

        switch (char) {
            case "Y": // full year
                year = values[index];
                break;

            case "y": // year
                if (values[index] < 1000) year = 2000 + values[index];
                else year = values[index];
                break;

            case "M": // month
                month = values[index];
                break;

            case "d": // day
                day = values[index];
                break;

            case "h": // (hour 12)
                is12hour = true;

            case "H": // (hour 24)
                hour = values[index];
                break;

            case "m": // minute
                minute = values[index];
                break;

            case "s": // second
                second = values[index];
                break;

            case "f": // second fraction
            case "F": // second fraction, trailing zeroes are trimmed
                millisecond = values[index];
                break;

            case "t": // PM or AM
                if (value.toLowerCase().indexOf("am") >= 0 && hour == 12) hour = 0;
                if (value.toLowerCase().indexOf("pm") >= 0 && hour < 12) hour += 12;
                break;

            default:
                pos++;
                break;
        }
    }
    dateTime = new Date(year, month - 1, day, hour, minute, second, millisecond);

    return dateTime;
}

StiJsViewer.prototype.InitializeProcessImage = function () {
    /*var processImage = document.createElement("div");
    processImage.style.fontFamily = this.options.toolbar.fontFamily;
    var innerTable = this.CreateHTMLTable();
    processImage.appendChild(innerTable);
    processImage.jsObject = this;
    processImage.style.display = "none";
    processImage.className = "stiJsViewerProcessImage";
    this.controls.processImage = processImage;
    this.controls.mainPanel.appendChild(processImage);

    //Image
    var processImageIMG = document.createElement("img");
    processImage.img = processImageIMG;
    processImageIMG.src = this.collections.images["Loading.gif"];
    innerTable.addCell(processImageIMG).style.padding = "5px 7px 5px 30px";

    var textCell = innerTable.addCell();
    textCell.innerHTML = this.collections.loc["Loading"];
    textCell.style.padding = "5px 30px 5px 0";*/

    var processImage = this.Progress();
    processImage.jsObject = this;
    processImage.style.display = "none";
    this.controls.processImage = processImage;
    this.controls.mainPanel.appendChild(processImage);
    processImage.style.left = "50%"
    processImage.style.marginLeft = "-32px";

    if (this.options.appearance.fullScreenMode) {
        processImage.style.top = "50%"
        processImage.style.marginTop = "-100px";
    }
    else {
        processImage.style.top = "250px";
    }

    processImage.show = function () {
        this.style.display = "";
        //this.jsObject.setObjectToCenter(this);
    }

    processImage.hide = function () {
        this.style.display = "none";
    }

    return processImage;
}

StiJsViewer.prototype.Progress = function () {
    var progressContainer = document.createElement("div");
    progressContainer.style.position = "absolute";
    progressContainer.style.zIndex = "1000";

    var progress = document.createElement("div");
    progressContainer.appendChild(progress);
    progress.className = "js_viewer_loader";

    return progressContainer;
}


StiJsViewer.prototype.RadioButton = function (name, groupName, caption, tooltip) {
    var radioButton = this.CreateHTMLTable();
    radioButton.style.fontFamily = this.options.toolbar.fontFamily;
    radioButton.jsObject = this;
    radioButton.name = name;
    radioButton.isEnabled = true;
    radioButton.isChecked = false;
    radioButton.groupName = groupName;
    radioButton.className = "stiJsViewerRadioButton";
    radioButton.captionText = caption;
    if (tooltip) radioButton.setAttribute("title", tooltip);
    if (name) {
        if (!this.controls.radioButtons) this.controls.radioButtons = {};
        this.controls.radioButtons[name] = radioButton;
    }

    radioButton.outCircle = document.createElement("div");
    radioButton.outCircle.className = "stiJsViewerRadioButtonOutCircle";
    radioButton.circleCell = radioButton.addCell(radioButton.outCircle);

    radioButton.innerCircle = document.createElement("div");
    radioButton.innerCircle.style.visibility = "hidden";
    radioButton.innerCircle.className = "stiJsViewerRadioButtonInnerCircle";

    radioButton.innerCircle.style.margin = this.options.isTouchDevice ? "4px" : "3px";
    radioButton.innerCircle.style.width = this.options.isTouchDevice ? "9px" : "7px";
    radioButton.innerCircle.style.height = this.options.isTouchDevice ? "9px" : "7px";
    radioButton.outCircle.appendChild(radioButton.innerCircle);

    //Caption
    if (caption != null) {
        radioButton.captionCell = radioButton.addCell();
        radioButton.captionCell.style.paddingLeft = "4px";
        radioButton.captionCell.style.whiteSpace = "nowrap";
        radioButton.captionCell.innerHTML = caption;
    }

    radioButton.lastCell = radioButton.addCell();

    radioButton.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    radioButton.onmouseenter = function () {
        if (!this.isEnabled) return;
        this.outCircle.className = "stiJsViewerRadioButtonOutCircleOver";
    }

    radioButton.onmouseleave = function () {
        if (!this.isEnabled) return;
        this.outCircle.className = "stiJsViewerRadioButtonOutCircle";
    }

    radioButton.onclick = function () {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick) return;
        radioButton.setChecked(true);
        radioButton.action();
    }

    radioButton.ontouchend = function () {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved) return;        
        this.outCircle.className = "stiJsViewerRadioButtonOutCircleOver";
        var this_ = this;
        this.isTouchEndFlag = true;
        clearTimeout(this.isTouchEndTimer);
        setTimeout(function () {
            this_.outCircle.className = "stiJsViewerRadioButtonOutCircle";
            this_.setChecked(true);
            this_.action();
        }, 150);
        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    radioButton.ontouchstart = function () {
        this.jsObject.options.fingerIsMoved = false;
    }

    radioButton.setEnabled = function (state) {
        this.innerCircle.style.opacity = state ? "1" : "0.5";
        this.isEnabled = state;
        this.className = state ? "stiJsViewerRadioButton" : "stiJsViewerRadioButtonDisabled";
        this.outCircle.className = state ? "stiJsViewerRadioButtonOutCircle" : "stiJsViewerRadioButtonOutCircleDisabled";
    }

    radioButton.setChecked = function (state) {
        if (this.groupName && state)
            for (var name in this.jsObject.controls.radioButtons) {
                if (this.groupName == this.jsObject.controls.radioButtons[name].groupName)
                    this.jsObject.controls.radioButtons[name].setChecked(false);
            }

        this.innerCircle.style.visibility = (state) ? "visible" : "hidden";
        this.isChecked = state;
        this.onChecked();
    }

    radioButton.onChecked = function () { }
    radioButton.action = function () { }

    return radioButton;
}

StiJsViewer.prototype.InitializeReportPanel = function () {
    var reportPanel = document.createElement("div");
    reportPanel.id = this.controls.viewer.id + "ReportPanel";
    reportPanel.jsObject = this;
    this.controls.reportPanel = reportPanel;
    this.controls.mainPanel.appendChild(reportPanel);
    reportPanel.style.textAlign = this.options.appearance.pageAlignment == "default" ? "center" : this.options.appearance.pageAlignment;
    reportPanel.className = "stiJsViewerReportPanel";
    reportPanel.style.bottom = "0px";
    reportPanel.pages = [];

    reportPanel.addPage = function (pageAttributes) {
        if (!pageAttributes) return null;
        var page = document.createElement("DIV");
        page.jsObject = this.jsObject;
        reportPanel.appendChild(page);
        reportPanel.pages.push(page);

        page.loadContent = function (pageContent) {
            page.style.display = "inline-block";
            var pageAttributes = pageContent[0];
            page.style.background = pageAttributes["background"] == "Transparent" ? "White" : pageAttributes["background"];
            page.innerHTML = pageAttributes["content"];
        }

        page.className = this.jsObject.options.appearance.showPageShadow ? "stiJsViewerPageShadow" : "stiJsViewerPage";

        var pageSizes = pageAttributes["sizes"].split(";");
        var marginsPx = pageAttributes["margins"].split(" ");
        var margins = [];
        for (var i = 0; i < marginsPx.length; i++) {
            margins.push(parseInt(marginsPx[i].replace("px", "")));
        }

        page.margins = margins;
        page.pageWidth = parseInt(pageSizes[0]);
        page.pageHeight = parseInt(pageSizes[1]);
        page.style.overflow = "hidden";
        page.style.margin = "10px";
        page.style.display = "inline-block";
        page.style.verticalAlign = "top";
        page.style.padding = pageAttributes["margins"];
        page.style.border = "1px solid " + this.jsObject.options.appearance.pageBorderColor;
        page.style.color = "#000000";
        page.style.background = pageAttributes["background"] == "Transparent" ? "White" : pageAttributes["background"];
        page.style.boxSizing = "content-box";
        page.innerHTML = pageAttributes["content"];
        this.jsObject.reportParams.pagesWidth = page.offsetWidth || page.pageWidth;
        this.jsObject.reportParams.pagesHeight = page.offsetHeight || page.pageHeight;

        //Correct Watermark
        for (var i = 0; i < page.childNodes.length; i++) {
            if (page.childNodes[i].style && page.childNodes[i].style.backgroundImage) {
                page.style.backgroundImage = page.childNodes[i].style.backgroundImage;
                page.childNodes[i].style.backgroundImage = "";
                page.childNodes[i].style.backgroundColor = "";
                break;
            }
        }

        //Correct Watermark
        for (var i = 0; i < page.childNodes.length; i++) {
            if (page.childNodes[i].style && page.childNodes[i].style.backgroundImage) {
                page.style.backgroundImage = page.childNodes[i].style.backgroundImage;
                page.childNodes[i].style.backgroundImage = "";
                page.childNodes[i].style.backgroundColor = "";
                break;
            }
        }

        if (this.jsObject.options.appearance.reportDisplayMode == "Div" || this.jsObject.options.appearance.reportDisplayMode == "Span") {
            var childs = page.getElementsByClassName("StiPageContainer");
            if (childs && childs.length > 0) {
                var pageContainer = childs[0];
                pageContainer.style.position = "relative";
                page.style.width = (page.pageWidth - page.margins[1] - page.margins[3]) + "px";
                page.style.height = (page.pageHeight - page.margins[0] - page.margins[2]) + "px";
            }
        }
        
        var currentPageHeight = page.offsetHeight - margins[0] - margins[2];
        if (reportPanel.maxHeights[pageSizes[1]] == null || currentPageHeight > reportPanel.maxHeights[pageSizes[1]])
            reportPanel.maxHeights[pageSizes[1]] = currentPageHeight;

        this.jsObject.InitializeInteractions(page);

        return page;
    }

    reportPanel.getZoomByPageWidth = function () {
        if (this.jsObject.reportParams.pagesWidth == 0) return 100;
        var newZoom = ((this.offsetWidth - 35) * this.jsObject.reportParams.zoom) / this.jsObject.reportParams.pagesWidth;
        return newZoom;
    }

    reportPanel.getZoomByPageHeight = function () {
        if (this.jsObject.reportParams.pagesHeight == 0) return 100;
        var newPagesHeight = this.jsObject.options.appearance.scrollbarsMode ? Math.min(this.jsObject.controls.viewer.offsetHeight, window.innerHeight) : window.innerHeight;
        if (this.jsObject.controls.toolbar) newPagesHeight -= this.jsObject.controls.toolbar.offsetHeight;
        if (this.jsObject.controls.parametersPanel) newPagesHeight -= this.jsObject.controls.parametersPanel.offsetHeight;        
        var newZoom = ((newPagesHeight - 25) * this.jsObject.reportParams.zoom) / (this.jsObject.reportParams.pagesHeight);
        return newZoom;
    }

    reportPanel.addPages = function () {
        if (this.jsObject.reportParams.pagesArray == null) return;
        reportPanel.style.top = this.jsObject.options.toolbar.visible
            ? (this.jsObject.options.viewerHeightType != "Percentage" || this.jsObject.options.appearance.scrollbarsMode
                ? this.jsObject.controls.toolbar.offsetHeight + "px" : "0px")
            : "0px";
        this.clear();
        this.maxHeights = {};
        var count = this.jsObject.reportParams.pagesArray.length;

        //add pages styles
        if (!this.jsObject.controls.css) this.jsObject.controls.css = document.getElementById(this.jsObject.options.viewerId + "Styles");
        if (!this.jsObject.controls.css) {
            this.jsObject.controls.css = document.createElement("STYLE");
            this.jsObject.controls.css.id = this.jsObject.options.viewerId + "Styles";
            this.jsObject.controls.css.setAttribute('type', 'text/css');
            this.jsObject.controls.head.appendChild(this.jsObject.controls.css);
        }
        if (this.jsObject.controls.css.styleSheet) this.jsObject.controls.css.styleSheet.cssText = this.jsObject.reportParams.pagesArray[count - 2];
        else this.jsObject.controls.css.innerHTML = this.jsObject.reportParams.pagesArray[count - 2];

        //add chart scripts
        var currChartScripts = document.getElementById(this.jsObject.options.viewerId + "chartScriptJsViewer");
        if (currChartScripts) this.jsObject.controls.head.removeChild(currChartScripts);

        if (this.jsObject.reportParams.pagesArray[count - 1]) {
            var chartScripts = document.createElement("Script");
            chartScripts.setAttribute('type', 'text/javascript');
            chartScripts.id = this.jsObject.options.viewerId + "chartScriptJsViewer";
            chartScripts.textContent = this.jsObject.reportParams.pagesArray[count - 1];
            this.jsObject.controls.head.appendChild(chartScripts);
        }

        for (num = 0; num <= count - 3; num++) {
            var page = this.addPage(this.jsObject.reportParams.pagesArray[num]);
        }
        reportPanel.correctHeights();

        if (typeof stiEvalCharts === "function") stiEvalCharts();

        if (this.jsObject.options.editableMode) this.jsObject.ShowAllEditableFields();
        this.jsObject.UpdateAllHyperLinks();
    }

    reportPanel.clear = function () {
        while (this.childNodes[0]) {
            this.removeChild(this.childNodes[0]);
        }
        reportPanel.pages = [];
    }

    reportPanel.correctHeights = function () {
        for (var i in this.childNodes) {
            if (this.childNodes[i].pageHeight != null) {
                var height = reportPanel.maxHeights[this.childNodes[i].pageHeight.toString()];
                if (height) this.childNodes[i].style.height = height + "px";
            }
        }
    }

    reportPanel.ontouchstart = function () {
        if (this.jsObject.options.allowTouchZoom) {
            this.jsObject.options.firstZoomDistance = 0;
            this.jsObject.options.secondZoomDistance = 0;
            this.jsObject.options.zoomStep = 0;
        }
    }

    reportPanel.ontouchmove = function (event) {
        if (typeof event !== "undefined" && event.touches.length > 1 && this.jsObject.options.allowTouchZoom) {
            if ('preventDefault' in event) event.preventDefault();
            this.jsObject.options.zoomStep++;

            if (this.jsObject.options.firstZoomDistance == 0)
                this.jsObject.options.firstZoomDistance = Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));

            if (this.jsObject.options.zoomStep > 2 && this.jsObject.options.secondZoomDistance == 0) {
                this.jsObject.options.secondZoomDistance = Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));

                this.jsObject.SetZoom(this.jsObject.options.secondZoomDistance > this.jsObject.options.firstZoomDistance);
            }
        }
    }
}

StiJsViewer.prototype.SmallButton = function (name, captionText, imageName, toolTip, arrow, styleName) {
    var button = document.createElement("div");
    button.style.fontFamily = this.options.toolbar.fontFamily;
    button.jsObject = this;
    button.name = name;
    button.styleName = styleName || "stiJsViewerStandartSmallButton";
    button.isEnabled = true;
    button.isSelected = false;
    button.isOver = false;
    button.className = button.styleName + " " + button.styleName + "Default";
    button.toolTip = toolTip;
    button.style.height = this.options.isTouchDevice ? "28px" : "23px";
    button.style.boxSizing = "content-box";
    if (name) {
        if (!this.controls.buttons) this.controls.buttons = {};
        this.controls.buttons[name] = button;
    }

    var innerTable = this.CreateHTMLTable();
    button.innerTable = innerTable;
    innerTable.style.height = "100%";
    button.appendChild(innerTable);

    if (imageName != null) {
        button.image = document.createElement("img");
        button.image.src = this.collections.images[imageName];
        button.imageCell = innerTable.addCell(button.image);
        button.imageCell.style.lineHeight = "0";
        button.imageCell.style.padding = (this.options.isTouchDevice && captionText == null) ? "0 7px" : "0 3px";
    }

    if (captionText != null) {
        button.caption = innerTable.addCell();
        button.caption.style.padding = (arrow ? "1px 0 " : "1px 5px ") + (imageName ? "0 0" : "0 5px");
        button.caption.style.whiteSpace = "nowrap";
        button.caption.style.textAlign = "left";
        button.caption.innerHTML = captionText;
    }

    if (arrow != null) {
        button.arrow = document.createElement("img");
        button.arrow.src = this.collections.images["ButtonArrow" + arrow + ".png"];
        innerTable.addCell(button.arrow).style.padding = captionText ? "0 5px 0 5px" : (this.options.isTouchDevice ? "0 7px 0 0" : "0 5px 0 2px");
        button.arrow.style.marginTop = "1px";
        button.arrow.style.verticalAlign = "baseline";
    }

    if (toolTip && typeof (toolTip) != "object") {
        button.setAttribute("title", toolTip);
    }

    button.onmouseoverAction = function () {
        if (!this.isEnabled || this.jsObject.options.isTouchClick || (this["haveMenu"] && this.isSelected)) return;
        this.className = this.styleName + " " + this.styleName + "Over";
        this.isOver = true;
        if (!this.jsObject.options.isTouchDevice && this.jsObject.options.appearance.showTooltips && this.toolTip && typeof (this.toolTip) == "object")
            this.jsObject.controls.toolTip.showWithDelay(
                this.toolTip[0],
                this.toolTip[1],
                this.toolTip.length == 3 ? this.toolTip[2].left : this.jsObject.FindPosX(this, "stiJsViewerMainPanel"),
                this.toolTip.length == 3 ? this.toolTip[2].top : this.jsObject.controls.toolbar.offsetHeight
            );
    }

    button.onmouseoutAction = function () {
        this.isOver = false;
        if (!this.isEnabled) return;
        this.className = this.styleName + " " + this.styleName + (this.isSelected ? "Selected" : "Default");
        if (this.jsObject.options.appearance.showTooltips && this.toolTip && typeof (this.toolTip) == "object") this.jsObject.controls.toolTip.hideWithDelay();
    }

    button.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    button.onmouseenter = function () {
        this.onmouseoverAction();
    }

    button.onmouseleave = function () {
        this.onmouseoutAction();
    }

    button.onmousedown = function () {
        if (this.isTouchStartFlag || !this.isEnabled) return;
        this.jsObject.options.buttonPressed = this;
    }

    button.onclick = function () {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick) return;
        if (this.jsObject.options.appearance.showTooltips && this.toolTip && typeof (this.toolTip) == "object") this.jsObject.controls.toolTip.hide();
        this.action();
    }

    button.ontouchend = function () {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved) return;
        var this_ = this;
        this.isTouchEndFlag = true;
        clearTimeout(this.isTouchEndTimer);
        var timer = setTimeout(function (buttonId) {
            this_.jsObject.options.buttonsTimer = null;
            this_.className = this_.styleName + " " + this_.styleName + "Default";
            this_.action();
        }, 150);
        this.jsObject.options.buttonsTimer = [this, this.className, timer];
        this.className = this.styleName + " " + this.styleName + "Over";
        this.isTouchEndTimer = setTimeout(function () {
            this_.isTouchEndFlag = false;
        }, 1000);
    }

    button.ontouchstart = function () {
        var this_ = this;
        this.isTouchStartFlag = true;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.fingerIsMoved = false;
        this.jsObject.options.buttonPressed = this;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    button.setEnabled = function (state) {
        if (this.image) this.image.style.opacity = state ? "1" : "0.5";
        if (this.arrow) this.arrow.style.opacity = state ? "1" : "0.5";
        this.isEnabled = state;
        if (!state && !this.isOver) this.isOver = false;
        this.className = this.styleName + " " + (state ? (this.styleName + (this.isOver ? "Over" : "Default")) : this.styleName + "Disabled");
    }

    button.setSelected = function (state) {
        this.isSelected = state;
        this.className = this.styleName + " " + this.styleName +
            (state ? "Selected" : (this.isEnabled ? (this.isOver ? "Over" : "Default") : "Disabled"));
    }

    button.action = function () { this.jsObject.postAction(this.name); }

    return button;
}

StiJsViewer.prototype.TextArea = function (name, width, height) {
    var textArea = document.createElement("textarea");
    textArea.style.width = width + "px";
    textArea.style.height = height + "px";
    textArea.style.minWidth = width + "px";
    textArea.style.minHeight = height + "px";
    textArea.jsObject = this;
    textArea.name = name;
    textArea.isEnabled = true;
    textArea.isSelected = false;
    textArea.isOver = false;
    var styleName = "stiJsViewerTextBox";
    textArea.className = styleName + " " + styleName + "Default";
    if (name) {
        if (!this.controls.textBoxes) this.controls.textBoxes = {};
        this.controls.textBoxes[name] = textArea;
    }
        
    textArea.setEnabled = function (state) {
        this.isEnabled = state;
        this.disabled = !state;
        this.className = styleName + " " + styleName + (state ? "Default" : "Disabled");
    }

    textArea.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    textArea.onmouseenter = function () {
        if (!this.isEnabled || this.readOnly) return;
        this.isOver = true;
        if (!this.isSelected && !this.isFocused) this.className = styleName + " " + styleName + "Over";
    }
    
    textArea.onfocus = function () {
        this.jsObject.options.controlsIsFocused = true;
    }

    textArea.onmouseleave = function () {
        if (!this.isEnabled || this.readOnly) return;
        this.isOver = false;
        if (!this.isSelected && !this.isFocused) this.className = styleName + " " + styleName + "Default";
    }
    
    textArea.setSelected = function (state) {
        this.isSelected = state;
        this.className = styleName + " " + styleName + (state ? "Over" : (this.isEnabled ? (this.isOver ? "Over" : "Default") : "Disabled"));
    }
    
    textArea.onblur = function () {
        this.jsObject.options.controlsIsFocused = false;
        this.action(); 
    }
    
    textArea.action = function () { };
    
    return textArea;
}

StiJsViewer.prototype.TextBox = function (name, width, toolTip, actionLostFocus) {
    var textBox = document.createElement("input");
    textBox.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") textBox.style.color = this.options.toolbar.fontColor;
    if (width) textBox.style.width = width + "px";
    textBox.jsObject = this;
    textBox.name = name;
    textBox.isEnabled = true;
    textBox.isSelected = false;
    textBox.isFocused = false;
    textBox.isOver = false;
    textBox.actionLostFocus = actionLostFocus;
    if (toolTip) {
        try { textBox.setAttribute("title", toolTip); } catch (e) { }
    }
    textBox.style.height = this.options.isTouchDevice ? "26px" : "21px";
    textBox.style.lineHeight = textBox.style.height;
    textBox.style.boxSizing = "content-box";
    var styleName = "stiJsViewerTextBox";
    textBox.className = styleName + " " + styleName + "Default";
    if (name) {
        if (!this.controls.textBoxes) this.controls.textBoxes = {};
        this.controls.textBoxes[name] = textBox;
    }

    textBox.setEnabled = function (state) {
        this.isEnabled = state;
        this.disabled = !state;
        this.className = styleName + " " + styleName + (state ? "Default" : "Disabled");
    }

    textBox.onmouseover = function () {
        if (!this.jsObject.options.isTouchDevice) this.onmouseenter();
    }

    textBox.onmouseenter = function () {
        if (!this.isEnabled || this.readOnly) return;
        this.isOver = true;
        if (!this.isSelected && !this.isFocused) this.className = styleName + " " + styleName + "Over";
    }

    textBox.onmouseleave = function () {
        if (!this.isEnabled || this.readOnly) return;
        this.isOver = false;
        if (!this.isSelected && !this.isFocused) this.className = styleName + " " + styleName + "Default";
    }

    textBox.setSelected = function (state) {
        this.isSelected = state;
        this.className = styleName + " " + styleName + (state ? "Over" : (this.isEnabled ? (this.isOver ? "Over" : "Default") : "Disabled"));
    }

    textBox.setReadOnly = function (state) {
        this.style.cursor = state ? "default" : "";
        this.readOnly = state;
        try {
            this.setAttribute("unselectable", state ? "on" : "off");
            this.setAttribute("onselectstart", state ? "return false" : "");
        }
        catch (e) { };
    }

    textBox.onfocus = function () { this.isFocused = true; this.setSelected(true); this.oldValue = this.value; }
    textBox.onblur = function () { this.isFocused = false; this.setSelected(false); this.action(); }
    textBox.onkeypress = function (event) {
        if (this.readOnly) return false;
        if (event && event.keyCode == 13) {
            if ("blur" in this && this.actionLostFocus)
                this.blur();
            else
                this.action();
            return false;
        }
    }

    textBox.action = function () { };

    return textBox;
}

StiJsViewer.prototype.InitializeToolBar = function () {
    var toolbar = document.createElement("div");
    toolbar.controls = {};
    toolbar.shortType = false;
    toolbar.minWidth = 0;
    this.controls.toolbar = toolbar;
    this.controls.mainPanel.appendChild(toolbar);
    toolbar.jsObject = this;
    toolbar.className = "stiJsViewerToolBar";
    if (!this.options.toolbar.visible) {
        toolbar.style.height = "0px";
        toolbar.style.width = "0px";
    }

    var toolbarInnerContent = document.createElement("div");
    toolbar.innerContent = toolbarInnerContent;
    toolbar.appendChild(toolbarInnerContent);
    toolbarInnerContent.style.padding = "2px";

    var toolbarTable = this.CreateHTMLTable();
    toolbarInnerContent.appendChild(toolbarTable);
    toolbarTable.className = "stiJsViewerToolBarTable";
    toolbarTable.style.margin = 0;

    if (this.options.toolbar.backgroundColor != "") toolbarTable.style.background = this.options.toolbar.backgroundColor;
    if (this.options.toolbar.borderColor != "") toolbarTable.style.border = "1px solid " + this.options.toolbar.borderColor;
    if (this.options.toolbar.fontColor != "") toolbarTable.style.color = this.options.toolbar.fontColor;
    toolbarTable.style.fontFamily = this.options.toolbar.fontFamily;

    var cell1 = toolbarTable.addCell();
    var cell2 = toolbarTable.addCell();
    var mainCell = (!this.options.appearance.rightToLeft) ? cell1 : cell2;
    var dopCell = (!this.options.appearance.rightToLeft) ? cell2 : cell1;
    mainCell.style.width = "100%";
    var mainTable = this.CreateHTMLTable();
    var dopTable = this.CreateHTMLTable();
    mainCell.appendChild(mainTable);
    dopCell.appendChild(dopTable);
    mainTable.setAttribute("align", this.options.appearance.rightToLeft ? "right" : (this.options.toolbar.alignment == "default" ? "left" : this.options.toolbar.alignment));
    mainTable.style.margin = "1px";
    dopTable.style.margin = "1px";

    if (!this.options.exports.showExportToPowerPoint && !this.options.exports.showExportToPdf && !this.options.exports.showExportToXps &&
        !this.options.exports.showExportToOpenDocumentWriter && !this.options.exports.showExportToOpenDocumentCalc && !this.options.exports.showExportToText &&
        !this.options.exports.showExportToRtf && !this.options.exports.showExportToWord2007 && !this.options.exports.showExportToCsv &&
        !this.options.exports.showExportToDbf && !this.options.exports.showExportToXml && !this.options.exports.showExportToDif && !this.options.exports.showExportToSylk &&
        !this.options.exports.showExportToExcel && !this.options.exports.showExportToExcel2007 && !this.options.exports.showExportToExcelXml && !this.options.exports.showExportToHtml &&
        !this.options.exports.showExportToHtml5 && !this.options.exports.showExportToMht && !this.options.exports.showExportToImageBmp && !this.options.exports.showExportToImageGif &&
        !this.options.exports.showExportToImageJpeg && !this.options.exports.showExportToImageMetafile && !this.options.exports.showExportToImagePcx &&
        !this.options.exports.showExportToImagePng && !this.options.exports.showExportToImageTiff && !this.options.exports.showExportToImageSvg && !this.options.exports.showExportToImageSvgz) {
        if (!this.options.exports.showExportToDocument) this.options.toolbar.showSaveButton = false;
        this.options.toolbar.showSendEmailButton = false;
    }

    //Add Controls
    //1 - name, 2 - caption, 3 - image, 4 - showToolTip;

    var isFirst = true;
    var controlProps = []
    if (this.options.toolbar.showAboutButton) controlProps.push(["About", null, "About.png", false]);
    if (this.options.toolbar.showAboutButton && this.options.toolbar.showDesignButton) controlProps.push(["Separator1"]);
    if (this.options.toolbar.showDesignButton) controlProps.push(["Design", this.collections.loc["Design"], "Design.png", false]);
    if (this.options.toolbar.showPrintButton) { controlProps.push(["Print", this.collections.loc["Print"], "Print.png", true]); isFirst = false; }
    if (this.options.toolbar.showSaveButton) {
        controlProps.push(["Save", this.collections.loc["Save"], "Save.png", true]);
        isFirst = false;
    }
    if (this.options.toolbar.showSendEmailButton) {
        controlProps.push(["SendEmail", this.collections.loc["SendEmail"], "SendEmail.png", true]);
        isFirst = false;
    }
    if (this.options.toolbar.showBookmarksButton || this.options.toolbar.showParametersButton) {
        if (!isFirst) controlProps.push(["Separator2"]);
        isFirst = false;
    }
    if (this.options.toolbar.showBookmarksButton) {
        controlProps.push(["Bookmarks", null, "Bookmarks.png", true]);
        isFirst = false; 
    }
    if (this.options.toolbar.showParametersButton) {
        controlProps.push(["Parameters", null, "Parameters.png", true]);
        isFirst = false;
    }
    if (this.options.toolbar.showFindButton || this.options.toolbar.showEditorButton) {
        if (!isFirst) controlProps.push(["Separator2_1"]);
        isFirst = false;
    }
    if (this.options.toolbar.showFindButton) {
        controlProps.push(["Find", null, "Find.png", true]);
        isFirst = false;
    }
    if (this.options.toolbar.showEditorButton) {
        controlProps.push(["Editor", null, "Editor.png", true]);
        isFirst = false;
    }
    if (this.options.toolbar.showFirstPageButton || this.options.toolbar.showPreviousPageButton || this.options.toolbar.showNextPageButton ||
        this.options.toolbar.showLastPageButton || this.options.toolbar.showCurrentPageControl) {
        if (!isFirst) controlProps.push(["Separator3"]);
        isFirst = false;
    }
    if (this.options.toolbar.showFirstPageButton) { controlProps.push(["FirstPage", null, this.options.appearance.rightToLeft ? "LastPage.png" : "FirstPage.png", true]); isFirst = false; }
    if (this.options.toolbar.showPreviousPageButton) { controlProps.push(["PrevPage", null, this.options.appearance.rightToLeft ? "NextPage.png" : "PrevPage.png", true]); isFirst = false; }
    if (this.options.toolbar.showCurrentPageControl) { controlProps.push(["PageControl"]); isFirst = false; }
    if (this.options.toolbar.showNextPageButton) { controlProps.push(["NextPage", null, this.options.appearance.rightToLeft ? "PrevPage.png" : "NextPage.png", true]); isFirst = false; }
    if (this.options.toolbar.showLastPageButton) { controlProps.push(["LastPage", null, this.options.appearance.rightToLeft ? "FirstPage.png" : "LastPage.png", true]); isFirst = false; }
    if (this.options.toolbar.showViewModeButton || this.options.toolbar.showZoomButton) {
        if (!isFirst) controlProps.push(["Separator4"]);
        isFirst = false;
    }
    if (this.options.toolbar.showFullScreenButton) {
        controlProps.push(["FullScreen", null, "FullScreen.png", true]);
        controlProps.push(["Separator5"]);
        isFirst = false;
    }
    if (this.options.toolbar.showZoomButton) { controlProps.push(["Zoom", "100%", "Zoom.png", true]); isFirst = false; }
    if (this.options.toolbar.showViewModeButton) { controlProps.push(["ViewMode", this.collections.loc["OnePage"], "ViewMode.png", true]); isFirst = false; }

    if (typeof (this.options.toolbar.multiPageWidthCount) != "undefined") this.reportParams.multiPageWidthCount = this.options.toolbar.multiPageWidthCount;
    if (typeof (this.options.toolbar.multiPageHeightCount) != "undefined") this.reportParams.multiPageHeightCount = this.options.toolbar.multiPageHeightCount;

    if (!this.options.appearance.rightToLeft && this.options.toolbar.alignment == "right" && (this.options.toolbar.showAboutButton || this.options.toolbar.showDesignButton)) {
        controlProps.push(["Separator6"]);
    }

    for (var i = 0; i < controlProps.length; i++) {
        var index = this.options.appearance.rightToLeft ? controlProps.length - 1 - i : i;
        var name = controlProps[index][0];
        var table = (name == "About" || name == "Design" || name == "Separator1") ? dopTable : mainTable;

        if (name.indexOf("Separator") == 0) {
            table.addCell(this.ToolBarSeparator());
            continue;
        }

        var buttonArrow = ((name == "Print" && this.options.toolbar.printDestination == "Default") || name == "Save" || name == "SendEmail" || name == "Zoom" || name == "ViewMode") ? "Down" : null;
        var control = (name != "PageControl")
            ? this.SmallButton(name, controlProps[index][1], controlProps[index][2],
                 (controlProps[index][3] ? [this.collections.loc[name + "ToolTip"], this.helpLinks[name]] : null), buttonArrow)
            : this.PageControl();

        if (control.caption) {
            control.caption.style.display = this.options.toolbar.showButtonCaptions ? "" : "none";
        }

        if (name == "Editor") {
            control.style.display = "none";
        }

        control.style.margin = (name == "Design") ? "1px 5px 1px 5px" : "1px";
        toolbar.controls[name] = control;
        table.addCell(control);
    }

    //Add Hover Events
    if (this.options.toolbar.showMenuMode == "Hover") {
        var buttonsWithMenu = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"];
        for (var i = 0; i < buttonsWithMenu.length; i++) {
            var button = toolbar.controls[buttonsWithMenu[i]];
            if (button) {
                button.onmouseover = function () {
                    var menuName = this.jsObject.lowerFirstChar(this.name) + "Menu";
                    clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"]);
                    if (this.jsObject.options.isTouchDevice || !this.isEnabled || (this["haveMenu"] && this.isSelected)) return;
                    this.className = this.styleName + " " + this.styleName + "Over";
                    this.jsObject.controls.menus[menuName].changeVisibleState(true);
                }

                button.onmouseout = function () {
                    var menuName = this.jsObject.lowerFirstChar(this.name) + "Menu";
                    this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"] = setTimeout(function () {
                        button.jsObject.controls.menus[menuName].changeVisibleState(false);
                    }, this.jsObject.options.menuHideDelay);
                }
            }
        }
    }

    toolbar.haveScroll = function () {
        return (toolbar.scrollWidth > toolbar.offsetWidth)
    }

    toolbar.getMinWidth = function () {
        var a = mainCell.offsetWidth;
        var b = mainTable.offsetWidth
        var c = toolbarTable.offsetWidth;

        return c - (a - b) + 50;
    }

    toolbar.minWidth = toolbar.getMinWidth();

    toolbar.changeToolBarState = function () {
        var reportParams = toolbar.jsObject.reportParams;
        var controls = toolbar.controls;
        var collections = toolbar.jsObject.collections;

        if (controls["FirstPage"]) controls["FirstPage"].setEnabled(reportParams.pageNumber > 0 && reportParams.viewMode == "OnePage");
        if (controls["PrevPage"]) controls["PrevPage"].setEnabled(reportParams.pageNumber > 0 && reportParams.viewMode == "OnePage");
        if (controls["NextPage"]) controls["NextPage"].setEnabled(reportParams.pageNumber < reportParams.pagesCount - 1 && reportParams.viewMode == "OnePage");
        if (controls["LastPage"]) controls["LastPage"].setEnabled(reportParams.pageNumber < reportParams.pagesCount - 1 && reportParams.viewMode == "OnePage");
        if (controls["ViewMode"]) controls["ViewMode"].caption.innerHTML = collections.loc[reportParams.viewMode];
        if (controls["Zoom"]) controls["Zoom"].caption.innerHTML = reportParams.zoom + "%";
        if (controls["PageControl"]) {
            controls["PageControl"].countLabel.innerHTML = reportParams.pagesCount;
            controls["PageControl"].textBox.value = reportParams.pageNumber + 1;
            controls["PageControl"].textBox.setEnabled(!(reportParams.pagesCount <= 1 || reportParams.viewMode == "WholeReport"));
        }

        if (toolbar.jsObject.controls.menus["zoomMenu"]) {
            var zoomItems = toolbar.jsObject.controls.menus["zoomMenu"].items;
            for (var i in zoomItems) {
                if (zoomItems[i]["image"] == null) continue;
                if (zoomItems[i].name != "ZoomOnePage" && zoomItems[i].name != "ZoomPageWidth")
                    zoomItems[i].image.style.visibility = (zoomItems[i].name == "Zoom" + reportParams.zoom) ? "visible" : "hidden";
            }
        }
    }

    toolbar.changeShortType = function () {
        if (toolbar.shortType && toolbar.jsObject.controls.viewer.offsetWidth < toolbar.minWidth) return;
        toolbar.shortType = toolbar.jsObject.controls.viewer.offsetWidth < toolbar.minWidth;
        shortButtons = ["Print", "Save", "Zoom", "ViewMode", "Design"];
        for (var index in shortButtons) {
            button = toolbar.controls[shortButtons[index]];
            if (button && button.caption) {
                button.caption.style.display = toolbar.shortType ? "none" : "";
            }
        }
    }

    toolbar.setEnabled = function (state) {
        if (!state) {
            if (!toolbar.disabledPanel) {
                toolbar.disabledPanel = document.createElement("div");
                toolbar.disabledPanel.className = "stiJsViewerDisabledPanel";
                toolbar.appendChild(toolbar.disabledPanel);
            }
        }
        else if (toolbar.disabledPanel) {
            toolbar.removeChild(toolbar.disabledPanel);
            toolbar.disabledPanel = null;
        }
    }

    window.onresize = function () {
        //toolbar.changeShortType();
    }

    if (toolbar.controls["Bookmarks"]) toolbar.controls["Bookmarks"].setEnabled(false);
    if (toolbar.controls["Parameters"]) toolbar.controls["Parameters"].setEnabled(false);
    //toolbar.changeShortType();
}

//Separator
StiJsViewer.prototype.ToolBarSeparator = function () {
    var separator = document.createElement("div");
    separator.style.width = "1px";
    separator.style.height = this.options.isTouchDevice ? "26px" : "21px";
    separator.className = "stiJsViewerToolBarSeparator";

    return separator;
}

//PageControl
StiJsViewer.prototype.PageControl = function () {
    var pageControl = this.CreateHTMLTable();    
    var text1 = pageControl.addCell();
    text1.style.padding = "0 2px 0 0";
    text1.innerHTML = this.collections.loc["Page"];

    var textBox = this.TextBox("PageControl", 45);
    pageControl.addCell(textBox);
    pageControl.textBox = textBox;
    textBox.action = function () {
        if (textBox.jsObject.options.pageNumber != textBox.getCorrectValue() - 1)
            textBox.jsObject.postAction("GoToPage"); 
    }

    textBox.getCorrectValue = function () {
        value = parseInt(this.value);
        if (value < 1 || !value) value = 1;
        if (value > textBox.jsObject.reportParams.pagesCount) value = textBox.jsObject.reportParams.pagesCount;
        return value;
    }

    var text2 = pageControl.addCell();
    text2.style.padding = "0 2px 0 2px";
    text2.innerHTML = this.collections.loc["PageOf"];

    var countLabel = pageControl.addCell();
    pageControl.countLabel = countLabel;
    countLabel.style.padding = "0 2px 0 0";
    countLabel.innerHTML = "?";

    return pageControl;
}



StiJsViewer.prototype.InitializeToolTip = function () {
    var toolTip = document.createElement("div");
    toolTip.id = this.controls.viewer.id + "ToolTip";
    toolTip.jsObject = this;
    this.controls.toolTip = toolTip;
    this.controls.mainPanel.appendChild(toolTip);
    toolTip.className = "stiJsViewerToolTip";
    toolTip.style.display = "none";
    toolTip.showTimer = null;
    toolTip.hideTimer = null;
    toolTip.visible = false;

    toolTip.innerTable = this.CreateHTMLTable();
    toolTip.appendChild(toolTip.innerTable);

    toolTip.textCell = toolTip.innerTable.addCell();
    toolTip.textCell.className = "stiJsViewerToolTipTextCell";

    if (this.options.appearance.showTooltipsHelp) {
        toolTip.helpButton = this.SmallButton(null, this.collections.loc["TellMeMore"], "HelpIcon.png", null, null, "stiJsViewerHyperlinkButton");
        toolTip.innerTable.addCellInNextRow(toolTip.helpButton);
        toolTip.helpButton.style.margin = "4px 8px 4px 8px";
    }
    else
        toolTip.textCell.style.border = 0;

    toolTip.show = function (text, helpUrl, leftPos, topPos) {
        if ((this.visible && text == this.textCell.innerHTML) || this.jsObject.options.isTouchDevice) return;
        this.hide();

        if (this.jsObject.options.appearance.showTooltipsHelp) {
            this.helpButton.helpUrl = helpUrl;
            this.helpButton.action = function () {
                this.jsObject.showHelpWindow(this.helpUrl);
            }
        }

        this.textCell.innerHTML = text;
        this.style.left = leftPos + "px";
        this.style.top = topPos + "px";
        var d = new Date();
        var endTime = d.getTime() + 300;
        this.style.opacity = 1 / 100;
        this.style.display = "";
        this.visible = true;
        this.jsObject.ShowAnimationForm(this, endTime);
    }

    toolTip.showWithDelay = function (text, helpUrl, leftPos, topPos) {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        var this_ = this;
        this.showTimer = setTimeout(function () {
            this_.show(text, helpUrl, leftPos, topPos);
        }, 300);
    }

    toolTip.hide = function () {
        this.visible = false;
        clearTimeout(this.showTimer);
        this.style.display = "none";
    }

    toolTip.hideWithDelay = function () {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        var this_ = this;
        this.hideTimer = setTimeout(function () {
            this_.hide();
        }, 500);
    }

    toolTip.onmouseover = function () {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
    }

    toolTip.onmouseout = function () {
        this.hideWithDelay();
    }
}

StiJsViewer.prototype.BaseForm = function (name, caption, level) {
    var form = document.createElement("div");
    form.name = name;
    form.id = this.generateKey();
    form.className = "stiJsViewerForm";
    form.jsObject = this;
    form.level = level;
    form.caption = null;
    form.visible = false;
    form.style.display = "none";
    if (level == null) level = 1;
    form.style.zIndex = (level * 10) + 1;
    if (name) {
        if (!this.controls.forms) this.controls.forms = {};
        if (this.controls.forms[name] != null) {
            this.controls.forms[name].changeVisibleState(false);
            this.controls.mainPanel.removeChild(this.controls.forms[name]);
        }
        this.controls.forms[name] = form;
    }
    this.controls.mainPanel.appendChild(form);

    //Header
    form.header = document.createElement("div");
    form.header.thisForm = form;
    form.appendChild(form.header);
    form.header.className = "stiJsViewerFormHeader";
    var headerTable = this.CreateHTMLTable();
    headerTable.style.width = "100%";
    form.header.appendChild(headerTable);

    form.caption = headerTable.addCell();
    if (caption != null) {
        if (caption) form.caption.innerHTML = caption;
        form.caption.style.textAlign = "left";
        form.caption.style.padding = "5px 10px 8px 15px";
    }

    form.buttonClose = this.SmallButton(null, null, "CloseForm.png");
    form.buttonClose.style.display = "inline-block";
    form.buttonClose.form = form;
    form.buttonClose.action = function () { this.form.changeVisibleState(false); };
    var closeButtonCell = headerTable.addCell(form.buttonClose);
    closeButtonCell.style.verticalAlign = "top";
    closeButtonCell.style.width = "30px";
    closeButtonCell.style.textAlign = "right";
    closeButtonCell.style.padding = "2px 1px 1px 1px";

    //Container
    form.container = document.createElement("div");
    form.appendChild(form.container);
    form.container.className = "stiJsViewerFormContainer";

    //Separator
    form.buttonsSeparator = this.FormSeparator();
    form.appendChild(form.buttonsSeparator);

    //Buttons
    form.buttonsPanel = document.createElement("div");
    form.appendChild(form.buttonsPanel);
    form.buttonsPanel.className = "stiJsViewerFormButtonsPanel";
    var buttonsTable = this.CreateHTMLTable();
    form.buttonsPanel.appendChild(buttonsTable);

    form.buttonOk = this.FormButton(null, this.collections.loc["ButtonOk"]);
    form.buttonOk.action = function () { form.action(); };
    buttonsTable.addCell(form.buttonOk).style.padding = "8px";

    form.buttonCancel = this.FormButton(null, this.collections.loc["ButtonCancel"]);
    form.buttonCancel.action = function () { form.changeVisibleState(false); };
    buttonsTable.addCell(form.buttonCancel).style.padding = "8px 8px 8px 0";

    form.changeVisibleState = function (state) {
        if (state) {
            this.style.display = "";
            this.onshow();
            this.jsObject.setObjectToCenter(this, 150);
            this.jsObject.controls.disabledPanels[this.level].changeVisibleState(true);
            this.visible = true;
            d = new Date();
            var endTime = d.getTime() + this.jsObject.options.formAnimDuration;
            this.flag = false;
            this.jsObject.ShowAnimationForm(this, endTime);
        }
        else {
            clearTimeout(this.animationTimer);
            this.visible = false;
            this.style.display = "none";
            this.onhide();
            this.jsObject.controls.disabledPanels[this.level].changeVisibleState(false);
        }
    }

    form.action = function () { };
    form.onshow = function () { };
    form.onhide = function () { };
    
    form.onmousedown = function () {
        if (this.isTouchStartFlag) return;
        this.ontouchstart(true);
    }

    form.ontouchstart = function (mouseProcess) {
        var this_ = this;
        this.isTouchStartFlag = mouseProcess ? false : true;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.formPressed = this;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    //Mouse Events
    form.header.onmousedown = function (event) {
        if (!event || this.isTouchStartFlag) return;
        var mouseStartX = event.clientX;
        var mouseStartY = event.clientY;
        var formStartX = this.thisForm.jsObject.FindPosX(this.thisForm, "stiJsViewerMainPanel");
        var formStartY = this.thisForm.jsObject.FindPosY(this.thisForm, "stiJsViewerMainPanel");
        this.thisForm.jsObject.options.formInDrag = [mouseStartX, mouseStartY, formStartX, formStartY, this.thisForm];
    }

    //Touch Events
    form.header.ontouchstart = function (event) {
        var this_ = this;
        this.isTouchStartFlag = true;
        clearTimeout(this.isTouchStartTimer);
        var fingerStartX = event.touches[0].pageX;
        var fingerStartY = event.touches[0].pageY;
        var formStartX = this.thisForm.jsObject.FindPosX(this.thisForm, "stiJsViewerMainPanel");
        var formStartY = this.thisForm.jsObject.FindPosY(this.thisForm, "stiJsViewerMainPanel");
        this.thisForm.jsObject.options.formInDrag = [fingerStartX, fingerStartY, formStartX, formStartY, this.thisForm];
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    form.header.ontouchmove = function (event) {
        event.preventDefault();

        if (this.thisForm.jsObject.options.formInDrag) {
            var formInDrag = this.thisForm.jsObject.options.formInDrag;
            var formStartX = formInDrag[2];
            var formStartY = formInDrag[3];
            var fingerCurrentXPos = event.touches[0].pageX;
            var fingerCurrentYPos = event.touches[0].pageY;
            var deltaX = formInDrag[0] - fingerCurrentXPos;
            var deltaY = formInDrag[1] - fingerCurrentYPos;
            var newPosX = formStartX - deltaX;
            var newPosY = formStartY - deltaY;
            formInDrag[4].style.left = newPosX + "px";
            formInDrag[4].style.top = newPosY + "px";
        }
    }

    form.header.ontouchend = function () {
        event.preventDefault();
        this.thisForm.jsObject.options.formInDrag = false;
    }

    //Form Move
    form.move = function (evnt) {
        var leftPos = this.jsObject.options.formInDrag[2] + (evnt.clientX - this.jsObject.options.formInDrag[0]);
        var topPos = this.jsObject.options.formInDrag[3] + (evnt.clientY - this.jsObject.options.formInDrag[1]);

        this.style.left = leftPos > 0 ? leftPos + "px" : 0;
        this.style.top = topPos > 0 ? topPos + "px" : 0;
    }

    return form;
}

//Separator
StiJsViewer.prototype.FormSeparator = function () {
    var separator = document.createElement("div");
    separator.className = "stiJsViewerFormSeparator";

    return separator;
}

StiJsViewer.prototype.InitializeExportForm = function () {

    var exportForm = this.BaseForm("exportForm", this.collections.loc["ExportFormTitle"], 1);
    exportForm.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") exportForm.style.color = this.options.toolbar.fontColor;
    exportForm.style.fontSize = "12px";
    exportForm.controls = {};
    exportForm.labels = {};
    exportForm.container.style.padding = "3px";

    exportForm.addControlToParentControl = function (label, control, parentControl, name) {
        if (parentControl.innerTable == null) {
            parentControl.innerTable = exportForm.jsObject.CreateHTMLTable();
            parentControl.innerTable.style.width = "100%";
            parentControl.appendChild(parentControl.innerTable);
        }
        control.parentRow = parentControl.innerTable.addRow();
        var cellForLabel = parentControl.innerTable.addCellInLastRow();
        var cellForControl = (label != null) ? parentControl.innerTable.addCellInLastRow() : cellForLabel;
        if (label != null) {
            cellForLabel.style.padding = "0 8px 0 8px";
            cellForLabel.style.minWidth = "150px";
            if (label) cellForLabel.innerHTML = label;
            exportForm.labels[name] = cellForLabel;
            var tooltip = control.getAttribute("title");
            if (tooltip != null) cellForLabel.setAttribute("title", tooltip);
        }
        else {
            cellForControl.setAttribute("colspan", "2");
        }
        cellForControl.appendChild(control);
    }

    var mrgn = "8px";

    //0-name, 1-label, 2-control, 3-parentControlName, 4-margin
    var controlProps = [
        ["SavingReportGroup", null, this.GroupPanel(this.collections.loc["SavingReport"], true, 390, "4px 0 4px 0"), null, "4px"],
        ["SaveReportMdc", null, this.RadioButton(exportForm.name + "SaveReportMdc", exportForm.name + "SavingReportGroup", this.collections.loc["SaveReportMdc"], null), "SavingReportGroup.container", "6px " + mrgn + " 3px " + mrgn],
        ["SaveReportMdz", null, this.RadioButton(exportForm.name + "SaveReportMdz", exportForm.name + "SavingReportGroup", this.collections.loc["SaveReportMdz"], null), "SavingReportGroup.container", "3px " + mrgn + " 3px " + mrgn],
        ["SaveReportMdx", null, this.RadioButton(exportForm.name + "SaveReportMdx", exportForm.name + "SavingReportGroup", this.collections.loc["SaveReportMdx"], null), "SavingReportGroup.container", "3px " + mrgn + " 0px " + mrgn],
        ["SaveReportPassword", this.collections.loc["PasswordSaveReport"], this.TextBox(null, 140, this.collections.loc["PasswordSaveReportTooltip"]), "SavingReportGroup.container", "4px " + mrgn + " 0px " + mrgn],
        ["PageRangeGroup", null, this.GroupPanel(this.collections.loc["PagesRange"], true, 390, "4px 0 4px 0"), null, "4px"],
        ["PageRangeAll", null, this.RadioButton(exportForm.name + "PagesRangeAll", exportForm.name + "PageRangeGroup", this.collections.loc["PagesRangeAll"], this.collections.loc["PagesRangeAllTooltip"]), "PageRangeGroup.container", "6px " + mrgn + " 6px " + mrgn],
        ["PageRangeCurrentPage", null, this.RadioButton(exportForm.name + "PagesRangeCurrentPage", exportForm.name + "PageRangeGroup", this.collections.loc["PagesRangeCurrentPage"], this.collections.loc["PagesRangeCurrentPageTooltip"]), "PageRangeGroup.container", "0px " + mrgn + " 4px " + mrgn],
        ["PageRangePages", null, this.RadioButton(exportForm.name + "PagesRangePages", exportForm.name + "PageRangeGroup", this.collections.loc["PagesRangePages"], this.collections.loc["PagesRangePagesTooltip"]), "PageRangeGroup.container", "0px " + mrgn + " 0px " + mrgn],
        ["PageRangePagesText", null, this.TextBox(null, 130, this.collections.loc["PagesRangePagesTooltip"]), "PageRangePages.lastCell"/*, true*/, "0 0 0 30px"],
        ["SettingsGroup", null, this.GroupPanel(this.collections.loc["SettingsGroup"], true, 390, "4px 0 4px 0"), null, "4px"],
        ["ImageType", this.collections.loc["Type"], this.DropDownListForExportForm(null, 160, this.collections.loc["TypeTooltip"], this.GetImageTypesItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["DataType", this.collections.loc["Type"], this.DropDownListForExportForm(null, 160, this.collections.loc["TypeTooltip"], this.GetDataTypesItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ExcelType", this.collections.loc["Type"], this.DropDownListForExportForm(null, 160, this.collections.loc["TypeTooltip"], this.GetExcelTypesItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["HtmlType", this.collections.loc["Type"], this.DropDownListForExportForm(null, 160, this.collections.loc["TypeTooltip"], this.GetHtmlTypesItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["Zoom", this.collections.loc["ZoomHtml"], this.DropDownListForExportForm(null, 160, this.collections.loc["ZoomHtmlTooltip"], this.GetZoomItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ImageFormatForHtml", this.collections.loc["ImageFormatForHtml"], this.DropDownListForExportForm(null, 160, this.collections.loc["ImageFormatForHtmlTooltip"], this.GetImageFormatForHtmlItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ExportMode", this.collections.loc["ExportMode"], this.DropDownListForExportForm(null, 160, this.collections.loc["ExportModeTooltip"], this.GetExportModeItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["CompressToArchive", null, this.CheckBox(null, this.collections.loc["CompressToArchive"], this.collections.loc["CompressToArchiveTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["UseEmbeddedImages", null, this.CheckBox(null, this.collections.loc["EmbeddedImageData"], this.collections.loc["EmbeddedImageDataTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["AddPageBreaks", null, this.CheckBox(null, this.collections.loc["AddPageBreaks"], this.collections.loc["AddPageBreaksTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ImageResolution", this.collections.loc["ImageResolution"], this.DropDownListForExportForm(null, 160, this.collections.loc["ImageResolutionTooltip"], this.GetImageResolutionItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ImageCompressionMethod", this.collections.loc["ImageCompressionMethod"], this.DropDownListForExportForm(null, 160, this.collections.loc["ImageCompressionMethodTooltip"], this.GetImageCompressionMethodItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["AllowEditable", this.collections.loc["AllowEditable"], this.DropDownListForExportForm(null, 160, this.collections.loc["AllowEditableTooltip"], this.GetAllowEditableItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ImageQuality", this.collections.loc["ImageQuality"], this.DropDownListForExportForm(null, 160, this.collections.loc["ImageQualityTooltip"], this.GetImageQualityItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ContinuousPages", null, this.CheckBox(null, this.collections.loc["ContinuousPages"], this.collections.loc["ContinuousPagesTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["StandardPdfFonts", null, this.CheckBox(null, this.collections.loc["StandardPDFFonts"], this.collections.loc["StandardPDFFontsTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["EmbeddedFonts", null, this.CheckBox(null, this.collections.loc["EmbeddedFonts"], this.collections.loc["EmbeddedFontsTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["UseUnicode", null, this.CheckBox(null, this.collections.loc["UseUnicode"], this.collections.loc["UseUnicodeTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["Compressed", null, this.CheckBox(null, this.collections.loc["Compressed"], this.collections.loc["CompressedTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ExportRtfTextAsImage", null, this.CheckBox(null, this.collections.loc["ExportRtfTextAsImage"], this.collections.loc["ExportRtfTextAsImageTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["PdfACompliance", null, this.CheckBox(null, this.collections.loc["PdfACompliance"], this.collections.loc["PdfAComplianceTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["KillSpaceLines", null, this.CheckBox(null, this.collections.loc["KillSpaceLines"], this.collections.loc["KillSpaceLinesTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["PutFeedPageCode", null, this.CheckBox(null, this.collections.loc["PutFeedPageCode"], this.collections.loc["PutFeedPageCodeTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["DrawBorder", null, this.CheckBox(null, this.collections.loc["DrawBorder"], this.collections.loc["DrawBorderTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["CutLongLines", null, this.CheckBox(null, this.collections.loc["CutLongLines"], this.collections.loc["CutLongLinesTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["BorderType", this.collections.loc["BorderType"] + ":", this.DropDownListForExportForm(null, 160, this.collections.loc["BorderTypeTooltip"], this.GetBorderTypeItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ZoomX", this.collections.loc["ZoomXY"] ? this.collections.loc["ZoomXY"].replace(":", "") + " X: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc["ZoomXYTooltip"], this.GetZoomItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ZoomY", this.collections.loc["ZoomXY"] ? this.collections.loc["ZoomXY"].replace(":", "") + " Y: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc["ZoomXYTooltip"], this.GetZoomItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["EncodingTextOrCsvFile", this.collections.loc["EncodingData"], this.DropDownListForExportForm(null, 160, this.collections.loc["EncodingDataTooltip"], this.GetEncodingDataItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ImageFormat", this.collections.loc["ImageFormat"], this.DropDownListForExportForm(null, 160, this.collections.loc["ImageFormatTooltip"], this.GetImageFormatItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["DitheringType", this.collections.loc["MonochromeDitheringType"], this.DropDownListForExportForm(null, 160, this.collections.loc["MonochromeDitheringTypeTooltip"], this.GetMonochromeDitheringTypeItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["TiffCompressionScheme", this.collections.loc["TiffCompressionScheme"], this.DropDownListForExportForm(null, 160, this.collections.loc["TiffCompressionSchemeTooltip"], this.GetTiffCompressionSchemeItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["CutEdges", null, this.CheckBox(null, this.collections.loc["CutEdges"], this.collections.loc["CutEdgesTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["MultipleFiles", null, this.CheckBox(null, this.collections.loc["MultipleFiles"], this.collections.loc["MultipleFilesTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ExportDataOnly", null, this.CheckBox(null, this.collections.loc["ExportDataOnly"], this.collections.loc["ExportDataOnlyTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["UseDefaultSystemEncoding", null, this.CheckBox(null, this.collections.loc["UseDefaultSystemEncoding"], this.collections.loc["UseDefaultSystemEncodingTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["EncodingDifFile", this.collections.loc["EncodingDifFile"], this.DropDownListForExportForm(null, 160, this.collections.loc["EncodingDifFileTooltip"], this.GetEncodingDifFileItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["ExportModeRtf", this.collections.loc["ExportModeRtf"], this.DropDownListForExportForm(null, 160, this.collections.loc["ExportModeRtfTooltip"], this.GetExportModeRtfItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["UsePageHeadersAndFooters", null, this.CheckBox(null, this.collections.loc["UsePageHeadersFooters"], this.collections.loc["UsePageHeadersFootersTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["RemoveEmptySpaceAtBottom", null, this.CheckBox(null, this.collections.loc["RemoveEmptySpace"], this.collections.loc["RemoveEmptySpaceTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["Separator", this.collections.loc["Separator"], this.TextBox(null, 160, this.collections.loc["SeparatorTooltip"]), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["DataExportMode", this.collections.loc["BandsFilter"], this.DropDownListForExportForm(null, 160, this.collections.loc["BandsFilterTooltip"], this.GetDataExportModeItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["SkipColumnHeaders", null, this.CheckBox(null, this.collections.loc["SkipColumnHeaders"], this.collections.loc["SkipColumnHeadersTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ExportObjectFormatting", null, this.CheckBox(null, this.collections.loc["ExportObjectFormatting"], this.collections.loc["ExportObjectFormattingTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["UseOnePageHeaderAndFooter", null, this.CheckBox(null, this.collections.loc["UseOnePageHeaderFooter"], this.collections.loc["UseOnePageHeaderFooterTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ExportEachPageToSheet", null, this.CheckBox(null, this.collections.loc["ExportEachPageToSheet"], this.collections.loc["ExportEachPageToSheetTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["ExportPageBreaks", null, this.CheckBox(null, this.collections.loc["ExportPageBreaks"], this.collections.loc["ExportPageBreaksTooltip"]), "SettingsGroup.container", "4px " + mrgn + " 4px " + mrgn],
        ["EncodingDbfFile", this.collections.loc["EncodingDbfFile"], this.DropDownListForExportForm(null, 160, this.collections.loc["EncodingDbfFileTooltip"], this.GetEncodingDbfFileItems(), true), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["DocumentSecurityButton", null, this.SmallButton(null, this.collections.loc["DocumentSecurityButton"], null, null, "Down", "stiJsViewerFormButton"), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["DigitalSignatureButton", null, this.SmallButton(null, this.collections.loc["DigitalSignatureButton"], null, null, "Down", "stiJsViewerFormButton"), "SettingsGroup.container", "2px " + mrgn + " 2px " + mrgn],
        ["OpenAfterExport", null, this.CheckBox(null, this.collections.loc["OpenAfterExport"], this.collections.loc["OpenAfterExportTooltip"]), null, "4px " + mrgn + " 4px " + mrgn],
        ["DocumentSecurityMenu", null, this.BaseMenu(exportForm.name + "DocumentSecurityMenu", null, "Down", "stiJsViewerDropdownPanel"), null, null],
        ["PasswordInputUser", this.collections.loc["UserPassword"], this.TextBox(null, 160, this.collections.loc["UserPasswordTooltip"]), "DocumentSecurityMenu.innerContent", "8px " + mrgn + " 2px " + mrgn],
        ["PasswordInputOwner", this.collections.loc["OwnerPassword"], this.TextBox(null, 160, this.collections.loc["OwnerPasswordTooltip"]), "DocumentSecurityMenu.innerContent", "2px " + mrgn + " 2px " + mrgn],
        ["PrintDocument", null, this.CheckBox(null, this.collections.loc["AllowPrintDocument"], this.collections.loc["AllowPrintDocumentTooltip"]), "DocumentSecurityMenu.innerContent", "4px " + mrgn + " 4px " + mrgn],
        ["ModifyContents", null, this.CheckBox(null, this.collections.loc["AllowModifyContents"], this.collections.loc["AllowModifyContentsTooltip"]), "DocumentSecurityMenu.innerContent", "4px " + mrgn + " 4px " + mrgn],
        ["CopyTextAndGraphics", null, this.CheckBox(null, this.collections.loc["AllowCopyTextAndGraphics"], this.collections.loc["AllowCopyTextAndGraphicsTooltip"]), "DocumentSecurityMenu.innerContent", "4px " + mrgn + " 4px " + mrgn],
        ["AddOrModifyTextAnnotations", null, this.CheckBox(null, this.collections.loc["AllowAddOrModifyTextAnnotations"], this.collections.loc["AllowAddOrModifyTextAnnotationsTooltip"]), "DocumentSecurityMenu.innerContent", "4px " + mrgn + " 4px " + mrgn],
        ["KeyLength", this.collections.loc["EncryptionKeyLength"], this.DropDownListForExportForm(null, 160, this.collections.loc["EncryptionKeyLengthTooltip"], this.GetEncryptionKeyLengthItems(), true), "DocumentSecurityMenu.innerContent", "2px " + mrgn + " 8px " + mrgn],
        ["DigitalSignatureMenu", null, this.BaseMenu(exportForm.name + "DigitalSignatureMenu", null, "Down", "stiJsViewerDropdownPanel"), null, null],
        ["UseDigitalSignature", null, this.CheckBox(null, this.collections.loc["UseDigitalSignature"], this.collections.loc["UseDigitalSignatureTooltip"]), "DigitalSignatureMenu.innerContent", "8px " + mrgn + " 4px " + mrgn],
        ["GetCertificateFromCryptoUI", null, this.CheckBox(null, this.collections.loc["GetCertificateFromCryptoUI"], this.collections.loc["GetCertificateFromCryptoUITooltip"]), "DigitalSignatureMenu.innerContent", "4px " + mrgn + " 4px " + mrgn],
        ["SubjectNameString", this.collections.loc["SubjectNameString"], this.TextBox(null, 160, this.collections.loc["SubjectNameStringTooltip"]), "DigitalSignatureMenu.innerContent", "8px " + mrgn + " 8px " + mrgn]
    ]

    //Add Controls To Form
    for (var i = 0; i < controlProps.length; i++) {
        var name = controlProps[i][0];
        var label = controlProps[i][1];
        var control = controlProps[i][2];
        var parentControlName = controlProps[i][3];
        exportForm.controls[name] = control;
        if (controlProps[i][4]) control.style.margin = controlProps[i][4];
        if (control.className == "stiJsViewerGroupPanel") control.container.style.paddingBottom = "6px";
        if (name == "DocumentSecurityMenu" || name == "DigitalSignatureMenu") continue;

        if (parentControlName != null) {
            var controlNamesArray = parentControlName.split(".");
            var parentControl = exportForm.controls[controlNamesArray[0]];
            if (controlNamesArray.length > 1) {
                for (var k = 1; k < controlNamesArray.length; k++) {
                    if (parentControl) parentControl = parentControl[controlNamesArray[k]]
                }
            }
            if (parentControl) exportForm.addControlToParentControl(label, control, parentControl, name);
            continue;
        }
        exportForm.addControlToParentControl(label, control, exportForm.container, name);
    }

    exportForm.controls.PageRangePages.lastCell.style.paddingLeft = "60px";

    try {
        exportForm.controls.PasswordInputUser.setAttribute("type", "password");
        exportForm.controls.PasswordInputOwner.setAttribute("type", "password");
        exportForm.controls.SaveReportPassword.setAttribute("type", "password");
    } catch (e) { }

    exportForm.controls.DocumentSecurityMenu.parentButton = exportForm.controls.DocumentSecurityButton;
    exportForm.controls.DigitalSignatureMenu.parentButton = exportForm.controls.DigitalSignatureButton;
    var buttonNames = ["DocumentSecurityButton", "DigitalSignatureButton"];
    for (var i = 0; i < buttonNames.length; i++) {
        var button = exportForm.controls[buttonNames[i]];
        button.innerTable.style.width = "100%";
        button.style.minWidth = "220px";
        button.caption.style.textAlign = "center";
        button.caption.style.width = "100%";
        button.style.display = "inline-block";
    }

    //Add Action Methods To Controls
    //Types Controls
    exportForm.controls.ImageType.action = function () {
        exportForm.showControlsByExportFormat("Image" + this.key, true);
    }

    exportForm.controls.DataType.action = function () {
        exportForm.showControlsByExportFormat(this.key, true);
    }

    exportForm.controls.ExcelType.action = function () {
        var exportFormat = this.key == "ExcelBinary" ? "Excel" : this.key;
        exportForm.showControlsByExportFormat(exportFormat, true);
    }

    exportForm.controls.HtmlType.action = function () {
        exportForm.showControlsByExportFormat(this.key, true);
    }

    //Saving Report
    var controlNames = ["SaveReportMdc", "SaveReportMdz", "SaveReportMdx"];
    for (var i = 0; i < controlNames.length; i++) {
        exportForm.controls[controlNames[i]].controlName = controlNames[i];
        exportForm.controls[controlNames[i]].onChecked = function () {
            if (this.isChecked) { exportForm.controls.SaveReportPassword.setEnabled(this.controlName == "SaveReportMdx"); }
        }
    }
    //PdfACompliance
    exportForm.controls.PdfACompliance.onChecked = function () {
        var controlNames = ["StandardPdfFonts", "EmbeddedFonts", "UseUnicode"];
        for (var i = 0; i < controlNames.length; i++) { exportForm.controls[controlNames[i]].setEnabled(!this.isChecked); }
    }
    //EmbeddedFonts, UseUnicode
    var controlNames = ["EmbeddedFonts", "UseUnicode"];
    for (var i = 0; i < controlNames.length; i++) {
        exportForm.controls[controlNames[i]].onChecked = function () { if (this.isChecked) exportForm.controls.StandardPdfFonts.setChecked(false); };
    }
    //StandardPdfFonts
    exportForm.controls.StandardPdfFonts.onChecked = function () {
        if (!this.isChecked) return;
        var controlNames = ["EmbeddedFonts", "UseUnicode"];
        for (var i = 0; i < controlNames.length; i++) { exportForm.controls[controlNames[i]].setChecked(false); }
    }
    //ImageCompressionMethod
    exportForm.controls.ImageCompressionMethod.onChange = function () {
        exportForm.controls.ImageQuality.setEnabled(this.key == "Jpeg");
    }
    //ExportDataOnly
    exportForm.controls.ExportDataOnly.onChecked = function () {
        exportForm.controls.ExportObjectFormatting.setEnabled(this.isChecked);
        exportForm.controls.UseOnePageHeaderAndFooter.setEnabled(!this.isChecked);
    }
    //UseDefaultSystemEncoding
    exportForm.controls.UseDefaultSystemEncoding.onChecked = function () {
        exportForm.controls.EncodingDifFile.setEnabled(!this.isChecked);
    }
    //ImageType
    exportForm.controls.ImageType.onChange = function () {
        exportForm.controls.TiffCompressionScheme.setEnabled(this.key == "Tiff");
        var items = exportForm.jsObject.GetImageFormatItems(this.key == "Emf");
        exportForm.controls.ImageFormat.menu.addItems(items);
    }
    //ImageFormat
    exportForm.controls.ImageFormat.onChange = function () {
        exportForm.controls.DitheringType.setEnabled(this.key == "Monochrome");
    }
    //DocumentSecurityButton
    exportForm.controls.DocumentSecurityButton.action = function () {
        exportForm.jsObject.controls.menus[exportForm.name + "DocumentSecurityMenu"].changeVisibleState(!this.isSelected);
    }
    //DigitalSignatureButton
    exportForm.controls.DigitalSignatureButton.action = function () {
        exportForm.jsObject.controls.menus[exportForm.name + "DigitalSignatureMenu"].changeVisibleState(!this.isSelected);
    }
    //UseDigitalSignature
    exportForm.controls.UseDigitalSignature.onChecked = function () {
        exportForm.controls.GetCertificateFromCryptoUI.setEnabled(this.isChecked);
        exportForm.controls.SubjectNameString.setEnabled(this.isChecked && !exportForm.controls.GetCertificateFromCryptoUI.isChecked);
    }
    //GetCertificateFromCryptoUI
    exportForm.controls.GetCertificateFromCryptoUI.onChecked = function () {
        exportForm.controls.SubjectNameString.setEnabled(!this.isChecked && exportForm.controls.UseDigitalSignature.isChecked);
    }

    //Form Methods
    exportForm.setControlsValue = function (ignoreTypeControls) {
        var defaultExportSettings = exportForm.jsObject.getDefaultExportSettings(exportForm.exportFormat);
        if (!defaultExportSettings) return;
        var exportControlNames = exportForm.getExportControlNames();

        //Reset Enabled States for All Controls
        for (var i in exportForm.controls) {
            if (exportForm.controls[i]["setEnabled"] != null) exportForm.controls[i].setEnabled(true);
        }

        //PageRange       
        var pageRangeAllIsDisabled = exportForm.jsObject.isContainted(exportControlNames, "ImageType") && exportForm.exportFormat != "ImageTiff";
        exportForm.controls[!pageRangeAllIsDisabled ? "PageRangeAll" : "PageRangeCurrentPage"].setChecked(true);
        exportForm.controls.PageRangeAll.setEnabled(!pageRangeAllIsDisabled);

        for (var propertyName in defaultExportSettings) {
            if (exportForm.jsObject.isContainted(exportControlNames, propertyName)) {
                if (propertyName == "ImageType" || propertyName == "DataType" || propertyName == "ExcelType" || propertyName == "HtmlType") {
                    if (ignoreTypeControls) continue;

                    switch (propertyName) {
                        case "ImageType":
                            if (!exportForm.jsObject.options.exports.showExportToImageBmp && defaultExportSettings[propertyName] == "Bmp") defaultExportSettings[propertyName] = "Gif";
                            if (!exportForm.jsObject.options.exports.showExportToImageGif && defaultExportSettings[propertyName] == "Gif") defaultExportSettings[propertyName] = "Jpeg";
                            if (!exportForm.jsObject.options.exports.showExportToImageJpeg && defaultExportSettings[propertyName] == "Jpeg") defaultExportSettings[propertyName] = "Pcx";
                            if (!exportForm.jsObject.options.exports.showExportToImagePcx && defaultExportSettings[propertyName] == "Pcx") defaultExportSettings[propertyName] = "Png";
                            if (!exportForm.jsObject.options.exports.showExportToImagePng && defaultExportSettings[propertyName] == "Png") defaultExportSettings[propertyName] = "Tiff";
                            if (!exportForm.jsObject.options.exports.showExportToImageTiff && defaultExportSettings[propertyName] == "Tiff") defaultExportSettings[propertyName] = "Emf";
                            if (!exportForm.jsObject.options.exports.showExportToImageMetafile && defaultExportSettings[propertyName] == "Emf") defaultExportSettings[propertyName] = "Svg";
                            if (!exportForm.jsObject.options.exports.showExportToImageSvg && defaultExportSettings[propertyName] == "Svg") defaultExportSettings[propertyName] = "Svgz";
                            if (!exportForm.jsObject.options.exports.showExportToImageSvgz && defaultExportSettings[propertyName] == "Svgz") defaultExportSettings[propertyName] = "Bmp";
                            break;

                        case "DataType":
                            if (!exportForm.jsObject.options.exports.showExportToCsv && defaultExportSettings[propertyName] == "Csv") defaultExportSettings[propertyName] = "Dbf";
                            if (!exportForm.jsObject.options.exports.showExportToDbf && defaultExportSettings[propertyName] == "Dbf") defaultExportSettings[propertyName] = "Xml";
                            if (!exportForm.jsObject.options.exports.showExportToXml && defaultExportSettings[propertyName] == "Xml") defaultExportSettings[propertyName] = "Dif";
                            if (!exportForm.jsObject.options.exports.showExportToDif && defaultExportSettings[propertyName] == "Dif") defaultExportSettings[propertyName] = "Sylk";
                            if (!exportForm.jsObject.options.exports.showExportToSylk && defaultExportSettings[propertyName] == "Sylk") defaultExportSettings[propertyName] = "Csv";
                            break;

                        case "ExcelType":
                            if (!exportForm.jsObject.options.exports.showExportToExcel2007 && defaultExportSettings[propertyName] == "Excel2007") defaultExportSettings[propertyName] = "ExcelBinary";
                            if (!exportForm.jsObject.options.exports.showExportToExcel2007 && defaultExportSettings[propertyName] == "Excel2007") defaultExportSettings[propertyName] = "ExcelBinary";
                            if (!exportForm.jsObject.options.exports.showExportToExcel && defaultExportSettings[propertyName] == "ExcelBinary") defaultExportSettings[propertyName] = "ExcelXml";
                            if (!exportForm.jsObject.options.exports.showExportToExcelXml && defaultExportSettings[propertyName] == "ExcelXml") defaultExportSettings[propertyName] = "Excel2007";
                            break;

                        case "HtmlType":
                            if (!exportForm.jsObject.options.exports.showExportToHtml && defaultExportSettings[propertyName] == "Html") defaultExportSettings[propertyName] = "Html5";
                            if (!exportForm.jsObject.options.exports.showExportToHtml5 && defaultExportSettings[propertyName] == "Html5") defaultExportSettings[propertyName] = "Mht";
                            if (!exportForm.jsObject.options.exports.showExportToMht && defaultExportSettings[propertyName] == "Mht") defaultExportSettings[propertyName] = "Html";
                            break;
                    }
                }

                var control = exportForm.controls[propertyName];
                exportForm.setDefaultValueToControl(control, defaultExportSettings[propertyName]);
            }
        }

        //Exceptions
        if (exportForm.exportFormat == "Document") exportForm.controls.SaveReportMdc.setChecked(true);
        if (exportForm.exportFormat == "Pdf" && defaultExportSettings.StandardPdfFonts) exportForm.controls.StandardPdfFonts.setChecked(true);
        if (exportForm.jsObject.isContainted(exportControlNames, "HtmlType") && defaultExportSettings.ImageFormat) exportForm.controls.ImageFormatForHtml.setKey(defaultExportSettings.ImageFormat);
        if (exportForm.exportFormat == "Rtf" && defaultExportSettings.ExportMode) exportForm.controls.ExportModeRtf.setKey(defaultExportSettings.ExportMode);
        if (exportForm.jsObject.isContainted(exportControlNames, "ImageType") && defaultExportSettings.ImageZoom) exportForm.controls.Zoom.setKey(defaultExportSettings.ImageZoom.toString());
        if (exportForm.exportFormat == "Pdf") {
            var userAccessPrivileges = defaultExportSettings.UserAccessPrivileges;
            exportForm.controls.PrintDocument.setChecked(userAccessPrivileges.indexOf("PrintDocument") != -1 || userAccessPrivileges == "All");
            exportForm.controls.ModifyContents.setChecked(userAccessPrivileges.indexOf("ModifyContents") != -1 || userAccessPrivileges == "All");
            exportForm.controls.CopyTextAndGraphics.setChecked(userAccessPrivileges.indexOf("CopyTextAndGraphics") != -1 || userAccessPrivileges == "All");
            exportForm.controls.AddOrModifyTextAnnotations.setChecked(userAccessPrivileges.indexOf("AddOrModifyTextAnnotations") != -1 || userAccessPrivileges == "All");
        }
        //Encodings
        if (exportForm.exportFormat == "Difs" || exportForm.exportFormat == "Sylk") exportForm.controls.EncodingDifFile.setKey("437");
        if (exportForm.exportFormat == "Dbf" && defaultExportSettings.CodePage) exportForm.controls.EncodingDbfFile.setKey(defaultExportSettings.CodePage);
        if ((exportForm.exportFormat == "Text" || exportForm.exportFormat == "Csv") && defaultExportSettings.Encoding)
            exportForm.controls.EncodingTextOrCsvFile.setKey(defaultExportSettings.Encoding);
    }

    exportForm.show = function (exportFormat, actionType) {
        exportForm.actionType = actionType;
        exportForm.showControlsByExportFormat(exportFormat || "Pdf");
        exportForm.controls.SavingReportGroup.changeOpeningState(true);
        exportForm.controls.PageRangeGroup.changeOpeningState(true);
        exportForm.controls.SettingsGroup.changeOpeningState(false);
        exportForm.changeVisibleState(true);
    }

    exportForm.action = function () {
        var exportSettingsObject = exportForm.getExportSettingsObject();
        exportForm.changeVisibleState(false);

        if (exportForm.actionType == exportForm.jsObject.options.actions.exportReport) {
            exportForm.jsObject.postExport(exportForm.exportFormat, exportSettingsObject);
        }
        else if (exportForm.jsObject.options.email.showEmailDialog) {
            exportForm.jsObject.controls.forms.sendEmailForm.show(exportForm.exportFormat, exportSettingsObject);
        }
        else {
            exportSettingsObject["Email"] = exportForm.jsObject.options.email.defaultEmailAddress;
            exportSettingsObject["Message"] = exportForm.jsObject.options.email.defaultEmailMessage;
            exportSettingsObject["Subject"] = exportForm.jsObject.options.email.defaultEmailSubject;
            exportForm.jsObject.postEmail(exportForm.exportFormat, exportSettingsObject);
        }
    }

    exportForm.showControlsByExportFormat = function (exportFormat, ignoreTypeControls) {
        exportForm.exportFormat = exportFormat;
        for (var controlName in exportForm.controls) {
            var control = exportForm.controls[controlName];
            var exportControlNames = exportForm.getExportControlNames();
            if (control.parentRow) {
                control.parentRow.style.display =
                    (this.actionType == this.jsObject.options.actions.exportReport || controlName != "OpenAfterExport") && exportForm.jsObject.isContainted(exportControlNames, controlName)
                        ? ""
                        : "none";
            }
        }
        exportForm.setControlsValue(ignoreTypeControls);
    }


    exportForm.setDefaultValueToControl = function (control, value) {
        if (control["setKey"] != null) control.setKey(value.toString());
        else if (control["setChecked"] != null) control.setChecked(value);
        else if (control["value"] != null) control.value = value;
    }

    exportForm.getValueFromControl = function (control) {
        if (control["isEnabled"] == false) return control["setChecked"] != null ? false : null;
        else if (control["setKey"] != null) return control.key;
        else if (control["setChecked"] != null) return control.isChecked;
        else if (control["value"] != null) return control.value;

        return null;
    }

    exportForm.getExportControlNames = function () {
        var controlNames = {
            Document: ["SavingReportGroup", "SaveReportMdc", "SaveReportMdz", "SaveReportMdx", "SaveReportPassword"],
            Pdf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageCompressionMethod",
                "ImageQuality", /*"StandardPdfFonts",*/ "EmbeddedFonts", /*"UseUnicode", "Compressed",*/ "ExportRtfTextAsImage", "PdfACompliance", "DocumentSecurityButton", "DigitalSignatureButton",
                "OpenAfterExport", "AllowEditable", "PasswordInputUser", "PasswordInputOwner", "PrintDocument", "ModifyContents", "CopyTextAndGraphics",
                "AddOrModifyTextAnnotations", "KeyLength", "UseDigitalSignature", "GetCertificateFromCryptoUI", "SubjectNameString"],
            Xps: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "OpenAfterExport",
                "ExportRtfTextAsImage"],
            Ppt2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality"],
            Html: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml",
                "ExportMode", "UseEmbeddedImages", "AddPageBreaks", "OpenAfterExport"],
            Html5: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "ImageFormatForHtml", "ImageResolution",
                "ImageQuality", "ContinuousPages", "OpenAfterExport"],
            Mht: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml",
                "ExportMode", "AddPageBreaks"],
            Text: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "KillSpaceLines",
                "PutFeedPageCode", "DrawBorder", "CutLongLines", "BorderType", "ZoomX", "ZoomY", "EncodingTextOrCsvFile"],
            Rtf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution",
                "ImageQuality", "ExportModeRtf", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Word2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution",
                "ImageQuality", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Odt: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution",
                "ImageQuality", "RemoveEmptySpaceAtBottom"],
            Excel: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution",
                "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            ExcelXml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType"],
            Excel2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution",
                "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            Ods: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution",
                "ImageQuality"],
            Csv: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingTextOrCsvFile",
                "Separator", "SkipColumnHeaders", "DataExportMode"],
            Dbf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingDbfFile"],
            Dif: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly",
                "UseDefaultSystemEncoding", "EncodingDifFile"],
            Sylk: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly",
                "UseDefaultSystemEncoding", "EncodingDifFile"],
            Xml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType"],
            ImageBmp: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageType", "Zoom", "ImageResolution",
                "ImageFormat", "DitheringType", "TiffCompressionScheme", "CutEdges"]
        }

        controlNames.ImageGif = controlNames.ImageJpeg = controlNames.ImagePcx = controlNames.ImageJpeg = controlNames.ImagePng = controlNames.ImageTiff =
        controlNames.ImageEmf = controlNames.ImageSvg = controlNames.ImageSvgz = controlNames.ImageBmp;

        return controlNames[exportForm.exportFormat];
    }

    exportForm.getExportSettingsObject = function () {
        var exportSettings = {};
        var exportControlNames = exportForm.getExportControlNames();

        for(var i = 0; i < exportControlNames.length; i++) {
            var controls = exportForm.controls;
            var controlName = exportControlNames[i];
            var control = controls[controlName];
            if (control.groupName == exportForm.name + "SavingReportGroup" || control.groupName == exportForm.name + "PageRangeGroup" ||
                controlName == "PageRangePagesText") {
                continue;
            }
            else if (controlName == "SavingReportGroup") {
                exportSettings.Format = controls.SaveReportMdc.isChecked ? "Mdc" : (controls.SaveReportMdz.isChecked ? "Mdz" : "Mdx");
                if (exportSettings.Format == "Mdx") exportSettings.Password = controls.SaveReportPassword.value;
            }
            else if (controlName == "PageRangeGroup") {
                exportSettings.PageRange = controls.PageRangeAll.isChecked ? "All" :
                    (controls.PageRangeCurrentPage.isChecked ? (exportForm.jsObject.reportParams.pageNumber + 1).toString() : controls.PageRangePagesText.value);
            }
            else {
                var value = exportForm.getValueFromControl(control);
                if (value != null) exportSettings[controlName] = value;
            }
        }

        //Exceptions
        if (exportForm.exportFormat == "Pdf") {
            exportSettings.UserAccessPrivileges = "";
            var controlNames = ["PrintDocument", "ModifyContents", "CopyTextAndGraphics", "AddOrModifyTextAnnotations"];
            for (var i = 0; i < controlNames.length; i++) {
                if (exportSettings[controlNames[i]]) {
                    if (exportSettings.UserAccessPrivileges != "") exportSettings.UserAccessPrivileges += ", ";
                    exportSettings.UserAccessPrivileges += controlNames[i];
                    delete exportSettings[controlNames[i]];
                }
            }
        }

        if (exportForm.jsObject.isContainted(exportControlNames, "ImageType")) {
            exportSettings.ImageZoom = exportSettings.Zoom;
            delete exportSettings.Zoom;
        }
        var controlNames = [
                ["ImageFormatForHtml", "ImageFormat"],
                ["EncodingTextOrCsvFile", "Encoding"],
                ["ExportModeRtf", "ExportMode"],
                ["EncodingDifFile", "Encoding"],
                ["EncodingDbfFile", "CodePage"]
            ]
        for (var i = 0; i < controlNames.length; i++) {
            if (exportSettings[controlNames[i][0]] != null) {
                exportSettings[controlNames[i][1]] = exportSettings[controlNames[i][0]];
                delete exportSettings[controlNames[i][0]];
            }
        }

        return exportSettings;
    }
}

StiJsViewer.prototype.DropDownListForExportForm = function (name, width, toolTip, items, readOnly, showImage) {
    var dropDownList = this.DropDownList(name, width, toolTip, items, readOnly, showImage);

    dropDownList.onChange = function () { };

    dropDownList.setKey = function (key) {
        dropDownList.key = key;
        dropDownList.onChange();
        for (var itemName in dropDownList.items)
            if (key == dropDownList.items[itemName].key) {
                this.textBox.value = dropDownList.items[itemName].caption;
                if (dropDownList.image) dropDownList.image.style.background = "url(" + dropDownList.jsObject.collections.images[dropDownList.items[itemName].imageName] + ")";
                return;
            }
        dropDownList.textBox.value = key.toString();
    }
    if (dropDownList.menu) {
        dropDownList.menu.action = function (menuItem) {
            this.changeVisibleState(false);
            this.dropDownList.key = menuItem.key;
            this.dropDownList.textBox.value = menuItem.caption.innerHTML;
            if (this.dropDownList.image) this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[menuItem.imageName] + ")";
            this.dropDownList.onChange();
            this.dropDownList.action();
        }
    }

    return dropDownList;
}

StiJsViewer.prototype.InitializeErrorMessageForm = function () {
    var form = this.BaseForm("errorMessageForm", this.collections.loc["Error"], 4);
    form.buttonCancel.style.display = "none";
    
    var table = this.CreateHTMLTable();
    form.container.appendChild(table);

    form.image = document.createElement("img");
    form.image.style.padding = "15px";
    form.image.src = this.collections.images["MsgFormError.png"];
    table.addCellInLastRow(form.image);

    form.description = table.addCellInLastRow();
    form.description.className = "stiJsViewerMessagesFormDescription";
    form.description.style.maxWidth = "600px";
    form.description.style.color = this.options.toolbar.fontColor;

    form.show = function (messageText, infoType) {
        if (this.visible) {
            this.description.innerHTML += "<br/>" + messageText;
            return;
        }

        if (this.jsObject.controls.forms.errorMessageForm) { //Fixed Bug
            this.jsObject.controls.mainPanel.removeChild(this.jsObject.controls.forms.errorMessageForm);
            this.jsObject.controls.mainPanel.appendChild(this.jsObject.controls.forms.errorMessageForm);
        }
        this.image.src = infoType ? this.jsObject.collections.images["MsgFormInfo.png"] : this.jsObject.collections.images["MsgFormError.png"];
        this.caption.innerHTML = infoType ? this.jsObject.collections.loc["FormViewerTitle"] : this.jsObject.collections.loc["Error"];

        this.changeVisibleState(true);
        this.description.innerHTML = messageText;
    }

    form.action = function () {
        this.changeVisibleState(false);
    }

    return form;
}

StiJsViewer.prototype.InitializeSendEmailForm = function (form) {
    var sendEmailForm = this.BaseForm("sendEmailForm", this.collections.loc["EmailOptions"], 1);
    sendEmailForm.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") sendEmailForm.style.color = this.options.toolbar.fontColor;
    sendEmailForm.style.fontSize = "12px";
    sendEmailForm.controls = {};

    var controlProps = [
        ["Email", this.collections.loc["Email"], this.TextBox("sendEmailFormEmail", 280)],
        ["Subject", this.collections.loc["Subject"], this.TextBox("sendEmailFormSubject", 280)],
        ["Message", this.collections.loc["Message"], this.TextArea("sendEmailFormMessage", 280, 70)],
        ["AttachmentCell", this.collections.loc["Attachment"], document.createElement("div")]
    ]

    var controlsTable = this.CreateHTMLTable();
    sendEmailForm.container.appendChild(controlsTable);

    for (var i = 0; i < controlProps.length; i++) {
        var control = controlProps[i][2];
        control.style.margin = "4px";
        sendEmailForm.controls[controlProps[i][0]] = control;
        controlsTable.addTextCellInLastRow(controlProps[i][1]).className = "stiJsViewerCaptionControls";
        controlsTable.addCellInLastRow(control);
        if (i < controlProps.length - 1) controlsTable.addRow();
    }
    
    sendEmailForm.show = function (exportFormat, exportSettings) {
        this.changeVisibleState(true);
        this.exportSettings = exportSettings;
        this.exportFormat = exportFormat;

        for (var i in this.controls) {
            this.controls[i].value = "";
        }

        this.controls["Email"].value = this.jsObject.options.email.defaultEmailAddress;
        this.controls["Message"].value = this.jsObject.options.email.defaultEmailMessage;
        this.controls["Subject"].value = this.jsObject.options.email.defaultEmailSubject;

        var ext = this.exportFormat.toLowerCase().replace("image", "");
        switch (ext) {
            case "excel": ext = "xls"; break;
            case "excel2007": ext = "xlsx"; break;
            case "excelxml": ext = "xls"; break;
            case "html5": ext = "html"; break;
            case "jpeg": ext = "jpg"; break;
            case "ppt2007": ext = "ppt"; break;
            case "text": ext = "txt"; break;
            case "word2007": ext = "docx"; break;
        }

        this.controls["AttachmentCell"].innerHTML = this.jsObject.reportParams.reportFileName + "." + ext;
    }

    sendEmailForm.action = function () {
        sendEmailForm.exportSettings["Email"] = sendEmailForm.controls["Email"].value;
        sendEmailForm.exportSettings["Subject"] = sendEmailForm.controls["Subject"].value;
        sendEmailForm.exportSettings["Message"] = sendEmailForm.controls["Message"].value;

        sendEmailForm.changeVisibleState(false);
        sendEmailForm.jsObject.postEmail(sendEmailForm.exportFormat, sendEmailForm.exportSettings);
    }
}

StiJsViewer.prototype.BaseMenu = function (name, parentButton, animationDirection, menuStyleName) {
    var parentMenu = document.createElement("div");
    parentMenu.className = "stiJsViewerParentMenu";
    parentMenu.jsObject = this;
    parentMenu.id = this.generateKey();
    parentMenu.name = name;
    parentMenu.items = {};
    parentMenu.parentButton = parentButton;
    parentMenu.type = null;
    if (parentButton) parentButton.haveMenu = true;
    parentMenu.animationDirection = animationDirection;
    parentMenu.rightToLeft = this.options.appearance.rightToLeft;
    parentMenu.visible = false;
    parentMenu.style.display = "none";
    if (name) {
        if (!this.controls.menus) this.controls.menus = {};
        if (this.controls.menus[name] != null) {
            this.controls.menus[name].changeVisibleState(false);
            this.controls.mainPanel.removeChild(this.controls.menus[name]);
        }
        this.controls.menus[name] = parentMenu;
    }
    this.controls.mainPanel.appendChild(parentMenu);

    var menu = document.createElement("div");
    menu.style.overflowY = "auto";
    menu.style.overflowX = "hidden";
    menu.style.maxHeight = "420px";
    menu.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") menu.style.color = this.options.toolbar.fontColor;
    parentMenu.appendChild(menu);
    parentMenu.innerContent = menu;
    menu.className = menuStyleName || "stiJsViewerMenu";

    parentMenu.changeVisibleState = function (state, parentButton, rightAlign) {
        var mainClassName = "stiJsViewerMainPanel";
        if (parentButton) {
            this.parentButton = parentButton;
            parentButton.haveMenu = true;
        }
        if (state) {
            this.onshow();
            this.style.display = "";
            this.visible = true;
            this.style.overflow = "hidden";
            this.parentButton.setSelected(true);
            this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] = this;
            this.style.width = this.innerContent.offsetWidth + "px";
            this.style.height = this.innerContent.offsetHeight + "px";
            this.style.left = this.rightToLeft || rightAlign
                    ? (this.jsObject.FindPosX(this.parentButton, mainClassName) - this.innerContent.offsetWidth + this.parentButton.offsetWidth) + "px"
                    : this.jsObject.FindPosX(this.parentButton, mainClassName) + "px";
            this.style.top = (this.animationDirection == "Down")
                ? (this.jsObject.FindPosY(this.parentButton, mainClassName) + this.parentButton.offsetHeight + 2) + "px"
                : (this.jsObject.FindPosY(this.parentButton, mainClassName) - this.offsetHeight) + "px";
            this.innerContent.style.top = ((this.animationDirection == "Down" ? -1 : 1) * this.innerContent.offsetHeight) + "px";

            d = new Date();
            var endTime = d.getTime();
            if (this.jsObject.options.toolbar.menuAnimation) endTime += this.jsObject.options.menuAnimDuration;
            this.jsObject.ShowAnimationVerticalMenu(this, (this.animationDirection == "Down" ? 0 : -1), endTime);
        }
        else {
            this.onHide();
            clearTimeout(this.innerContent.animationTimer);
            this.visible = false;
            this.parentButton.setSelected(false);
            this.style.display = "none";
            if (this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] == this)
                this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] = null;
        }
    }

    parentMenu.action = function (menuItem) {
        return menuItem;
    }

    parentMenu.onmousedown = function () {
        if (!this.isTouchStartFlag) this.ontouchstart(true);
    }

    parentMenu.ontouchstart = function (mouseProcess) {
        var this_ = this;
        this.isTouchStartFlag = mouseProcess ? false : true;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.menuPressed = this;
        this.isTouchStartTimer = setTimeout(function () {
            this_.isTouchStartFlag = false;
        }, 1000);
    }

    parentMenu.onshow = function () { };
    parentMenu.onHide = function () { };

    return parentMenu;
}

StiJsViewer.prototype.InitializePrintMenu = function () {
    var items = [];
    items.push(this.Item("PrintPdf", this.collections.loc["PrintPdf"], "PrintPdf.png", "PrintPdf"));
    items.push(this.Item("PrintWithPreview", this.collections.loc["PrintWithPreview"], "PrintWithPreview.png", "PrintWithPreview"));
    items.push(this.Item("PrintWithoutPreview", this.collections.loc["PrintWithoutPreview"], "PrintWithoutPreview.png", "PrintWithoutPreview"));

    var printMenu = this.VerticalMenu("printMenu", this.controls.toolbar.controls["Print"], "Down", items);

    printMenu.action = function (menuItem) {
        printMenu.changeVisibleState(false);
        printMenu.jsObject.postPrint(menuItem.key);
    }
}

StiJsViewer.prototype.InitializeSaveMenu = function (menuName, parentButton) {
    var saveMenu = this.InitializeBaseSaveMenu("saveMenu", this.controls.toolbar.controls["Save"]);

    saveMenu.action = function (menuItem) {
        saveMenu.changeVisibleState(false);
        if (saveMenu.jsObject.options.exports.showExportDialog)
            saveMenu.jsObject.controls.forms.exportForm.show(menuItem.key, saveMenu.jsObject.options.actions.exportReport);
        else
            saveMenu.jsObject.postExport(menuItem.key, saveMenu.jsObject.getDefaultExportSettings(menuItem.key));
    }
}


StiJsViewer.prototype.InitializeBaseSaveMenu = function (menuName, parentButton) {
    var isFirst = true;
    var items = [];
    if (this.options.exports.showExportToDocument && menuName == "saveMenu") {
        items.push(this.Item("Document", this.collections.loc["SaveDocument"], "SaveDocument.png", "Document"));
        isFirst = false;
    }
    if (menuName == "saveMenu" && this.options.exports.showExportToPdf || this.options.exports.showExportToXps || this.options.exports.showExportToPowerPoint) {
        if (!isFirst) items.push("separator1");
        isFirst = false;
    }
    if (this.options.exports.showExportToPdf) items.push(this.Item("Pdf", this.collections.loc["SavePdf"], "SavePdf.png", "Pdf"));
    if (this.options.exports.showExportToXps) items.push(this.Item("Xps", this.collections.loc["SaveXps"], "SaveXps.png", "Xps"));
    if (this.options.exports.showExportToPowerPoint) items.push(this.Item("Ppt2007", this.collections.loc["SavePpt2007"], "SavePpt2007.png", "Ppt2007"));

    if (this.options.exports.showExportToHtml || this.options.exports.showExportToHtml5 || this.options.exports.showExportToMht) {
        if (!isFirst) items.push("separator2");
        isFirst = false;
        var htmlType = this.options.exports.defaultSettings["StiHtmlExportSettings"].HtmlType;
        if (!this.options.exports["showExportTo" + htmlType]) {
            if (this.options.exports.showExportToHtml) htmlType = "Html";
            else if (this.options.exports.showExportToHtml5) htmlType = "Html5";
            else if (this.options.exports.showExportToMht) htmlType = "Mht";
        }
        items.push(this.Item(htmlType, this.collections.loc["SaveHtml"], "SaveHtml.png", htmlType));
    }
    if (this.options.exports.showExportToText || this.options.exports.showExportToRtf || this.options.exports.showExportToWord2007 || this.options.exports.showExportToOdt) {
        if (!isFirst) items.push("separator3");
        isFirst = false;
    }
    if (this.options.exports.showExportToText) items.push(this.Item("Text", this.collections.loc["SaveText"], "SaveText.png", "Text"));
    if (this.options.exports.showExportToRtf) items.push(this.Item("Rtf", this.collections.loc["SaveRtf"], "SaveRtf.png", "Rtf"));
    if (this.options.exports.showExportToWord2007) items.push(this.Item("Word2007", this.collections.loc["SaveWord2007"], "SaveWord2007.png", "Word2007"));
    if (this.options.exports.showExportToOpenDocumentWriter) items.push(this.Item("Odt", this.collections.loc["SaveOdt"], "SaveOdt.png", "Odt"));
    if (this.options.exports.showExportToExcel || this.options.exports.showExportToExcel2007 || this.options.exports.showExportToExcelXml || this.options.exports.showExportToOpenDocumentWriter) {
        if (!isFirst) items.push("separator4");
        isFirst = false;
    }
    if (this.options.exports.showExportToExcel || this.options.exports.showExportToExcelXml || this.options.exports.showExportToExcel2007) {
        var excelType = this.options.exports.defaultSettings["StiExcelExportSettings"].ExcelType;
        if (excelType == "ExcelBinary") excelType = "Excel";
        if (!this.options.exports["showExportTo" + excelType]) {
            if (this.options.exports.showExportToExcel) excelType = "Excel";
            else if (this.options.exports.showExportToExcel2007) excelType = "Excel2007";
            else if (this.options.exports.showExportToExcelXml) excelType = "ExcelXml";
        }
        items.push(this.Item(excelType, this.collections.loc["SaveExcel"], "SaveExcel.png", excelType));
    }
    if (this.options.exports.showExportToOpenDocumentCalc) {
        items.push(this.Item("Ods", this.collections.loc["SaveOds"], "SaveOds.png", "Ods"));
    }
    if (this.options.exports.showExportToCsv || this.options.exports.showExportToDbf || this.options.exports.showExportToXml || this.options.exports.showExportToDif || this.options.exports.showExportToSylk) {
        if (!isFirst) items.push("separator5");
        isFirst = false;
        var dataType = this.options.exports.defaultSettings["StiDataExportSettings"].DataType;
        if (!this.options.exports["showExportTo" + dataType]) {
            if (this.options.exports.showExportToCsv) dataType = "Csv";
            else if (this.options.exports.showExportToDbf) dataType = "Dbf";
            else if (this.options.exports.showExportToXml) dataType = "Xml";
            else if (this.options.exports.showExportToDif) dataType = "Dif";
            else if (this.options.exports.showExportToSylk) dataType = "Sylk";
        }
        items.push(this.Item(dataType, this.collections.loc["SaveData"], "SaveData.png", dataType));
    }
    if (this.options.exports.showExportToImageBmp || this.options.exports.showExportToImageGif || this.options.exports.showExportToImageJpeg || this.options.exports.showExportToImagePcx ||
        this.options.exports.showExportToImagePng || this.options.exports.showExportToImageTiff || this.options.exports.showExportToImageMetafile || this.options.exports.showExportToImageSvg || this.options.exports.showExportToImageSvgz) {
        if (!isFirst) items.push("separator6");
        isFirst = false;
        var imageType = this.options.exports.defaultSettings["StiImageExportSettings"].ImageType;
        var imageType_ = imageType == "Emf" ? "Metafile" : imageType;
        if (!this.options.exports["showExportToImage" + imageType_]) {
            if (this.options.exports.showExportToImageBmp) imageType = "Bmp";
            else if (this.options.exports.showExportToImageGif) imageType = "Gif";
            else if (this.options.exports.showExportToImageJpeg) imageType = "Jpeg";
            else if (this.options.exports.showExportToImagePcx) imageType = "Pcx";
            else if (this.options.exports.showExportToImagePng) imageType = "Png";
            else if (this.options.exports.showExportToImageTiff) imageType = "Tiff";
            else if (this.options.exports.showExportToImageMetafile) imageType = "Emf";
            else if (this.options.exports.showExportToImageSvg) imageType = "Svg";
            else if (this.options.exports.showExportToImageSvgz) imageType = "Svgz";
        }
        items.push(this.Item("Image" + imageType, this.collections.loc["SaveImage"], "SaveImage.png", "Image" + imageType));
    }

    var baseSaveMenu = this.VerticalMenu(menuName, parentButton, "Down", items);
    baseSaveMenu.menuName = menuName;

    return baseSaveMenu;
}

StiJsViewer.prototype.InitializeSendEmailMenu = function () {
    var sendEmailMenu = this.InitializeBaseSaveMenu("sendEmailMenu", this.controls.toolbar.controls["SendEmail"]);

    sendEmailMenu.action = function (menuItem) {
        this.changeVisibleState(false);
        if (this.jsObject.options.email.showExportDialog)
            this.jsObject.controls.forms.exportForm.show(menuItem.key, this.jsObject.options.actions.emailReport);
        else if (this.jsObject.options.email.showEmailDialog) {
            this.jsObject.controls.forms.sendEmailForm.show(menuItem.key, this.jsObject.getDefaultExportSettings(menuItem.key));
        }
        else {
            var exportSettings = this.jsObject.getDefaultExportSettings(menuItem.key);
            exportSettingsObject["Email"] = this.jsObject.options.email.defaultEmailAddress;
            exportSettingsObject["Message"] = this.jsObject.options.email.defaultEmailMessage;
            exportSettingsObject["Subject"] = this.jsObject.options.email.defaultEmailSubject;
            this.jsObject.postEmail(menuItem.key, defaultSettings, this.jsObject.options.actions.emailReport);
        }
    }
}

StiJsViewer.prototype.VerticalMenu = function (name, parentButton, animDirection, items, itemStyleName, menuStyleName) {
    var menu = this.BaseMenu(name, parentButton, animDirection, menuStyleName);
    menu.itemStyleName = itemStyleName;

    menu.addItems = function (items) {
        while (this.innerContent.childNodes[0]) {
            this.innerContent.removeChild(this.innerContent.childNodes[0]);
        }
        for (var index in items) {
            if (typeof (items[index]) != "string")
                this.innerContent.appendChild(this.jsObject.VerticalMenuItem(this, items[index].name, items[index].caption, items[index].imageName, items[index].key, this.itemStyleName));
            else
                this.innerContent.appendChild(this.jsObject.VerticalMenuSeparator(this, items[index]));
        }
    }

    menu.addItems(items);
    
    return menu; 
}

StiJsViewer.prototype.VerticalMenuItem = function (menu, itemName, caption, imageName, key, styleName) {
    var menuItem = document.createElement("div");
    menuItem.jsObject = this;
    menuItem.menu = menu;
    menuItem.name = itemName;
    menuItem.key = key;
    menuItem.caption_ = caption;
    menuItem.imageName = imageName;
    menuItem.styleName = styleName || "stiJsViewerMenuStandartItem";
    menuItem.id = this.generateKey();
    menuItem.className = menuItem.styleName;
    menu.items[itemName] = menuItem;
    menuItem.isEnabled = true;
    menuItem.isSelected = false;
    menuItem.style.height = this.options.isTouchDevice ? "30px" : "24px";

    var innerTable = this.CreateHTMLTable();
    menuItem.appendChild(innerTable);
    innerTable.style.height = "100%";
    innerTable.style.width = "100%";

    if (imageName != null) {
        menuItem.cellImage = innerTable.addCell();
        menuItem.cellImage.style.width = "22px";
        menuItem.cellImage.style.minWidth = "22px";
        menuItem.cellImage.style.padding = "0";
        menuItem.cellImage.style.textAlign = "center";
        var img = document.createElement("img");
        menuItem.image = img;
        menuItem.cellImage.style.lineHeight = "0";
        menuItem.cellImage.appendChild(img);
        img.src = this.collections.images[imageName];
    }

    if (caption != null) {
        var captionCell = innerTable.addCell();
        menuItem.caption = captionCell;
        captionCell.style.padding = "0 20px 0 7px";
        captionCell.style.textAlign = "left";
        captionCell.style.whiteSpace = "nowrap";
        captionCell.innerHTML = caption;
    }

    menuItem.onmouseover = function () {
        if (this.isTouchProcessFlag || !this.isEnabled) return;
        this.className = this.styleName + " " + this.styleName + "Over";
    }

    menuItem.onmouseout = function () {
        if (this.isTouchProcessFlag || !this.isEnabled) return;
        this.className = this.styleName;
        if (this.isSelected) this.className += " " + this.styleName + "Selected";
    }

    menuItem.onclick = function () {
        if (this.isTouchProcessFlag || !this.isEnabled) return;
        this.action();
    }

    menuItem.ontouchstart = function () {
        this.jsObject.options.fingerIsMoved = false;
    }

    menuItem.ontouchend = function () {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved) return;
        this.isTouchProcessFlag = true;
        this.className = this.styleName + " " + this.styleName + "Over";
        var this_ = this;
        setTimeout(function () {
            this_.className = this_.styleName;
            this_.action();
        }, 150);
        setTimeout(function () {
            this_.isTouchProcessFlag = false;
        }, 1000);
    }

    menuItem.action = function () {
        this.menu.action(this);
    }

    menuItem.setEnabled = function (state) {
        this.isEnabled = state;
        this.className = this.styleName + " " + (state ? "" : (this.styleName + "Disabled"));
    }

    menuItem.setSelected = function (state) {
        if (!state) {
            this.isSelected = false;
            this.className = this.styleName;
            return;
        }
        if (this.menu.selectedItem != null) {
            this.menu.selectedItem.className = this.styleName;
            this.menu.selectedItem.isSelected = false;
        }
        this.className = this.styleName + " " + this.styleName + "Selected";
        this.menu.selectedItem = this;
        this.isSelected = true;
    }

    return menuItem;
}

StiJsViewer.prototype.VerticalMenuSeparator = function (menu, name) {
    var menuSeparator = document.createElement("div");
    menuSeparator.className = "stiJsViewerVerticalMenuSeparator";
    menu.items[name] = menuSeparator;

    return menuSeparator;
}

StiJsViewer.prototype.InitializeViewModeMenu = function () {
    var items = [];
    items.push(this.Item("OnePage", this.collections.loc["OnePage"], "OnePage.png", "ViewModeOnePage"));
    items.push(this.Item("WholeReport", this.collections.loc["WholeReport"], "WholeReport.png", "ViewModeWholeReport"));

    var viewModeMenu = this.VerticalMenu("viewModeMenu", this.controls.toolbar.controls["ViewMode"], "Down", items);

    viewModeMenu.action = function (menuItem) {
        viewModeMenu.changeVisibleState(false);
        viewModeMenu.jsObject.postAction(menuItem.key);
    }
}

StiJsViewer.prototype.InitializeZoomMenu = function () {
    var items = [];
    var zoomItems = ["25", "50", "75", "100", "150", "200"];
    for (var i = 0; i < zoomItems.length; i++) {
        items.push(this.Item("Zoom" + zoomItems[i], zoomItems[i] + "%", "SelectedItem.png", "Zoom" + zoomItems[i]));
    }
    items.push("separator1");
    items.push(this.Item("ZoomOnePage", this.collections.loc["ZoomOnePage"], "ZoomOnePage.png", "ZoomOnePage"));
    items.push(this.Item("ZoomPageWidth", this.collections.loc["ZoomPageWidth"], "ZoomPageWidth.png", "ZoomPageWidth"));

    var zoomMenu = this.VerticalMenu("zoomMenu", this.controls.toolbar.controls["Zoom"], "Down", items);

    zoomMenu.action = function (menuItem) {
        zoomMenu.changeVisibleState(false);
        zoomMenu.jsObject.postAction(menuItem.key);
    }
}

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}


var JSON = JSON || {};

JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        if (t == "string") obj = '"' + obj + '"';
        return String(obj);
    }
    else {
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") v = '"' + v + '"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

JSON.parse = JSON.parse || function (str) {
    if (str === "") str = '""';
    eval("var p=" + str + ";");
    return p;
};

function StiJsViewer(parameters) {
    this.defaultParameters = {options:{"reportGuid":"f062fbe58c3e43ff94cc93f98abb0719","clientGuid":"1952913744494cdf94ab33fd8b62cbef","requestStylesUrl":"/default.aspx","exports":{"showExportToDif":true,"showExportToCsv":true,"storeExportSettings":true,"showExportToImageMetafile":true,"showExportToHtml":true,"showExportToImageSvg":true,"showExportToRtf":true,"showExportToImagePcx":true,"showExportToOpenDocumentWriter":true,"showExportToImageTiff":true,"showExportToExcelXml":true,"showExportToImagePng":true,"showExportToOpenDocumentCalc":true,"showExportToDocument":true,"showExportToPowerPoint":true,"showExportToXml":true,"showExportDialog":true,"showExportToWord2007":true,"showExportToImageGif":true,"showExportToImageJpeg":true,"showExportToExcel":true,"showExportToImageSvgz":true,"showExportToExcel2007":true,"showExportToImageBmp":true,"showExportToText":true,"showExportToMht":true,"showExportToXps":true,"showExportToSylk":true,"showExportToHtml5":true,"showExportToPdf":true,"showExportToDbf":true},"actions":{"viewerEvent":"ViewerEvent"},"appearance":{"reportDisplayMode":"Table","interfaceType":"Auto","openLinksTarget":"_blank","rightToLeft":false,"scrollbarsMode":false,"showTooltips":true,"designTarget":"_self","bookmarksPrint":false,"openExportedReportTarget":"_blank","parametersPanelColumnsCount":2,"showTooltipsHelp":true,"datePickerFirstDayOfWeek":"Monday","backgroundColor":"White","bookmarksTreeWidth":180,"showPageShadow":true,"parametersPanelDateFormat":"","fullScreenMode":false,"chartRenderType":"AnimatedVector","pageAlignment":"Center","parametersPanelMaxHeight":300,"pageBorderColor":"Gray"},"toolbar":{"showPreviousPageButton":true,"showFirstPageButton":true,"showZoomButton":true,"showFindButton":true,"showPrintButton":true,"showSaveButton":true,"showSendEmailButton":true,"zoom":100,"showButtonCaptions":true,"alignment":"Default","fontColor":"","showEditorButton":true,"showFullScreenButton":true,"showMenuMode":"Click","backgroundColor":"","showViewModeButton":true,"showDesignButton":false,"printDestination":"Default","showNextPageButton":true,"showCurrentPageControl":true,"showBookmarksButton":true,"showAboutButton":true,"fontFamily":"Arial","showLastPageButton":true,"menuAnimation":true,"visible":true,"showParametersButton":true,"borderColor":"","viewMode":"OnePage"},"shortProductVersion":"2016.2.6","requestUrl":"/default.aspx","server":{"cacheItemPriority":"Default","requestTimeout":20,"globalReportCache":false,"cacheTimeout":20,"passQueryParametersForResources":true,"cacheMode":"ObjectCache","useRelativeUrls":true},"productVersion":"2016.2.6 from 4 November 2016 ","email":{"showEmailDialog":true,"defaultEmailMessage":"","defaultEmailSubject":"","defaultEmailAddress":"","showExportDialog":false},"cultureName":"en","viewerHeightType":"Percentage","viewerId":"StiWebViewer1","theme":"Office2013","requestAbsoluteUrl":"http://localhost:13773/default.aspx"},defaultExportSettings:{"StiOdsExportSettings":{"ImageQuality":0.75,"ImageResolution":100.0,"PageRange":"All"},"StiXpsExportSettings":{"ImageQuality":0.75,"ExportRtfTextAsImage":false,"ImageResolution":100.0,"PageRange":"All"},"StiTxtExportSettings":{"ZoomX":1.0,"CutLongLines":true,"ZoomY":1.0,"EscapeCodesCollectionName":null,"Encoding":"65001","KillSpaceLines":true,"PageRange":"All","KillSpaceGraphLines":true,"UseEscapeCodes":false,"BorderType":"UnicodeSingle","DrawBorder":true,"PutFeedPageCode":true},"StiPdfExportSettings":{"SubjectNameString":"","ImageResolutionMode":"Exactly","DitheringType":"FloydSteinberg","UseLocalMachineCertificates":false,"ImageQuality":0.75,"ExportRtfTextAsImage":false,"DigitalSignatureSignedBy":null,"KeyLength":"Bit40","UseUnicode":true,"PdfACompliance":false,"PasswordInputOwner":"","AutoPrintMode":"None","ImageResolution":100.0,"StandardPdfFonts":false,"AllowEditable":"No","DigitalSignatureLocation":null,"GetCertificateFromCryptoUI":true,"CreatorString":"","Compressed":true,"KeywordsString":"","CertificateData":null,"UserAccessPrivileges":"All","DigitalSignatureReason":null,"ImageFormat":"Color","ImageCompressionMethod":"Jpeg","PageRange":"All","EmbeddedFiles":[],"PasswordInputUser":"","ZUGFeRDCompliance":false,"EmbeddedFonts":true,"DigitalSignatureContactInfo":null,"CertificatePassword":null,"PdfComplianceMode":"None","UseDigitalSignature":false},"StiRtfExportSettings":{"PageRange":"All","RemoveEmptySpaceAtBottom":true,"ExportMode":"Table","ImageResolution":100.0,"ImageQuality":0.75,"CodePage":0,"StoreImagesAsPng":false,"UsePageHeadersAndFooters":false},"StiWord2007ExportSettings":{"PageRange":"All","RemoveEmptySpaceAtBottom":true,"ImageResolution":100.0,"RestrictEditing":"No","ImageQuality":0.75,"UsePageHeadersAndFooters":false},"StiImageExportSettings":{"ImageZoom":1.0,"ImageType":"Jpeg","TiffCompressionScheme":"Default","CutEdges":false,"ImageResolution":100,"ImageFormat":"Color","DitheringType":"FloydSteinberg","MultipleFiles":false,"PageRange":"All"},"StiHtmlExportSettings":{"RemoveEmptySpaceAtBottom":true,"AddPageBreaks":true,"ImageResolution":96.0,"ContinuousPages":true,"OpenLinksTarget":null,"UseWatermarkMargins":false,"PageHorAlignment":"Left","PageRange":"All","HtmlType":"Html","ChartType":"AnimatedVector","Zoom":1.0,"ImageFormat":"Png","ExportQuality":"High","ExportBookmarksMode":"All","UseEmbeddedImages":false,"ImageQuality":0.75,"CompressToArchive":false,"BookmarksTreeWidth":150,"Encoding":"65001","UseStylesTable":true,"ExportMode":"Table"},"StiDataExportSettings":{"UseDefaultSystemEncoding":true,"Separator":",","PageRange":"All","Encoding":"65001","DataExportMode":"Data","CodePage":"Default","SkipColumnHeaders":false,"ExportDataOnly":false,"DataType":"Csv"},"StiPpt2007ExportSettings":{"ImageQuality":0.75,"ImageResolution":100.0,"PageRange":"All"},"StiOdtExportSettings":{"UsePageHeadersAndFooters":false,"ImageQuality":0.75,"PageRange":"All","ImageResolution":100.0,"RemoveEmptySpaceAtBottom":true},"StiExcelExportSettings":{"PageRange":"All","ExportPageBreaks":false,"ImageResolution":100.0,"UseOnePageHeaderAndFooter":false,"ExcelType":"ExcelBinary","ImageQuality":0.75,"ExportEachPageToSheet":false,"RestrictEditing":"No","ExportDataOnly":false,"ExportObjectFormatting":true}}};this.mergeOptions(parameters, this.defaultParameters); parameters = this.defaultParameters;
    this.options = parameters.options;

    // Options
    //this.options.clientGuid = this.options.server.globalReportCache ? null : this.generateKey();
    this.options.isTouchDevice = this.options.appearance.interfaceType == "Auto" ? this.IsTouchDevice() : this.options.appearance.interfaceType == "Touch";
    this.options.menuAnimDuration = 150;
    this.options.formAnimDuration = 200;
    this.options.scrollDuration = 350;
    this.options.firstZoomDistance = 0;
    this.options.secondZoomDistance = 0;
    this.options.menuHideDelay = 250;
    this.options.zoomStep = 0;

    this.options.toolbar.backgroundColor = this.getHTMLColor(this.options.toolbar.backgroundColor);
    this.options.toolbar.borderColor = this.getHTMLColor(this.options.toolbar.borderColor);
    this.options.toolbar.fontColor = this.getHTMLColor(this.options.toolbar.fontColor);
    this.options.appearance.pageBorderColor = this.getHTMLColor(this.options.appearance.pageBorderColor);
    this.options.exports.defaultSettings = parameters.defaultExportSettings;
    this.options.parametersValues = {};
    this.options.parameterRowHeight = this.options.isTouchDevice ? 35 : 30;    

    // Collections
    this.collections = {"encodingData":[{"key":"1251","value":"Cyrillic (Windows)"},{"key":"20127","value":"US-ASCII"},{"key":"1201","value":"Unicode (Big-Endian)"},{"key":"1200","value":"Unicode"},{"key":"65000","value":"Unicode (UTF-7)"},{"key":"65001","value":"Unicode (UTF-8)"},{"key":"1250","value":"Central European (Windows)"},{"key":"1251","value":"Cyrillic (Windows)"},{"key":"1252","value":"Western European (Windows)"},{"key":"1253","value":"Greek (Windows)"},{"key":"1254","value":"Turkish (Windows)"},{"key":"1255","value":"Hebrew (Windows)"},{"key":"1256","value":"Arabic (Windows)"}],"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"loc":{"OwnerPassword":"Owner Password:","ExportMode":"Export Mode:","ButtonCancel":"Cancel","MonthJuly":"July","Save":"Save","BandsFilterTooltip":"Apply a filter condition when exporting. Data Only - only data bands (Table component, Hierarchical Band) will be exported. Data and Headers/Footers - data bands (Table component, Hierarchical Band) and their headers/footers will be exported. All Bands - All the report bands will be exported.","FullScreenToolTip":"Full screen reading.","ExportModeTooltip":"Apply a filter condition when exporting. Data Only - only data bands (Table component, Hierarchical Band) will be exported. Data and Headers/Footers - data bands (Table component, Hierarchical Band) and their headers/footers will be exported. All Bands - All the report bands will be exported.","PagesRangeCurrentPageTooltip":"Processing the current page. If this option is selected, then a selected report page will be processed.","CurrentQuarter":"Current Quarter","MultipleFiles":"Multiple Files","Separator":"Separator:","NameYes":"Yes","RangeTo":"To","AllowCopyTextAndGraphicsTooltip":"Limited access to copying information.","QuarterToDate":"Quarter To Date","SaveRtf":"Rich Text File...","FindPrevious":"Find Previous","BorderTypeDouble":"Unicode-Double","ZoomPageWidth":"Page Width","SaveHtml":"HTML File...","PagesRangeAll":"All","PreviousWeek":"Previous Week","ImageQualityTooltip":"Allows you to choose the ratio of the image quality/size of the file. The higher the quality is, the larger is the size of the finished file.","ZoomHtml":"Scale:","DayMonday":"Monday","Today":"Today","ExportModeRtfTable":"Table","ParametersToolTip":"Showing parameters panel which is used when report rendering.","TypeTooltip":"The file the report will be converted into.","RemoveEmptySpaceTooltip":"Minimize the empty space at the bottom of the page.","MonthJanuary":"January","EncryptionKeyLengthTooltip":"The length of the encryption key. The longer the length is, the more difficult it is to decrypt the document, and, accordingly, the document security is on higher priority.","UseOnePageHeaderFooterTooltip":"Define the page bands Header and Footer as the header and footer of the Microsoft Word document.","StandardPDFFontsTooltip":"14 standard Adobe fonts. If this option is enabled, then only standard 14 fonts will be used in the PDF file. All report fonts are converted into them.","SavingReport":"Saving Report","Version":"Version","OpenAfterExportTooltip":"Automatic opening of the created document (after export) by the program set for these file types.","GetCertificateFromCryptoUITooltip":"Using the interface of the system cryptography library.","BandsFilterDataOnly":"Data only","ButtonOk":"OK","Compressed":"Compressed","MonthApril":"April","ImageFormatColor":"Color","UseDigitalSignatureTooltip":"The digital signature of the file.","BookmarksToolTip":"Show the bookmark panel that is used for quick navigation to jump directly to a bookmarked location.","AddPageBreaks":"Add Page Breaks","MonthMay":"May","ImageFormatGrayscale":"Grayscale","SecondQuarter":"Second Quarter","AllowAddOrModifyTextAnnotationsTooltip":"Limited access to work with annotations in the document.","ImageFormatForHtml":"Image Format:","FindWhat":"Find What:","SubjectNameString":"Subject Name String:","DocumentSecurityButton":"Document Security","TellMeMore":"Tell me more","ExportRtfTextAsImageTooltip":"Convert the RTF text into the image. If the option is enabled, then, when exporting, RichText decomposes into simpler primitives supported by the PDF format. RichText with complex formatting (embedded images, tables) cannot always be converted correctly. In this case it is recommended to enable this option.","UsePageHeadersFootersTooltip":"Define the bands Page Header and Footer as the header and footer of the document in Microsoft Word.","ImageCompressionMethodTooltip":"The compression method: JPEG - this may cause loss of quality, Flate – no quality loss, Simple, Ordered, FloydSt. - images are output in monochrome.","Loading":"Loading","SaveImage":"Image File...","NextWeek":"Next Week","AllowPrintDocument":"Allow Print Document","ImageResolutionTooltip":"The number of pixels per inch. The higher the number of pixels is, the better is the quality of the image. The size of the finished file is much larger.","PdfAComplianceTooltip":"Support for the standard of the long-term archiving and storing of electronic documents.","PrintWithPreview":"Print with Preview","BorderTypeTooltip":"The border type of components: simple - drawing borders of components with characters +, -, |; Unicode single - drawing the borders with single box-drawing characters, Unicode double - drawing the borders with double box-drawing characters.","SaveReportMdx":"Encrypted Document File (.mdx)","CompressToArchiveTooltip":"Pack all files and folders in the zip archive.","AllowAddOrModifyTextAnnotations":"Allow Add or Modify Text Annotations","Subject":"Subject:","SubjectNameStringTooltip":"Certificate identifier. The identifier is the name of the certificate owner (full line) or a part of the name (substring).","DigitalSignatureButton":"Digital Signature","DayWednesday":"Wednesday","Time":"Time","EmbeddedImageDataTooltip":"Embed images directly into the HTML file.","CutEdges":"Cut Edges","ContinuousPagesTooltip":"The mode of placing report pages as a vertical strip.","SaveReportMdc":"Document File (.mdc)","SettingsGroup":"Settings","PagesRangeCurrentPage":"Current Page","AllowEditable":"Allow Editable:","UseDefaultSystemEncoding":"Use Default System Encoding","NextQuarter":"Next Quarter","ImageFormatTooltip":"The color scheme of the image: color - image after exporting will fully match the image in the viewer; gray – an image after exporting will be of the gray shade; monochrome - the images will be strictly black and white. At the same time, it should be considered that the monochrome has three modes None, Ordered, FloydSt.","CurrentMonth":"Current Month","CutLongLines":"Cut Long Lines","PutFeedPageCode":"Put Feed Page Code","Yesterday":"Yesterday","CompressToArchive":"Compress to Archive","DrawBorderTooltip":"Drawing the borders of components with graphic characters.","PutFeedPageCodeTooltip":"Feed pages in the final document with a special character.","DayTuesday":"Tuesday","WholeReport":"Whole Report","WeekToDate":"Week To Date","UseDigitalSignature":"Use Digital Signature","ExportDataOnly":"Export Data Only","Submit":"Submit","CutLongLinesTooltip":"Trim the long lines (text lines) by the borders of components.","NextPageToolTip":"Go to the next report page.","ExportModeRtfTooltip":"Presentation of the report data after export. The Table - the report will look like a table, where each report component is a table cell. Frame - each component will look like a single frame, but without any relationship between them.","ExportDataOnlyTooltip":"Export only Data bands (the Table component, Hierachical band).","CurrentWeek":"Current Week","AllowModifyContentsTooltip":"Limited access to the text editing.","Email":"Email:","SaveWord2007":"Microsoft Word File...","CutEdgesTooltip":"Trim the borders of report pages.","FindNext":"Find Next","UserPassword":"User Password:","PrintToolTip":"Print a report.","SaveExcel":"Microsoft Excel File...","UseDefaultSystemEncodingTooltip":"Use system coding by default or specify the encoding by standard.","DayFriday":"Friday","PrevPageToolTip":"Go to the previous report page.","FirstQuarter":"First Quarter","LastPageToolTip":"Go to the last report page.","ImageFormat":"Image Type","EncodingDbfFile":"Encoding:","PrintWithoutPreview":"Print without Preview","DaySaturday":"Saturday","BorderTypeSimple":"Simple","SaveData":"Data File...","SeparatorTooltip":"Separator between the data in the CSV file.","AllowModifyContents":"Allow Modify Contents","EncryptionKeyLength":"Encryption Key Length:","SaveDocument":"Document File...","CompressedTooltip":"Compression of the ready document. It is recommended to always include file compression.","UseUnicode":"Use Unicode","EmailSuccessfullySent":"The Email has been successfully sent.","ExportEachPageToSheetTooltip":"Export each report page in a separate Excel sheet.","SaveXps":"Microsoft XPS File...","NextMonth":"Next Month","ZoomOnePage":"Page Height","Design":"Design","MonthToDate":"Month To Date","UseUnicodeTooltip":"Extended support for encoding characters. It affects on the internal character encoding within the PDF file, and improves the copying of the text from the PDF file.","Bookmarks":"Bookmarks","Close":"Close","MonthDecember":"December","ExportRtfTextAsImage":"Export Rich Text as Image","ZoomXY":"Zoom:","MonthOctober":"October","UseOnePageHeaderFooter":"Use One Page Header and Footer","MonthMarch":"March","SaveText":"Text File...","TiffCompressionSchemeTooltip":"Compression scheme for TIFF files.","EncodingDifFile":"Encoding:","AddPageBreaksTooltip":"Visual separator of report pages.","FirstPageToolTip":"Go to the first report page.","PreviousQuarter":"Previous Quarter","UsePageHeadersFooters":"Use Page Headers and Footers","DrawBorder":"Draw Border","MatchCase":"Match &Case","ImageCompressionMethod":"Image Compression Method:","AllowEditableTooltip":"Allows changing components with the Editable property enabled.","BandsFilter":"Bands Filter:","PagesRangePages":"Pages:","PreviousMonth":"Previous Month","PasswordSaveReport":"Password:","StandardPDFFonts":"Standard PDF Fonts","NameNo":"No","BandsFilterDataAndHeadersFooters":"Data and Headers/Footers","SaveOdt":"OpenDocument Writer File...","KillSpaceLines":"Kill Space Lines","Page":"Page","ViewModeToolTip":"View Mode","MonochromeDitheringTypeTooltip":"Dithering type: None - no dithering, Ordered, FloydSt. - with dithering.","FormViewerTitle":"Viewer","MonthAugust":"August","Error":"Error!","RemoveEmptySpace":"Remove Empty Space at Bottom of Page","SavePdf":"Adobe PDF File...","MonthFebruary":"February","UserPasswordTooltip":"The password required to open the document.","SkipColumnHeadersTooltip":"Enable/disable the column headers.","DayThursday":"Thursday","OwnerPasswordTooltip":"The password to access operations with files.","PageOf":"of","OpenAfterExport":"Open After Export","ImageQuality":"Image Quality:","ExportFormTitle":"Export Settings","Reset":"Reset","ImageFormatMonochrome":"Monochrome","PasswordSaveReportTooltip":"The password required to open the document.","ExportPageBreaksTooltip":"Show the borders of the report pages on the Excel sheet.","BorderType":"Border Type","FindToolTip":"Find a text in the report.","SaveReportMdz":"Compressed Document File (.mdz)","BorderTypeSingle":"Unicode-Single","EncodingData":"Encoding:","MonthNovember":"November","Type":"Type:","AllowPrintDocumentTooltip":"Limited access to the print operation.","SaveOds":"OpenDocument Calc File...","ExportEachPageToSheet":"Export Each Page to Sheet","SavePpt2007":"Microsoft PowerPoint File...","ExportModeRtf":"Export Mode:","EditorToolTip":"Editor","ImageFormatForHtmlTooltip":"The image format in the finished file.","YearToDate":"Year To Date","ExportObjectFormatting":"Export Object Formatting","Parameters":"Parameters","AllowCopyTextAndGraphics":"Allow Copy Text and Graphics","FourthQuarter":"Fourth Quarter","GetCertificateFromCryptoUI":"Get Certificate from Crypto UI","SendEmailToolTip":"Send a report via Email.","ImageResolution":"Image Resolution:","EmailOptions":"Email Options","NewItem":"New Item","EmbeddedFonts":"Embedded Fonts","EmbeddedFontsTooltip":"Embed the font files into a PDF file.","Print":"Print","TiffCompressionScheme":"TIFF Compression Scheme:","DaySunday":"Sunday","CurrentYear":"Current Year","EncodingDataTooltip":"Encoding data file.","KillSpaceLinesTooltip":"Remove blank lines (rows) in the document.","ZoomHtmlTooltip":"The size (scale) of report pages and items after the export.","EmbeddedImageData":"Embedded Image Data","OnePage":"One Page","NextYear":"Next Year","PagesRange":"Page Range","ExportObjectFormattingTooltip":"Apply formatting to export data from Data bands (Table component, Hierachical band).","RangeFrom":"From","ZoomToolTip":"Zoom","MultipleFilesTooltip":"Each report page can be a separate file.","ThirdQuarter":"Third Quarter","SendEmail":"Send Email","EncodingDifFileTooltip":"Encoding data file.","BandsFilterAllBands":"All bands","EncodingDbfFileTooltip":"Encoding data file.","SkipColumnHeaders":"Skip Column Headers","ExportPageBreaks":"Export Page Breaks","PagesRangePagesTooltip":"The page numbers to be processed. You can specify a single page, a list of pages (using a comma as the separator), as well as specify the range by setting the start page of the range separated by \"-\" and the end page of the range. For example: 1,3,5-12.","PrintPdf":"Print to PDF","MonthJune":"June","PagesRangeAllTooltip":"Processing of all report pages.","Message":"Message:","SelectAll":"Select All","ZoomXYTooltip":"The report size (scale): X - change the horizontal scale, Y - to change the vertical scale.","MatchWholeWord":"Match &Whole Word","Attachment":"Attachment:","PdfACompliance":"PDF/A Compliance","Tomorrow":"Tomorrow","ContinuousPages":"Continuous Pages","MonthSeptember":"September","MonochromeDitheringType":"Monochrome Dithering Type:","RemoveAll":"Remove All","PreviousYear":"Previous Year","SaveToolTip":"Save a report for further using.","ExportModeRtfFrame":"Frame"},"dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"images":{"SaveHtml.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFCSURBVHjaYgzc/XQvAwODEwN5YB8D0ID/IAwC6DQMwPg7n3wFs0E0TJwJ2bh1LlJwdtCeZyg0CLhJc6HQIIBiALJibAAkD7IEWR0TA4WAEeQPikzYtm3bf3IBSC8LLoPvfPrJcOj5F4an334zSHGxMliLczNoCHBgqMMaBvc+/WLovbya4cjLpQz/gR5c+yCNoepMIcPp17eIM2DP088MNz7OYOBhVQTz+djUGO5/WcbQejEJQy1WLxx61cfACITC7IZgvhZ/PsPPv28Y7n1ezvDr3x8GNiYW/AZIckowPPryDej8/wyMjBAxPcFqBjbmDyiacXohWS2FQYBNi+HGp6lwMWZGDoYqvUXEhYGGACdDo+E0Bm6WD2C+ABszg6csH4O+MCdxYQAChiK8DHNtZxBMRyADdmzfvt2DzHS4AyDAABrkzDYw+OwxAAAAAElFTkSuQmCC","SaveDocument.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACDSURBVHjaYuzq6trLwMDgxEACKC0tZQTR3d3dDAxAA/4TC2BqoTRILwMTAxkA6AKQ7f9BbBZkieUH7+DUFGmvwqCjrQ1xNgL8J8kL2LxEtAvQXQMDLLgkiAWjLiDgApCB2FxFsguQxdENJOgCQmFD0AWEwoURmBy3A2kPBvLADoAAAwDoGaQ5APlR2wAAAABJRU5ErkJggg==","Windows7.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","SaveText.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACVSURBVHjaYuzq6trLwMDgxEAe2McANOA/CCMDGB+dRpaHYSaYUd3d3Sj0sWPHGEpLS8E0NnkYYMLlNisrK7BmEI0PMOGTPHr0KMFAYAT5g4ESsG3btv/o4Mf6Jf+JASC9LCBDHjx4iGKoJBYxXABsgIKCPIrgzwtHMMSwgevXrzGMumAwuIARmBi2A9keZKbDHQABBgABE7tHj/RgRQAAAABJRU5ErkJggg==","SaveData.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEuSURBVHjaYry/1HAvAwODEwN5YB8LTLNC1DmGX++uM3y+sxaI1zEI6mcz8Gsng1U9WGYElocBEB8KnJiQjXu2I5pB2KwGzOaUtAIrBBmKrAlJMxiw4HIbm5Amiq24AIoLpDyWMrw91YLNqTgBIzAQ/zNQArZt2/afXADSizUMvj7YzvDxxhKGP1+eMTD8+83AwifPwKPozcCnHoWhFsOAf7+/MPz+/JCBkYmVgYmVk+H/H0gw/f3xDqsPsLrg59vrDEJGRQzsInpg/q/3Nxk+3VhKvAHfnx0GY5ArgATD/78/ga7hId4AGPgP9D9J6QAcr8zswFRoiWIjiM0uqk+cC0DO5pJxAAbmV4Y/315AFHFJMHBK2RDvBV7VUDAmBoAM2LF9+3YPMtPhDoAAAwDU/JvSfn23cwAAAABJRU5ErkJggg==","ArrowUp.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///////+HiYmJiovw8fCAgYCLjIz09PTt7e3k5OR3d3eNjY729vbw8PHp6eng4ODY2Nlub26Ojo6Ki4uGhoeBgYF7fHx2dnZwcHFqa2tmZmYAbwBrAHIAXAByAEEAcgB3AG8AVQAuAHAAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugCRAWAAAAMlAAAkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugAAACABYAC0A5EAGPUJOL4BOHeaALp3CTi5jlcAAHcAAAAAugCRAWgAAAMAAAAAAAAbAAAAAACYAAAAGPUJqwFbCHdQA5YAugFUEeQAAHZQALoAugEAAAAAAABQAAAAugEAAAIAAAJSAABSAAAAAEUAAAAAAAAAAAAAAAMAAABFAAAAAAAAAFIAAADvAAC/AFAAAEUAAABwAAADl4gAAAAAAAAAAAAAAAC6AXwAAABQAAAAugEAAAAAAABoAAADkQGWWwgAAANFAAAAAAAAAAAAAAAAAQAAAAAAAij1sADUAQEAGPRUEeT3DHbVABh3DXGps7P//gCa//93CTgJNJIAAHdoAAADkQEI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB9///4DAIMBnwGfPgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC6AAA0iAACoQoxAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAsSURBVHjaY2AAAiYGKGBmYYUw2Ng5OLlADG4eXj5+AUEGBiFhEVExcQlJKQAPUAFfavqkCgAAAABJRU5ErkJggg==","Bookmarksempty.png":"data:image/png;base64,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","SavePdf.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFfSURBVHjaYvxob7yXgYHBiYE8sI8FppnvwBmwyM8Fs8AYxP976zrD783rGX5tXgeXB4FPDiYwphMTsnEgCfaENDj/a1osA0dxFZwPMhhJMxigGACyBaQIF2CxssUUQ3cBMuCetZjhR28biovQASMwEP8zUAK2bdv2n1ywY9PG/3AvvHz5mqBl4uKiCM6/fwzqG1chwgBFkgjwY2IXg9CdGwxkueDnwtkMvzauQY0FYlzw/80rhu9dLQx/Th1DRKPK9g0M/zTVGV5z8uK09f+H9wy/d20D2/z/6xcGFgsbBlY3L4b9n74iovG/mATDPy1dhn/iUsAUxQ+J46ePGDjevWH4c+IIhC8ixsBZUgU2AAS2b9+O8ALjqxcMzCCM5oI/MKeaWTFwNnYwMHJy4U6JuABbYBgDR24JMOEzYSblZ6bWt6ROH1XDGmiMTAz3XbwYnqvpMjDs3IlNyQ6AAAMA+4a3P3zhm5cAAAAASUVORK5CYII=","Office2007Silver.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","Default.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","Default.Loading.gif":"data:image/gif;base64,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","PrintWithPreview.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqNEZWsLnOA6du36YdMCZITxrIBf8p8sJ/9HgkMvTh0YjkJDiIsldhOP9sN0NKSQuD2tOneA1nsdBRYKjyV8WQiACGaxu7I0M1NaIRlLBwJK6zlKQDeDSSHPBUTYnkuIABIze2bbxNdjoACDAAnPk0mb+5vDsAAAAASUVORK5CYII=","SendEmail.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVHjaYvz//z8DLtDd3c0JpCYDMRsQZ5WWln5BV8OIywCgZhUgtdrExMSAiYmJ4dSpU3eA/AigIWcJGgDUHAKk5js6OvIADQCLXb58mWHHjh2/gMwaoCHdWA0AagQ5tV1dXb3IwMCAQU5ODsXgjx8/glzCcOHChR1AbhzQoNdwA4CaQapXGBsbW9rZ2TGwsLDgDJujR48yHDt27AXIEMauri7coQgFLs7OWMX37N3LALYG6BR8McFgaGSE3wAQWH7wDoaCSHsVDLEPeV5gWmDSNjDNgk8xMYBkF8BsxjCAbi7AaQBNXQCKSopcAEwnjHgNwGcDIQAQYABQWmVYCvm5cQAAAABJRU5ErkJggg==","WindowsXP.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiNMo+ykAuYGKgAIxqpoXms1OsgIgczRBtxjnHiNKMbA8enUDAiDWFITsSl06czoZrwKMTCFhwSeDXNprChphmgAADAHiYFoh8fAnfAAAAAElFTkSuQmCC","WindowsXP.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","Office2010Black.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","BookmarksfolderOpen.png":"data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ALLDDRIAAABlSURBVHjaXI85DsAgDAQHRMsXkpb/PyhSzg9EkcIlUrgI2N2O1/baXIxllcZxA74HLbD2jifAvKUK4nQATNJdEHC+RUDOciWXf4W3sEeVo3bSYzmiSppV9JaGCWzTv3gFjH7/GwAJKxnAgmMegQAAAABJRU5ErkJggg==","Office2007Black.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","PrintPdf.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARNJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqBGGG7E2bgOQmRnQdynfuwNm+TTtgTJCeNMaWtdfx2lgdpIE18FBiAaQIBP6+fs3wrqeHQbSzE8xvXXeD9ED89eAB+bHALCrKwMTNTb4Bv27eZGBkZ2f4tGIFRsLCkbjOohjwbf9+BpGqKobf9+8zfD91ioHt22d8lsOjEQ6+nznD8OflSwYmfn6GLzt2MKi9AZofY4qRDjBiART6n5YtY+D182PgAWIYuAKMBX8CYQA24G1HBwOHoSGKZnwAIzfOtk6F8HDEO76EBBBgALdIW6xGfnkkAAAAAElFTkSuQmCC","CloseFindPanel.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGhJREFUeNrUU0EKwDAIq/20PsFfO7w5SYTR7TChUEyaNoZKRKyT2uuw3hcwM+oJYRsREJFhNwF3F3Rb3VdOlqAUmI1+mA4REVHvuxinIT6KMZ/NBjvG2D2PIplCXaoavTdh8v/PdAkwACKzahvWdxXGAAAAAElFTkSuQmCC","CollapsingPlus.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+mJi4PBwbno6ejn5+bo6Ofp6ejp6uiBgXu9u7N5eXO3ta/q6urm5uVvb2uxr6ns6+rj4+Lk5OPl5eRnZ2Opq6Pi4uFfX1mjo53l5uXg4N/h4eBVVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAOgDhEgAAAD1sAALABgAjAAAA5YSKAAAdlR2UCobACAfmAABA4QAAACESKD11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAE//+rtAG0BnUGdasAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAABbUAAAB0nTNs/UAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolytsaQkAYRuFP6Lc3I5lpYzuKiPa5/zvjqXX0HiwA2ko3zDVZgO24nuc6foCQ8YiIc7ZBvE0SIiF3exwk/RJHpNmfeYGykjmRqk9nNEwub6vUBR0XvboOQzvidn88X+/Pd5xmRQgIsvQGdUsAAAAASUVORK5CYII=","BookmarksjoinBottom.png":"data:image/png;base64,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","ArrowLeft.png":"data:image/png;base64,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","AboutInfo.png":"data:image/png;base64,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","HelpIcon.png":"data:image/png;base64,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","MsgFormInfo.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI3SURBVHjaxJddKARRFMd3B1uKiJSkrZWQ8vGgfSJFHtja8qAtosQjxbuPePSmeFGilBSRWKSoLSUbSUr5qH3ypHxEbWFb/7udy1hm594xdk792mm6O+c/55x77hl7y/C6zUpLFVyXBzqBG1SA8l/WXIBzEAQL4M4MAU2gB7QCh87acsIHJoAfzNCvpika9/PBNtilBzokI5sCvGATHGlETDMCpeTYmchDlSvb1ucpiV1P+a9sZ6FHraUsbcegC6zoRSCH3typ94rMeUFOeoxBb5ne8nSwBBr0BMwBl1CMFfvXQxThtKyCYi0B7ZQ3IZveurY9vLzGmNy4Ev1bFlgmMTGzq/rAKahO0vbvoq36WYRNMs79I/U/7nnGAzICxsAiiCgqAcLGnHGH7/ZMIxFgdVarroEGw600+vx57UhLkfmrTy2g1IzEvr1HZJa7uQBWmRlmCIhGpZZXcAGvFh2EL3wXhMETRcJAEWQZFRBS18C5BREIqgUELBBwoBawkGTnYT4ncAGXYC2JAuap7r6dBS4aHvKMtGKJlsyqn53ft/EDCavKZrCntyMk+3689XPnv80DJyQi9E+hH6XwJ5wJD0ElmKRiMcNuQBsYFx1KWZ4GQCGFbIcXjYRFaKt1U85XZKZibvds5qS0ZINc0Ei7RsuGQBHVVx2FPCI7licStA9qaKDQarHCNaQYzClLUQfo/WudKH8srlmKxqVVAvg3YU389jL741QkJd10qIWtEKDu8VL2IcAACNZ58Bjd0bIAAAAASUVORK5CYII=","Bookmarksnode.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB5SURBVHjaYvz//z8DJYAFxiguLiZkUmNvb28DhijIBSBcVFT0HxcAyTU0NIDoBph6GGYi1qn19fUMfHx89UCXNmD1Agxs2bIFhe/j4wPzItwsIG4gyQvo3kH2AkEXYHMNXi9gU0RUNI66YLC4ACm1EQ0YKc3OAAEGACk8j7f3gD1uAAAAAElFTkSuQmCC","Office2007Black.Loading.gif":"data:image/gif;base64,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","Bookmarksfolder.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURf//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAANqrYdutZOG1b+K2cee+fOrCgtusY96waf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHpOG+kAAADhdFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFYmD64AAABESURBVHjaYnzAgAqY0PgMLAw/GBgYOJAFWBgZ/iKr+MfIwMD8+99/KJ+DBWISE9xIDEPpI8DyC5XPwcKBpoIR3fuAAQAswAj/CTKo6wAAAABJRU5ErkJggg==","BookmarksminusBottom.png":"data:image/png;base64,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","ArrowUpBlue.png":"data:image/png;base64,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","Office2007Silver.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","FirstPage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z8DJYCJgUKAYoBv047/MIxNMTZxol2Ay1AmSjQTZQA+zQQNIKQZrwHEaMZrwOY6D0aK0wExhhAMREKGEBWN+AwhOiHhMoSkvIDNEMYBz40AAQYAaKwlq7Pf/SYAAAAASUVORK5CYII=","Office2003.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","Office2010Black.Loading.gif":"data:image/gif;base64,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","Office2007Blue.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","CollapsingMinus.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+nq6unp6uiJi4PBwbno6ejn5+bm5uXo6Ofp6eiBgXu9u7N5eXO3ta/q6upvb2uxr6ns6+rk5OPi4uHj4+Ll5eRnZ2Opq6Ph4eBfX1mjo53l5uXg4N9VVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgDhCQAAAD1sAAMABgFIQAAAUcSKAAAdlR2UCobACAfmAABA4QAAACEI/j11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB1//84iAaIBnIGcjgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAAD6eAAAA40cBS2ZAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolxlcSgjAABcAnIF1MFDBFwJJEDSh2vf/JmIH9WgAzx/XmfhACUZykaRIvMiwJXa1zSkmBcsMY50LmW1QyGIkazW4q3+NwlFxpo05nXIhkympjWnRUXM3NWt3j/ni+3p/vr/8Pb64JoOz29nAAAAAASUVORK5CYII=","Office2007Black.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==","Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z9DY2PjfwYiQX19PSMyn4mBQgAzgBENo9uIVY6qLhjCBrCQqP4/MMrBAQuLelINYARqBqcbWHoYjQUqGMAAyo2k4oaGhv8wNknRCIt75HQAEGAAd+tKehdJM0YAAAAASUVORK5CYII=","Bookmarksroot.png":"data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AzF4BsAAAAGJJREFUeNqUjkEKgDAMBCch6jeqov9/j0KpfYSXCnqwaHsSh73sMpBI3DvhQTGsf3sA4whuzX26HUeJcoRqMBrHVBlpw/scQGIaiyuKkpafhiEzAzmAcn4Yxrm05acSqbkGAGenLiT/9JfeAAAAAElFTkSuQmCC","ZoomPageWidth.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///+mwNtNgrgY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAFAACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBQAG0AYQBlAGcAVwBkAGkAdAAuAGgAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIALUAukMAAAD1sAAMABgC+QAABKsSKAAAdpN2jyobACAvyAABALoAAAC6Q0D11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAAA///9XCAIIBdwF3FcAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AAD+wAD3WKoHAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA4SURBVHjaY2BEBQwMjMzIAJcACwTgVsEKVcEKFWBlhUoDGSABVla4ClZWrCowzSDHHWgC6L5FBwBoOQJ7wAJr3QAAAABJRU5ErkJggg==","ArrowDownBlue.png":"data:image/png;base64,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","Design.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+AgIC49hhNgrj////AwMDnjkZiEAACdesAAAAAAADzlACUABh169AAAAAACAAAAAAAAAAAADoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIARABzAGUAaQBuAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQADAANToAAAD1sAAKABgDgwAABTYSKAAAdnB2bCobACAiQAABADUAAAA1Ogj11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAA//9DEAYQAm8Cb0MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAwAAB7SABTW8N7AAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAJcEhZcwAALiMAAC4jAXilP3YAAABQSURBVHjabc5LDgAhCANQmxbvf+SRTwiawbjgidWFNYpnYwhJhxbRBS2kaiLFj5UZIYz5CgWs+3zF1H1kWOVNoOwB6//suw7oWg6z9s+Vpz7MJAIcoKu7VQAAAABJRU5ErkJggg==","SaveXps.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFOSURBVHjapFLLTsJQFJxbUSRl0ZIYA42PpXFhTNAPgETjgh9hp1+iK90bv6ElUVkbhZW6cAEJwRSKRo1Ca21L7a25WBosBCdp5txzOnOnJyXLx5VLAHlMhzLHxI1iFmGmz8F2xj9TZr0A8hyrjiotf0iZYeWkiv2ttF9TpjPaC2JgwF5gApaCGTJhKAFiwcPhjTpkELyNCYMJKYi3RBf/gSzL7rSgWm7cBXbfxbXaxV1HHzmPRQnvnwycP/bw/NnH7hI/mYHlCW894VVLR6Pr4OHdwroYh2a60QZUWHszcdHU0TEctHUbVe0DWUlE+4tAMEYbDHbAEYK11DyKGyn0nD7KNQ0ZIYkXm0CzCJrGmAQz5JcLq0nUXwWc7aSR8BqyauK0bky+xJzEY3MhAT7241qQ4l7NRX9CGOLc8Ci3OPtngpKiKHtT/oelbwEGAGxRw6UIK4iWAAAAAElFTkSuQmCC","Default.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","SaveRtf.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADjSURBVHjaYgybdX0vAwODEwN5YB8LTPPKVA2wyJpzbxhWn30D54NA+OwbGHwocGJCNg4kEWIkgqIISTHYcGQ+CKAYALIFpAgXMJLjwRDD6QJsoHL9AwwxRmAg/megBGzbtu0/uQCklwVm0MuXr0myWFxcFEyzoAuQCgi6ANngH71tDH9vXmfgnrUY0wBCLvj37CkQP2H4/+UTeS740dvKwBaVwPBz5mSwYUxS0sS74M/ZU3AMAn9vXcc0AJ8LQLbzLNsI1vRz2UKwC0gKA5BmGGCPiscIgx3bt2/3IDMd7gAIMABd0qBRIGJjOgAAAABJRU5ErkJggg==","FullScreen.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYClu7ubbBNKS0sZWaAMkjUDLYa4ACaQs/gW0ZqnxKrB2UwMFAIWdIFWPzUUfvWmW6QZQEgDyS4gZPgwcAH1ohE5cZBsACxZkgMYKc2NFIcBQIABAGIsIfw8AuswAAAAAElFTkSuQmCC","Parameters.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+49hiKior////Q3uxZir1NgriUtNSsxd7n7vbb5vGIrNBxm8agvNkAAAAACAAAAAAAAAAAAEoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABhAFAAcgBtAGEAZQBlAHQAcgAuAHMAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYACQAKIoAAAD1sAAXABgBWwAABPUSKAAAdnB2bCobACB9UAABACgAAAAoilD11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAU//841AbUBhMGEzgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAkAAA2OABkQTPwAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAABESURBVHjaY2CAACYmBhTABEZwSQSACDDDuMwwATjAI8DCysaOIsDBwsnKiaqFixvVDC4eNEN5OQjYwszBTkgFigCK5wD9yAIeIKOH+wAAAABJRU5ErkJggg==","SaveOds.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGESURBVHjaYuxYr7eXgYHBiYE8sI/ZJUJ8IYhloBDCEO+wnOHrjzcMLz5cYygPuMigImHPwAiEIL6NRiZDpM1cMP/RmzMwAxSZYCx3g1qGzg36YBoGFh6IhPOtNTLA8kduTEdxAhMDhQBuwM4LzWBng2gYAHkJxj96YwZYHuQVZMAIDMT/FDlh27Zt/8kFIL0s2Ay9ef8ww/PXtxikxTQZVBWsiAsDZKAqb8UgLqzMsGRTIcPC9Tl4DcDqAiYmZgZNZQeGqoy9DJW9+gyVffoMwgKyDEoyJgyu1jkMvNwimAY8fX2R4fCFKQxPXp1jkBEzYvCyamLg45ZkiPbrZ2Bj5WAQFVRg+PjlJcPuo1MYgtwacAfip68v/8/ZGPi/db76/9uP9///8u0NaYHIyyXGEO2xgKFvmRnD/M2hYDFhfkUGJWlbBlezKgZuTmHCYcDBxsfgCfQCN4cIg7SoPlgM5LWD5yeCvUbQABAwVAtD4avLu4IxtljYsX37dg8y0+EOgAADACOF3MeMIgy6AAAAAElFTkSuQmCC","Save.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABuSURBVHjaYvz//z8DJYAFxuiMXP2fIgNgoHx5KFEagRaCaSYGCsFwNGD7zDMMoKiFYXQAEgOpwRkLlw7cB2O6eYEFm2DZshA4m5GREcMLXVFraOwCGIDZhOwiqocBIyyqgGm7AUjVk20AuQAgwADdIi9FIVmdsQAAAABJRU5ErkJggg==","Office2007Blue.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","ZoomOnePage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///9NgrimwNsY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAEwACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBPAG0AbgBQAGUAYQBlAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAK4As6wAAAD1sAAWABgB5QAABJ4SKAAAdpN2jyobACCf6AABALMAAACzrOj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAADo///TAAUAAjcCN9MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAACuAAAv6AAnMJIqAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA0SURBVHjaY2BEBQwMjMxgwAKh4AIsLCwoAiwsUBGEFmZkLawwQFMV2NyB7lIUv6D7Fh0AAGjKAnyhnaeFAAAAAElFTkSuQmCC","Office2010Silver.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB6SURBVHjazJLNDcAgCIWBdFM3wDkYwVlpPNggEWvroX2JByF5H3+oqrCjw35yzpebiOBdvIq8Y0ppSIri2FqwFEuL4sMKIsosT5ZeSoFoJpFolW4B1piers2DkJlfH0IdJkXl12R7syoINvUTA7//1XV2p/xZC6cAAwCC4Dm3f4iZSAAAAABJRU5ErkJggg==","Bookmarksminus.png":"data:image/png;base64,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","Bookmarksjoin.png":"data:image/png;base64,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","WindowsXP.Loading.gif":"data:image/gif;base64,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","PrintWithoutPreview.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC2SURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2gBEYBvZAuguIzUBO92veiVfDplp3mFdOAXEZKAxWALEEsgIigRlIL8gF/6keBiCv4IoJogOxfMUMogxhwRfvMEOwxT9yLDxhMVWVxmdLZ0QGroT0FOSFFELOBLkEC3gB0gsyYAchA2AugHqXEZofJEF6WaAKGNEzE8xWZM1ExQKyP7FpRg8HRkqzM0CAAQBaqzs4D+6nowAAAABJRU5ErkJggg==","SaveImage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYnyat2svAwODEwN5YB8TTLPURFcGGC0Qrglmg2iYOJeVDINoiTmcDwVOLNiMBSn+sPI6mIYBkGHP8ndjqGXCZgBIIcgmbBrQXIDdAGwA5CKQF9ABIzAQ/zNQArZt2/afXADSi+KFf7/+MtzfeIHh88O3DB9uvmQ4lLuC4eH2K3D5+5suMuxLWQSmsYbB6/OPGB5uu8JwffZhsEHcItwMH26/gsuz733FoOinz/B5+13sBgjrSTPwyAoyCCqKMAgpiTKw8nAwqEWYwuV/OouBbef1VIaLoaSDu2vPMzAxMkIMM5Fn+PL0PcPFvt0MwgayDKpAg0C2gzDOaHxx/C7D1xcfGX58/sHwBOh3Zj4Ohl9ffjK8vfIUZySguMCwxI3h99efDO+uPGN4e+ExgwrI1gBDBiYWJuIM4AP6HQS+v/rM8Pv7bwZ2QS4wxgew5gUZJw0wJgaADNixfft2DzLT4Q6AAAMAm/m3eTi1TEwAAAAASUVORK5CYII=","Bookmarks.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABmSURBVHjaYvz//z8DJYAFRBQXF5NsSm9vLyPcAKgA0ZqBFsLZTAwUAhZ0Ab/mnQw14UYMLSvPYSjeVOtO2ACYImyKiXIBIZegG4zTAGJdMghdQPdYoF5CQk6epABGSnMjxV4ACDAAoZcyOOj0dmgAAAAASUVORK5CYII=","Office2010.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","DateTimeButton.png":"data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AEo/IKkAAACNSURBVHjaZI7BCoQwDESn1bhru4LQ//9EhYpC2mqyB6vgbm7zeBPGbHheCxxyJ9ugBWRcgQyZhUIDi/8K8MG0IFsagNNYZy1FRy2XkWMxCOrYn2CSIgHRCVVjKSYoHHuuP7KMcd/Fp64CG9QxE3epVmx04pFe/bsaQ8/KTKxKgNkgx7WSrmE/0+0DfgcAPbo9DqZGpIwAAAAASUVORK5CYII=","About.png":"data:image/png;base64,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","Windows7.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","SaveWord2007.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEZSURBVHjaYgybdX0vAwODEwN5YB+ztm/OQhBrZaoGg7E8DwMjkH3vzQ+GUGMRhnofOQZGoMC1598w+FCgyIRsXOX6BwypthJgdoiRCEP47BtgGpm/+uwbFCcwMVAIUAxoD1RgmH34BZi95twbsLdANDIf5BVkwAgMxP8UOWHbtm3/yQUgvSwwg16+fE2SxeLiomCaBV2AVEDQBSCDX37+zSDOywqmediYGLjZmcFsol2Qt+IuOAZatz5icNYUAIu9+vSbQYZYF4DAnhsf4LZuvPgOHOXnjhDpAl1pboZlp16D6ctPvzFYKvKCvcRAiguURDiABnCBDUqNUMYMRHwuAOUPUODBXAOzHZwSgYlhO5D2IDMd7gAIMADVqqMLRV88lAAAAABJRU5ErkJggg==","Print.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACtSURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2AOQFeyDuAmIzkNP9mneCMVYg4Mawqdb9P9Qrp4C4DGTACiCWgKkBKiDWcjOQXhZkzdgCiQCQGPhApEosPAViaTIT0lOQASlAPB85MEHAt2kHisrNdR7oml+A9IIMAKmUhNkMtOU/Dg0w1zEiu4QFl9+IcAGmAcgm49KAHg4sxOY6XAAgwABqSjFfY2wW+AAAAABJRU5ErkJggg==","Windows7.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV5JREFUeNqslMFOwkAQhv9Z14YoIkpjYtAD0Yvx4hv47LyBB416wBiEGEGCgkbpth131hZMKR5aJtnubrv79Z9/pyVmxl13xL2XMcrEoV/Hecsnun4YslZAq7lfGKYUofM0Qhjb8fPwDSfHDZBShZtN0jGEpSM7U0QIIi6VsmdVCktDOGkrEwlDO2G0BiIBwtJigHgQx+WAzCQX6Di5keXxihfUtjddP/0Kl54Jyyn8D5AHm3ya/PVOIbse2UPeqy42Z2ES2fXONudhchxZD2WjQFLQXxhy1qczPZsZGFvig0mwlMFt7wNnR9X5uD+erbSj4ikIS8/lrvDwpjvNVZRj36/CRQox1hGJQkZUug45BZKtH8Z3YArDxI6It9znMvfQRLyelLXegAlC+DWvuEIRZBnC0n59B53+GKf2f2aiYmlXPA/3j68QFomZ7as+D0bvpVI9aOzi8qJJPwIMALe9x88ZfvvHAAAAAElFTkSuQmCC","Office2007Blue.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==","Bookmarksplus.png":"data:image/png;base64,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","PrevPage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABaSURBVHjaYvz//z8DJYCRUgMYQAYQg30at//HJs5EjCW+TTtwOpOJEs0EDSCkGa8BxGjGaQCxmnEasLnOg5EiA0gxBG8gEmMIwWgkaAilKZFxwDMTxQYABBgAlEaAOxX1tRYAAAAASUVORK5CYII=","BookmarksplusBottom.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB5SURBVHja1FJBCsAgDItjD+hT/YH6A5/aH2SnDRXUzTlhhaBSSGMakEQN3nu2+ikMScyordUMIdyeMk3R/lSBc850iQDAWlsliTGOeSQic8x+vTURudSk99LL7CwDqKoXAGTvVkC//dpZqjqWo96KlyR7jUf/JjoGAOZKjJty6U75AAAAAElFTkSuQmCC","CloseForm.png":"data:image/png;base64,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","ButtonArrowDown.png":"data:image/png;base64,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","ViewMode.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFaSURBVHjalFMxa4NAGH2murhkzFCiP6A4BoLQsTgEusYx0J8Q8iOMZA+lnVw6dQiIhW6aNSZQFAyECqZkzipJ2u+kDqH1bD94vLvv3ffu07sTxuPxJzgxGo0Eng5mUBVM+9ZRhQZqgjqAbduVXdYaUHHJv5qIdbvXRaXB6XRCEAQIwxC73Q7tdhtpmt5NJpPH2k84Ho+YTqeYzWbYbrfFnIqZ9DAcDp9qDXzfx2azQavVwmAwgGVZME0TsiwzuU8mfa7BcrksuNfrQdM0iKKITqcDwzDKJXyD/X5fsKqqZ3lFUcrhJdeg2WwWnCTJWX69XpfDD66BrusFu66L1WqFw+GA+XwOz/PKJffcY+x2u4jjGFEUwXGcH4dEyMuJUPWY2CViuy4WC2RZBkmSkOf5K0k37DcRrulOvAnsQfw16PguiJ4Jt4SYDK4a+EdQAWvfJLwQ3lnuS4ABAMfktPVY3F2lAAAAAElFTkSuQmCC","SaveExcel.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHjaYuxYr7eXgYHBiYE8sI8JpjnBcg8DNhoGDGTjwGJo4k4sMNaFJ4vAkiAaGzCQiQPLXXiMKs+ErgBEYwMLjrtgdRkTMgfddGQng2iYJciAERiI/xkoACx67B0M1tY2WCXfvXvHoKAgD+e/fPmaQVxcFM7fvn07qhfIcgGI4HnZj1WSB4gfPIhHEXvw4CGmAUzswlgN+PfzLV4vXL9+jUpeANmEC6A7GasXvogXkhUL1PPC9+8/cCoA2YqPDzJgx7lzZzzIdMAOgAADAKPbYKCcZy3ZAAAAAElFTkSuQmCC","Bookmarksline.png":"data:image/png;base64,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","Office2010Silver.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==","Zoom.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYvz//z8DJYAFmVNcXKwIpEqB2BuI5YD4KRDvAOLu3t7em9gMYIS5AKjZA0itBmIeXl5eBkFBQYbPnz8zvH//HiT9C4jjgIasxGoAULMEkH2VnZ1dKCQkhMHIyAiu4MaNGwwrVqwAGfYFyNUDGnIf2QAmKN0OxELR0dEomkFAQ0ODISUlhYGJiYkHyO1FdwHMAD+Qk7W1tbEGlIyMDIOSkhJYHdC1bCgGAAU4QbaLi4vjDW0xMTEQxQzEoigGAP30HUh/gQYWTgCV/wvEr7F5YffLly8Zbt26hVXz8+fPYXIHgRb+wmZAMcgVy5YtY7h79y6G5gULFjD8/QuynOEevnQQCKQWgdKBoqIiAyhM3rx5w3D//n2QZpAiRqieDqArKjEMgBoCSn2NQGwDxCpADIrz40C8AIjnA7E0uiGMxOYFoOEgAw+gG8JISmbCYkgZI6m5Ec2QNYzkZGdoWIFy7EqAAAMAObWTUmudGf4AAAAASUVORK5CYII=","Designer.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK0SURBVHjaYmxoaGAAgglAXMBABqivr4ez/Zp3qgOpRUAcuqnW/RFIjAkqlw+1hGTw69cvMAYargXkHgBiMyA+DOTLIVsAs2QyOZZ8+PprjbeJzHEgUwIqBDJ8NYjBgqY2B0rnEmt4SOd+LSEedtsCPy0+FUk+hunbbzD8+vPvBVAqDt0HyJZMI8bws0wWoGDZ++7LT7GG5RcY3n3+yZDorPoNKOYAjIOb2HwAA5lQOouQ4bBg+ff/P8PiA3efApnOa8odb8LUMeFxIMiSmXgMP4AU5iCAYTguC5CDJw3dEiTDRdENBwULGxsbAwjjsyAbLTWBLJlDwHB4mKMDXHGQh5aakr8w8AkAaTscht/BFc5MeHJoHizzOXmHMDzl1A3GYrgtPsPxWgDKnZWVlYWfGPmXTN/3nOHLz78M6IYb/ztxn1BSZsEnWTTvlMkjRk13BiTDWRl+Maj8u3mci+HrI2LyCjYf/AfhBw8e/E90Uj5triYKDxY2hp8MpT7KDMmRfiFA7nwgZibHAjD4/OMvw9RtNxkibRUZjJWFwYaX+KgwCHGzMCxfvhykJBZkSWNjIzNZFlx49JXhDTDrN626yGCnJcZQ5K2MbDgMgCxZhM8ScByk8x1jZGBgZPn/5ycrKIQYmVgYMs6brbPWlNS6fONehubelgP//0HiIZ2HmeH/399A1WwM///8YmBkZmX4/+8P2/OegwyMjIxAuT8MkmUHv7/odwerZ/wPLEOgnP/INrPLmzAw8Qgx/Hp4juHvlzckFd8ShTsZYRYwgCx43ucGwv9hgApshue9rmBzwXEA8haaC0hii+duwvQGKEiBGGwBM58YAyWAkYUdS1r/zyAQ0ASJg39f3jK8mh31n4FKABQHP++eYGBXtoBYAASLgRgUTl+pZAeoVlwJT0W0BAABBgBNYEtP4534wwAAAABJRU5ErkJggg==","DropDownButton.png":"data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACpJREFUeNpivMmACpgY6CHAAqH+MzAwMDAiqWCE8eFaGKF8hBmMtHQYYACNOgIA+vDCDAAAAABJRU5ErkJggg==","Office2010Black.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","Office2003.Loading.gif":"data:image/gif;base64,R0lGODlhEAAQAOZZAJKSkoCAgO3t7ezs7N3d3fj4+PHx8dvb2+fn5/r6+vT09L29veLi4srKyvn5+fv7+5ycnPz8/PLy8tfX17m5udTU1K2traioqP39/YaGhuTk5PDw8PPz85eXl9XV1aysrLi4uM3NzeHh4Y2Njbq6uvb29u/v74yMjNHR0Z2dnebm5tra2vX19cbGxurq6szMzN7e3sjIyKWlpcnJycvLy4eHh6mpqZiYmJWVlYSEhODg4Kenp6qqqrCwsLu7u4GBgb6+vujo6JOTk+np6dzc3J+fn7Kyst/f37e3t7S0tO7u7r+/v8HBwff39+Xl5bGxsZ6enuPj48fHx6SkpLa2ttnZ2f7+/uvr6////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBZACwAAAAAEAAQAAAHmIBYgoMoGTUTg4lYVi4GVjUBASOKglYWAEJVGZEnlFguAKE8HicjBJ4KHaE+nooMRkwJrYIwOxcMrQUDAw42U1MWrQNXVwIXvx/CxAIiHxYIuQICslgqLSgPiRgIIhKDClThFYlDVeYOggLhVDRXMw0CGuZVJZUxVCADDVJSISwrVRhYGWTFQAEs+6S8wPLgYCsBL0JsoBQIACH5BAUKAFkALAAAAAAQABAAAAeggFiCgxMdNwSDiVhWAgpWNwAAKVgmKlaDViRTMkcdkRAVPwFFl1hKU6ggBxApDBABsAiCJReoLYk9sBkSgwhANA+JDkhTiFgaIBRBisxYJFRUC82KFNDS070LC1fYigMVRBGJVhwmBYNNMVJSMIkcV/DiWAbrUhMGKwccBvBXCYMepMwwcKBKFQIJBlzZoEiBAywFD2LBEGyaBAIEWDALBAAh+QQFCgBZACwAAAAAEAAQAAAHmoBYgoMwFzYMg4lYVgYlVjZTUxZYBi5Wg1YxVFROF5EfK0IAFpeUm1QtIh8WCDwAry6CBRSbKIk+rx0Kg1c0HhGJCUxPiFhXMw0CioMoORkTDVJSIcuLNQEBI9FSL9VWGdgnAi8hG9VYHicjBIISIggY54MOVfVD8oIl9VUaBQMDDs4xqLKCxYArV5SdK/AAy8GE+GQJEJBgWSAAIfkEBQoAWQAsAAAAABAAEAAAB6CAWIKDGhQkQYOJggoFViRUVAtYCgJWiR5SMVcUkAs6MlMklpNSpRUICwtXIFOtSoIODaVEiS2tFyWDGxNHEYkPNEAIggYrBxyKgxM4HQQHVVUEyVhWNwAAKc/R01Yd1xASBAQs01gHECkMggUmHKPrPRAVgxFX9siDSQEBPwOCCfauGEgkY18AHbquDEiQCEaOAFB8DXqAIZkEFe/KTQsEACH5BAUKAFkALAAAAAAQABAAAAebgFiCg1cNDQKDiYIFCVgNUlIhWCUGVokMVVUSj1IvKlRUMZZYBZlVIgIvIRstoFQGgg8HmQiJKKAUBYMsGi4YiREeNFeLAwMOioMwOxcMA1dXiMlWNlNTFs/RyVhWF9YfBQICjdsiHxa124IOPjwr6olLAABCJtsoORkTRvMAGtM1AgQYEQUHgA8RpmUQeAKLAhejknk4MYJAskAAIfkEBQoAWQAsAAAAABAAEAAAB6OAWIKDBgcHHIOJgg8RWAdVVQRYBQqKG1dXBY+RAzFSHoMPmFcmEgQELBVSq5VYGAOYiINEqw0OgwkGClaJEUcTG4rCgxogFEHDiVYkVFQLyYNWFM3P0IIICwtXghUQPQWJCS0gOoMDPwEBSYkzU1MyBoI66QEyEzgdBEDuU0OCVkUC5CBwAwCAFAh2TKGAIZoKCVY6GISApYQAXsMOQEjBQFggACH5BAUKAFkALAAAAAAQABAAAAeZgFiCgwUDAw6DiYoDV1cCWAkFiomMjhJVVQyTggUCAgkimFWSm4MImAcPpYMYLhosgig5GROlVzMNAjUBASOlDVJSIRm8J7/BLx4nIwSlAi8hG4IrPD6Igw8oLSqDJkIAAEuJFVTlCoIa4ABGMDsXDDTlVI9YVhYAOAw2U1MWAyBUpGAYZMWFAisX+H3AUsCAlVIiPlhAMCkQACH5BAUKAFkALAAAAAAQABAAAAehgFiCg4SFg1YqJoYRD4RWRQE/FYQFV1cbgwgBmxCEJpZXjVgSGZs9hByWAxiDBDJIDo4KBgmCEzgdBIaCBisHHDcAACm7WAdVVQQdwp27x8kHECkMxRIEBCyCOiAttYMRRBUDgwYyU1MzhDBSUjFNgkPnU0AaIBRBE+xSBoJWJFM7VJCgQmWBgRlSKlg5JKCEFQoEF2BxoKAYFgQLFlwxFAgAOw==","Office2007Silver.Loading.gif":"data:image/gif;base64,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","Loading.gif":"data:image/gif;base64,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","RemoveItemButton.png":"data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAAE5JREFUeNqkjsEJwDAMA8+hO9YjVrtkgUJ2UR8pOPm29zBYoLPjZqfxLbBrNoCQwYqqpGwlAPGe7SM3qcc0wDF3JddZDish5dXx+/WVZwBwlxrSVfhUbAAAAABJRU5ErkJggg==","Office2010Silver.Loading.gif":"data:image/gif;base64,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","NextPage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYCRUgMYQAagY5/G7f+xiWPDTLgM9m3aQZTTmPBJEmMIEyEFhAxhIsaZ+AxhIjawcRlCtAGb6zwYyTYAl2aiDMCnmaABhDRTJSUyDnhmotgAgAADAB9+gDvqx6+SAAAAAElFTkSuQmCC","FirstPageDiabled.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjatNbBDsAQEARQK/1tp/1w0mOlmJldjg3zBF2s915utufvo7t/1NaaIWHvuLlvzZrpPKlUYBWeAuzCw8ApPAQg4TKAhksAE04DbDgFKOEwoIbDAFoqQkukItQmKwh9TFlE+tEYRC4VKBIqdggSLtcnJOXC2SFpV+YKsduviloutyHAADHHNisEgmXKAAAAAElFTkSuQmCC","GetFlashPlayer.gif":"data:image/gif;base64,R0lGODlhngAnALMAAAcHB////35+fkNDQ84gJ9vV1aCgoMw+Q8MnLYiIiLy7u2ZmZtx6feWcniIiIgAAACH5BAkAAA8ALAAAAACeACcAAAT+kMhJq7046827/2AojldgnmiqrmzrvnAsxyQ533iu73Qt8sCg0CUoGo0t32/IbPKO0KQS5KxaY9CjdDo5HDLXsBiVRbK4h0bB1AC3EnDFzSA3FeAJwxplgO8DfXkneAl/YWVFWzUMKW0YLAYDCQoJCyyFKgMDJwoOcAsAAieaCQKhJgMLCZomAHiGV4iiZzUHsAGOJSqRLIYDsAYCDnsKmycOBgEDsyYOcgN1AK1jKbKKIre4bikOLJqeygADyaMFAgkmxXwLBdIolcpyq9PUJ9a0I3UquRa7lgGUMP2aVsDYiQLdEKYzCBAaw4bhACBrpelhLETXPjBq5EWDCjj+6RI4M+AJjjQD/wZB67RG3YlILl9ughagoBwACnLWu7fCRgoGHT4yCyCtUk4Fa0CicFBxGcRRyQAYUhXPBEh3VmRp1RJgxMYTQIOmaPen6EOaBw22e1rQ2Ko686oivCmm1FaMJkaM/bDCgDhSqCqaEEYuwDkU4xQAWCyJj4PFKQcsdtVqMjond+5m+SPiwE8vXza0uJWtHjVzmo0YEtGgFwLRpmPvUJBaQOG8IDy3eO1Rtm8cwe7exv2h9W7Yv5PHCC5rOHEPpU3w3qa8eout+Drodo3cunehWS73/AALNGgOu/DIW4HpIJxkBW7rQRGw/fwUdAbxia8e4CsdmR3+0d542v20BGKqTEKUCp2I59c5m8RUlUql4DQhYgaNY8dMCcojiSnOxYCaai6Ql0JoVKSAFj0oqNINKrdJuGIASvEyIyDCEPOihjPWaJEMtBWhT3YaGHcCP3ypOCRWxyizhwApPYXKkEqpc+Mvh8HoUo+XocRDHyGmsMEBDNyCYooYarIGk4BY4uVglAH0lyYWDoJOQcnMqJBCdjjgTGBq0vjhQDxEh4IGpZ2J5iiTRKPiJH6h0FZDRxVDpWVTvrPSMCcsEFmjVkmiYT0ZbNdIDZksKemcEyGWE0NcKrlUU8wodSGNl3FKTakrIBlCqigwWYpMgKxBloxUipfphgdhYWVrrID8WAWvkoaFqqwnTOYKodMksNhEyL6jbETiZAmjVeJJxhiujO6KwXYFWOvDd/QGocF5XBBQ77465OsBvwDP4K9YARec0cD9GKywCgh3t/DCDff28MMRV2zxxQhHAAA7","Office2007Black.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","WholeReport.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2RB1twZkYGiqnzFDKxiUADWx4Ru9PKDd8CYkBgMsKALRNqrMBAjBgMD7wJGYDT+ZyAfMKK4gMRYYBiNBUQsPAHS0mTEwFMglgF5IQWIX5Co+QVUH9gLO0C5ityEABBgAK7WRrrRnAlbAAAAAElFTkSuQmCC","SavePpt2007.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVHjaYnzgJ72XgYHBiYE8sI8BaMB/EIaBD8t78fJBAKYHhJmQjXvoL8PAH1GElQ9iI9MwgGKA/MYnDB9X9OHkYwMs6C7Ax8cGGEH+YKAEbNu27T+5AKSXBZuh///8ZviwqJ3h27GtDP///WXgMnNjEEyqY2Bk48BQy4TNgPcLWsAaxZpXMvB6xILF3s2owuoDrAZ8O7SBgT80D2gjO8PPG2cZmAVEGb4e3gR2GVEGwMC/T+8ZuJ1CGPiCs4Ccv8S7gMsugOHj6kkMzHxCDBzalgwfFncycNsHMjCysBJngGBCDZh+XurD8LzQjeHfj68MQhlthBMSPHEAbRJKaQRjQoCJgUIAcsGO7du3e5CpfwdAgAEA6lXBi/2RZTAAAAAASUVORK5CYII=","Office2010Silver.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEWjvePV4fJ8enxTAoN3H6gAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAE4ACABgAAp3H6gY9jAAAABEAAAAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABlAFMAbABjAGUAdABkAGUASQBlAHQAbQBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgALUAupkAAAD1sAAKABgDyAAABPcSKAAAdpN2jyobACB/6AABALoAAAC6mdj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAACD//9jjAKMAn4CfmMAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AACJGAAAA10dOTGKAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAC1JREFUeNpjYMAKGDHAAAkyMWEKQsXggiA+TAyhkokJLoakHSHGOJi8iRDEAgAXYAFTLVxyPgAAAABJRU5ErkJggg==","Office2010Black.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==","ArrowDown.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///9mZmZqa2twcHF2dnZ7fHyBgYGGhoeKi4uOjo7///9ub27Y2Nng4ODp6enw8PH29vaNjY53d3fk5OTt7e309PSLjIyAgYDw8fCJiouHiYkAbwBrAHIAXAByAEEAcgB3AG8ARAB3AG8AbgBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAL8AwsEAAAD1sAAEABgCtAAAAIkSKAAAdlR2UCobACCv0AABAMIAAADCwSD11AAjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAw///w4ALgAjACMPAAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC/AADYiAB/Y8jCAAAAAXRSTlMAQObYZgAAAAFiS0dECfHZpewAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAtSURBVHjaY2BkYmZhZWPn4GRg4Obh5eMXEGQAAiFhEVExBjAQl5BkgAIpEAEAI5sBViE2gUcAAAAASUVORK5CYII=","Office2003.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","LastPage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABeSURBVHjaYvz//z8DJYCJgUKAYoBv0w6szgGJwzBBF+AyhCQvkGIIzjAg1hC8gUiMIQRjgZAhBA3YXOfBSLYBhDTjNYAYzTgNIFYzVgNI0YxhAKmaQYBxwHMjQIABANL8JauSyptCAAAAAElFTkSuQmCC","GuidButton.png":"data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACFJREFUeNpivMmACpgYhrbAfySMXQUjEsZQAQAAAP//AwCocAP5dkyIIAAAAABJRU5ErkJggg==","Office2007Silver.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==","WindowsXP.Editor.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==","Office2010.Find.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC","MsgFormError.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKpSURBVHjaYryR7MIwkICFBLWcQOwKxIFArAvEckAsCpV7AcRPgfgsEG8C4t1A/ItaDuAH4mogzgRiHhxqJKDYGIjTgPgjEE8E4m4g/oLPcCYCloMMuwfEpXgsx+XoOqjeKHIcwAbEc4B4JhALURDFoChaCsQTgJiZWAeALN8CxMlUTGv5QLwamyOwOWAaNLFRG4ASbzshB2RS2efoAJSWQnA5ABTXLXTI+hOQEzQTmutwJjguLSMG2aJOBmYu3JlBwM4brIYAkAbiHHQH8EATCl7LQbRMcRdWR4AsF48rgKslIirYkB3gBy3pMACHvCqKgSA+uiNgliM7WCqjFp8DhGAJHeYAb1wqfzy8zfB67RwMR8EcgW45CPx+/RxDDxbgjVwUG+BT+W77SkipEpyC4gj52mkMrKKSGA5+0lvG8PfbF0IOMEAOARVCqkGOQPcVBZbD7WSCxj0bMTqwOYJMy2H1BcHKiGgASg9M3Lwk6wM54DuxdbeQZzhKOkCPDlBuQY8WPOAjcgjcIcdy9OAm0RF3kB1wgVTLQXF+vyIWa8Ik0hEXkB2wFZcqUHbDZjkswYES5stFEzAcgSuqkMBWZAdsgqYFrKn7cV85nP/t2jmGh81ZKMH/4dBWFEeA1Dyb0Yw3Q0HbjQzMOUZKDNBECCpbbbCpBpVs3+9cZWDlF0ZxDLpD/354x8DEyoZTDRJoAuKDIAYjUrMcVD7fprAJRgwAtZ41YI1VJrRgqaFDe6AAuaWMXhBNB+K5NLS8D4jXEGoTZsESCJXBeiAuI6ZRCkqQPkC8gIqWTwHiUFDZRWy/AOSIRGhofKTAYlC6igPiXGyWE1MZgdKEEjTuvpNgMSiRtQKxPBAvxqeQkYTeMXrnVBEpy74G4ke06pzCwHeo4ZuomTIBAgwAJnDUiFcmQv8AAAAASUVORK5CYII=","SaveOdt.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVHjaYnTNrdvLwMDgxEAe2McE0+xlZcKwa1IjmAYBEHtqaToKHwvtxAQzqiDCl8Etrx5Mw0B290wUPjbARIp7QbaCLIG5AgRYYIwJKzaDJUA0DIC8AOMv3n6AQZifB8zeduwMw9uPX8BsRmAg/megBGzbtu0/uQCklwWboaev3mR48Owlg7KMJIORpirpgQjSJCchxtA6dxlDw4xFeA1gBDnD09MTq+S3Hz8ZfHJrGLg42BkkRYUYdFUUGWJ8XBiE+HjB8tu3b0fEwu3HzxhW7T3KcPPhUwZ1eWmG9EB3BhF+PoaqlEgGDjY2BmlxEYY37z8yLNmyhyEvKhB3IL79+Pl/6eT5/0MqO/+fvX7n/4fPX0gLRCE+Hob65AiGhOZJDBXTIP6XAjrfQFWJIdHHiYGfhxtFPdZY4ObkAHsBpFhNVhIsdgPotRW7j4DFCRoAAi6m+ih8c201MEYHIAN2AEPTg8x0uAMgwAAQguAgzbf9ngAAAABJRU5ErkJggg==","ArrowRight.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQAAAP///3d3d////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtQtZwAAAAEdFJOU////wBAKqn0AAAANElEQVR42pSPMRIAIAzCGv3/m3E2LNoxV8LBnvvWPILURyqScqSkMUAARZAU1fKxBc8/AwCN4AUl4XpNawAAAABJRU5ErkJggg==","Office2010.SelectedItem.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==","ArrowDownGray.png":"data:image/png;base64,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","CheckBox.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC7SURBVHjaYvz//z8DqYBxcGnq7u4uAlK9QDy3tLQ0hYkIDfZAqguILwBxLkiMmZubm/PYsWNHgXg2EP+3trY+iKRBGkjtBeK/QOwKtOUV3HlASVEg+xgQqwBxPVCyCSjGBmQfBmIzIA4Fiq3B8BNQkQpUI8iAeiCWA+JkIJ4I1FCAMyCAGkGmHgBiTqjQcSB2AGr6hTf0gBoDgdQ6IH4NxCZADY8wQgekCR13dXVVALEHNjkQpl+KAAgwAKCmeGnxQrElAAAAAElFTkSuQmCC","OnePage.png":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2SBaeZgZWNoDE4iqLN8xQwYE6yPiYFCwIJNcPnBOxhikfYqxBuAS/GoCwarC6iSkJ4CsfSP37+Qkykx4CnMBSlA/IJEi19A9YFdsAOUq8j1AkCAAQDiLiK1dsl6lQAAAABJRU5ErkJggg=="},"dateRanges":["CurrentMonth","CurrentQuarter","CurrentWeek","CurrentYear","NextMonth","NextQuarter","NextWeek","NextYear","PreviousMonth","PreviousQuarter","PreviousWeek","PreviousYear","FirstQuarter","SecondQuarter","ThirdQuarter","FourthQuarter","MonthToDate","QuarterToDate","WeekToDate","YearToDate","Today","Tomorrow","Yesterday"]}
    if (parameters.loc && this.collections.loc) this.collections.loc = parameters.loc;

    // Controls
    this.controls = {};
    this.controls.head = document.getElementsByTagName("head")[0];
    this.controls.viewer = document.getElementById(this.options.viewerId);
    this.controls.mainPanel = document.getElementById(this.options.viewerId + "_JsViewerMainPanel");
    this.controls.findHelper = { findLabels: [] };

    // Parameters of the current report
    this.reportParams = {
        reportGuid: this.options.reportGuid,
        paramsGuid: null,
        drillDownGuid: null,
        pageNumber: 0,
        pagesCount: 0,
        pagesWidth: 0,
        pagesHeight: 0,
        zoom: this.options.toolbar.zoom,
        viewMode: this.options.toolbar.viewMode,
        reportFileName: null,
        pagesArray: [],
        interactionCollapsingStates: null,
        bookmarksContent: null,
        editableParameters: null,
        drillDownParameters: []
    };

    // Actions
    if (!this.options.actions.printReport) this.options.actions.printReport = this.options.actions.viewerEvent;
    if (!this.options.actions.exportReport) this.options.actions.exportReport = this.options.actions.viewerEvent;
    if (!this.options.actions.interaction) this.options.actions.interaction = this.options.actions.viewerEvent;

    // Render JsViewer styles into HEAD
    if (this.options.requestStylesUrl) {
        var stylesUrl = this.options.requestStylesUrl.replace("{action}", this.options.actions.viewerEvent);
        stylesUrl += stylesUrl.indexOf("?") > 0 ? "&" : "?";
        stylesUrl += "jsviewer_resource=styles&jsviewer_theme=" + this.options.theme + "&jsviewer_version=" + this.options.shortProductVersion;

        var viewerStyles = document.createElement("link");
        viewerStyles.setAttribute("type", "text/css");
        viewerStyles.setAttribute("rel", "stylesheet");
        viewerStyles.setAttribute("href", stylesUrl);
        this.controls.head.appendChild(viewerStyles);
    }
    
    this.InitializeJsViewer();
    this.InitializeToolBar();
    if (this.options.toolbar.showFindButton) this.InitializeFindPanel();
    this.InitializeDrillDownPanel();
    this.InitializeDisabledPanels();
    this.InitializeAboutPanel();
    this.InitializeReportPanel();
    this.InitializeProcessImage();    
    this.InitializeDatePicker();
    this.InitializeToolTip();
    if (this.options.toolbar.showSaveButton && this.options.toolbar.visible) this.InitializeSaveMenu();
    if (this.options.toolbar.showSendEmailButton && this.options.toolbar.visible) this.InitializeSendEmailMenu();
    if (this.options.toolbar.showPrintButton && this.options.toolbar.visible) this.InitializePrintMenu();
    if (this.options.toolbar.showZoomButton && this.options.toolbar.visible) this.InitializeZoomMenu();
    if (this.options.toolbar.showViewModeButton && this.options.toolbar.visible) this.InitializeViewModeMenu();
    if (this.options.exports.showExportDialog || this.options.email.showExportDialog) this.InitializeExportForm();
    if (this.options.toolbar.showSendEmailButton && this.options.email.showEmailDialog && this.options.toolbar.visible) this.InitializeSendEmailForm();    
    this.addHoverEventsToMenus();


    var jsObject = this;

    this.addEvent(document, 'mouseup', function (event) {
        jsObject.DocumentMouseUp(event)
    });

    this.addEvent(document, 'mousemove', function (event) {
        jsObject.DocumentMouseMove(event)
    });

    if (document.all && !document.querySelector) {
        alert("Your web browser is not supported by our application. Please upgrade your browser!");
    }

    this.controls.viewer.style.top = 0;
    this.controls.viewer.style.right = 0;
    this.controls.viewer.style.bottom = 0;
    this.controls.viewer.style.left = 0;

    this.options.appearance.userScrollbarsMode = this.options.appearance.scrollbarsMode;
    this.changeFullScreenMode(this.options.appearance.fullScreenMode);
}

StiJsViewer.prototype.mergeOptions = function (fromObject, toObject) {
    for (var value in fromObject) {
        if (toObject[value] === undefined || typeof toObject[value] !== "object") toObject[value] = fromObject[value];
        else this.mergeOptions(fromObject[value], toObject[value]);
    }
}

StiJsViewer.prototype.showError = function (text) {
    if (text != null && typeof text == "string" && text.substr(0, 6) == "Error:") {
        if (text.length == 7) text += "Undefined";
        alert(text);
        return true;
    }

    return false;
}

StiJsViewer.prototype.createXMLHttp = function () {
    if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
    else if (window.ActiveXObject) {
        var allVersions = [
            "MSXML2.XMLHttp.5.0",
            "MSXML2.XMLHttp.4.0",
            "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp",
            "Microsoft.XMLHttp"
        ];
        for (var i = 0; i < allVersions.length; i++) {
            try {
                var xmlHttp = new ActiveXObject(allVersions[i]);
                return xmlHttp;
            }
            catch (oError) {
            }
        }
    }
    throw new Error("Unable to create XMLHttp object.");
}

StiJsViewer.prototype.createPostParameters = function (data, asObject) {
    if (this.reportParams.zoom == -1 || this.reportParams.zoom == -2) this.reportParams.autoZoom = this.reportParams.zoom;
    
    var params = {
        "viewerId": this.options.viewerId,
        "routes": this.options.routes,
        "formValues": this.options.formValues,
        "clientGuid": this.options.clientGuid,
        "reportGuid": this.reportParams.reportGuid,
        "paramsGuid": this.reportParams.paramsGuid,
        "drillDownGuid": this.reportParams.drillDownGuid,
        "cacheMode": this.options.server.cacheMode,
        "cacheTimeout": this.options.server.cacheTimeout,
        "cacheItemPriority": this.options.server.cacheItemPriority,
        "pageNumber": this.reportParams.pageNumber,
        "zoom": (this.reportParams.zoom == -1 || this.reportParams.zoom == -2) ? 100 : this.reportParams.zoom,
        "viewMode": this.reportParams.viewMode,
        "multiPageWidthCount": this.reportParams.multiPageWidthCount,
        "multiPageHeightCount": this.reportParams.multiPageHeightCount,
        "multiPageContainerWidth": this.reportParams.multiPageContainerWidth,
        "multiPageContainerHeight": this.reportParams.multiPageContainerHeight,
        "multiPageMargins": this.reportParams.multiPageMargins,
        "showBookmarks": this.options.toolbar.showBookmarksButton,
        "openLinksTarget": this.options.appearance.openLinksTarget,
        "chartRenderType": this.options.appearance.chartRenderType,
        "reportDisplayMode": this.options.appearance.reportDisplayMode,
        "drillDownParameters": this.reportParams.drillDownParameters,
        "editableParameters": this.reportParams.editableParameters
    };

    if (data)
        for (var key in data)
            params[key] = data[key];

    var postParams = null;
    if (asObject) {
        postParams = {};
        if (params.action) {
            postParams["jsviewer_action"] = params.action;
            delete params.action;
        }
        postParams["jsviewer_parameters"] = Base64.encode(JSON.stringify(params));
    }
    else {
        postParams = "";
        if (params.action) {
            postParams += "jsviewer_action=" + params.action + "&";
            delete params.action;
        }
        postParams += "jsviewer_parameters=" + encodeURIComponent(Base64.encode(JSON.stringify(params)));
    }

    return postParams;
}

StiJsViewer.prototype.postAjax = function (url, data, callback) {    
    if (this.controls.toolbar && data && data.action == "GetReport") {
        this.controls.toolbar.setEnabled(false);
    }

    var jsObject = this;
    var xmlHttp = this.createXMLHttp();

    if (jsObject.options.server.requestTimeout != 0) {
        setTimeout(function () {
            if (xmlHttp.readyState < 4) xmlHttp.abort();
        }, jsObject.options.server.requestTimeout * 1000);
    }

    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.responseType = "text";
    if (data && data.responseType) xmlHttp.responseType = data.responseType;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            var status = 0;
            try {
                status = xmlHttp.status;
            }
            catch (e) {
            }

            if (status == 0) {
                callback("Error: Timeout response from the server", jsObject);
            } else if (status == 200) {
                callback(xmlHttp.response ? xmlHttp.response : xmlHttp.responseText, jsObject);
            } else {
                callback("Error: " + status + " - " + xmlHttp.statusText, jsObject);
            }
        }
    };

    var params = this.createPostParameters(data, false);
    xmlHttp.send(params);
}

StiJsViewer.prototype.postForm = function (url, data, doc) {
    if (!doc) doc = document;
    var form = doc.createElement("FORM");
    form.setAttribute("method", "POST");
    form.setAttribute("action", url);

    var params = this.createPostParameters(data, true);
    for (var key in params) {
        var paramsField = doc.createElement("INPUT");
        paramsField.setAttribute("type", "hidden");
        paramsField.setAttribute("name", key);
        paramsField.setAttribute("value", params[key]);
        form.appendChild(paramsField);
    }

    doc.body.appendChild(form);
    form.submit();
    doc.body.removeChild(form);
}

StiJsViewer.prototype.postAction = function (action, bookmarkPage, bookmarkAnchor) {
    switch (action) {
        case "Refresh": break;
        case "Print":
            switch (this.options.toolbar.printDestination) {
                case "Pdf": this.postPrint("PrintPdf"); break;
                case "Direct": this.postPrint("PrintWithoutPreview"); break;
                case "WithPreview": this.postPrint("PrintWithPreview"); break;
                default: this.controls.menus.printMenu.changeVisibleState(!this.controls.menus.printMenu.visible); break;
            }
            return;
        case "Save": this.controls.menus.saveMenu.changeVisibleState(!this.controls.menus.saveMenu.visible); return;
        case "SendEmail": this.controls.menus.sendEmailMenu.changeVisibleState(!this.controls.menus.sendEmailMenu.visible); return;
        case "Zoom": this.controls.menus.zoomMenu.changeVisibleState(!this.controls.menus.zoomMenu.visible); return;
        case "ViewMode": this.controls.menus.viewModeMenu.changeVisibleState(!this.controls.menus.viewModeMenu.visible); return;
        case "FirstPage": this.reportParams.pageNumber = 0; break;
        case "PrevPage": if (this.reportParams.pageNumber > 0) this.reportParams.pageNumber--; break;
        case "NextPage": if (this.reportParams.pageNumber < this.reportParams.pagesCount - 1) this.reportParams.pageNumber++; break;
        case "LastPage": this.reportParams.pageNumber = this.reportParams.pagesCount - 1; break;
        case "FullScreen": this.changeFullScreenMode(!this.options.appearance.fullScreenMode); return;
        case "Zoom25": this.reportParams.zoom = 25; break;
        case "Zoom50": this.reportParams.zoom = 50; break;
        case "Zoom75": this.reportParams.zoom = 75; break;
        case "Zoom100": this.reportParams.zoom = 100; break;
        case "Zoom150": this.reportParams.zoom = 150; break;
        case "Zoom200": this.reportParams.zoom = 200; break;
        case "ZoomOnePage": this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageHeight()); break;
        case "ZoomPageWidth": this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageWidth()); break;
        case "ViewModeOnePage": this.reportParams.viewMode = "OnePage"; break;
        case "ViewModeWholeReport": this.reportParams.viewMode = "WholeReport"; break;
        case "ViewModeMultiPage":
            this.reportParams.viewMode = "MultiPage";
            this.reportParams.multiPageContainerWidth = this.controls.reportPanel.offsetWidth;
            this.reportParams.multiPageContainerHeight = this.controls.reportPanel.offsetHeight;
            this.reportParams.multiPageMargins = 10;
            break;
        case "GoToPage": this.reportParams.pageNumber = this.controls.toolbar.controls["PageControl"].textBox.getCorrectValue() - 1; break;
        case "BookmarkAction":
            if (this.reportParams.pageNumber == bookmarkPage || this.reportParams.viewMode == "WholeReport") {
                this.scrollToAnchor(bookmarkAnchor);
                return;
            }
            else {
                this.reportParams.pageNumber = bookmarkPage;
                this.options.bookmarkAnchor = bookmarkAnchor;
            }
            break;
        case "Bookmarks": this.controls.bookmarksPanel.changeVisibleState(!this.controls.buttons["Bookmarks"].isSelected); return;
        case "Parameters": this.controls.parametersPanel.changeVisibleState(!this.controls.buttons["Parameters"].isSelected); return;
        case "Find": this.controls.findPanel.changeVisibleState(!this.controls.toolbar.controls.Find.isSelected); return;
        case "About": this.controls.aboutPanel.changeVisibleState(!this.controls.toolbar.controls.About.isSelected); return;
        case "Design": this.postDesign(); return;
        case "Submit":
            this.reportParams.editableParameters = null;
            this.reportParams.pageNumber = 0;
            this.postInteraction({ action: "Variables", variables: this.controls.parametersPanel.getParametersValues() });
            return;
        case "Reset":
            this.options.parameters = {};
            this.controls.parametersPanel.clearParameters();
            this.controls.parametersPanel.addParameters();
            return;
        case "Editor":
            this.SetEditableMode(!this.options.editableMode);
            return;
    }

    this.controls.processImage.show();
    this.postAjax(this.options.requestUrl.replace("{action}",
            (action == null || this.options.server.cacheMode == "None")
                ? this.options.actions.getReportSnapshot
                : this.options.actions.viewerEvent),
            { action: action == null ? "GetReport" : "GetPages" }, this.showReportPage);
}

StiJsViewer.prototype.postPrint = function (printAction) {
    var data = {
        "action": "PrintReport",
        "printAction": printAction,
        "bookmarksPrint": this.options.appearance.bookmarksPrint
    };

    switch (printAction) {
        case "PrintPdf":
            var url = this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) this.printAsPdfIE(url, data);
            else this.printAsPdf(url, data);
            break;

        case "PrintWithPreview":
            this.printAsPopup(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport), data);
            break;

        case "PrintWithoutPreview":
            this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.printReport), data, this.printAsHtml);
            break;
    }
}

StiJsViewer.prototype.printAsPdf = function (url, data) {
    data.responseType = "blob";
    this.postAjax(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport), data, function (data, jsObject) {
        var printFrame = document.getElementById("pdfPrintFrame");
        if (printFrame != null) document.body.removeChild(printFrame);

        printFrame = document.createElement("iframe");
        printFrame.id = "pdfPrintFrame";
        printFrame.name = "pdfPrintFrame";
        printFrame.width = "0";
        printFrame.height = "0";
        printFrame.style.position = "absolute";
        printFrame.style.border = "none";
        document.body.appendChild(printFrame, document.body.firstChild);
        
        printFrame.src = URL.createObjectURL(data);
    });
}

StiJsViewer.prototype.printAsPdfIE = function (url, data) {
    var printFrame = document.getElementById("pdfPrintFrame");
    if (printFrame != null) document.body.removeChild(printFrame);

    printFrame = document.createElement("iframe");
    printFrame.id = "pdfPrintFrame";
    printFrame.name = "pdfPrintFrame";
    printFrame.width = "0";
    printFrame.height = "0";
    printFrame.style.position = "absolute";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame, document.body.firstChild);

    var form = document.createElement("FORM");
    form.setAttribute("id", "printForm");
    form.setAttribute("method", "POST");
    form.setAttribute("action", url);

    var params = this.createPostParameters(data, true);
    for (var key in params) {
        var paramsField = document.createElement("INPUT");
        paramsField.setAttribute("type", "hidden");
        paramsField.setAttribute("name", key);
        paramsField.setAttribute("value", params[key]);
        form.appendChild(paramsField);
    }

    var html = "<html><body>" + form.outerHTML + "<script>setTimeout(function () { document.getElementById('printForm').submit(); });</script></body></html>";
    printFrame.contentWindow.document.open("application/pdf");
    printFrame.contentWindow.document.write(html);
    printFrame.contentWindow.document.close();
}

StiJsViewer.prototype.printAsPopup = function (url, data) {
    var win = this.openNewWindow("about:blank", "PrintReport", "height=900, width=790, toolbar=no, menubar=yes, scrollbars=yes, resizable=yes, location=no, directories=no, status=no");
    if (win != null) this.postForm(url, data, win.document);
}

StiJsViewer.prototype.printAsHtml = function (text, jsObject) {
    if (jsObject.showError(text)) return;

    printFrame = document.getElementById("htmlPrintFrame");
    if (printFrame == null) {
        printFrame = document.createElement("iframe");
        printFrame.id = "htmlPrintFrame";
        printFrame.name = "htmlPrintFrame";
        printFrame.width = "0px";
        printFrame.height = "0px";
        printFrame.style.position = "absolute";
        printFrame.style.border = "none";
        document.body.appendChild(printFrame, document.body.firstChild);
    }

    printFrame.contentWindow.document.open();
    printFrame.contentWindow.document.write(text);
    printFrame.contentWindow.document.close();
    setTimeout(function () {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
    });
}

StiJsViewer.prototype.postExport = function (format, settings, action) {
    var data = {
        action: "ExportReport",
        exportFormat: format,
        exportSettings: settings
    };

    var doc = settings.OpenAfterExport && this.options.appearance.openExportedReportTarget == "_blank" ? this.openNewWindow("about:blank", "_blank").document : null;
    var url = doc ? this.options.requestAbsoluteUrl : this.options.requestUrl;
    this.postForm(url.replace("{action}", action), data, doc);
}

StiJsViewer.prototype.postEmail = function (format, settings) {
    var data = {
        action: "SendEmail",
        exportFormat: format,
        exportSettings: settings
    };

    this.controls.processImage.show();
    this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.emailReport), data, this.emailResult);
}

StiJsViewer.prototype.postDesign = function () {
    var doc = this.options.appearance.designTarget == "_blank" ? this.openNewWindow("about:blank", "_blank").document : null;
    var url = doc ? this.options.requestAbsoluteUrl : this.options.requestUrl;
    this.postForm(url.replace("{action}", this.options.actions.designReport), { action: "DesignReport" }, doc);
}

StiJsViewer.prototype.postInteraction = function (params) {
    if (!this.options.actions.interaction) {
        if (this.controls.buttons["Parameters"]) this.controls.buttons["Parameters"].setEnabled(false);
        return;
    }

    if (params.action != "InitVars") {
        // Add new drill-down parameters to drill-down queue and calc guid
        if (params.action == "DrillDown") {
            params.drillDownParameters = this.reportParams.drillDownParameters.concat(params.drillDownParameters);
            params.drillDownGuid = hex_md5(JSON.stringify(params.drillDownParameters));
        }

        // If global report cache enabled - calc guid for all report parameters
        if (this.options.server.globalReportCache && (params.variables || params.sortingParameters || params.collapsingParameters)) {
            var jsonParams = {};
            if (params.variables) jsonParams.variables = params.variables;
            if (params.sortingParameters) jsonParams.sortingParameters = params.sortingParameters;
            if (params.collapsingParameters) jsonParams.collapsingParameters = params.collapsingParameters;
            params.paramsGuid = hex_md5(JSON.stringify(jsonParams));
        }
    }

    this.controls.processImage.show();
    this.postAjax(
        this.options.requestUrl.replace("{action}", this.options.actions.interaction),
        params,
        params.action == "InitVars"
            ? this.initializeParametersPanel
            : this.showReportPage);
}

StiJsViewer.prototype.initializeParametersPanel = function (jsText, jsObject) {
    if (jsObject.showError(jsText)) jsText = null;

    jsObject.options.isParametersReceived = true;
    var paramsProps = typeof jsText == "string" ? JSON.parse(jsText) : jsText;
    
    jsObject.options.paramsVariables = paramsProps;
    jsObject.InitializeParametersPanel();
    jsObject.controls.processImage.hide();
}

StiJsViewer.prototype.parseParameters = function (jsParams) {
    var parameters = (typeof (jsParams) == "string" && jsParams.substr(0, 1) == "{") ? JSON.parse(jsParams) : jsParams;
    var drillDownPanel = this.controls.drillDownPanel;

    // Add first report
    if (drillDownPanel.buttonsRow.children.length == 0) drillDownPanel.addButton(parameters.reportFileName, this.reportParams);

    // Add or show drill-down report
    if (parameters.action == "DrillDown") {
        drillDownPanel.changeVisibleState(true);
        var buttonExist = false;
        for (var name in drillDownPanel.buttons) {
            var button = drillDownPanel.buttons[name];
            if (button.reportParams.reportGuid == parameters.reportGuid && button.reportParams.drillDownGuid == parameters.drillDownGuid) {
                buttonExist = true;
                button.style.display = "inline-block";
                button.select();
                break;
            }
        }
        if (!buttonExist) {
            this.controls.drillDownPanel.addButton(parameters.reportFileName);
            this.reportParams.drillDownParameters = parameters.drillDownParameters;
            this.reportParams.pageNumber = 0;
            this.reportParams.pagesWidth = 0;
            this.reportParams.pagesHeight = 0;
        }
    }

    // Apply report parameters
    this.reportParams.pagesArray = parameters.pagesArray;
    if (parameters.action != "GetPages") {
        this.reportParams.reportGuid = parameters.reportGuid;
        this.reportParams.paramsGuid = parameters.paramsGuid;
        this.reportParams.drillDownGuid = parameters.drillDownGuid;
        this.reportParams.pagesCount = parameters.pagesCount;
        this.reportParams.zoom = parameters.zoom;
        this.reportParams.viewMode = parameters.viewMode;
        this.reportParams.reportFileName = parameters.reportFileName;
        this.reportParams.interactionCollapsingStates = parameters.interactionCollapsingStates;
        if (parameters.bookmarksContent) this.reportParams.bookmarksContent = parameters.bookmarksContent;
        if (parameters.isEditableReport && this.controls.buttons.Editor) this.controls.buttons.Editor.style.display = "";
    }

    return parameters;
}

StiJsViewer.prototype.emailResult = function (text, jsObject) {
    jsObject.controls.processImage.hide();
    if (text == "0")
        alert(jsObject.collections.loc["EmailSuccessfullySent"]);
    else {
        if (text.indexOf("<?xml") == 0) {
            alert(jsObject.GetXmlValue(text, "ErrorCode"));
            alert(jsObject.GetXmlValue(text, "ErrorDescription"));
        }
        else
            alert(text);
    }
}

StiJsViewer.prototype.showReportPage = function (htmlText, jsObject) {
    if (htmlText == "null" && jsObject.options.isReportRecieved) {
        jsObject.options.isReportRecieved = false;
        jsObject.postAction();
        return;
    }

    jsObject.controls.processImage.hide();
    jsObject.options.isReportRecieved = true;
    if (jsObject.showError(htmlText)) return;
    if (htmlText == "null") return;

    var parameters = jsObject.parseParameters(htmlText);
    if (parameters == null) return;

    if (parameters.bookmarksContent) jsObject.InitializeBookmarksPanel();
    if (parameters.pagesArray) jsObject.controls.reportPanel.addPages();
    if (jsObject.controls.toolbar) {
        jsObject.controls.toolbar.changeToolBarState();
        jsObject.controls.toolbar.setEnabled(true);
    }

    if (jsObject.reportParams.autoZoom != null) {
        jsObject.postAction(jsObject.reportParams.autoZoom == -1 ? "ZoomPageWidth" : "ZoomOnePage");
        delete jsObject.reportParams.autoZoom;
    }

    // Go to the bookmark, if it present
    if (jsObject.options.bookmarkAnchor != null) {
        jsObject.scrollToAnchor(jsObject.options.bookmarkAnchor);
        jsObject.options.bookmarkAnchor = null;
    }

    //Find text in report
    if (jsObject.options.findMode && jsObject.controls.findPanel) {
        jsObject.showFindLabels(jsObject.controls.findPanel.controls.findTextBox.value);
    }

    // Get the request from user variables when the viewer is launched for the first time
    if (!jsObject.options.isParametersReceived && jsObject.options.toolbar.showParametersButton) jsObject.postInteraction({ action: "InitVars" });    
}

StiJsViewer.prototype.InitializeDoubleDatePicker = function (params) {
    if (this.controls.doubleDatePicker) {
        this.controls.mainPanel.removeChild(this.controls.doubleDatePicker);
    }

    var datePicker = this.BaseMenu(null, params.secondParentButton, "Down", "stiJsViewerDropdownMenu");
    datePicker.style.fontFamily = this.options.toolbar.fontFamily;
    if (this.options.toolbar.fontColor != "") datePicker.style.color = this.options.toolbar.fontColor;
    datePicker.style.zIndex = "36";
    datePicker.dayButtons = [];
    datePicker.showTime = false;
    datePicker.key = new Date();
    this.controls.doubleDatePicker = datePicker;
    this.controls.mainPanel.appendChild(datePicker);

    var innerTable = this.CreateHTMLTable();
    innerTable.style.margin = "4px";
    innerTable.style.border = "1px dotted #c6c6c6";
    datePicker.innerContent.appendChild(innerTable);

    //First DatePicker
    var firstDatePicker = this.InitializeDatePicker(datePicker);
    firstDatePicker.ownerValue = params.firstOwnerValue;
    firstDatePicker.showTime = params.showTime;
    firstDatePicker.parentDataControl = params.firstParentDataControl;
    firstDatePicker.parentButton = params.firstParentButton;

    //Second DatePicker
    var secondDatePicker = this.InitializeDatePicker(datePicker);
    secondDatePicker.ownerValue = params.secondOwnerValue;
    secondDatePicker.showTime = params.showTime;
    secondDatePicker.parentDataControl = params.secondParentDataControl;
    secondDatePicker.parentButton = params.secondParentButton;

    //Add Pickers to Double Picker Panel
    firstDatePicker.innerContent.className = "";
    secondDatePicker.innerContent.className = "";
    firstDatePicker.innerContent.style.margin = "4px";
    secondDatePicker.innerContent.style.margin = "4px";
    innerTable.addCell(firstDatePicker.innerContent);
    innerTable.addCell(secondDatePicker.innerContent).style.borderLeft = "1px dotted #c6c6c6";

    var container = document.createElement("div");
    innerTable.addCell(container).style.borderLeft = "1px dotted #c6c6c6";

    container.jsObject = this;
    container.style.width = "150px";
    container.style.height = "250px";
    container.style.overflow = "auto";
    container.style.margin = "4px";

    for (var i = 0; i < this.collections.dateRanges.length; i++) {
        var dateRangeName = this.collections.dateRanges[i];
        var item = this.SmallButton(null, this.collections.loc[dateRangeName]);
        item.name = dateRangeName;
        container.appendChild(item);

        item.action = function () {
            var values = datePicker.jsObject.GetValuesByDateRangeName(this.name);
            if (values) {
                datePicker.setValuesToDatePickers(values[0], values[1]);
                if (params.hideOnClick) datePicker.changeVisibleState(false);
            }
        }
    }

    datePicker.onshow = function () {
        firstDatePicker.onshow();
        secondDatePicker.onshow();
    }

    datePicker.setValuesToDatePickers = function (value1, value2) {
        firstDatePicker.key = value1;
        secondDatePicker.key = value2;
        firstDatePicker.fill();
        secondDatePicker.fill();
        firstDatePicker.action();
        secondDatePicker.action();
    }

    return datePicker;
}

StiJsViewer.prototype.GetValuesByDateRangeName = function (dateRangeName) {
    var now = new Date();
    var jsObject = this;

    var setTimeInterval = function (firstDate, secondDate) {
        firstDate.setHours(0);
        firstDate.setMinutes(0);
        firstDate.setSeconds(0);
        secondDate.setHours(23);
        secondDate.setMinutes(59);
        secondDate.setSeconds(59);
    }

    var getWeekInterval = function (date) {
        var startDay = jsObject.GetFirstDayOfWeek();
        var dayWeek = startDay == 0 ? now.getDay() : now.getDay() - 1;
        if (dayWeek < 0) dayWeek = 6;
        var values = [new Date(now.valueOf() - dayWeek * 86400000)];
        values.push(new Date(values[0].valueOf() + 6 * 86400000));
        setTimeInterval(values[0], values[1]);

        return values;
    }

    var firstDate = new Date();
    var secondDate = new Date();
    setTimeInterval(firstDate, secondDate);

    var values = [firstDate, secondDate];

    switch (dateRangeName) {
        case "CurrentMonth":
            {
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), now.getMonth()));
                break;
            }
        case "CurrentQuarter":
            {
                var firstMonth = parseInt(now.getMonth() / 3) * 3;
                values[0].setMonth(firstMonth);
                values[1].setMonth(firstMonth + 2);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), firstMonth + 2));
                break;
            }
        case "CurrentWeek":
            {
                values = getWeekInterval(now);
                break;
            }
        case "CurrentYear":
            {
                values[0].setMonth(0);
                values[0].setDate(1);
                values[1].setMonth(11);
                values[1].setDate(31);
                break;
            }
        case "NextMonth":
            {
                var month = now.getMonth() + 1;
                var year = now.getFullYear();
                if (month > 11) {
                    month = 0;
                    year++;
                }
                values[0].setYear(year);
                values[0].setMonth(month);
                values[0].setDate(1);
                values[1].setYear(year);
                values[1].setMonth(month);
                values[1].setDate(jsObject.GetCountDaysOfMonth(year, month));
                break;
            }
        case "NextQuarter":
            {
                var year = now.getFullYear();
                var firstMonth = parseInt(now.getMonth() / 3) * 3 + 3;
                if (firstMonth > 11) {
                    firstMonth = 0;
                    year++;
                }
                values[0].setYear(year);
                values[1].setYear(year);
                values[0].setMonth(firstMonth);
                values[1].setMonth(firstMonth + 2);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(year, firstMonth + 2));
                break;
            }
        case "NextWeek":
            {
                values = getWeekInterval(now);
                values[0] = new Date(values[0].valueOf() + 7 * 86400000);
                values[1] = new Date(values[1].valueOf() + 7 * 86400000);
                break;
            }
        case "NextYear":
            {
                values[0].setYear(now.getFullYear() + 1);
                values[1].setYear(now.getFullYear() + 1);
                values[0].setMonth(0);
                values[1].setMonth(11);
                values[0].setDate(1);
                values[1].setDate(31);
                break;
            }
        case "PreviousMonth":
            {
                var month = now.getMonth() - 1;
                var year = now.getFullYear();
                if (month < 0) {
                    month = 11;
                    year--;
                }
                values[0].setYear(year);
                values[0].setMonth(month);
                values[0].setDate(1);
                values[1].setYear(year);
                values[1].setMonth(month);
                values[1].setDate(jsObject.GetCountDaysOfMonth(year, month));
                break;
            }
        case "PreviousQuarter":
            {
                var year = now.getFullYear();
                var firstMonth = parseInt(now.getMonth() / 3) * 3 - 3;
                if (firstMonth < 0) {
                    firstMonth = 9;
                    year--;
                }
                values[0].setYear(year);
                values[1].setYear(year);
                values[0].setMonth(firstMonth);
                values[1].setMonth(firstMonth + 2);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(year, firstMonth + 2));
                break;
            }
        case "PreviousWeek":
            {
                values = getWeekInterval(now);
                values[0] = new Date(values[0].valueOf() - 7 * 86400000);
                values[1] = new Date(values[1].valueOf() - 7 * 86400000);
                break;
            }
        case "PreviousYear":
            {
                values[0].setYear(now.getFullYear() - 1);
                values[1].setYear(now.getFullYear() - 1);
                values[0].setMonth(0);
                values[1].setMonth(11);
                values[0].setDate(1);
                values[1].setDate(31);
                break;
            }
        case "FirstQuarter":
            {
                values[0].setMonth(0);
                values[1].setMonth(2);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), 2));
                break;
            }
        case "SecondQuarter":
            {
                values[0].setMonth(3);
                values[1].setMonth(5);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), 5));
                break;
            }
        case "ThirdQuarter":
            {
                values[0].setMonth(6);
                values[1].setMonth(8);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), 8));
                break;
            }
        case "FourthQuarter":
            {
                values[0].setMonth(9);
                values[1].setMonth(11);
                values[0].setDate(1);
                values[1].setDate(jsObject.GetCountDaysOfMonth(now.getFullYear(), 11));
                break;
            }
        case "MonthToDate":
            {
                values[0].setDate(1);
                break;
            }
        case "QuarterToDate":
            {
                var firstMonth = parseInt(now.getMonth() / 3) * 3;
                values[0].setMonth(firstMonth);
                values[0].setDate(1);
                break;
            }
        case "WeekToDate":
            {
                var weekValues = getWeekInterval(now);
                values[0] = weekValues[0];
                break;
            }
        case "YearToDate":
            {
                values[0].setMonth(0);
                values[0].setDate(1);
                break;
            }
        case "Today":
            {
                break;
            }
        case "Tomorrow":
            {
                values[0] = new Date(values[0].valueOf() + 86400000);
                values[1] = new Date(values[1].valueOf() + 86400000);
                break;
            }
        case "Yesterday":
            {
                values[0] = new Date(values[0].valueOf() - 86400000);
                values[1] = new Date(values[1].valueOf() - 86400000);
                break;
            }
    }

    return values;
}
;
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiLocalization = Stimulsoft.Base.Localization.StiLocalization;
        var StiCollectionsHelper = (function () {
            function StiCollectionsHelper() {
            }
            StiCollectionsHelper.GetLocalizationItems = function () {
                Stimulsoft.Base.Localization.StiLocalization.getJsonStringLocalization();
                var words = {};
                words["EditorToolTip"] = StiLocalization.get("FormViewer", "Editor");
                words["TellMeMore"] = StiLocalization.get("HelpDesigner", "TellMeMore");
                words["Print"] = StiLocalization.get("A_WebViewer", "PrintReport");
                words["PrintToolTip"] = StiLocalization.get("HelpViewer", "Print");
                words["Save"] = StiLocalization.get("A_WebViewer", "SaveReport");
                words["SaveToolTip"] = StiLocalization.get("HelpViewer", "Save");
                words["SendEmail"] = StiLocalization.get("FormViewer", "SendEMail").replaceAll("...", String.empty);
                words["SendEmailToolTip"] = StiLocalization.get("HelpViewer", "SendEMail");
                words["BookmarksToolTip"] = StiLocalization.get("HelpViewer", "Bookmarks");
                words["ParametersToolTip"] = StiLocalization.get("HelpViewer", "Parameters");
                words["FindToolTip"] = StiLocalization.get("HelpViewer", "Find");
                words["FirstPageToolTip"] = StiLocalization.get("HelpViewer", "PageFirst");
                words["PrevPageToolTip"] = StiLocalization.get("HelpViewer", "PagePrevious");
                words["NextPageToolTip"] = StiLocalization.get("HelpViewer", "PageNext");
                words["LastPageToolTip"] = StiLocalization.get("HelpViewer", "PageLast");
                words["FullScreenToolTip"] = StiLocalization.get("HelpViewer", "FullScreen");
                words["ZoomToolTip"] = StiLocalization.get("FormViewer", "Zoom");
                words["Loading"] = StiLocalization.get("A_WebViewer", "Loading").replaceAll("...", "");
                words["Bookmarks"] = StiLocalization.get("FormViewer", "Bookmarks");
                words["Parameters"] = StiLocalization.get("FormViewer", "Parameters");
                words["Time"] = StiLocalization.get("FormFormatEditor", "Time");
                words["Version"] = StiLocalization.get("PropertyMain", "Version");
                words["FindWhat"] = StiLocalization.get("FormViewerFind", "FindWhat");
                words["FindPrevious"] = StiLocalization.get("FormViewerFind", "FindPrevious");
                words["FindNext"] = StiLocalization.get("FormViewerFind", "FindNext");
                words["MatchCase"] = StiLocalization.get("Editor", "MatchCase");
                words["MatchWholeWord"] = StiLocalization.get("Editor", "MatchWholeWord");
                words["EmailOptions"] = StiLocalization.get("A_WebViewer", "EmailOptions");
                words["Email"] = StiLocalization.get("A_WebViewer", "Email");
                words["Subject"] = StiLocalization.get("A_WebViewer", "Subject");
                words["Message"] = StiLocalization.get("A_WebViewer", "Message");
                words["Attachment"] = StiLocalization.get("A_WebViewer", "Attachment");
                words["OnePage"] = StiLocalization.get("A_WebViewer", "OnePage");
                words["ViewModeToolTip"] = StiLocalization.get("FormViewer", "ViewMode");
                words["WholeReport"] = StiLocalization.get("A_WebViewer", "WholeReport");
                words["Design"] = StiLocalization.get("Buttons", "Design");
                words["Page"] = StiLocalization.get("A_WebViewer", "Page");
                words["PageOf"] = StiLocalization.get("A_WebViewer", "PageOf");
                words["SaveDocument"] = StiLocalization.get("FormViewer", "DocumentFile");
                words["SavePdf"] = StiLocalization.get("Export", "ExportTypePdfFile");
                words["SaveXps"] = StiLocalization.get("Export", "ExportTypeXpsFile");
                words["SavePpt2007"] = StiLocalization.get("Export", "ExportTypePpt2007File");
                words["SaveHtml"] = StiLocalization.get("Export", "ExportTypeHtmlFile");
                words["SaveText"] = StiLocalization.get("Export", "ExportTypeTxtFile");
                words["SaveRtf"] = StiLocalization.get("Export", "ExportTypeRtfFile");
                words["SaveWord2007"] = StiLocalization.get("Export", "ExportTypeWord2007File");
                words["SaveOdt"] = StiLocalization.get("Export", "ExportTypeWriterFile");
                words["SaveExcel"] = StiLocalization.get("Export", "ExportTypeExcelFile");
                words["SaveOds"] = StiLocalization.get("Export", "ExportTypeCalcFile");
                words["SaveData"] = StiLocalization.get("Export", "ExportTypeDataFile");
                words["SaveImage"] = StiLocalization.get("Export", "ExportTypeImageFile");
                words["PrintPdf"] = StiLocalization.get("A_WebViewer", "PrintToPdf");
                words["PrintWithPreview"] = StiLocalization.get("A_WebViewer", "PrintWithPreview");
                words["PrintWithoutPreview"] = StiLocalization.get("A_WebViewer", "PrintWithoutPreview");
                words["ZoomOnePage"] = StiLocalization.get("Zoom", "PageHeight");
                words["ZoomPageWidth"] = StiLocalization.get("FormViewer", "ZoomPageWidth");
                words["RemoveAll"] = StiLocalization.get("Buttons", "RemoveAll");
                words["NewItem"] = StiLocalization.get("FormDictionaryDesigner", "NewItem");
                words["Close"] = StiLocalization.get("Buttons", "Close");
                words["Reset"] = StiLocalization.get("Gui", "cust_pm_reset");
                words["Submit"] = StiLocalization.get("Buttons", "Submit");
                words["RangeFrom"] = StiLocalization.get("PropertyMain", "RangeFrom");
                words["RangeTo"] = StiLocalization.get("PropertyMain", "RangeTo");
                words["ExportFormTitle"] = StiLocalization.get("Export", "title");
                words["ButtonOk"] = StiLocalization.get("Gui", "barname_ok");
                words["ButtonCancel"] = StiLocalization.get("Gui", "barname_cancel");
                words["PagesRange"] = StiLocalization.get("Report", "RangePage");
                words["PagesRangeAll"] = StiLocalization.get("Report", "RangeAll");
                words["PagesRangeCurrentPage"] = StiLocalization.get("Report", "RangeCurrentPage");
                words["PagesRangePages"] = StiLocalization.get("Report", "RangePages");
                words["PagesRangeAllTooltip"] = StiLocalization.get("HelpViewer", "PageAll");
                words["PagesRangeCurrentPageTooltip"] = StiLocalization.get("HelpViewer", "CurrentPage");
                words["PagesRangePagesTooltip"] = StiLocalization.get("HelpViewer", "RangePages");
                words["SettingsGroup"] = StiLocalization.get("Export", "Settings");
                words["Type"] = StiLocalization.get("PropertyMain", "Type") + ":";
                words["TypeTooltip"] = StiLocalization.get("HelpViewer", "TypeExport");
                words["ZoomHtml"] = StiLocalization.get("Export", "Scale");
                words["ZoomHtmlTooltip"] = StiLocalization.get("HelpViewer", "ScaleHtml");
                words["ImageFormatForHtml"] = StiLocalization.get("Export", "ImageFormat");
                words["ImageFormatForHtmlTooltip"] = StiLocalization.get("HelpViewer", "ImageFormat");
                words["SavingReport"] = StiLocalization.get("DesignerFx", "SavingReport");
                words["EmailSuccessfullySent"] = StiLocalization.get("DesignerFx", "EmailSuccessfullySent");
                words["SaveReportMdc"] = StiLocalization.get("FormViewer", "DocumentFile").replaceAll("...", "") + " (.mdc)";
                words["SaveReportMdz"] = StiLocalization.get("FormViewer", "CompressedDocumentFile") + " (.mdz)";
                words["SaveReportMdx"] = StiLocalization.get("FormViewer", "EncryptedDocumentFile") + " (.mdx)";
                words["PasswordSaveReport"] = StiLocalization.get("Report", "LabelPassword");
                words["PasswordSaveReportTooltip"] = StiLocalization.get("HelpViewer", "UserPassword");
                words["ExportMode"] = StiLocalization.get("Export", "ExportMode");
                words["ExportModeTooltip"] = StiLocalization.get("HelpViewer", "ExportMode");
                words["CompressToArchive"] = StiLocalization.get("Export", "CompressToArchive");
                words["CompressToArchiveTooltip"] = StiLocalization.get("HelpViewer", "CompressToArchive");
                words["EmbeddedImageData"] = StiLocalization.get("Export", "EmbeddedImageData");
                words["EmbeddedImageDataTooltip"] = StiLocalization.get("HelpViewer", "EmbeddedImageData");
                words["AddPageBreaks"] = StiLocalization.get("Export", "AddPageBreaks");
                words["AddPageBreaksTooltip"] = StiLocalization.get("HelpViewer", "AddPageBreaks");
                words["ImageResolution"] = StiLocalization.get("Export", "ImageResolution");
                words["ImageResolutionTooltip"] = StiLocalization.get("HelpViewer", "ImageResolution");
                words["ImageCompressionMethod"] = StiLocalization.get("Export", "ImageCompressionMethod");
                words["ImageCompressionMethodTooltip"] = StiLocalization.get("HelpViewer", "ImageCompressionMethod");
                words["ImageQuality"] = StiLocalization.get("Export", "ImageQuality");
                words["ImageQualityTooltip"] = StiLocalization.get("HelpViewer", "ImageQuality");
                words["ContinuousPages"] = StiLocalization.get("Export", "ContinuousPages");
                words["ContinuousPagesTooltip"] = StiLocalization.get("HelpViewer", "ContinuousPages");
                words["StandardPDFFonts"] = StiLocalization.get("Export", "StandardPDFFonts");
                words["StandardPDFFontsTooltip"] = StiLocalization.get("HelpViewer", "StandardPdfFonts");
                words["EmbeddedFonts"] = StiLocalization.get("Export", "EmbeddedFonts");
                words["EmbeddedFontsTooltip"] = StiLocalization.get("HelpViewer", "EmbeddedFonts");
                words["UseUnicode"] = StiLocalization.get("Export", "UseUnicode");
                words["UseUnicodeTooltip"] = StiLocalization.get("HelpViewer", "UseUnicode");
                words["Compressed"] = StiLocalization.get("Export", "Compressed");
                words["CompressedTooltip"] = StiLocalization.get("HelpViewer", "Compressed");
                words["ExportRtfTextAsImage"] = StiLocalization.get("Export", "ExportRtfTextAsImage");
                words["ExportRtfTextAsImageTooltip"] = StiLocalization.get("HelpViewer", "ExportRtfTextAsImage");
                words["PdfACompliance"] = StiLocalization.get("Export", "PdfACompliance");
                words["PdfAComplianceTooltip"] = StiLocalization.get("HelpViewer", "PdfACompliance");
                words["KillSpaceLines"] = StiLocalization.get("Export", "TxtKillSpaceLines");
                words["KillSpaceLinesTooltip"] = StiLocalization.get("HelpViewer", "KillSpaceLines");
                words["PutFeedPageCode"] = StiLocalization.get("Export", "TxtPutFeedPageCode");
                words["PutFeedPageCodeTooltip"] = StiLocalization.get("HelpViewer", "PutFeedPageCode");
                words["DrawBorder"] = StiLocalization.get("Export", "TxtDrawBorder");
                words["DrawBorderTooltip"] = StiLocalization.get("HelpViewer", "DrawBorder");
                words["CutLongLines"] = StiLocalization.get("Export", "TxtCutLongLines");
                words["CutLongLinesTooltip"] = StiLocalization.get("HelpViewer", "CutLongLines");
                words["BorderType"] = StiLocalization.get("Export", "TxtBorderType");
                words["BorderTypeTooltip"] = StiLocalization.get("HelpViewer", "BorderType");
                words["BorderTypeSimple"] = StiLocalization.get("Export", "TxtBorderTypeSimple");
                words["BorderTypeSingle"] = StiLocalization.get("Export", "TxtBorderTypeSingle");
                words["BorderTypeDouble"] = StiLocalization.get("Export", "TxtBorderTypeDouble");
                words["ZoomXY"] = StiLocalization.get("Export", "Zoom");
                words["ZoomXYTooltip"] = StiLocalization.get("HelpViewer", "ZoomTxt");
                words["EncodingData"] = StiLocalization.get("Export", "Encoding");
                words["EncodingDataTooltip"] = StiLocalization.get("HelpViewer", "EncodingData");
                words["ImageFormat"] = StiLocalization.get("Export", "ImageType");
                words["ImageFormatTooltip"] = StiLocalization.get("HelpViewer", "ImageType");
                words["ImageFormatColor"] = StiLocalization.get("PropertyMain", "Color");
                words["ImageFormatGrayscale"] = StiLocalization.get("Export", "ImageGrayscale");
                words["ImageFormatMonochrome"] = StiLocalization.get("Export", "ImageMonochrome");
                words["MonochromeDitheringType"] = StiLocalization.get("Export", "MonochromeDitheringType");
                words["MonochromeDitheringTypeTooltip"] = StiLocalization.get("HelpViewer", "DitheringType");
                words["TiffCompressionScheme"] = StiLocalization.get("Export", "TiffCompressionScheme");
                words["TiffCompressionSchemeTooltip"] = StiLocalization.get("HelpViewer", "TiffCompressionScheme");
                words["CutEdges"] = StiLocalization.get("Export", "ImageCutEdges");
                words["CutEdgesTooltip"] = StiLocalization.get("HelpViewer", "CutEdges");
                words["MultipleFiles"] = StiLocalization.get("Export", "MultipleFiles");
                words["MultipleFilesTooltip"] = StiLocalization.get("HelpViewer", "MultipleFiles");
                words["ExportDataOnly"] = StiLocalization.get("Export", "ExportDataOnly");
                words["ExportDataOnlyTooltip"] = StiLocalization.get("HelpViewer", "ExportDataOnly");
                words["UseDefaultSystemEncoding"] = StiLocalization.get("Export", "UseDefaultSystemEncoding");
                words["UseDefaultSystemEncodingTooltip"] = StiLocalization.get("HelpViewer", "UseDefaultSystemEncoding");
                words["EncodingDifFile"] = StiLocalization.get("Export", "Encoding");
                words["EncodingDifFileTooltip"] = StiLocalization.get("HelpViewer", "EncodingData");
                words["ExportModeRtf"] = StiLocalization.get("Export", "ExportMode");
                words["ExportModeRtfTooltip"] = StiLocalization.get("HelpViewer", "ExportModeRtf");
                words["ExportModeRtfTable"] = StiLocalization.get("Export", "ExportModeTable");
                words["ExportModeRtfFrame"] = StiLocalization.get("Export", "ExportModeFrame");
                words["UsePageHeadersFooters"] = StiLocalization.get("Export", "UsePageHeadersAndFooters");
                words["UsePageHeadersFootersTooltip"] = StiLocalization.get("HelpViewer", "UsePageHeadersAndFooters");
                words["RemoveEmptySpace"] = StiLocalization.get("Export", "RemoveEmptySpaceAtBottom");
                words["RemoveEmptySpaceTooltip"] = StiLocalization.get("HelpViewer", "RemoveEmptySpaceAtBottom");
                words["Separator"] = StiLocalization.get("Export", "Separator");
                words["SeparatorTooltip"] = StiLocalization.get("HelpViewer", "Separator");
                words["SkipColumnHeaders"] = StiLocalization.get("Export", "SkipColumnHeaders");
                words["SkipColumnHeadersTooltip"] = StiLocalization.get("HelpViewer", "SkipColumnHeaders");
                words["ExportObjectFormatting"] = StiLocalization.get("Export", "ExportObjectFormatting");
                words["ExportObjectFormattingTooltip"] = StiLocalization.get("HelpViewer", "ExportObjectFormatting");
                words["UseOnePageHeaderFooter"] = StiLocalization.get("Export", "UseOnePageHeaderAndFooter");
                words["UseOnePageHeaderFooterTooltip"] = StiLocalization.get("HelpViewer", "UseOnePageHeaderAndFooter");
                words["ExportEachPageToSheet"] = StiLocalization.get("Export", "ExportEachPageToSheet");
                words["ExportEachPageToSheetTooltip"] = StiLocalization.get("HelpViewer", "ExportEachPageToSheet");
                words["ExportPageBreaks"] = StiLocalization.get("Export", "ExportPageBreaks");
                words["ExportPageBreaksTooltip"] = StiLocalization.get("HelpViewer", "ExportPageBreaks");
                words["EncodingDbfFile"] = StiLocalization.get("Export", "Encoding");
                words["EncodingDbfFileTooltip"] = StiLocalization.get("HelpViewer", "EncodingData");
                words["DocumentSecurityButton"] = StiLocalization.get("Export", "DocumentSecurity");
                words["DigitalSignatureButton"] = StiLocalization.get("Export", "DigitalSignature");
                words["OpenAfterExport"] = StiLocalization.get("Export", "OpenAfterExport");
                words["OpenAfterExportTooltip"] = StiLocalization.get("HelpViewer", "OpenAfterExport");
                words["AllowEditable"] = StiLocalization.get("Export", "AllowEditable");
                words["AllowEditableTooltip"] = StiLocalization.get("HelpViewer", "AllowEditable");
                words["NameYes"] = StiLocalization.get("FormFormatEditor", "nameYes");
                words["NameNo"] = StiLocalization.get("FormFormatEditor", "nameNo");
                words["UserPassword"] = StiLocalization.get("Export", "labelUserPassword");
                words["UserPasswordTooltip"] = StiLocalization.get("HelpViewer", "UserPassword");
                words["OwnerPassword"] = StiLocalization.get("Export", "labelOwnerPassword");
                words["OwnerPasswordTooltip"] = StiLocalization.get("HelpViewer", "OwnerPassword");
                words["BandsFilter"] = StiLocalization.get("Export", "BandsFilter");
                words["BandsFilterTooltip"] = StiLocalization.get("HelpViewer", "ExportMode");
                words["BandsFilterAllBands"] = StiLocalization.get("Export", "AllBands");
                words["BandsFilterDataOnly"] = StiLocalization.get("Export", "DataOnly");
                words["BandsFilterDataAndHeadersFooters"] = StiLocalization.get("Export", "DataAndHeadersFooters");
                words["AllowPrintDocument"] = StiLocalization.get("Export", "AllowPrintDocument");
                words["AllowPrintDocumentTooltip"] = StiLocalization.get("HelpViewer", "AllowPrintDocument");
                words["AllowModifyContents"] = StiLocalization.get("Export", "AllowModifyContents");
                words["AllowModifyContentsTooltip"] = StiLocalization.get("HelpViewer", "AllowModifyContents");
                words["AllowCopyTextAndGraphics"] = StiLocalization.get("Export", "AllowCopyTextAndGraphics");
                words["AllowCopyTextAndGraphicsTooltip"] = StiLocalization.get("HelpViewer", "AllowCopyTextAndGraphics");
                words["AllowAddOrModifyTextAnnotations"] = StiLocalization.get("Export", "AllowAddOrModifyTextAnnotations");
                words["AllowAddOrModifyTextAnnotationsTooltip"] = StiLocalization.get("HelpViewer", "AllowAddOrModifyTextAnnotations");
                words["EncryptionKeyLength"] = StiLocalization.get("Export", "labelEncryptionKeyLength");
                words["EncryptionKeyLengthTooltip"] = StiLocalization.get("HelpViewer", "EncryptionKeyLength");
                words["UseDigitalSignature"] = StiLocalization.get("Export", "UseDigitalSignature");
                words["UseDigitalSignatureTooltip"] = StiLocalization.get("HelpViewer", "DigitalSignature");
                words["GetCertificateFromCryptoUI"] = StiLocalization.get("Export", "GetCertificateFromCryptoUI");
                words["GetCertificateFromCryptoUITooltip"] = StiLocalization.get("HelpViewer", "GetCertificateFromCryptoUI");
                words["SubjectNameString"] = StiLocalization.get("Export", "labelSubjectNameString");
                words["SubjectNameStringTooltip"] = StiLocalization.get("HelpViewer", "SubjectNameString");
                words["MonthJanuary"] = StiLocalization.get("A_WebViewer", "MonthJanuary");
                words["MonthFebruary"] = StiLocalization.get("A_WebViewer", "MonthFebruary");
                words["MonthMarch"] = StiLocalization.get("A_WebViewer", "MonthMarch");
                words["MonthApril"] = StiLocalization.get("A_WebViewer", "MonthApril");
                words["MonthMay"] = StiLocalization.get("A_WebViewer", "MonthMay");
                words["MonthJune"] = StiLocalization.get("A_WebViewer", "MonthJune");
                words["MonthJuly"] = StiLocalization.get("A_WebViewer", "MonthJuly");
                words["MonthAugust"] = StiLocalization.get("A_WebViewer", "MonthAugust");
                words["MonthSeptember"] = StiLocalization.get("A_WebViewer", "MonthSeptember");
                words["MonthOctober"] = StiLocalization.get("A_WebViewer", "MonthOctober");
                words["MonthNovember"] = StiLocalization.get("A_WebViewer", "MonthNovember");
                words["MonthDecember"] = StiLocalization.get("A_WebViewer", "MonthDecember");
                words["DayMonday"] = StiLocalization.get("A_WebViewer", "DayMonday");
                words["DayTuesday"] = StiLocalization.get("A_WebViewer", "DayTuesday");
                words["DayWednesday"] = StiLocalization.get("A_WebViewer", "DayWednesday");
                words["DayThursday"] = StiLocalization.get("A_WebViewer", "DayThursday");
                words["DayFriday"] = StiLocalization.get("A_WebViewer", "DayFriday");
                words["DaySaturday"] = StiLocalization.get("A_WebViewer", "DaySaturday");
                words["DaySunday"] = StiLocalization.get("A_WebViewer", "DaySunday");
                words["FormViewerTitle"] = StiLocalization.get("FormViewer", "title");
                words["Error"] = StiLocalization.get("Errors", "Error");
                words["SelectAll"] = StiLocalization.get("MainMenu", "menuEditSelectAll").replaceAll("&", "");
                words["CurrentMonth"] = "Current Month";
                words["CurrentQuarter"] = "Current Quarter";
                words["CurrentWeek"] = "Current Week";
                words["CurrentYear"] = "Current Year";
                words["NextMonth"] = "Next Month";
                words["NextQuarter"] = "Next Quarter";
                words["NextWeek"] = "Next Week";
                words["NextYear"] = "Next Year";
                words["PreviousMonth"] = "Previous Month";
                words["PreviousQuarter"] = "Previous Quarter";
                words["PreviousWeek"] = "Previous Week";
                words["PreviousYear"] = "Previous Year";
                words["FirstQuarter"] = "First Quarter";
                words["SecondQuarter"] = "Second Quarter";
                words["ThirdQuarter"] = "Third Quarter";
                words["FourthQuarter"] = "Fourth Quarter";
                words["MonthToDate"] = "Month To Date";
                words["QuarterToDate"] = "Quarter To Date";
                words["WeekToDate"] = "Week To Date";
                words["YearToDate"] = "Year To Date";
                words["Today"] = "Today";
                words["Tomorrow"] = "Tomorrow";
                words["Yesterday"] = "Yesterday";
                return words;
            };
            return StiCollectionsHelper;
        }());
        Viewer.StiCollectionsHelper = StiCollectionsHelper;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiText = Stimulsoft.Report.Components.StiText;
        var StiCheckBox = Stimulsoft.Report.Components.StiCheckBox;
        var StiRichText = Stimulsoft.Report.Components.StiRichText;
        var Hashtable = Stimulsoft.System.Collections.Hashtable;
        var StiEditableFieldsHelper = (function () {
            function StiEditableFieldsHelper() {
            }
            StiEditableFieldsHelper.checkEditableReport = function (report) {
                var components = report.getComponents();
                for (var _i = 0, _a = components.list; _i < _a.length; _i++) {
                    var component = _a[_i];
                    if (component.is(StiText) && component.editable)
                        return true;
                    else if (component.is(StiCheckBox) && component.editable)
                        return true;
                    else if (component.is(StiRichText) && component.editable)
                        return true;
                }
                return false;
            };
            StiEditableFieldsHelper.applyEditableFieldsToReport = function (report, parameters) {
                if (parameters == null)
                    return;
                try {
                    var allPagesParams = parameters.as(Hashtable);
                    for (var _i = 0, _a = allPagesParams.keys; _i < _a.length; _i++) {
                        var allPagesParamsKey = _a[_i];
                        var pageIndex = allPagesParamsKey.toNumber();
                        var allComponetsParams = allPagesParams.get(allPagesParamsKey);
                        for (var _b = 0, _c = allComponetsParams.keys; _b < _c.length; _b++) {
                            var allComponetsParamsKey = _c[_b];
                            var compIndex = allComponetsParamsKey.toNumber();
                            var compParams = allComponetsParams.get(allComponetsParamsKey);
                            if (pageIndex < report.renderedPages.count) {
                                var page = report.renderedPages.getByIndex(pageIndex);
                                if (compIndex < page.components.count) {
                                    var component = page.components.getByIndex(compIndex);
                                    if (compParams.get("type").toString() == "CheckBox" && component.is(StiCheckBox)) {
                                        component.checkedValue = compParams.get("checked").toBoolean() ? "true" : "false";
                                    }
                                    else if (compParams.get("type").toString() == "Text" && component.is(StiText)) {
                                        component.text = compParams.get("text").toString();
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    Stimulsoft.System.StiError.showError(e);
                }
            };
            return StiEditableFieldsHelper;
        }());
        Viewer.StiEditableFieldsHelper = StiEditableFieldsHelper;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiDataExportMode = Stimulsoft.Report.Export.StiDataExportMode;
        var StiExportFormat = Stimulsoft.Report.StiExportFormat;
        var StiHtmlExportMode = Stimulsoft.Report.Export.StiHtmlExportMode;
        var StiHtmlType = Stimulsoft.Report.Export.StiHtmlType;
        var ImageFormat = Stimulsoft.Report.ImageFormat;
        var StiRangeType = Stimulsoft.Report.StiRangeType;
        var StiPdfAllowEditable = Stimulsoft.Report.Export.StiPdfAllowEditable;
        var StiPdfImageCompressionMethod = Stimulsoft.Report.Export.StiPdfImageCompressionMethod;
        var StiPdfEncryptionKeyLength = Stimulsoft.Report.Export.StiPdfEncryptionKeyLength;
        var StiUserAccessPrivileges = Stimulsoft.Report.Export.StiUserAccessPrivileges;
        var StiExcelType = Stimulsoft.Report.Export.StiExcelType;
        var StiExportsHelper = (function () {
            function StiExportsHelper() {
            }
            StiExportsHelper.getReportFileName = function (report) {
                var fileName = (report.reportAlias == null || report.reportAlias.trim().length == 0) ? report.reportName : report.reportAlias;
                return fileName.replaceAll("\"", "");
            };
            StiExportsHelper.applyExportSettings = function (exportFormat, settingsObject, settings) {
                if (settingsObject.PageRange == "All")
                    settings.pageRange.rangeType = StiRangeType.All;
                else {
                    settings.pageRange.rangeType = StiRangeType.Pages;
                    settings.pageRange.pageRanges = settingsObject.PageRange;
                }
                switch (exportFormat) {
                    case StiExportFormat.Html:
                        settings.htmlType = StiHtmlType[settingsObject.HtmlType];
                        settings.addPageBreaks = settingsObject.AddPageBreaks;
                        settings.exportMode = StiHtmlExportMode[settingsObject.ExportMode];
                        settings.imageFormat = ImageFormat[settingsObject.ImageFormat];
                        settings.useEmbeddedImages = settingsObject.UseEmbeddedImages;
                        settings.zoom = parseFloat(settingsObject.Zoom);
                        break;
                    case StiExportFormat.Html5:
                        settings.htmlType = StiHtmlType[settingsObject.HtmlType];
                        settings.continuousPages = settingsObject.ContinuousPages;
                        settings.imageFormat = ImageFormat[settingsObject.ImageFormat];
                        settings.imageQuality = parseFloat(settingsObject.ImageQuality);
                        settings.imageResolution = parseFloat(settingsObject.ImageResolution);
                        break;
                    case StiExportFormat.Pdf:
                        settings.allowEditable = StiPdfAllowEditable[settingsObject.AllowEditable];
                        settings.compressed = false;
                        settings.embeddedFonts = settingsObject.EmbeddedFonts;
                        settings.exportRtfTextAsImage = settingsObject.ExportRtfTextAsImage;
                        settings.getCertificateFromCryptoUI = settingsObject.GetCertificateFromCryptoUI;
                        settings.imageCompressionMethod = StiPdfImageCompressionMethod[settingsObject.ImageCompressionMethod];
                        settings.imageQuality = parseFloat(settingsObject.ImageQuality);
                        settings.imageResolution = parseFloat(settingsObject.ImageResolution);
                        settings.keyLength = StiPdfEncryptionKeyLength[settingsObject.KeyLength];
                        settings.passwordInputOwner = settingsObject.PasswordInputOwner;
                        settings.passwordInputUser = settingsObject.PasswordInputUser;
                        settings.pdfACompliance = settingsObject.PdfACompliance;
                        settings.standardPdfFonts = settingsObject.StandardPdfFonts;
                        settings.useDigitalSignature = settingsObject.UseDigitalSignature;
                        settings.useUnicode = false;
                        settings.userAccessPrivileges = 0;
                        var values = settingsObject.UserAccessPrivileges.replaceAll(" ", "").split(",");
                        for (var i = 0; i < values.length; i++) {
                            settings.userAccessPrivileges += StiUserAccessPrivileges[values[i]];
                        }
                        break;
                    case StiExportFormat.Excel2007:
                        settings.excelType = StiExcelType[settingsObject.ExcelType];
                        settings.exportDataOnly = settingsObject.ExportDataOnly;
                        settings.exportEachPageToSheet = settingsObject.ExportEachPageToSheet;
                        settings.exportObjectFormatting = settingsObject.ExportObjectFormatting;
                        settings.exportPageBreaks = settingsObject.ExportPageBreaks;
                        settings.imageQuality = parseFloat(settingsObject.ImageQuality);
                        settings.imageResolution = parseFloat(settingsObject.ImageResolution);
                        settings.useOnePageHeaderAndFooter = settingsObject.UseOnePageHeaderAndFooter;
                        break;
                    case StiExportFormat.Word2007:
                        settings.imageQuality = parseFloat(settingsObject.ImageQuality);
                        settings.imageResolution = parseFloat(settingsObject.ImageResolution);
                        settings.removeEmptySpaceAtBottom = settingsObject.RemoveEmptySpaceAtBottom;
                        settings.usePageHeadersAndFooters = settingsObject.UsePageHeadersAndFooters;
                        break;
                    case StiExportFormat.Csv:
                        settings.separator = settingsObject.Separator;
                        settings.skipColumnHeaders = settingsObject.SkipColumnHeaders;
                        settings.dataExportMode = StiDataExportMode[settingsObject.DataExportMode];
                        break;
                }
            };
            return StiExportsHelper;
        }());
        Viewer.StiExportsHelper = StiExportsHelper;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiChart = Stimulsoft.Report.Components.StiChart;
        var StiCrossHeaderInteraction = Stimulsoft.Report.Components.StiCrossHeaderInteraction;
        var StiReport = Stimulsoft.Report.StiReport;
        var StiDataBand = Stimulsoft.Report.Components.StiDataBand;
        var StiInteractionSortDirection = Stimulsoft.Report.Components.StiInteractionSortDirection;
        var StiSortHelper = Stimulsoft.Report.Components.StiSortHelper;
        var StiReportHelper = (function () {
            function StiReportHelper() {
            }
            StiReportHelper.applySorting = function (report, parameters) {
                var values = parameters["ComponentName"].toString().split(';');
                var comp = report.getComponentByName(values[0]);
                var isCtrl = values[1].toBoolean();
                values = parameters["DataBand"].toString().split(';');
                var dataBand = report.getComponentByName(values[0]).as(StiDataBand);
                if (dataBand != null)
                    dataBand.sort = values.where(function (val, i) { return i != 0; }).toArray();
                if (comp != null && dataBand != null) {
                    var dataBandColumnString = comp.interaction.getSortColumnsString();
                    if (dataBand.sort == null || dataBand.sort.length == 0) {
                        dataBand.sort = StiSortHelper.addColumnToSorting(dataBand.sort, dataBandColumnString, true);
                    }
                    else {
                        var sortIndex = StiSortHelper.getColumnIndexInSorting(dataBand.sort, dataBandColumnString);
                        if (isCtrl) {
                            if (sortIndex == -1)
                                dataBand.sort = StiSortHelper.addColumnToSorting(dataBand.sort, dataBandColumnString, true);
                            else
                                dataBand.sort = StiSortHelper.changeColumnSortDirection(dataBand.sort, dataBandColumnString);
                        }
                        else {
                            if (sortIndex != -1) {
                                var direction = StiSortHelper.getColumnSortDirection(dataBand.sort, dataBandColumnString);
                                if (direction == StiInteractionSortDirection.Ascending)
                                    direction = StiInteractionSortDirection.Descending;
                                else
                                    direction = StiInteractionSortDirection.Ascending;
                                dataBand.sort = StiSortHelper.addColumnToSorting([], dataBandColumnString, direction == StiInteractionSortDirection.Ascending);
                                comp.interaction.sortingDirection = direction;
                            }
                            else {
                                dataBand.sort = StiSortHelper.addColumnToSorting([], dataBandColumnString, true);
                                comp.interaction.sortingDirection = StiInteractionSortDirection.Ascending;
                            }
                        }
                    }
                    report.isRendered = false;
                }
            };
            StiReportHelper.applyCollapsing = function (report, parameters) {
                var componentName = parameters["ComponentName"].toString();
                var comp = report.getComponentByName(componentName);
                var interactionComp = comp;
                if (interactionComp != null && interactionComp.interaction != null) {
                    report.interactionCollapsingStates = parameters["InteractionCollapsingStates"];
                    var crossHeaderInteraction = interactionComp.interaction.as(StiCrossHeaderInteraction);
                    if (crossHeaderInteraction != null && crossHeaderInteraction.collapsingEnabled) {
                    }
                    report.isRendered = false;
                }
            };
            StiReportHelper.cloneReport = function (report) {
                var jsonReport = report.saveToJsonString();
                var cloneReport = new StiReport();
                cloneReport.load(jsonReport);
                if (report.variables != null && report.variables.count > 0) {
                    for (var i = 0; i < report.variables.count; i++) {
                        cloneReport.setVariable(report.variables.keys[i], report.variables.values[i]);
                    }
                }
                cloneReport.regData("", "", report.dataStore);
                cloneReport.regBusinessObject(report.businessObjectsStore);
                cloneReport.onBeginProcessData = report.onBeginProcessData;
                cloneReport.onEndProcessData = report.onEndProcessData;
                return cloneReport;
            };
            StiReportHelper.applyDrillDown = function (report, renderedReport, parameters) {
                var pageIndex = parameters["PageIndex"].toNumber();
                var componentIndex = parameters["ComponentIndex"].toNumber();
                var pageGuid = parameters["PageGuid"];
                var reportFile = parameters["ReportFile"];
                var drillDownPage = null;
                var newReport = report;
                if (!String.isNullOrEmpty(pageGuid)) {
                    for (var _i = 0, _a = report.pages.list; _i < _a.length; _i++) {
                        var page = _a[_i];
                        if (page.guid == pageGuid) {
                            drillDownPage = page;
                            page.enabled = true;
                            page.skip = false;
                        }
                        else
                            page.enabled = false;
                    }
                    var comps = report.getComponents();
                    for (var _b = 0, _c = comps.list; _b < _c.length; _b++) {
                        var comp = _c[_b];
                        if (comp.interaction != null &&
                            comp.interaction.drillDownEnabled &&
                            comp.interaction.drillDownPageGuid == drillDownPage.guid) {
                            comp.interaction.drillDownPage = null;
                        }
                        if (comp.is(StiChart)) {
                            var chart = comp.as(StiChart);
                            for (var _d = 0, _e = chart.series.list; _d < _e.length; _d++) {
                                var series = _e[_d];
                            }
                        }
                    }
                }
                else if (!String.isNullOrEmpty(reportFile)) {
                    newReport = new StiReport();
                    newReport.loadFile(reportFile);
                }
                if (report.reportAlias == newReport.reportAlias)
                    newReport.reportAlias = (drillDownPage.alias == null || drillDownPage.alias.length == 0) ? drillDownPage.name : drillDownPage.alias;
                if (report.reportDescription == newReport.reportDescription)
                    newReport.reportDescription = newReport.reportAlias;
                var renderedPage = renderedReport.renderedPages.getByIndex(pageIndex);
                var interactionComp = renderedPage.components.getByIndex(componentIndex);
                if (interactionComp != null && interactionComp.drillDownParameters != null) {
                    for (var _f = 0, _g = interactionComp.drillDownParameters; _f < _g.length; _f++) {
                        var entry = _g[_f];
                        newReport.setVariable(entry["name"], entry["value"]);
                    }
                }
                try {
                }
                finally {
                }
                return newReport;
            };
            StiReportHelper.addBookmarkNode = function (bkm, parentNode, bookmarksTree) {
                var tn = new StiBookmarkTreeNode();
                tn.parent = parentNode;
                var st = bkm.text.replace("'", "\\\'");
                tn.title = st;
                tn.url = "#" + st;
                tn.used = true;
                bookmarksTree.add(tn);
                var currentNode = bookmarksTree.count - 1;
                if (bkm.bookmarks.count != 0) {
                    for (var tempCount = 0; tempCount < bkm.bookmarks.count; tempCount++) {
                        this.addBookmarkNode(bkm.bookmarks.list[tempCount], currentNode, bookmarksTree);
                    }
                }
            };
            StiReportHelper.getBookmarksContent = function (report, viewerId, pageNumber) {
                var bookmarksPageIndex = {};
                var tempPageNumber = 0;
                for (var _i = 0, _a = report.renderedPages.list; _i < _a.length; _i++) {
                    var page = _a[_i];
                    report.renderedPages.getPage(page);
                    var components = page.getComponents();
                    for (var _b = 0, _c = components.list; _b < _c.length; _b++) {
                        var comp = _c[_b];
                        if (comp.enabled) {
                            var bookmarkValue = comp.bookmarkValue;
                            if (bookmarkValue == null)
                                bookmarkValue = String.empty;
                            bookmarkValue = bookmarkValue.replace("'", "\\\'");
                            if (bookmarkValue != String.empty) {
                                if (!bookmarksPageIndex[bookmarkValue])
                                    bookmarksPageIndex[bookmarkValue] = tempPageNumber;
                            }
                        }
                    }
                    tempPageNumber++;
                }
                var bookmarksTree = [];
                this.addBookmarkNode(report.bookmark, -1, bookmarksTree);
                var html = String.empty;
                html += String.stiFormat("bookmarks = new stiTree('bookmarks','{0}',{1}, imagesForBookmarks);", viewerId, pageNumber);
                for (var index = 0; index < bookmarksTree.count; index++) {
                    var node = bookmarksTree[index];
                    var pageIndex = String.empty;
                    if (bookmarksPageIndex[node.title])
                        pageIndex = String.stiFormat("Page {0}", bookmarksPageIndex[node.title] + 1);
                    else
                        pageIndex = "Page 0";
                    html += String.stiFormat("bookmarks.add({0},{1},'{2}','{3}','{4}');", index, node.parent, node.title, node.url, pageIndex);
                }
                return html;
            };
            return StiReportHelper;
        }());
        Viewer.StiReportHelper = StiReportHelper;
        var StiBookmarkTreeNode = (function () {
            function StiBookmarkTreeNode() {
            }
            return StiBookmarkTreeNode;
        }());
        Viewer.StiBookmarkTreeNode = StiBookmarkTreeNode;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiSelectionMode = Stimulsoft.Report.Dictionary.StiSelectionMode;
        var StiItemsInitializationType = Stimulsoft.Report.Dictionary.StiItemsInitializationType;
        var StiVariableHelper = Stimulsoft.Report.Engine.StiVariableHelper;
        var StiTypeMode = Stimulsoft.Report.Dictionary.StiTypeMode;
        var StiType = Stimulsoft.Report.Dictionary.StiType;
        var Enum = Stimulsoft.System.Enum;
        var StiVariableInitBy = Stimulsoft.Report.Dictionary.StiVariableInitBy;
        var StiDateTimeType = Stimulsoft.Report.Dictionary.StiDateTimeType;
        var StringRange = Stimulsoft.Report.StringRange;
        var FloatRange = Stimulsoft.Report.FloatRange;
        var CharRange = Stimulsoft.Report.CharRange;
        var DateTimeRange = Stimulsoft.Report.DateTimeRange;
        var TimeSpanRange = Stimulsoft.Report.TimeSpanRange;
        var DecimalRange = Stimulsoft.Report.DecimalRange;
        var DoubleRange = Stimulsoft.Report.DoubleRange;
        var ByteRange = Stimulsoft.Report.ByteRange;
        var ShortRange = Stimulsoft.Report.ShortRange;
        var IntRange = Stimulsoft.Report.IntRange;
        var LongRange = Stimulsoft.Report.LongRange;
        var GuidRange = Stimulsoft.Report.GuidRange;
        var StiVariablesHelper = (function () {
            function StiVariablesHelper() {
                this.en_us_culture = null;
            }
            StiVariablesHelper.fillDialogInfoItems = function (report) {
                var isColumnsInitializationTypeItems = false;
                for (var _i = 0, _a = report.dictionary.variables.list; _i < _a.length; _i++) {
                    var variable = _a[_i];
                    if (variable.requestFromUser && variable.dialogInfo.itemsInitializationType == StiItemsInitializationType.Columns &&
                        (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0 ||
                            variable.dialogInfo.values == null || variable.dialogInfo.values.length == 0)) {
                        isColumnsInitializationTypeItems = true;
                        break;
                    }
                }
                if (isColumnsInitializationTypeItems) {
                    report.dictionary.connect();
                    StiVariableHelper.fillItemsOfVariables(report);
                    report.dictionary.disconnect();
                }
            };
            StiVariablesHelper.getVariableAlias = function (variable) {
                if (String.isNullOrEmpty(variable.alias))
                    return variable.name;
                return variable.alias;
            };
            StiVariablesHelper.getItems = function (variable) {
                var items = [];
                var valueBinding = variable.dialogInfo.bindingVariable != null ? variable.dialogInfo.bindingVariable.value : null;
                var index = 0;
                if (variable.dialogInfo.keys != null && variable.dialogInfo.keys.length != 0) {
                    var itemsVariable = variable.dialogInfo.getDialogInfoItems(variable.type);
                    for (var _i = 0, itemsVariable_1 = itemsVariable; _i < itemsVariable_1.length; _i++) {
                        var itemVariable = itemsVariable_1[_i];
                        if (valueBinding == null || valueBinding == Stimulsoft.System.Convert.toString(itemVariable.valueBinding)) {
                            var item = {};
                            item["value"] = itemVariable.value;
                            item["key"] = itemVariable.keyObject;
                            item["keyTo"] = itemVariable.keyObjectTo;
                            if (variable.type == Stimulsoft.System.DateTime || variable.type == Stimulsoft.System.NullableDateTime ||
                                variable.type == Stimulsoft.System.StimulsoftDateTimeRange || variable.type == Stimulsoft.System.StimulsoftDateTimeList) {
                                if (itemVariable.keyObject != null)
                                    item["key"] = this.getDateTimeObject(itemVariable.keyObject);
                                if (itemVariable.keyObjectTo != null)
                                    item["keyTo"] = this.getDateTimeObject(itemVariable.keyObjectTo);
                            }
                            else {
                                if (item["value"] != null)
                                    item["value"] = (item["value"]).toString();
                                if (item["key"] != null)
                                    item["key"] = (item["key"]).toString();
                                if (item["keyTo"] != null)
                                    item["keyTo"] = (item["keyTo"]).toString();
                            }
                            items.add(item);
                        }
                        index++;
                    }
                }
                return index > 0 ? items : null;
            };
            StiVariablesHelper.getDateTimeObject = function (value) {
                if (value != null && !value.is(Stimulsoft.System.DateTime))
                    return value;
                var dateValue = Stimulsoft.System.DateTime.now;
                if (value != null && value.is(Stimulsoft.System.DateTime))
                    dateValue = value;
                var dateTime = {};
                dateTime["year"] = dateValue.year;
                dateTime["month"] = dateValue.month;
                dateTime["day"] = dateValue.day;
                dateTime["hours"] = dateValue.hour;
                dateTime["minutes"] = dateValue.minute;
                dateTime["seconds"] = dateValue.second;
                if (value == null)
                    dateTime["isNull"] = true;
                return dateTime;
            };
            StiVariablesHelper.getBasicType = function (variable) {
                var typeMode = { ref: StiTypeMode.Value };
                StiType.getTypeModeFromType(variable.type, typeMode);
                return Enum.getName(StiTypeMode, typeMode.ref);
            };
            StiVariablesHelper.getStiType = function (variable) {
                if (variable.type == String || variable.type == Stimulsoft.System.StimulsoftStringList || variable.type == Stimulsoft.System.StimulsoftStringRange)
                    return "String";
                if (variable.type == Stimulsoft.System.Char || variable.type == Stimulsoft.System.NullableChar || variable.type == Stimulsoft.System.StimulsoftCharRange || variable.type == Stimulsoft.System.StimulsoftCharList)
                    return "Char";
                if (variable.type == Boolean || variable.type == Stimulsoft.System.NullableBoolean || variable.type == Stimulsoft.System.StimulsoftBoolList)
                    return "Bool";
                if (variable.type == Stimulsoft.System.DateTime || variable.type == Stimulsoft.System.NullableDateTime || variable.type == Stimulsoft.System.StimulsoftDateTimeList || variable.type == Stimulsoft.System.StimulsoftDateTimeRange)
                    return "DateTime";
                if (variable.type == Stimulsoft.System.TimeSpan || variable.type == Stimulsoft.System.NullableTimeSpan || variable.type == Stimulsoft.System.StimulsoftTimeSpanList || variable.type == Stimulsoft.System.StimulsoftTimeSpanRange)
                    return "TimeSpan";
                if (variable.type == Stimulsoft.System.Guid || variable.type == Stimulsoft.System.NullableGuid || variable.type == Stimulsoft.System.StimulsoftGuidList || variable.type == Stimulsoft.System.StimulsoftGuidRange)
                    return "Guid";
                if (variable.type == Stimulsoft.System.Drawing.Image)
                    return "Image";
                if (variable.type == Stimulsoft.System.Single || variable.type == Stimulsoft.System.Single || variable.type == Stimulsoft.System.StimulsoftFloatList || variable.type == Stimulsoft.System.StimulsoftFloatRange)
                    return "Float";
                if (variable.type == Stimulsoft.System.Double || variable.type == Stimulsoft.System.NullableDouble || variable.type == Stimulsoft.System.StimulsoftDoubleList || variable.type == Stimulsoft.System.StimulsoftDoubleRange)
                    return "Double";
                if (variable.type == Stimulsoft.System.Decimal || variable.type == Stimulsoft.System.NullableDecimal || variable.type == Stimulsoft.System.StimulsoftDecimalList || variable.type == Stimulsoft.System.StimulsoftDecimalRange)
                    return "Decimal";
                if (variable.type == Stimulsoft.System.Int32 || variable.type == Stimulsoft.System.NullableInt32 || variable.type == Stimulsoft.System.StimulsoftIntList || variable.type == Stimulsoft.System.StimulsoftIntRange)
                    return "Int";
                if (variable.type == Stimulsoft.System.UInt32 || variable.type == Stimulsoft.System.NullableUInt32)
                    return "Uint";
                if (variable.type == Stimulsoft.System.Int16 || variable.type == Stimulsoft.System.NullableInt16 || variable.type == Stimulsoft.System.StimulsoftShortList || variable.type == Stimulsoft.System.StimulsoftShortRange)
                    return "Short";
                if (variable.type == Stimulsoft.System.UInt16 || variable.type == Stimulsoft.System.NullableUInt16)
                    return "Ushort";
                if (variable.type == Stimulsoft.System.Int64 || variable.type == Stimulsoft.System.NullableInt64 || variable.type == Stimulsoft.System.StimulsoftLongList || variable.type == Stimulsoft.System.StimulsoftLongRange)
                    return "Long";
                if (variable.type == Stimulsoft.System.UInt64 || variable.type == Stimulsoft.System.NullableUInt64)
                    return "Ulong";
                if (variable.type == Stimulsoft.System.Byte || variable.type == Stimulsoft.System.NullableByte || variable.type == Stimulsoft.System.StimulsoftByteList || variable.type == Stimulsoft.System.StimulsoftByteRange)
                    return "Byte";
                if (variable.type == Stimulsoft.System.SByte || variable.type == Stimulsoft.System.NullableSByte)
                    return "Sbyte";
                return String.empty;
            };
            StiVariablesHelper.applyReportParameters = function (report, values) {
                for (var key in values) {
                    var variable = report.dictionary.variables.getByName(key);
                    if (variable != null)
                        this.setVariableValue(report, key, values[key], variable);
                }
                report.isRendered = false;
            };
            StiVariablesHelper.applyReportBindingVariables = function (report, values) {
                for (var key in values) {
                    for (var _i = 0, _a = report.dictionary.variables.list; _i < _a.length; _i++) {
                        var variable = _a[_i];
                        if (variable.name == key)
                            variable.value = Stimulsoft.System.Convert.toString(values[key]);
                        if (variable.dialogInfo.bindingVariable != null && variable.dialogInfo.bindingVariable.name == key)
                            variable.dialogInfo.bindingVariable.value = Stimulsoft.System.Convert.toString(values[key]);
                    }
                }
            };
            StiVariablesHelper.setVariableValue = function (report, paramName, paramValue, variable) {
                var decimalSeparator = ".";
                var stringValue = null;
                var values = null;
                var array = null;
                if (paramValue != null) {
                    if (paramValue.is(Array))
                        array = paramValue;
                    if (typeof (paramValue) == "object")
                        values = paramValue;
                    else
                        stringValue = Stimulsoft.System.Convert.toString(paramValue);
                }
                if (variable.type == String) {
                    report.setVariable(paramName, paramValue);
                }
                else if (variable.type == Stimulsoft.System.Single || variable.type == Stimulsoft.System.Single) {
                    var value = 0;
                    value = parseFloat(stringValue.replaceAll(".", ",").replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Double || variable.type == Stimulsoft.System.NullableDouble) {
                    var value = 0;
                    value = parseFloat(stringValue.replaceAll(".", ",").replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Decimal || variable.type == Stimulsoft.System.NullableDecimal) {
                    var value = 0;
                    value = parseFloat(stringValue.replaceAll(".", ",").replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Int32 || variable.type == Stimulsoft.System.NullableInt32) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.UInt32 || variable.type == Stimulsoft.System.NullableUInt32) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Int16 || variable.type == Stimulsoft.System.NullableInt16) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.UInt16 || variable.type == Stimulsoft.System.NullableUInt16) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Int64 || variable.type == Stimulsoft.System.NullableInt64) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.UInt64 || variable.type == Stimulsoft.System.NullableUInt64) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Byte || variable.type == Stimulsoft.System.NullableByte) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.SByte || variable.type == Stimulsoft.System.NullableSByte) {
                    var value = 0;
                    value = parseInt(stringValue);
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Char || variable.type == Stimulsoft.System.NullableChar) {
                    var value = ' ';
                    value = paramValue;
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Boolean || variable.type == Stimulsoft.System.NullableBoolean) {
                    var value = false;
                    value = stringValue.toLower() == "true";
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.DateTime || variable.type == Stimulsoft.System.NullableDateTime) {
                    var value = void 0;
                    try {
                        value = new Stimulsoft.System.DateTime(Date.parse(stringValue));
                    }
                    catch (e) {
                        Stimulsoft.System.StiError.showError(e, false);
                        value = Stimulsoft.System.DateTime.now;
                    }
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.TimeSpan || variable.type == Stimulsoft.System.NullableTimeSpan) {
                    var value = void 0;
                    try {
                        value = Stimulsoft.System.TimeSpan.fromString(stringValue);
                    }
                    catch (e) {
                        Stimulsoft.System.StiError.showError(e, false);
                        value = Stimulsoft.System.TimeSpan.zero;
                    }
                    report.setVariable(paramName, value);
                }
                else if (variable.type == Stimulsoft.System.Guid || variable.type == Stimulsoft.System.NullableGuid) {
                    var variableGuid = void 0;
                    try {
                        variableGuid = new Stimulsoft.System.Guid(stringValue);
                    }
                    catch (e) {
                        Stimulsoft.System.StiError.showError(e, false);
                        variableGuid = Stimulsoft.System.Guid.empty;
                    }
                    report.setVariable(paramName, variableGuid);
                }
                else if (variable.type == Stimulsoft.System.StimulsoftStringRange) {
                    report.setVariable(paramName, new StringRange(Stimulsoft.System.Convert.toString(values["from"]), Stimulsoft.System.Convert.toString(values["to"])));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftFloatRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseFloat(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseFloat(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new FloatRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftDoubleRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseFloat(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseFloat(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new DoubleRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftDecimalRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseFloat(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseFloat(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new DecimalRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftIntRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseInt(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseInt(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new IntRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftShortRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseInt(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseInt(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new ShortRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftLongRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseInt(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseInt(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new LongRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftByteRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = parseInt(Stimulsoft.System.Convert.toString(values["from"]).replaceAll(",", decimalSeparator));
                    valueTo = parseInt(Stimulsoft.System.Convert.toString(values["to"]).replaceAll(",", decimalSeparator));
                    report.setVariable(paramName, new ByteRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftCharRange) {
                    var valueFrom = 0;
                    var valueTo = 0;
                    valueFrom = Stimulsoft.System.Convert.toString(values["from"]);
                    valueTo = Stimulsoft.System.Convert.toString(values["to"]);
                    report.setVariable(paramName, new CharRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftDateTimeRange) {
                    var valueFrom = Stimulsoft.System.DateTime.now;
                    var valueTo = Stimulsoft.System.DateTime.now;
                    valueFrom = new Stimulsoft.System.DateTime(Date.parse(values["from"]));
                    valueTo = new Stimulsoft.System.DateTime(Date.parse(values["to"]));
                    report.setVariable(paramName, new DateTimeRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftTimeSpanRange) {
                    var valueFrom = Stimulsoft.System.TimeSpan.zero;
                    var valueTo = Stimulsoft.System.TimeSpan.zero;
                    valueFrom = Stimulsoft.System.TimeSpan.fromString(values["from"]);
                    valueTo = Stimulsoft.System.TimeSpan.fromString(values["to"]);
                    report.setVariable(paramName, new TimeSpanRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftGuidRange) {
                    var valueFrom = Stimulsoft.System.Guid.empty;
                    var valueTo = Stimulsoft.System.Guid.empty;
                    try {
                        valueFrom = new Stimulsoft.System.Guid(Stimulsoft.System.Convert.toString(values["from"]));
                        valueTo = new Stimulsoft.System.Guid(Stimulsoft.System.Convert.toString(values["to"]));
                    }
                    catch (e) {
                        Stimulsoft.System.StiError.showError(e, false);
                    }
                    report.setVariable(paramName, new GuidRange(valueFrom, valueTo));
                }
                else if (variable.type == Stimulsoft.System.StimulsoftStringList) {
                    var list = [];
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var value = array_1[_i];
                        list.add(value.toString());
                    }
                    report.setVariable(paramName, list);
                    if (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0)
                        variable.dialogInfo.keys = list.toArray();
                }
                else if (variable.type == Stimulsoft.System.StimulsoftFloatList ||
                    variable.type == Stimulsoft.System.StimulsoftDoubleList ||
                    variable.type == Stimulsoft.System.StimulsoftDecimalList ||
                    variable.type == Stimulsoft.System.StimulsoftByteList ||
                    variable.type == Stimulsoft.System.StimulsoftShortList ||
                    variable.type == Stimulsoft.System.StimulsoftLongList) {
                    var list = [];
                    for (var _a = 0, array_2 = array; _a < array_2.length; _a++) {
                        var value = array_2[_a];
                        list.add(value.toNumber());
                    }
                    report.setVariable(paramName, list);
                    if (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0)
                        variable.dialogInfo.keys = list.toArray().select(function (i) { return i.toString(); }).toArray();
                }
                else if (variable.type == Stimulsoft.System.StimulsoftIntList) {
                    var list = [];
                    var listKeys = [];
                    for (var _b = 0, array_3 = array; _b < array_3.length; _b++) {
                        var value = array_3[_b];
                        list.add(value.toNumber());
                        listKeys.add(value.toString());
                    }
                    report.setVariable(paramName, list);
                    if (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0)
                        variable.dialogInfo.keys = listKeys;
                }
                else if (variable.type == Stimulsoft.System.StimulsoftCharList) {
                    var list = [];
                    for (var _c = 0, array_4 = array; _c < array_4.length; _c++) {
                        var value = array_4[_c];
                        list.add(value.toString());
                    }
                    report.setVariable(paramName, list);
                    if (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0)
                        variable.dialogInfo.keys = list.toArray().select(function (i) { return i.toString(); }).toArray();
                }
                else if (variable.type == Stimulsoft.System.StimulsoftBoolList) {
                    var list = [];
                    for (var _d = 0, array_5 = array; _d < array_5.length; _d++) {
                        var value = array_5[_d];
                        list.add(value.toBoolean());
                    }
                    report.setVariable(paramName, list);
                    if (variable.dialogInfo.keys == null || variable.dialogInfo.keys.length == 0)
                        variable.dialogInfo.keys = list.toArray().select(function (i) { return i.toString; }).toArray();
                }
            };
            StiVariablesHelper.getVariables = function (report) {
                this.fillDialogInfoItems(report);
                var variables = {};
                var binding = {};
                var index = 0;
                for (var _i = 0, _a = report.dictionary.variables.list; _i < _a.length; _i++) {
                    var variable = _a[_i];
                    if (variable.requestFromUser) {
                        if (variable.dialogInfo.bindingVariable != null)
                            binding[variable.dialogInfo.bindingVariable.name] = true;
                        var variableObj = {};
                        variableObj["name"] = variable.name;
                        variableObj["alias"] = this.getVariableAlias(variable);
                        variableObj["basicType"] = this.getBasicType(variable);
                        variableObj["type"] = this.getStiType(variable);
                        variableObj["allowUserValues"] = variable.dialogInfo.allowUserValues;
                        if (variable.selection == StiSelectionMode.FromVariable)
                            variableObj["value"] = variable.initBy == StiVariableInitBy.Value ? variable.valueObject : report.getVariable(variable.name);
                        else if (variable.selection == StiSelectionMode.First)
                            variableObj["value"] = report.getVariable(variable.name);
                        else
                            variableObj["value"] = "";
                        variableObj["key"] = variableObj["value"];
                        variableObj["keyTo"] = String.empty;
                        variableObj["dateTimeType"] = Enum.getName(StiDateTimeType, variable.dialogInfo.dateTimeType);
                        var items = this.getItems(variable);
                        variableObj["items"] = items;
                        var selectedItem = null;
                        if (items != null && items.count > 0) {
                            var stringValue = Stimulsoft.System.Convert.toString(variableObj["value"]);
                            for (var _b = 0, items_1 = items; _b < items_1.length; _b++) {
                                var item = items_1[_b];
                                if (Stimulsoft.System.Convert.toString(item["key"]) == stringValue) {
                                    selectedItem = item;
                                    break;
                                }
                            }
                        }
                        if (variableObj["basicType"] == "Value" || variableObj["basicType"] == "NullableValue") {
                            if (selectedItem != null) {
                                variableObj["key"] = selectedItem["key"];
                                variableObj["value"] = selectedItem["value"];
                                if (variable.dialogInfo.allowUserValues || variableObj["value"] == null || (typeof (variableObj["value"]) == "string" && variableObj["value"] == ""))
                                    variableObj["value"] = variableObj["key"];
                            }
                            for (var _c = 0, _d = report.dictionary.variables.list; _c < _d.length; _c++) {
                                var bindingVariable = _d[_c];
                                if (bindingVariable.dialogInfo.bindingVariable != null && bindingVariable.dialogInfo.bindingVariable.name == variable.name) {
                                    bindingVariable.dialogInfo.bindingVariable.valueObject = variableObj["key"];
                                }
                            }
                            if (variableObj["type"] == "DateTime")
                                variableObj["key"] = this.getDateTimeObject(variableObj["key"]);
                        }
                        if (variableObj["basicType"] == "Range") {
                            if (variableObj["type"] == "DateTime")
                                variableObj["key"] = this.getDateTimeObject(variable.initBy == StiVariableInitBy.Value ? variable.valueObject.fromObject : report.getVariable(variable.name).fromObject);
                            else
                                variableObj["key"] = variable.initBy == StiVariableInitBy.Value ? variable.valueObject.fromObject.toString() : report.getVariable(variable.name).fromObject.toString();
                            if (variableObj["type"] == "DateTime")
                                variableObj["keyTo"] = this.getDateTimeObject(variable.initBy == StiVariableInitBy.Value ? variable.valueObject.toObject : report.getVariable(variable.name).toObject);
                            else
                                variableObj["keyTo"] = variable.initBy == StiVariableInitBy.Value ? variable.valueObject.toObject.toString() : report.getVariable(variable.name).toObject.toString();
                        }
                        if (variableObj["basicType"] == "List") {
                            var value = report.getVariable(variable.name);
                            variableObj["value"] = value;
                            variableObj["key"] = value;
                        }
                        if (variableObj["type"] != "DateTime") {
                        }
                        variables[index.toString()] = variableObj;
                        index++;
                    }
                }
                if (index > 0) {
                    for (var name_1 in binding)
                        for (var i in variables)
                            if (variables[i].name == name_1)
                                variables[i].binding = true;
                    return variables;
                }
                return null;
            };
            return StiVariablesHelper;
        }());
        Viewer.StiVariablesHelper = StiVariablesHelper;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var Color = Stimulsoft.System.Drawing.Color;
        var StiHtmlExportMode = Stimulsoft.Report.Export.StiHtmlExportMode;
        var StiAppearanceOptions = (function () {
            function StiAppearanceOptions() {
                this.backgroundColor = Color.white;
                this.rightToLeft = false;
                this.fullScreenMode = false;
                this.scrollbarsMode = false;
                this.openLinksTarget = "_self";
                this.openExportedReportTarget = "_blank";
                this.showTooltips = true;
                this.pageAlignment = Viewer.StiContentAlignment.Center;
                this.showPageShadow = true;
                this.pageBorderColor = Color.gray;
                this.bookmarksPrint = false;
                this.bookmarksTreeWidth = 180;
                this.parametersPanelMaxHeight = 300;
                this.parametersPanelColumnsCount = 2;
                this.parametersPanelDateFormat = String.empty;
                this.interfaceType = Viewer.StiInterfaceType.Auto;
                this.chartRenderType = Viewer.StiChartRenderType.AnimatedVector;
                this.htmlRenderMode = StiHtmlExportMode.Table;
                this.datePickerFirstDayOfWeek = Viewer.StiFirstDayOfWeek.Monday;
            }
            return StiAppearanceOptions;
        }());
        Viewer.StiAppearanceOptions = StiAppearanceOptions;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiEmailOptions = (function () {
            function StiEmailOptions() {
                this.showEmailDialog = true;
                this.showExportDialog = true;
                this.defaultEmailAddress = "";
                this.defaultEmailSubject = "";
                this.defaultEmailMessage = "";
            }
            return StiEmailOptions;
        }());
        Viewer.StiEmailOptions = StiEmailOptions;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiExportsOptions = (function () {
            function StiExportsOptions() {
                this.showExportDialog = true;
                this.showExportToDocument = true;
                this.showExportToPdf = true;
                this.showExportToXps = false;
                this.showExportToPowerPoint = false;
                this.showExportToHtml = true;
                this.showExportToHtml5 = true;
                this.showExportToMht = false;
                this.showExportToText = false;
                this.showExportToRtf = false;
                this.showExportToWord2007 = true;
                this.showExportToOpenDocumentWriter = false;
                this.showExportToExcel = false;
                this.showExportToExcelXml = false;
                this.showExportToExcel2007 = true;
                this.showExportToOpenDocumentCalc = false;
                this.showExportToCsv = true;
                this.showExportToDbf = false;
                this.showExportToXml = false;
                this.showExportToDif = false;
                this.showExportToSylk = false;
                this.showExportToImageBmp = false;
                this.showExportToImageGif = false;
                this.showExportToImageJpeg = false;
                this.showExportToImagePcx = false;
                this.showExportToImagePng = false;
                this.showExportToImageTiff = false;
                this.showExportToImageMetafile = false;
                this.showExportToImageSvg = false;
                this.showExportToImageSvgz = false;
            }
            return StiExportsOptions;
        }());
        Viewer.StiExportsOptions = StiExportsOptions;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var Color = Stimulsoft.System.Drawing.Color;
        var StiToolbarOptions = (function () {
            function StiToolbarOptions() {
                this.visible = true;
                this.backgroundColor = Color.empty;
                this.borderColor = Color.empty;
                this.fontColor = Color.empty;
                this.fontFamily = "Arial";
                this.alignment = Viewer.StiContentAlignment.Default;
                this.showButtonCaptions = true;
                this.showPrintButton = true;
                this.showSaveButton = true;
                this.showSendEmailButton = false;
                this.showBookmarksButton = true;
                this.showParametersButton = true;
                this.showEditorButton = true;
                this.showFullScreenButton = true;
                this.showFirstPageButton = true;
                this.showPreviousPageButton = true;
                this.showCurrentPageControl = true;
                this.showNextPageButton = true;
                this.showLastPageButton = true;
                this.showZoomButton = true;
                this.showViewModeButton = true;
                this.showDesignButton = false;
                this.showAboutButton = true;
                this.printDestination = Viewer.StiPrintDestination.Default;
                this.viewMode = Viewer.StiWebViewMode.OnePage;
                this.multiPageWidthCount = 2;
                this.multiPageHeightCount = 2;
                this._zoom = 100;
                this.menuAnimation = true;
                this.showMenuMode = Viewer.StiShowMenuMode.Click;
            }
            Object.defineProperty(StiToolbarOptions.prototype, "zoom", {
                get: function () {
                    return this._zoom;
                },
                set: function (value) {
                    if (value == Stimulsoft.Viewer.StiZoomMode.PageWidth || value == Stimulsoft.Viewer.StiZoomMode.PageHeight || (value >= 10 && value <= 500))
                        this._zoom = value;
                    else if (value > 500)
                        this._zoom = 500;
                    else if (value < 10)
                        this._zoom = 10;
                    else
                        this._zoom = 100;
                },
                enumerable: true,
                configurable: true
            });
            return StiToolbarOptions;
        }());
        Viewer.StiToolbarOptions = StiToolbarOptions;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        (function (StiContentAlignment) {
            StiContentAlignment[StiContentAlignment["Left"] = 0] = "Left";
            StiContentAlignment[StiContentAlignment["Center"] = 1] = "Center";
            StiContentAlignment[StiContentAlignment["Right"] = 2] = "Right";
            StiContentAlignment[StiContentAlignment["Default"] = 3] = "Default";
        })(Viewer.StiContentAlignment || (Viewer.StiContentAlignment = {}));
        var StiContentAlignment = Viewer.StiContentAlignment;
        (function (StiInterfaceType) {
            StiInterfaceType[StiInterfaceType["Auto"] = 0] = "Auto";
            StiInterfaceType[StiInterfaceType["Mouse"] = 1] = "Mouse";
            StiInterfaceType[StiInterfaceType["Touch"] = 2] = "Touch";
        })(Viewer.StiInterfaceType || (Viewer.StiInterfaceType = {}));
        var StiInterfaceType = Viewer.StiInterfaceType;
        (function (StiChartRenderType) {
            StiChartRenderType[StiChartRenderType["Vector"] = 2] = "Vector";
            StiChartRenderType[StiChartRenderType["AnimatedVector"] = 3] = "AnimatedVector";
        })(Viewer.StiChartRenderType || (Viewer.StiChartRenderType = {}));
        var StiChartRenderType = Viewer.StiChartRenderType;
        (function (StiPrintDestination) {
            StiPrintDestination[StiPrintDestination["Default"] = 0] = "Default";
            StiPrintDestination[StiPrintDestination["Pdf"] = 1] = "Pdf";
            StiPrintDestination[StiPrintDestination["Direct"] = 2] = "Direct";
            StiPrintDestination[StiPrintDestination["WithPreview"] = 3] = "WithPreview";
        })(Viewer.StiPrintDestination || (Viewer.StiPrintDestination = {}));
        var StiPrintDestination = Viewer.StiPrintDestination;
        (function (StiWebViewMode) {
            StiWebViewMode[StiWebViewMode["OnePage"] = 0] = "OnePage";
            StiWebViewMode[StiWebViewMode["WholeReport"] = 1] = "WholeReport";
            StiWebViewMode[StiWebViewMode["MultiPage"] = 2] = "MultiPage";
        })(Viewer.StiWebViewMode || (Viewer.StiWebViewMode = {}));
        var StiWebViewMode = Viewer.StiWebViewMode;
        (function (StiShowMenuMode) {
            StiShowMenuMode[StiShowMenuMode["Click"] = 0] = "Click";
            StiShowMenuMode[StiShowMenuMode["Hover"] = 1] = "Hover";
        })(Viewer.StiShowMenuMode || (Viewer.StiShowMenuMode = {}));
        var StiShowMenuMode = Viewer.StiShowMenuMode;
        (function (StiZoomMode) {
            StiZoomMode[StiZoomMode["PageWidth"] = -1] = "PageWidth";
            StiZoomMode[StiZoomMode["PageHeight"] = -2] = "PageHeight";
        })(Viewer.StiZoomMode || (Viewer.StiZoomMode = {}));
        var StiZoomMode = Viewer.StiZoomMode;
        (function (StiExportAction) {
            StiExportAction[StiExportAction["ExportReport"] = 1] = "ExportReport";
            StiExportAction[StiExportAction["SendEmail"] = 2] = "SendEmail";
        })(Viewer.StiExportAction || (Viewer.StiExportAction = {}));
        var StiExportAction = Viewer.StiExportAction;
        (function (StiFirstDayOfWeek) {
            StiFirstDayOfWeek[StiFirstDayOfWeek["Monday"] = 0] = "Monday";
            StiFirstDayOfWeek[StiFirstDayOfWeek["Sunday"] = 1] = "Sunday";
        })(Viewer.StiFirstDayOfWeek || (Viewer.StiFirstDayOfWeek = {}));
        var StiFirstDayOfWeek = Viewer.StiFirstDayOfWeek;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiEmailSettings = (function () {
            function StiEmailSettings() {
                this._email = null;
                this._subject = null;
                this._message = null;
            }
            Object.defineProperty(StiEmailSettings.prototype, "email", {
                get: function () {
                    return this._email;
                },
                set: function (value) {
                    this._email = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiEmailSettings.prototype, "subject", {
                get: function () {
                    return this._subject;
                },
                set: function (value) {
                    this._subject = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiEmailSettings.prototype, "message", {
                get: function () {
                    return this._message;
                },
                set: function (value) {
                    this._message = value;
                },
                enumerable: true,
                configurable: true
            });
            StiEmailSettings.prototype.toJsonObject = function () {
                return {
                    email: this.email,
                    subject: this.subject,
                    message: this.message
                };
            };
            return StiEmailSettings;
        }());
        Viewer.StiEmailSettings = StiEmailSettings;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var StiCsvExportSettings = Stimulsoft.Report.Export.StiCsvExportSettings;
        var StiCsvExportService = Stimulsoft.Report.Export.StiCsvExportService;
        var StiHtmlChartType = Stimulsoft.Report.Export.StiHtmlChartType;
        var StiWord2007ExportService = Stimulsoft.Report.Export.StiWord2007ExportService;
        var StiWord2007ExportSettings = Stimulsoft.Report.Export.StiWord2007ExportSettings;
        var ColorTranslator = Stimulsoft.System.Drawing.ColorTranslator;
        var TextWriter = Stimulsoft.System.IO.TextWriter;
        var StiHtmlExportService = Stimulsoft.Report.Export.StiHtmlExportService;
        var StiHtmlTextWriter = Stimulsoft.Report.Export.StiHtmlTextWriter;
        var StiHtmlExportSettings = Stimulsoft.Report.Export.StiHtmlExportSettings;
        var StiPagesRange = Stimulsoft.Report.StiPagesRange;
        var StiRangeType = Stimulsoft.Report.StiRangeType;
        var StiHtmlExportMode = Stimulsoft.Report.Export.StiHtmlExportMode;
        var StiHtmlExportQuality = Stimulsoft.Report.Export.StiHtmlExportQuality;
        var StiHtmlExportBookmarksMode = Stimulsoft.Report.Export.StiHtmlExportBookmarksMode;
        var StiBrush = Stimulsoft.Base.Drawing.StiBrush;
        var StiExportFormat = Stimulsoft.Report.StiExportFormat;
        var StiGZipHelper = Stimulsoft.Base.StiGZipHelper;
        var StiPdfExportSettings = Stimulsoft.Report.Export.StiPdfExportSettings;
        var StiPdfExportService = Stimulsoft.Report.Export.StiPdfExportService;
        var MemoryStream = Stimulsoft.System.IO.MemoryStream;
        var StiExcel2007ExportService = Stimulsoft.Report.Export.StiExcel2007ExportService;
        var StiExcelExportSettings = Stimulsoft.Report.Export.StiExcelExportSettings;
        var Promise = Stimulsoft.System.Promise;
        var StiViewer = (function () {
            function StiViewer(options, viewerId, renderAfterCreate) {
                this.drillDownReportCache = {};
                this.onBeginProcessData = null;
                this.onEndProcessData = null;
                this.onPrintReport = null;
                this.onBeginExportReport = null;
                this.onEndExportReport = null;
                this.onEmailReport = null;
                this.onDesignReport = null;
                this.reportCache = {};
                this._visible = true;
                this._options = options || new Viewer.StiViewerOptions();
                this._viewerId = viewerId || "StiViewer";
                this._options.viewerId = this._viewerId;
                this._renderAfterCreate = renderAfterCreate !== undefined ? renderAfterCreate : true;
                if (this._renderAfterCreate)
                    this.renderHtml();
            }
            Object.defineProperty(StiViewer.prototype, "viewerId", {
                get: function () {
                    return this._viewerId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "jsObject", {
                get: function () {
                    return this._jsObject;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "currentReportGuid", {
                get: function () {
                    return this._currentReportGuid;
                },
                set: function (value) {
                    this._currentReportGuid = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "reportTemplate", {
                get: function () {
                    var templateReportGuid = this.currentReportGuid.split("|")[0];
                    return this.reportCache[templateReportGuid];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "report", {
                get: function () {
                    if (this.currentReportGuid == null)
                        return null;
                    return this.reportCache[this.currentReportGuid];
                },
                set: function (value) {
                    this.currentReportGuid = null;
                    this.reportCache = {};
                    if (value != null) {
                        this.reportCache[value.reportGuid] = value;
                        this.currentReportGuid = value.reportGuid;
                    }
                    if (this.jsObject)
                        this.jsObject.assignReport(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StiViewer.prototype, "visible", {
                get: function () {
                    return this._visible;
                },
                set: function (value) {
                    this._visible = value;
                    if (this._jsObject)
                        this._jsObject.controls.viewer.style.display = value ? String.empty : "none";
                },
                enumerable: true,
                configurable: true
            });
            StiViewer.prototype.renderHtml = function (element) {
                if (element && typeof element == "string")
                    element = document.getElementById(element);
                var width = String.isNullOrEmpty(this.options.width) ? "100%" : this.options.width;
                var height = String.isNullOrEmpty(this.options.height) ? (this.options.appearance.scrollbarsMode ? "600px" : "100%") : this.options.height;
                var backgroundColor = String.stiFormat("#{0:X2}{1:X2}{2:X2}", this.options.appearance.backgroundColor.r, this.options.appearance.backgroundColor.g, this.options.appearance.backgroundColor.b);
                var html = "<div style='width: " + width + "; height: " + height + "; background: " + backgroundColor + ";";
                if (!this.visible)
                    html += " display: none;";
                html += "' id='" + this.viewerId + "'><div id='" + this.viewerId + "_JsViewerMainPanel' class='stiJsViewerMainPanel'></div></div>";
                if (element && element["innerHTML"] !== undefined)
                    element["innerHTML"] = html;
                else
                    document.write(html);
                var parameters = this.options.toParameters();
                parameters["loc"] = Viewer.StiCollectionsHelper.GetLocalizationItems();
                this._jsObject = new StiJsViewer(parameters);
                this._jsObject.viewer = this;
                Stimulsoft.System.StiError.errorMessageForm = Stimulsoft.System.StiError.errorMessageForm || this.jsObject.controls.forms.errorMessageForm || this.jsObject.InitializeErrorMessageForm();
                this.jsObject.assignReport = function (report) {
                    var _this = this;
                    if (this.viewer.report != null) {
                        this.viewer.report.onBeginProcessData = null;
                        this.viewer.report.onEndProcessData = null;
                    }
                    this.viewer.drillDownReportCache = {};
                    if (report) {
                        this.controls.processImage.show();
                        var jsObject = this;
                        report.onBeginProcessData = function (args, callback) {
                            _this.viewer.invokeBeginProcessData(args, callback);
                        };
                        report.onEndProcessData = function (args) {
                            _this.viewer.invokeEndProcessData(args);
                        };
                        var showReport_1 = function () {
                            _this.options.isParametersReceived = false;
                            _this.options.paramsVariables = null;
                            _this.controls.drillDownPanel.reset();
                            setTimeout(function () {
                                _this.reportParams.reportGuid = report.reportGuid;
                                _this.reportParams.paramsGuid = null;
                                _this.reportParams.drillDownGuid = null;
                                _this.reportParams.drillDownParameters = [];
                                _this.reportParams.pageNumber = 0;
                                _this.reportParams.pagesCount = report.renderedPages.count;
                                if (_this.reportParams.zoom == Stimulsoft.Viewer.StiZoomMode.PageWidth || _this.reportParams.zoom == Stimulsoft.Viewer.StiZoomMode.PageHeight) {
                                    _this.reportParams.autoZoom = _this.options.toolbar.zoom;
                                    _this.reportParams.zoom = 100;
                                }
                                _this.postAction(null);
                            }, 50);
                        };
                        if (!report.isRendered) {
                            report.renderAsync(function () {
                                showReport_1();
                            });
                        }
                        else {
                            showReport_1();
                        }
                    }
                };
                this.jsObject.getReportParameters = function (requestParams) {
                    if (this.viewer.report != null) {
                        this.viewer.currentReportGuid = !String.isNullOrEmpty(requestParams.reportGuid) ? requestParams.reportGuid : this.viewer.report.reportGuid;
                        if (!String.isNullOrEmpty(requestParams.drillDownGuid))
                            this.viewer.currentReportGuid += "|" + requestParams.drillDownGuid;
                        Viewer.StiEditableFieldsHelper.applyEditableFieldsToReport(this.viewer.report, requestParams.editableParameters);
                        if (requestParams.action == "DrillDown")
                            requestParams.pageNumber = 0;
                        if (requestParams.action == "Variables" || requestParams.action == "Collapsing")
                            requestParams.pageNumber = Math.min(requestParams.pageNumber, this.viewer.report.renderedPages.count - 1);
                    }
                    var parameters = {};
                    parameters["action"] = requestParams.action;
                    parameters["pagesArray"] = this.viewer.getPagesArray(this.viewer.report, {
                        viewMode: requestParams.viewMode,
                        multiPageWidthCount: requestParams.multiPageWidthCount,
                        multiPageHeightCount: requestParams.multiPageHeightCount,
                        multiPageContainerWidth: requestParams.multiPageContainerWidth,
                        multiPageContainerHeight: requestParams.multiPageContainerHeight,
                        multiPageMargins: requestParams.multiPageMargins,
                        pageNumber: requestParams.pageNumber,
                        zoom: requestParams.zoom,
                        openLinksTarget: this.options.appearance.openLinksTarget
                    }, requestParams);
                    if (requestParams.action != "GetPages") {
                        parameters["pagesCount"] = 0;
                        if (this.viewer.report != null) {
                            parameters["reportGuid"] = this.viewer.report.reportGuid;
                            parameters["isEditableReport"] = Viewer.StiEditableFieldsHelper.checkEditableReport(this.viewer.report);
                            parameters["pagesCount"] = this.viewer.report.renderedPages.count;
                            parameters["reportFileName"] = this.viewer.getReportFileName();
                            parameters["interactionCollapsingStates"] = this.viewer.report.interactionCollapsingStates;
                        }
                        parameters["paramsGuid"] = requestParams.paramsGuid;
                        parameters["drillDownGuid"] = requestParams.drillDownGuid;
                        parameters["zoom"] = requestParams.zoom;
                        parameters["viewMode"] = requestParams.viewMode;
                        if (requestParams.action == "DrillDown")
                            parameters["drillDownParameters"] = requestParams.drillDownParameters;
                        if (this.viewer.report.bookmark != null && this.viewer.report.bookmark.bookmarks.count > 0)
                            parameters["bookmarksContent"] = Viewer.StiReportHelper.getBookmarksContent(this.viewer.report, requestParams.viewerId, requestParams.viewMode == "OnePage" ? requestParams.pageNumber : -1);
                    }
                    return parameters;
                };
                this.jsObject.postAjax = function (data) {
                    var _this = this;
                    var params = this.createPostParameters(data, true);
                    var jsonParams = Stimulsoft.System.Convert.fromBase64StringText(params["jsviewer_parameters"]);
                    var requestParams = JSON.parse(jsonParams);
                    requestParams["action"] = params["jsviewer_action"];
                    var serverParams = this.getReportParameters(requestParams);
                    setTimeout(function () { _this.showReportPage(serverParams, _this); }, 50);
                };
                this.jsObject.postDesign = function () {
                    this.controls.processImage.show();
                    this.viewer.invokeDesignReport();
                    this.controls.processImage.hide();
                };
                this.jsObject.postEmail = function (format, settingsObject) {
                    this.postExport(format, settingsObject, Viewer.StiExportAction.SendEmail);
                };
                this.jsObject.postExport = function (format, settingsObject, action) {
                    var exportFormat = StiExportFormat[format];
                    var emailSettings = null;
                    if (action == Viewer.StiExportAction.SendEmail) {
                        emailSettings = new Viewer.StiEmailSettings();
                        emailSettings.email = settingsObject.Email;
                        emailSettings.message = settingsObject.Message;
                        emailSettings.subject = settingsObject.Subject;
                    }
                    var viewer = this.viewer;
                    switch (exportFormat) {
                        case StiExportFormat.Document: {
                            var fileName = viewer.getReportFileName();
                            var args = viewer.invokeBeginExportReport(null, exportFormat, fileName);
                            if (args != null) {
                                if (args.preventDefault)
                                    break;
                                fileName = args.fileName;
                            }
                            var snapshot = viewer.report.saveDocumentToJsonString();
                            args = viewer.invokeEndExportReport(exportFormat, fileName, snapshot);
                            if (args != null) {
                                if (args.preventDefault)
                                    break;
                                fileName = args.fileName;
                            }
                            if (settingsObject.Format == "Mdz") {
                                var buffer = StiGZipHelper.pack(Stimulsoft.System.Text.Encoding.UTF8.getBytes(snapshot));
                                Object.saveAs(buffer, fileName + ".mdz");
                            }
                            else {
                                Object.saveAs(snapshot, fileName + ".mdc", "application/json;charset=utf-8");
                            }
                            break;
                        }
                        case StiExportFormat.Html: {
                            var settings = new StiHtmlExportSettings();
                            settings.useWatermarkMargins = false;
                            settings.exportMode = viewer.options.appearance.htmlRenderMode;
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_1 = viewer.getReportFileName();
                            var args_1 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_1);
                            if (args_1 != null) {
                                if (args_1.preventDefault)
                                    break;
                                fileName_1 = args_1.fileName;
                            }
                            var service = new StiHtmlExportService();
                            var textWriter_1 = new TextWriter();
                            var htmlTextWriter = new StiHtmlTextWriter(textWriter_1);
                            service.exportToAsync(function () {
                                var html = textWriter_1.getStringBuilder().toString();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_1, html);
                                    return;
                                }
                                args_1 = viewer.invokeEndExportReport(exportFormat, fileName_1, html);
                                if (args_1 != null) {
                                    if (args_1.preventDefault)
                                        return;
                                    fileName_1 = args_1.fileName;
                                }
                                Object.saveAs(html, fileName_1 + ".html", "text/html;charset=utf-8");
                            }, viewer.report, htmlTextWriter, settings);
                            break;
                        }
                        case StiExportFormat.Html5: {
                            var settings = new StiHtmlExportSettings();
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_2 = viewer.getReportFileName();
                            var args_2 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_2);
                            if (args_2 != null) {
                                if (args_2.preventDefault)
                                    break;
                                fileName_2 = args_2.fileName;
                            }
                            var service = new StiHtmlExportService();
                            var textWriter_2 = new TextWriter();
                            var htmlTextWriter = new StiHtmlTextWriter(textWriter_2);
                            service.exportToAsync(function () {
                                var html = textWriter_2.getStringBuilder().toString();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_2, html);
                                    return;
                                }
                                args_2 = viewer.invokeEndExportReport(exportFormat, fileName_2, html);
                                if (args_2 != null) {
                                    if (args_2.preventDefault)
                                        return;
                                    fileName_2 = args_2.fileName;
                                }
                                Object.saveAs(html, fileName_2 + ".html", "text/html;charset=utf-8");
                            }, viewer.report, htmlTextWriter, settings);
                            break;
                        }
                        case StiExportFormat.Pdf: {
                            var settings = new StiPdfExportSettings();
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_3 = viewer.getReportFileName();
                            var args_3 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_3);
                            if (args_3 != null) {
                                if (args_3.preventDefault)
                                    break;
                                fileName_3 = args_3.fileName;
                            }
                            var service = new StiPdfExportService();
                            var stream_1 = new MemoryStream();
                            service.exportToAsync(function () {
                                var data = stream_1.toArray();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_3, data);
                                    return;
                                }
                                args_3 = viewer.invokeEndExportReport(exportFormat, fileName_3, data);
                                if (args_3 != null) {
                                    if (args_3.preventDefault)
                                        return;
                                    fileName_3 = args_3.fileName;
                                }
                                Object.saveAs(data, fileName_3 + ".pdf", "application/pdf");
                            }, viewer.report, stream_1, settings);
                            break;
                        }
                        case StiExportFormat.Excel2007: {
                            var settings = new StiExcelExportSettings();
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_4 = viewer.getReportFileName();
                            var args_4 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_4);
                            if (args_4 != null) {
                                if (args_4.preventDefault)
                                    break;
                                fileName_4 = args_4.fileName;
                            }
                            var service = new StiExcel2007ExportService();
                            var stream_2 = new MemoryStream();
                            service.exportToAsync(function () {
                                var data = stream_2.toArray();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_4, data);
                                    return;
                                }
                                args_4 = viewer.invokeEndExportReport(exportFormat, fileName_4, data);
                                if (args_4 != null) {
                                    if (args_4.preventDefault)
                                        return;
                                    fileName_4 = args_4.fileName;
                                }
                                Object.saveAs(data, fileName_4 + ".xlsx", "application/xlsx");
                            }, viewer.report, stream_2, settings);
                            break;
                        }
                        case StiExportFormat.Word2007: {
                            var settings = new StiWord2007ExportSettings();
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_5 = viewer.getReportFileName();
                            var args_5 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_5);
                            if (args_5 != null) {
                                if (args_5.preventDefault)
                                    break;
                                fileName_5 = args_5.fileName;
                            }
                            var service = new StiWord2007ExportService();
                            var stream_3 = new MemoryStream();
                            service.exportToAsync(function () {
                                var data = stream_3.toArray();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_5, data);
                                    return;
                                }
                                args_5 = viewer.invokeEndExportReport(exportFormat, fileName_5, data);
                                if (args_5 != null) {
                                    if (args_5.preventDefault)
                                        return;
                                    fileName_5 = args_5.fileName;
                                }
                                Object.saveAs(data, fileName_5 + ".docx", "application/xlsx");
                            }, viewer.report, stream_3, settings);
                            break;
                        }
                        case StiExportFormat.Csv: {
                            var settings = new StiCsvExportSettings();
                            Viewer.StiExportsHelper.applyExportSettings(exportFormat, settingsObject, settings);
                            var fileName_6 = viewer.getReportFileName();
                            var args_6 = viewer.invokeBeginExportReport(settings, exportFormat, fileName_6);
                            if (args_6 != null) {
                                if (args_6.preventDefault)
                                    break;
                                fileName_6 = args_6.fileName;
                            }
                            var service = new StiCsvExportService();
                            var stream_4 = new MemoryStream();
                            service.exportToAsync(function () {
                                var data = stream_4.toArray();
                                if (action == Viewer.StiExportAction.SendEmail) {
                                    viewer.invokeEmailReport(emailSettings, exportFormat, fileName_6, data);
                                    return;
                                }
                                args_6 = viewer.invokeEndExportReport(exportFormat, fileName_6, data);
                                if (args_6 != null) {
                                    if (args_6.preventDefault)
                                        return;
                                    fileName_6 = args_6.fileName;
                                }
                                Object.saveAs(data, fileName_6 + ".csv", "application/csv");
                            }, viewer.report, stream_4, settings);
                            break;
                        }
                    }
                };
                this.jsObject.postPrint = function (action) {
                    var viewer = this.viewer;
                    var args = viewer.invokePrintReport(action);
                    if (args == null || !args.preventDefault) {
                        var report = viewer.report;
                        if (args != null)
                            report = args.report;
                        switch (action) {
                            case "PrintPdf":
                                report.printToPdf(null);
                                break;
                            case "PrintWithPreview":
                                var htmlSettings = new StiHtmlExportSettings();
                                var htmlService = new StiHtmlExportService();
                                var textWriter_3 = new TextWriter();
                                var htmlTextWriter = new StiHtmlTextWriter(textWriter_3);
                                htmlSettings.exportMode = viewer.options.appearance.htmlRenderMode;
                                htmlSettings.useWatermarkMargins = false;
                                htmlSettings.removeEmptySpaceAtBottom = false;
                                htmlService.exportToAsync(function () {
                                    var html = textWriter_3.getStringBuilder().toString();
                                    var blob = new Blob([html], { type: "text/html" });
                                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                        var fileName = viewer.getReportFileName();
                                        window.navigator.msSaveOrOpenBlob(blob, fileName + ".html");
                                    }
                                    else {
                                        var fileURL = URL.createObjectURL(blob);
                                        window.open(fileURL);
                                    }
                                }, report, htmlTextWriter, htmlSettings);
                                break;
                            case "PrintWithoutPreview":
                                report.print(null, viewer.options.appearance.htmlRenderMode);
                                break;
                        }
                    }
                };
                this.jsObject.postInteraction = function (params) {
                    var viewer = this.viewer;
                    var report = viewer.report;
                    if (report != null) {
                        if (params.action == "InitVars") {
                            if (params.variables)
                                Viewer.StiVariablesHelper.applyReportBindingVariables(viewer.report, params.variables);
                            var paramsVariables = (!viewer.report.isDocument ? Viewer.StiVariablesHelper.getVariables(viewer.report) : null);
                            this.initializeParametersPanel(paramsVariables, this);
                        }
                        if (params.action == "Variables" || params.action == "Sorting" || params.action == "Collapsing") {
                            viewer.jsObject.controls.processImage.show();
                            setTimeout(function () {
                                Viewer.StiVariablesHelper.applyReportParameters(report, params.variables);
                                if (!report.isRendered) {
                                    report.renderAsync(function () {
                                        viewer.jsObject.postAjax(params);
                                    });
                                }
                            }, 50);
                        }
                        if (params.action == "Sorting") {
                            viewer.jsObject.controls.processImage.show();
                            setTimeout(function () {
                                Viewer.StiReportHelper.applySorting(report, params.sortingParameters);
                                if (!report.isRendered) {
                                    report.renderAsync(function () {
                                        viewer.jsObject.postAjax(params);
                                    });
                                }
                            }, 50);
                        }
                        else if (params.action == "Collapsing") {
                            viewer.jsObject.controls.processImage.show();
                            setTimeout(function () {
                                Viewer.StiReportHelper.applyCollapsing(report, params.collapsingParameters);
                                if (!report.isRendered) {
                                    report.renderAsync(function () {
                                        viewer.jsObject.postAjax(params);
                                    });
                                }
                            }, 50);
                        }
                        if (params.action == "DrillDown") {
                            viewer.jsObject.controls.processImage.show();
                            params.drillDownParameters = this.reportParams.drillDownParameters.concat(params.drillDownParameters);
                            params.drillDownGuid = hex_md5(JSON.stringify(params.drillDownParameters));
                            setTimeout(function () {
                                var newReportTemplate = Viewer.StiReportHelper.cloneReport(viewer.reportTemplate);
                                var newReport = viewer.report;
                                var index = 0;
                                var next = function () {
                                    newReport = Viewer.StiReportHelper.applyDrillDown(newReportTemplate, newReport, params.drillDownParameters[index]);
                                    newReport.isRendered = false;
                                    newReport.isInteractionRendering = true;
                                    newReport.renderAsync(function () {
                                        newReport.isInteractionRendering = false;
                                        if (index < params.drillDownParameters.length - 1) {
                                            index++;
                                            next();
                                        }
                                        else {
                                            viewer.reportCache[newReport.reportGuid + "|" + params.drillDownGuid] = newReport;
                                            viewer.jsObject.postAjax(params);
                                        }
                                    });
                                };
                                next();
                            }, 50);
                        }
                    }
                };
                this.jsObject.controls.aboutPanel.style.backgroundImage = "url(data:image/png;base64," +
                    "iVBORw0KGgoAAAANSUhEUgAAAZAAAAD6CAYAAACPpxFEAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIABJREFUeNrtnQuMZmV5x0kBL8Wl" +
                    "XCoK2BAMcVmEcrVg2zS1sTEkRKKREo1J09YgJjbGJoao26CEttoStUjaeol4waAoUtS6tSiWcjEo7ux92Rs738zuzuzM7lx2duab7/r2e77l7J45c+7nPee87zm/f/IPZOe7nvN+z++87/Oe5zlNIYQQ" +
                    "QgnU6/XU0uKiOo1DgRBCKK663a5aHMBj8fhxAIIQQiieOu32EByOAQhCCKFItVqtFfAAIAghhELV7/dVs9lcBQ8AghBCKBgekixfWvKFBwBBCCHkq163O9xpFQQPAIIQQmiVOp1OKDgACEIIoVVq+yTL" +
                    "AQhCCKFg9ftqOSBZbhRAGo2Gevrpp9W3v/3tk/75z38+/Hc/jYyMrHhsHB89enTV8zds2BD6mb73ve8Nt6pllXy3sPeSz+b3OcPkfo7fZ0zzmlnPS9zXlOP/+OOPrzpH8tryt4WFhcSvmWQsbN++PfMY" +
                    "iquo15TjK58n6jvv2bMn8eedmJhI9Hz5HOK0kveQ5we9tvy96OMnYyrpcfNKXtv7vSQ2xDlvmfTrO5T6zmmn/Iu3Bz92YZ9SOz6z8vE/OPfEv8nfErOjr5ohyXJjABL1Q5YBUgZAnAEjj80iCe4y2MQ2" +
                    "ASTNeYkKLnK8454v+eHH/dw2A8TtsABbBEAcC9yTfFc5njK+47y2PC4JSLIev6wAiTO2skBXC0DGHln5OD8LSGLKKUuSFB6FA8RNdXegFqq7T7z8f9wgEhaokwDEeUzWWYg7UAW9jmkA0Xle/H7Ezz//" +
                    "vO+PXd7X+9g4P073jzztbCvpGMojAIqDZndFAsQ5BlFX1/L3JBcF3guEOL+rrMcvC0CSXJjImC4FIHHg4VheL0LdmMlyIwDiLGMEBQl38I0KJLoB4l66SXuF4cw+ooKbaQDReV7cASburMULqqjnVQkg" +
                    "cuxNAEhUUJTjHHfWEfZdoyCV9fhlAYjfMmvc410YQH78xvgAEU8+Efh2bU9ZEqMBIgMnzo9eBkCSq1BdAHEPnqAfdZIr+bCrS5MAovO8uH+8afImQTMhmwHiDjJy3rw5pqBj5QeApEuIUUs1fgHTb2zJ" +
                    "GAmCh5wz7zmQ7yww8nu8/AbDZiK6jl/QbzLot+3+/fiNQTmezjGQ/2qHRxyAzLywGhCb7zr1971fOpEHcfIhIfBYXl7ODI/SAKLj4OsGiDM4nB9VmgSg81zntYICrqkAyXJe3D/ULEn3OK9jK0CCrnT9" +
                    "xkneAHECfZzP63dVH2dJSs6N35JX2ExH1/FLChC/Y+GdLcn3ke+dWyI9CiACBC9AvAlzgYw8LyCRnjZZbtQSVtZEtW6AeINoFGzCBqpcITk/uKDvaeoSVtrz4l6607E27By/oHNgO0D8ckRlACTO5/UL" +
                    "rEk2VMjY8INIUBDWdfx0zEByS5brnIEUlCw3Lome5go/L4A4PxLntZwBmuRK2gnCMhCd6XvQD83kJHqa8+I8X9c2aPd38TsHtgPEG1DLmoH4BU3v5/UGaxnnSc+x3xJYUNDXdfySAiQoB1IoRNLmQGJA" +
                    "xN3Dw1qAeAdklpmIToA4Pzbn785rx9115Dzeeb4zaIPez8RtvFnOi/NcnTtTnCDh95o250D8cgNl5ECClpfcY0v+P8nW4zi/QfeurzyPXxqABO3CSrqFPVeABO3Ceva2wJftaEiWG3UjoXdraJo1RZ0A" +
                    "cS8/+c0o4gY7ZyA7P96gz2bqjYRpz4tzdZl1Vhn3nKW5D6QsgMTZPut3Pk3YheV3nNPOMP1mO37jVNfxSwMQP9C5k/+53kQYFyAiSZz7QeSn16/KfbQ0JcuNK2XivpJIerORboA4n8V95e0HlbDlL/fA" +
                    "dK8b6wr2RQAkzXmJu4sry7JYlQFiyn0gfltskwbfpMfG77vrOn5ZvkMQRHLbfZUUIGEQeXn3VVgPj0oAxBnk7rXRJEsgOgHiXHl7g6VzR3nYFY6zrdAdpNxTf7+gajJAkp4Xne8b9/xW4T4Qec+w4Fck" +
                    "QIKurvMGiN/Fia7jl/U7BJVo0T3TTg0QkbeUicvtnQ/kDg8jiinKwHUnr+KuN+oEiPP+3qsL53lRu6n8BqUTgP0GuekASXJe8gJI3BmIjQCJc6FUBEBkXIcFQ1NnIEkuNLN8BzmeQfe/5AKRpAARydZe" +
                    "594Pj1s77q8+QJwrdndCL84A0QUQ92zBexXmrmvlF7T9lr68eRG/5RMbAJLkvITBMu8ciOkAcYp0Jk3KFrWNN87xKTMHkvb46YJgWPkW7TmRNAAZfsh9J/IfPhBZmtpafYA4wcp9xRsVGHQBxBnYQa/j" +
                    "t0QVBy7O8/zgYgtA4p4X5+/swvLfReS3HBK1lm4CQHTuwvKrbpvn8dM9i/K7mVL77qy0AHn5XHV/9rZVAOk+9a56AMSZMsadhegCiPM6UTcYef/uvGbQ53T+7jfIonIkUcemSIDEOS/OjzTrEoffd/EL" +
                    "FLYBxAvhOFvETQCIX+DUdR9IUPDVdfzyWIbzzkR0jpvUAPH08OhtuHbFa/QfPac+AHFfzUadaF0AcQZY2IB0Bo776sv5QQQFsLB7QdwAiXsllcfWYF3nxX0nuo4br6p4J7pfQA8796YAxO91dNyJHvTd" +
                    "dR2/tACRWBF0Uei3pKd1GcsLkKB7O2QH1uCxfmVJlvd8q9BlrMIAIicyTnkQZ+mnKIBEzSTc7+W9UTDshxT1+aIq4AZ9ziDQpQWIrvPi/qHqqqkV9Dq23kiY5CraFIAELd/EqYUVlD8I+93oOn5JAeLN" +
                    "tcS9uTNVTqg1cwIOUprELZlxhJVjl5sIXQnz1gAW3oAuifNVAJk9YDdA3Ac+ag3VGSRRg0MXQIJyHEGfy13FNCxp7A7oflcpTgI+TvCOc4WfBiC6z4sTaOJusQz7sYedD1sBkuQq2iSAhFXjld+WX/2s" +
                    "oHspopbAdB2/JADxS/B7x6BfMt/vtdzQ9N0e7U14O2VI5N+9u6ncJUr86mDJdt3N96yYfciS1YolrB9eWo0lLHdwiVr2ibOjRxdAvHeRRw1EZxBFBf6oZSr3oI3K9zjHLuzHl3YGovu8pCmJIt/J/by4" +
                    "+S8ba2F5r6KL7AeSNS+lox9I1PnSdfySzkDSdKz0u8jxztZWXHAJBJL085AZh3fpKkkvEA9grAaINxHmPvgyqNx1/uOsseoCSFQuw++xcbesRpWGdw9u+WzeAeksL8V5z7QA0X1evD8iOWZy/P0+u7yX" +
                    "t79D1ToSegOgX2D3Gx+mAcQZD0mbLiUtBaLr+KXJgSRpRhV0ARnZMCxgu61vWRKPpIeH306rIEtCvVL3gcRpiVnkjYTuMhxx1jKd14m7k8MZkGFBMU6giLMkFDQND7L7++o8L+7vlSTYpO2JXoVy7n7j" +
                    "yUSApL1aT7KxQtfxSwMQ95J22va8oTMQR95kudcyS3HVtPImy2VrbhQ8BDR55j5K3YXl1wtbTlySdXMdAPGWcY8DwCQ/CCfPEef+CPmM3iAugz3uMlAWgOg8L37nSb6DH0zkveRvSXey2A4Qvx4b3qto" +
                    "kwHiHi9BMJF/T7MjT9fxSwuQsByO/I6jfgvui7HQgqSynOUtRSI5EPk3SbK/rKAeHsujP1LtX//dKnB0nvvrYS6kiDImRm7jRQghpFS308mlhwcAQQihCqudYw8PAIIQQhVV3j08AAhCCFVMRfXwACAI" +
                    "IVQleEiy3FOWBIAghBAKVbfb9d1pBUAQQggFqmNJshyAIISQQZJ7sWyGBwBBCKGi5enhAUAQQgjFYMfqHh4ABCGEUKh6FifLAQhCCJWkjpQlqRA4AAhCCBWgdgWS5QAEIYQK1rJFZUkACELITvWbqt/a" +
                    "onqLG1Tv2EOqe+SuoTuTf6k6B28+4fEbVXv/GwItfz/52MHznNeQ15PXldeX9ynk61QsWQ5AEEIGqHsCFAKJo+tVZ+I9qt24MhQM2t1YN3xfeX/5HEOwDD6XLgX18AAgCCGU9Gp8+QXVm7t/MCt4r2qP" +
                    "XlYsLOJ68Lnk88nn7Dd/lR6PFU2WAxCEUDHAaG0bBOJ/Hy4jtRtrzQRG5Cxl7fDzy/c4MUOJVtvysiQABCFU2iyje+TjxS9HFQaUK4f5lKDZSaviyXIAghDSC43OmOrNfl51xt9aTWgEJuvfqrqz9w2/" +
                    "v409PAAIQqgc9Y4NE8/D5HeNoBHk1oFbVfPI19TiwkEAghBCvrON9l7Vnf6oao9eCjh8falanvhbtTS/FYAghNAQHK2dqjv1YQCRwMuH7lRLcxsBCEKoruDYorqHPwAQMoHkr9TS7DMABCFUE3A0f6k6" +
                    "k+8HAFrzJO8agOQXAAQhVFFwtHcDjrxBcvAv1NL8JgCCEKqIerMn7t/YfwlBvhBfopYnP1aZXVsABKG6smPh4WFdKIJ6GaVT1qnm9FcACELItuWqvdzHYQxIblbNmREAghCyYNYxd7+5BQ1r5u7Oc5X6" +
                    "zW8ptfGswUzw7kFAngcgCCED1Z0azDpuJ3Ab4t72NSfg4XJ359vU0tw+AIIQMmjJqvmMao9dS+A2wS9dpPpbXr0KHo77my9Uy4d/BEAQQqVPO4bFDtlhZUgRxr2vV/1NrwiEh9vt0U9YsaQFQBBiyQrn" +
                    "DY89Fyi18YxY8LBpSQuAIMSSFc4zWf7ieQMgnJ4IHieXtDZdYPSSFgBBqELqzT/IkpVRyfKzU4Fjpc9UrfHPARCEUI6rVjP3ErSNSZZfrHpbz9IAj1PuvHSncXkRAIKQ/WtWqjv1QYK2KfmOfReq/qZX" +
                    "aoXHybzI7nerxYVpAIIQ0rFmdZxkuWnJ8pEzcoGH496OP1KLxw4DEIRQFngcU51DtxK4TUmW7zpfqY2n5wqPkxDZ/ha1ND8OQBBCaRIeR1Tn4DsI3MaUJTmnEHCsgMi2awYQGQUgCKGEy1aHbiFwm5Is" +
                    "33ZW4fA4BZGrSp2JABCEbFK/Tc7DFO+7SPU3v6o0eLiXs8rKiQAQhGxauZr6MIHbiLIkr1P9kTNLh8dJiOz8k1J2ZwEQhKxJe3yc4G0CPHa/trBkeaItvrtuKfw+EQCCkA1pj7kHCN4m9fAw1J19dwAQ" +
                    "hJALHsceIniXbkmWrzEaHo5bB74AQBBCSvWXfkFtKxN6eBiQLE9SO2v58H8CEITqnfSYUu2xqwnglvTwMMlSxXdpbjcAQaim9FCdifcQxC3r4WGShyVPck6qAxCETMTHzGcJ4pb28DDJ7dG7AAhCtcp7" +
                    "SEMo8h6W9/CoRz4EgCBE3gO/XJakv+XVFYKHOx+yD4AgVP28B2VKqtbDw5g71XPIhwAQhAwRNwtWt4eHEfmQxnoAglAl8x7tvao9eikBvcI9PEr3xlep5swIAEGoaupMvIuAXnSyfMfv1AMcOW7tBSAI" +
                    "lb10deybBPSie3hsPat28DhZ6mT8cwAEoWrQY1a1G1cS1GvWw6NUj6zR1skQgCBUoijRXt8eHlWo2gtAECpJ/dY2bhiseQ+PMm8wbB59DoAgZKtInBfVw+McgBGYUAcgCNk3+xiWaSe459/D4zXAIsRZ" +
                    "y5wAEITKmH0cvJkATw+P8mch268DIAjZpN7iBgI8PTzMmYVMPgxAELJn9vF2Aj09PMyZhWy7KvXNhQAEoUJzHz8j0OeWLD83dQ+P+afPUE98aY26/+O/qz70vovV+2/9PfWmN70pluWxYnnuo587Rx34" +
                    "71daOAt5BIAgZPzso+JdBn/14zeqt77lutRO38NjTeKgueMHr1b3fuQC9c4/vyQ2LOL6+msuU3d94MIhUAROdlTrBSAImTv7GN738QYAohMgCXt4SDD/+r3nqT/9wzdqh0aYZVbz/LfMLp/SPPIMAEHI" +
                    "VHWnPgRANAIkSQ8PAYcsMcnMoEhweC3gMnVG0t19GwBByEx6HKlFufaiAJKkh4dc+Rc94whb2jL57vSknQsBCEIFqC7NoooASPfF82InyyXHYQI43EtZRjedGrsHgCBkmjoH/hiAaABIb/vZsZes8kiO" +
                    "Z7XkX4zun771MgCCkEnqN5+pzVba3ACSoIeHqfAQy84v47f0Tv0XAEHImPTH9EcBSBaAJOjhYTI8zM5/uEq973kfAEHIjOlHu1YNo3QDJGkPD8kxmAgPG/IfJ5exNp2vFhemAQhCpfOjZnee6wRId9f5" +
                    "iXp4SH7BVHjYkP9YWaX3UQCCUOnLV1MfBiApAJK0h4eUDyn7Ho8q5D9OLWPdDkAQKhkftet3nh0g6Xp4SNmQPIO/5FWcmldVzn+sXMaaASAIlbZ81fxl7QoaZgHITTdcm6qHh8w+dMNC7lqPKj0iCXt5" +
                    "jNS7iqqpZUv+I+kyFgBBKK/5x9FPA5CY/oPrr1HrLr88VaDTdbOgzC6y1qsSmEmuwwsTm/IfJ5exXroTgCBUlurY9yMNQG649mq1du3aYaBNE+h05D5kFqE7AAtMnKU1m/IfK/uEABCEil++6k7UsidH" +
                    "UoBce/VVKwJ50iAnMwYT4eEFia3NppZmXwQgCBWt3vEfApAI//6Vb14VzJMGOMlVZIGHPJ+uhCF5kIlvABCEis9/rAcgIcnyN1+xzjegJw1waXdFOTujbGj2ZHIeBIAglEv+42YA4uMbJVm+7vLAoJ40" +
                    "wGUp0y75CSARlQe5BoAgVPD61SCYXgJAQpLlugDC8lX+PUIWjx0GIAgVpTpV340LkOs8yXITAPLEl9YAiIzVeQEIQronIPNfBSAuX33VlbGDOjMQ89wa/wwAQago1al8exhAbrrhOnXlm69IFNSLBAg5" +
                    "kOzl3QEIQprVOXRL7QFy4/XXqivWrUsc1IsEiG31qUpLpG+/DoAgVJTajbW1BshbrrtaXR6RLDcBILaWGCncI2sACELFrF9N1RYeQ4A8dpFauzZ9QE8a3LJ2H5RZiI1lRgq/I31uHwBBKG/1l1+oLTyk" +
                    "h0fW0iJllHEHItFuTj8JQBDKW/UsYXKqh0fRAJE6Vrr6leddE6uKJU0ACEI6ATL3QL3gse+iFT08igaIlCLR3bfc5uKHebk9dg8AQSj3FEiNamB19r5O9UfO1FodN01w092NUGYjco8IdbKia2IBEIR0" +
                    "AmTqQ/WAx+7XKrXxdO3l1dMEN8lf5NHGFpCccnf3bQAEobzVmXxvDZLl5+bWnyNtgJOlp7z6oQtIZJZT56Wt7s63ARCEcgfIwXdUGh697WtybfCUpWmTjs6EcXIkWdveVqkqLwBBSCdAxm+sJjxeukj1" +
                    "t0RvdS0LIDp3ZMWx3H9Sp11b/c1vACAI5a12Y10Fk+WvV/1NryikxWzWQKc7oR5l6UdSB5D0R84BIAgBkITw2HOBUhvjJ5HLBoiOu9PTWDojVnlpC4AgVARAKtRIqvui1Ik6PVGgMQEgsmuqDIiI7/3I" +
                    "BRXdtXUmAEEof4BUJVl+dqpAYwJAHIgUvZzlXtaq4mwEgCCUq7oVSJZfrHpbfzt1kDEFII5lRlAGRKpY6Xfx+DwAQYgZSEC+Y9+Fqr8p270OpgFELK1ri9jiW/WmVcxAEAIgwcnykexr9yYCxFnSyvNm" +
                    "wzpABIAglDdALNyF1d11vm9ZkioBxD0bkRwFEGEXFkIAREMPD52BxnSAOJYaV0Uva0k+BoAghALVGbvBomS5/p1CtgDEWdYqGiQyA+JOdISQP0BsqIXl6eFRV4B4y6AUce+IwMrG+0SohYVQEQCZuN26" +
                    "Hh4AZOXnz/v+ERuXsqjGi1AB6k590LoeHgDEv7pvniCxrTR8d/e7AQhCuQPE0I6EYT08AEjxIJHci1UdCff9DQBBKG/15u43DB4Xq9621xS6BFQlgLi/l87tv/JaVvVEb9wNQBDKHSDHHzOrh0dOyfK6" +
                    "ASSP+lrSitcWgLQOPQhAEMpb/eUXrOvhAUCSWWpc1W0Zqzn9JABBKHeAdCes6+EBQMop0ig9RGz5vktzuwEIQkWo3VhrVQ8P3aVC6gAQsQCgFnmQjWf5wgOAIJSDyrqZsLe9/LucZVmmLgDJOtuy5fsG" +
                    "3UQIQBDKQd3pjxRelqS/xYyEbJ0AoqN9rhVbePe8D4AgVJR681+2qocHACkvF2LFDqzxzwAQhArLgSw8ZVUPD53O2nPDNoDUAZjLh38EQBAqQq3lZbW4IDuxLrGmh4cpSzryXNsAUv1NA2eqpflxAIJQ" +
                    "nur3+6rZbJ78YbXG/yzHZPnZxgacumxrrcsMpLftqkB4ABCEdMCj11NLS0srfljLkx+zpoeHKVfjNnbty3JnupR2N78G1h0ABKG81O121dLi4qofVvPod6zp4WFCMLWxwKA4S30sG2ZcrUNfBSAI5aFO" +
                    "ux34w1o6tseaHh666kRl7ewn91XYBA9pQlX1viBLsy8CEIR0q9Vqhf6wdOVBiujhYUIuQJy2U588r+guf/J+WavzCoBszn8AEIQSJzz6atmVLA/z8uF7MvbwOMeKK3GpKpsVHll2YEkgltmPQKwIkMh7" +
                    "6Gh/a3pr2/b+jwIQhPSxo6+anmR5mJdmNljRwyMrPLIuXWVdznHfzCefRXIxeZVKl9fVAQ+5X8b8+z8eBSAI6VBPdlr5JMtDvXBEtUcvM76HR9r2qnLFrwMeWfMfQQFdlpgELjpyK7o7E5q+fDUsoLgw" +
                    "DUAQypws73SSgcO9jHXoDuN7eDggkKti+X/ZjitB17vEIv8mf5NAqgscWavSymdMsutJvp8Eb7/v5wWGPEYer2PGYVsV3u7u22KNbwCCUIjaMZLlYW4efSxBsrycNfGsZcnLbKyU9d6TMmz87EOWryYf" +
                    "BiAIZdGylCXJAI9Ty1jrIpLl51pdUTaLZSaTJZmsY/dXkbbibvuRNbGWrwAIQhqS5dHLWHca3cPD1tmHCbOnpLBMm28qtnz77bHHNgBBKGuyPHI31v8Y28MjSQ7BtNlH2fCr4tJVVPVdAIJQgLoZkuXh" +
                    "nletsZuM7OGho6teWkv+wtbPXlV49LdcOhyvAAShJMnykLIkOtyc+qyRPTyyluMos4zH1+89D3jovnmwsT7RuAYgqPZq6UiWRy1jHdunui++dvAjNassSRlJaF1Vd7M2rwIePr0/5nYDEIRiJ8tjliXR" +
                    "4e6uWytXQbfMku0670XRbbnXI6+74XO792PXLYnHNABB9U2Wa9xpFWsZa/pJ44JGkbuYdJZrl91MpgKkqJpcui3jE4AgFJUs73bVouadVnHd23FTZfpZJLkaz6NUuwRpneVUdMyubNim61t5dzAu04xn" +
                    "AIJqpU7OyfLIe0ImH6lMC9o44CgiByAgkfcpIyci31EgZis4Tm7dnXgIgCAUmizPWJZE15be3tYrjGkCpfsudKcabtYtulm+k1OvK6877OV1ZReZbTmOwNnH1rWJtu4CEFS3bHnsHh6FzEIGV3umdRN0" +
                    "CgdK4JW8SJxlIXmMPFaeI1tqTQyozneTzydBXz5v3LyPgEIeK8+TYxNVgNHe2cc3Uo/l03bt3KkwxhjjpGYGghBCKJVOm5+fVxiX5ampKXXgwIFaemH0i2p5/ycwLsUy/rKOYQCCS/Pk5GRt4SGeHP8N" +
                    "gQyX5sPjvwYg2D7Pzc2pQ4cO1RoejucbDxLMcOGWcadj/AIQXKhnZmbUwYMHgcfLPjS+SzX3301Qw4VZxpuMOwCCrfLRo0eBho+Pjv2YwIYLs4w3XWMXgOBCPD09DSwCPa4WRr9AcMO5+/jo54fjDYBg" +
                    "a3z48GEgEZlQ36Sa+9cT5HCOS1frh+NM57gFIDjXZPnExASAiOmZxqMEOpybZXzpHrMABOfi2dlZkuWJ3eDeEJzTPR9fGI4vAIJJlld6V9ZOtTT6aYIe1mYZTzKu8hivAARr9ZEjRwBBRk+NPUvgw9o8" +
                    "NfZ0bmMVgGCS5QZ6tvEIwQ9n9mzju7mOUwCCSZYbmw9hay82L+8BQLDWZDllSciHYMO27I5+ajB+duQ+RgEIpiyJ0fmQpwmI2Ki8BwDBJMutKnXyE4IiLqVUCQDB9PCoRFL9+wRHHCNp/v1CxyUAwfTw" +
                    "sMRzjW8RJHFIifZvFj4mAQimh4dFRRfnG18mWGIfeHxZa5FEAIJJllfSo2ph9AGCJnZt1/3X4bgoYzwCEExZEst8cPwldXz0PoInHo4DGQ9ljUUAgunhYeU9IruBCPDQ1lkQgGCS5TWcibCcVddlqy8O" +
                    "zv/e0scgAMGUJbE8J0JivY4J81Ejxh8AwfTwqMDuLLb41sNynsvYbQVAMMlyOhpiq28SfMS4MQdAMGVJKuQjYxsItpUsT/ITI8cbAKGHB4G3ggUYm/vvJvBWoaru4DxOjf2fsWMNgJAsxxX0xPh2dXz0" +
                    "XwjCFntx9J8H53Gb0eMMgNDDA1d1m++B/Wq+8TWCsZU7rb4yPH+mjzEAQlkSXPm8yE9Z0rJmyervh+fLlrEFQEiW41osaW2jRa7xd5Z/3vglKwBCshzXuM/6TOMHg6vc9QRso2Yd64fnJe/+5QAEU5YE" +
                    "a0mwHxv9N4K3AZbzYNusA4DQwwNjNT32lFoa/QcCeQmW4z499r/WjyEAQrIc13ynltzhvLz/kwT2QvzJwfH+rhU7rAAIZUkwjrmstWVY4ZUAn28F3YnxzZUaNwCkYp6amiIg4gx3sT837HBHwNfbMXBq" +
                    "7NlKjhcAQrIc41U+PP4reo1kBscDw+NY5XECQChLgnGgJ8dfoN9I0p1Vjf8YHrc6jA8AQg8PjGPkSDYPQPIggAgtP/LgABybajUuAAjJcowT9WKfGXtcLY7+E9AYFjz8x8HxeGx4XOo4HgCIpZ6eniag" +
                    "4ZLzJL8cXHV/XTVHP1W7EutSpFK+f93HAAChLAnGmUukSA8SCapVLdroQEO+p40lRwAIJlmOrejPLlfms43vD/tZ2L089dnhTZaytRloABB6eGBceM5kp5oee1LNNR5Wx0fvM7wa7n3DzymfVz435w+A" +
                    "UJYEY8NKp8i9EdK7fa7x0LCEedHVgeX95H3l/eVzyOepSmkRAILp4YFrOFPZpSbHRwYB/YnhLi8J7vONbw4DvThu0Ud5nPMceb68jryevK68vryRr6cNAAAAjklEQVQPxxuAkCzHGGMAgilLgjEGIJge" +
                    "HhhjAIJJlmOMMQAhWY4xxgCEHh4YYwxAMMlyjDEAwZQlwRgDEEyyHGOMAQg9PDDGGIDQwwNjjAEIZUkwxhiAYJLlGGMAgunhgTHGAIRkOcYYAxDKkmCMMQAhWY4xxgAEU5YEYwxACP4kyzHGGIBQlgRj" +
                    "jIvx/wMKh7bFAFwqVQAAAABJRU5ErkJggg==)";
                if (!this._renderAfterCreate)
                    this.jsObject.assignReport(this.report);
            };
            StiViewer.prototype.invokeBeginProcessData = function (args, callback) {
                if (this.onBeginProcessData && this.onBeginProcessData.is(Function)) {
                    args.sender = "Viewer";
                    this.onBeginProcessData(args, callback);
                }
            };
            StiViewer.prototype.invokeEndProcessData = function (args) {
                if (this.onEndProcessData && this.onEndProcessData.is(Function)) {
                    args.sender = "Viewer";
                    this.onEndProcessData(args);
                }
            };
            StiViewer.prototype.invokePrintReport = function (printAction) {
                if (this.onPrintReport && this.onPrintReport.is(Function)) {
                    var args = {
                        sender: "Viewer",
                        event: "PrintReport",
                        preventDefault: false,
                        fileName: this.getReportFileName(),
                        printAction: printAction,
                        report: this.report
                    };
                    this.onPrintReport(args);
                    return args;
                }
                return null;
            };
            StiViewer.prototype.invokeBeginExportReport = function (settings, format, fileName) {
                if (this.onBeginExportReport && this.onBeginExportReport.is(Function)) {
                    var args = {
                        sender: "Viewer",
                        event: "BeginExportReport",
                        preventDefault: false,
                        settings: settings,
                        format: StiExportFormat[format],
                        fileName: fileName
                    };
                    this.onBeginExportReport(args);
                    return args;
                }
                return null;
            };
            StiViewer.prototype.invokeEndExportReport = function (format, fileName, data) {
                if (this.onEndExportReport && this.onEndExportReport.is(Function)) {
                    var args = {
                        sender: "Viewer",
                        event: "EndExportReport",
                        preventDefault: false,
                        format: StiExportFormat[format],
                        fileName: fileName,
                        data: data
                    };
                    this.onEndExportReport(args);
                    return args;
                }
                return null;
            };
            StiViewer.prototype.invokeEmailReport = function (emailSettings, format, fileName, data) {
                if (this.onEmailReport && this.onEmailReport.is(Function)) {
                    var args = {
                        sender: "Viewer",
                        event: "EmailReport",
                        settings: emailSettings.toJsonObject(),
                        format: StiExportFormat[format],
                        fileName: fileName,
                        data: data
                    };
                    this.onEmailReport(args);
                }
                return null;
            };
            StiViewer.prototype.invokeDesignReport = function () {
                if (this.onDesignReport && this.onDesignReport.is(Function)) {
                    var args = {
                        sender: "Viewer",
                        event: "DesignReport",
                        fileName: this.getReportFileName(),
                        report: this.report
                    };
                    this.onDesignReport(args);
                }
            };
            StiViewer.prototype.callRemoteApi = function (commad, timeout) {
                if (timeout === void 0) { timeout = 0; }
                var promise = new Promise();
                try {
                    var request = new XMLHttpRequest();
                    request.open("post", StiOptions.WebServer.url, true);
                    request.timeout = timeout > 0 ? timeout : StiOptions.WebServer.timeout;
                    request.onload = function () {
                        if (request.status == 200) {
                            var responseText = request.responseText;
                            request.abort();
                            promise.callTry(responseText);
                        }
                    };
                    request.onerror = function (e) {
                        promise.callCatch("Connect to remote error: [" + request.status + "] " + request.statusText);
                    };
                    request.send(JSON.stringify(commad));
                }
                catch (e) {
                    Stimulsoft.System.StiError.showError(e, false);
                    promise.callCatch(e.message);
                }
                promise.catch(function (message) {
                    if (request)
                        request.abort();
                });
                return promise;
            };
            StiViewer.prototype.getReportPage = function (report, service, pageIndex, zoom, openLinksTarget) {
                var settings = new StiHtmlExportSettings();
                settings.pageRange = new StiPagesRange(StiRangeType.CurrentPage, "", pageIndex);
                settings.zoom = zoom;
                settings.exportMode = this.options.appearance.htmlRenderMode;
                settings.exportQuality = StiHtmlExportQuality.High;
                settings.exportBookmarksMode = StiHtmlExportBookmarksMode.ReportOnly;
                settings.removeEmptySpaceAtBottom = false;
                settings.openLinksTarget = openLinksTarget;
                settings.useWatermarkMargins = true;
                switch (this.options.appearance.chartRenderType) {
                    case Viewer.StiChartRenderType.AnimatedVector:
                        settings.chartType = StiHtmlChartType.AnimatedVector;
                        break;
                    case Viewer.StiChartRenderType.Vector:
                        settings.chartType = StiHtmlChartType.Vector;
                        break;
                }
                var textWriter = new TextWriter();
                var htmlTextWriter = new StiHtmlTextWriter(textWriter);
                service.exportTo(report, htmlTextWriter, settings);
                var htmlPageContent = textWriter.getStringBuilder().toString();
                var pageAttr = {};
                pageAttr["content"] = htmlPageContent;
                var page = report.renderedPages.getByIndex(pageIndex);
                if (!page)
                    return null;
                pageAttr["margins"] = String.stiFormat("{0}px {1}px {2}px {3}px", Math.round(report.unit.convertToHInches(page.margins.top) * zoom), Math.round(report.unit.convertToHInches(page.margins.right) * zoom), Math.round(report.unit.convertToHInches(page.margins.bottom) * zoom), Math.round(report.unit.convertToHInches(page.margins.left) * zoom));
                pageAttr["sizes"] = String.stiFormat("{0};{1}", Math.round(report.unit.convertToHInches(page.pageWidth) * zoom), Math.round(report.unit.convertToHInches(page.pageHeight) * zoom));
                pageAttr["background"] = ColorTranslator.toHtml(StiBrush.toColor(page.brush));
                return pageAttr;
            };
            StiViewer.prototype.getPagesArray = function (report, options, requestParams) {
                if (report == null)
                    return [];
                var service = new StiHtmlExportService();
                service.insertInteractionParameters = true;
                service.renderAsDocument = this.options.appearance.htmlRenderMode != StiHtmlExportMode.Table;
                service.styles = [];
                service.clearOnFinish = false;
                service.renderStyles = false;
                service.exportServiceId = this.viewerId;
                var htmlText = String.empty;
                var pageMargins = String.empty;
                var pageSizes = String.empty;
                var pageBackgrounds = String.empty;
                var pages = [];
                if (options.viewMode == "OnePage") {
                    var attributes = this.getReportPage(report, service, options.pageNumber, options.zoom / 100, options.openLinksTarget);
                    pages.add(attributes);
                }
                else if (options.viewMode == "WholeReport") {
                    for (var index = 0; index < report.renderedPages.count; index++) {
                        var attributes = this.getReportPage(report, service, index, options.zoom / 100, options.openLinksTarget);
                        pages.add(attributes);
                    }
                }
                else if (options.viewMode == "MultiPage") {
                    var widthCount = options.multiPageWidthCount;
                    var heightCount = options.multiPageHeightCount;
                    if (widthCount == null)
                        widthCount = 1;
                    if (heightCount == null)
                        heightCount = 1;
                    var lines = [];
                    var pageCount = Math.min(options.pageNumber + (widthCount * heightCount), options.pageNumber + report.renderedPages.count);
                    for (var index = 0; index < pageCount; index++) {
                        var line = void 0;
                        if (lines[lines.length - 1] != null && lines[lines.length - 1].length < widthCount) {
                            line = lines[lines.length - 1];
                        }
                        else {
                            line = [];
                            lines.add(line);
                        }
                        line.add({
                            pageWidth: report.unit.convertToHInches(report.renderedPages.getByIndex(index).pageWidth),
                            pageHeight: report.unit.convertToHInches(report.renderedPages.getByIndex(index).pageHeight)
                        });
                    }
                    var allWidth = 0;
                    var allHeight = 0;
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var line = lines_1[_i];
                        var lineWidth = 0;
                        var lineHeight = 0;
                        for (var _a = 0, line_1 = line; _a < line_1.length; _a++) {
                            var page = line_1[_a];
                            lineWidth += options.multiPageMargins;
                            lineWidth += page.pageWidth;
                            lineWidth += options.multiPageMargins;
                            lineHeight = Math.max(page.pageHeight, lineHeight);
                        }
                        allWidth = Math.max(lineWidth, allWidth);
                        allHeight += options.multiPageMargins;
                        allHeight += lineHeight;
                        allHeight += options.multiPageMargins;
                    }
                    var zoomWidth = options.multiPageContainerWidth / allWidth;
                    var zoomHeight = options.multiPageContainerHeight / allHeight;
                    var zoom = (Math.trunc(Math.min(zoomWidth, zoomHeight) * 100) / 100) - 0.05;
                    if (zoom == null)
                        zoom = 1;
                    requestParams.zoom = Math.round(zoom * 100);
                    for (var index = 0; index < report.renderedPages.count; index++) {
                        var attributes = this.getReportPage(report, service, index, zoom, options.openLinksTarget);
                        pages.add(attributes);
                    }
                }
                var textWriter = new TextWriter();
                var htmlWriter = new StiHtmlTextWriter(textWriter);
                service.htmlWriter = htmlWriter;
                if (service.tableRender != null)
                    service.tableRender.renderStylesTable2(true, false, false, null);
                var htmlTextStyles = textWriter.getStringBuilder().toString();
                pages.add(htmlTextStyles);
                var chartScript = service.getChartScript();
                pages.add(chartScript);
                service.clear();
                return pages;
            };
            StiViewer.prototype.getReportFileName = function () {
                var fileName = (this.report.reportAlias == null || this.report.reportAlias.trim().length == 0)
                    ? this.report.reportName
                    : this.report.reportAlias;
                if (fileName == null || fileName.trim().length == 0) {
                    if (this.report.reportFile != null && this.report.reportFile.trim().length > 0)
                        fileName = this.report.reportFile.replaceAll(".mrt", "").replaceAll(".mrz", "").replaceAll(".mrx", "").replaceAll(".mdc", "").replaceAll(".mdz", "").replaceAll(".mdx", "");
                    else
                        fileName = "Report";
                }
                fileName = fileName.replace(/\\/, "/");
                return fileName.substr(fileName.lastIndexOf("/") + 1);
            };
            StiViewer.prototype.showProcessIndicator = function () {
                if (this.jsObject)
                    this.jsObject.controls.processImage.show();
            };
            StiViewer.prototype.hideProcessIndicator = function () {
                if (this.jsObject)
                    this.jsObject.controls.processImage.hide();
            };
            return StiViewer;
        }());
        Viewer.StiViewer = StiViewer;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
(function (Stimulsoft) {
    var Viewer;
    (function (Viewer) {
        var Color = Stimulsoft.System.Drawing.Color;
        var StiViewerOptions = (function () {
            function StiViewerOptions() {
                this.appearance = new Viewer.StiAppearanceOptions();
                this.toolbar = new Viewer.StiToolbarOptions();
                this.exports = new Viewer.StiExportsOptions();
                this.email = new Viewer.StiEmailOptions();
                this.width = "100%";
                this.height = String.empty;
                this.viewerId = String.empty;
                this.requestStylesUrl = String.empty;
                this.productVersion = "2016.3";
                this.actions = { exportReport: Viewer.StiExportAction.ExportReport, emailReport: Viewer.StiExportAction.SendEmail };
            }
            StiViewerOptions.prototype.toParameters = function () {
                var options = {};
                this.serializeObject(this, options);
                return { options: options };
            };
            StiViewerOptions.prototype.serializeObject = function (fromObject, toObject) {
                for (var value in fromObject) {
                    if (typeof fromObject[value] === "object") {
                        if (fromObject[value].is(Color)) {
                            var color = fromObject[value];
                            if (color.isNamedColor)
                                toObject[value] = color.name;
                            else
                                toObject[value] = String.stiFormat("#{0:X2}{1:X2}{2:X2}", color.r, color.g, color.b);
                        }
                        else {
                            toObject[value] = {};
                            this.serializeObject(fromObject[value], toObject[value]);
                        }
                    }
                    else {
                        if (fromObject.is(StiViewerOptions) && (value == "width" || value == "height"))
                            continue;
                        toObject[value] = fromObject[value];
                        if (fromObject.is(Viewer.StiAppearanceOptions)) {
                            if (value == "pageAlignment")
                                toObject[value] = Viewer.StiContentAlignment[fromObject[value]];
                            else if (value == "interfaceType")
                                toObject[value] = Viewer.StiInterfaceType[fromObject[value]];
                            else if (value == "chartRenderType")
                                toObject[value] = Viewer.StiChartRenderType[fromObject[value]];
                            else if (value == "datePickerFirstDayOfWeek")
                                toObject[value] = Viewer.StiFirstDayOfWeek[fromObject[value]];
                        }
                        if (fromObject.is(Viewer.StiToolbarOptions)) {
                            if (value == "alignment")
                                toObject[value] = Viewer.StiContentAlignment[fromObject[value]];
                            else if (value == "printDestination")
                                toObject[value] = Viewer.StiPrintDestination[fromObject[value]];
                            else if (value == "viewMode")
                                toObject[value] = Viewer.StiWebViewMode[fromObject[value]];
                            else if (value == "showMenuMode")
                                toObject[value] = Viewer.StiWebViewMode[fromObject[value]];
                        }
                    }
                }
            };
            return StiViewerOptions;
        }());
        Viewer.StiViewerOptions = StiViewerOptions;
    })(Viewer = Stimulsoft.Viewer || (Stimulsoft.Viewer = {}));
})(Stimulsoft || (Stimulsoft = {}));
;