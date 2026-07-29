sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.bhargav.socialui.controller.Main", {
        onInit() {
        },

        onSubmit() {
            var sAuthor       = this.byId("authorInput").getValue();
            var sTitle        = this.byId("titleInput").getValue();
            var sLongText     = this.byId("longTextInput").getValue();
            var oDatePicker   = this.byId("postingDateInput");
            var oDate         = oDatePicker.getDateValue();

            if (!sAuthor || !sTitle || !sLongText || !oDate) {
                MessageToast.show("Please fill in all required fields.");
                return;
            }

            var oPayload = {
                "id": "rdt-" + Math.floor(1000000 + Math.random() * 9000000),
                author:      sAuthor,
                title:       sTitle,
                longText:    sLongText,
                postingDate: oDate.toISOString()
            };

            jQuery.ajax({
                url: "https://issue-reporting-app.cfapps.us10-001.hana.ondemand.com/genaihub-api/processPost",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function (oData) {
                    debugger;
                    MessageToast.show("Post submitted successfully!");
                    console.log("Success Response:", oData);
                },
                error: function (oError) {
                    debugger;
                    MessageToast.show("Error while submitting post!");
                    console.error("Error Response:", oError);
                }
            });
        }
    });
});
