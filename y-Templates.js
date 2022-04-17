; (function (root, factory) {
  root.TEMPLATES = factory()
})(this, function () {

  const TEMPLATES = {}

  const CSS = "	/* CSS RESET */" +
    "" +
    "        * {" +
    "            margin: 0;" +
    "            padding: 0;" +
    "            border: 0;" +
    "            font-size: 100%;" +
    "            font-family: helvetica, arial;" +
    "            vertical-align: baseline;" +
    "            text-align: left;" +
    "        }" +
    "" +
    "        article," +
    "        aside," +
    "        details," +
    "        figcaption," +
    "        figure," +
    "        footer," +
    "        header," +
    "        hgroup," +
    "        menu," +
    "        nav," +
    "        section {" +
    "            display: block;" +
    "        }" +
    "" +
    "        body {" +
    "            line-height: 1;" +
    "        }" +
    "" +
    "        ol," +
    "        ul {" +
    "            list-style: none;" +
    "        }" +
    "" +
    "        blockquote," +
    "        q {" +
    "            quotes: none;" +
    "        }" +
    "" +
    "        blockquote:before," +
    "        blockquote:after," +
    "        q:before," +
    "        q:after {" +
    "            content: \"\";" +
    "            content: none;" +
    "        }" +
    "" +
    "        table {" +
    "            border-collapse: collapse;" +
    "            border-spacing: 0;" +
    "        }" +
    "" +
    "" +
    "        /* PAGE PRINT SETTINGS */" +
    "" +
    "        @page {" +
    "            size: A4 portrait;" +
    "            margin-top: 25mm;" +
    "            margin-left: 25mm;" +
    "            margin-right: 25mm;" +
    "            margin-bottom: 20mm;" +
    "        }" +
    "" +
    "        @media print {" +
    "            div.page {" +
    "                position: relative;" +
    "                page-break-after: always;" +
    "                width: 190mm;" +
    "                height: 277mm;" +
    "            }" +
    "" +
    "            tr.subpage {" +
    "                position: relative;" +
    "                display: block;" +
    "                height: 1mm;" +
    "                page-break-after: always;" +
    "            }" +
    "" +
    "            .footer_first {" +
    "                position: absolute;" +
    "                bottom: 0;" +
    "            }" +
    "" +
    "            .footer_second {" +
    "                position: relative;" +
    "                bottom: 0;" +
    "            }" +
    "        }" +
    "" +
    "" +
    "        /* GENERAL STYLES */" +
    "" +
    "        td {" +
    "            /* 24s grid */" +
    "            width: 7.91mm;" +
    "            vertical-align: top;" +
    "            line-height: normal;" +
    "            word-wrap: break-word;" +
    "        }" +
    "" +
    "        table {" +
    "            table-layout: fixed;" +
    "        }" +
    "" +
    "        footer," +
    "        img," +
    "        table {" +
    "            width: 100%;" +
    "            height: auto;" +
    "        }" +
    "" +
    "        /* CONTENT HIDING */" +
    "" +
    "        .hide {" +
    "            visibility: hidden;" +
    "        }" +
    "" +
    "        .show {" +
    "            visibility: visible;" +
    "        }" +
    "" +
    "        .remove {" +
    "            display: none;" +
    "        }" +
    "" +
    "" +
    "        /* CLASS STYLES */" +
    "" +
    "        .back_orange {" +
    "            box-shadow: 0 0 0 210mm #f0871e inset;" +
    "            /* background-color: #f0871e; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .back_violet {" +
    "            box-shadow: 0 0 0 210mm #7a1aa7 inset;" +
    "            /* background-color: #7a1aa7; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .back_blue {" +
    "            box-shadow: 0 0 0 210mm #113e87 inset;" +
    "            /* background-color: #113e87; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .back_teal {" +
    "            box-shadow: 0 0 0 210mm teal inset;" +
    "            /* background-color: teal; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .back_grey {" +
    "            box-shadow: 0 0 0 210mm #979aa1 inset;" +
    "            /* background-color: #979aa; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .back_black {" +
    "            box-shadow: 0 0 0 210mm #000000 inset;" +
    "            /* background-color: ##000000; is not applied when transforming to PDF in GApps */" +
    "        }" +
    "" +
    "        .border_top_black {" +
    "            border-top: thin solid #000000;" +
    "        }" +
    "" +
    "        .font_white {" +
    "            color: #ffffff;" +
    "            -webkit-print-color-adjust: exact;" +
    "            color-adjust: exact;" +
    "        }" +
    "" +
    "        .border_bottom_black {" +
    "            border-bottom: thin solid #000000;" +
    "        }" +
    "" +
    "        .border_top_grey {" +
    "            border-top: thin solid #dadfe8;" +
    "        }" +
    "" +
    "        .border_bottom_grey {" +
    "            border-bottom: thin solid #dadfe8;" +
    "        }" +
    "" +
    "        .border_top_orange {" +
    "            border-top: thin solid #f0871e;" +
    "        }" +
    "" +
    "        .border_bottom_orange {" +
    "            border-bottom: thin solid #f0871e;" +
    "        }" +
    "" +
    "        .border_left_orange {" +
    "            border-left: thin solid #f0871e;" +
    "        }" +
    "" +
    "        .border_right_orange {" +
    "            border-right: thin solid #f0871e;" +
    "        }" +
    "" +
    "        .footer {" +
    "            font-size: 2.5mm;" +
    "            text-align: center;" +
    "        }" +
    "" +
    "        .pleft_s {" +
    "            padding-left: 1mm;" +
    "        }" +
    "" +
    "        .pright_s {" +
    "            padding-right: 1mm;" +
    "        }" +
    "" +
    "        .pleft_m {" +
    "            padding-left: 2mm;" +
    "        }" +
    "" +
    "        .pbottom_m {" +
    "            padding-bottom: 5mm;" +
    "        }" +
    "" +
    "        .pbottom_xs {" +
    "            padding-bottom: 2mm;" +
    "        }" +
    "" +
    "        .ptop_xs {" +
    "            padding-top: 2mm;" +
    "        }" +
    "" +
    "        .spacer_xxxs {" +
    "            height: 0.5mm;" +
    "        }" +
    "" +
    "        .spacer_xxs {" +
    "            height: 1mm;" +
    "        }" +
    "" +
    "        .spacer_xs {" +
    "            height: 1.5mm;" +
    "        }" +
    "" +
    "        .spacer_s {" +
    "            height: 3mm;" +
    "        }" +
    "" +
    "        .spacer_m {" +
    "            height: 4.75mm;" +
    "        }" +
    "" +
    "        .spacer_l {" +
    "            height: 6mm;" +
    "        }" +
    "" +
    "        .spacer_xl {" +
    "            height: 12mm;" +
    "        }" +
    "" +
    "        .spacer_xxl {" +
    "            height: 20mm;" +
    "        }" +
    "" +
    "        .ttoupper {" +
    "            text-transform: uppercase;" +
    "        }" +
    "" +
    "        .ttolower {" +
    "            text-transform: lowercase;" +
    "        }" +
    "" +
    "        .tright {" +
    "            text-align: right;" +
    "        }" +
    "" +
    "        .tbold {" +
    "            font-weight: bold;" +
    "        }" +
    "" +
    "        .tl {" +
    "            font-size: 16pt;" +
    "        }" +
    "" +
    "        .tm {" +
    "            font-size: 12pt;" +
    "        }" +
    "" +
    "        .ts {" +
    "            font-size: 10pt;" +
    "        }" +
    "" +
    "        .txs {" +
    "            font-size: 2.85mm;" +
    "        }" +
    "" +
    "        .txxs {" +
    "            font-size: 2.25mm;" +
    "        }" +
    "" +
    "        .tcenter {" +
    "            text-align: center;" +
    "        }" +
    "" +
    "        .tright {" +
    "            text-align: right;" +
    "        }" +
    "" +
    "        .tleft {" +
    "            text-align: left;" +
    "        }" +
    "" +
    "        .tblue {" +
    "            color: #4a86e8;" +
    "        }" +
    "" +
    "        .twhite {" +
    "            color: #ffffff;" +
    "        }" +
    "" +
    "        .tgrey {" +
    "            color: #0c254e;" +
    "        }" +
    "" +
    "" +
    "        .tteal {" +
    "            color: teal;" +
    "        }" +
    "" +
    "" +
    "        .tloc_s {" +
    "            font-size: 2.25mm;" +
    "            font-style: italic;" +
    "        }" +
    "" +
    "        .tloc_m {" +
    "            font-size: 2.5mm;" +
    "            font-style: italic;" +
    "        }" +
    "" +
    "        .tloc_l {" +
    "            font-size: 2.85mm;" +
    "            font-style: italic;" +
    "        }" +
    "" +
    "        .vmiddle {" +
    "            vertical-align: middle;" +
    "        }" +
    "" +
    "        .tbottom {" +
    "            vertical-align: bottom;" +
    "        }";

  const COMPANY_INVOICE_TEMPLATE = "<!DOCTYPE html>" +
    "<html>" +
    "" +
    "<head>" +
    "    <style>" +
    "{{ CSS }}" +
    "    </style>" +
    "</head>" +
    "" +
    "<body>" +
    "    <div class=\"page\">" +
    "        <table>" +
    "            <!-- initialize the grid -->" +
    "            <tr class=\"hide\">" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "            </tr>" +
    "            <!-- initialize the grid -->" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\"></td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    <img src=\"data:image/jpeg;base64,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SS4vBT5l9desXdV63j9LzcDPP1exRXk5NWNQ51mTY9jL66Hv3V+lTS2307dtv8563+F9Cynv+idQo6l0ujMx8e3DpeC2vGvYKrGCtzqdrqWlza/5v9H/AMGrySBNgCtlP//S9VSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//0/VUl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKf/2f/tECxQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNA+0AAAAAABAAj/4bAAEAAgCP/hsAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAEAAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAAGAAEAAAACOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0kAAAAGAAAAAAAAAAAAAACEAAABQAAAAAoAVQBuAHQAaQB0AGwAZQBkAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABQAAAAIQAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxv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IENvcmUgNC4yLjItYzA2MyA1My4zNTI2MjQsIDIwMDgvMDcvMzAtMTg6MTI6MTggICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNCBXaW5kb3dzIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAyLTIzVDE1OjU1OjE5KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMi0yM1QxNTo1NToxOSswMTowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDItMjNUMTU6NTU6MTkrMDE6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzM1RDRDODI0QzU2RUExMTgyQURFOEE3NDFEMTNDNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI1RDRDODI0QzU2RUExMTgyQURFOEE3NDFEMTNDNUUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MjVENEM4MjRDNTZFQTExODJBREU4QTc0MUQxM0M1RSIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB0aWZmOlhSZXNvbHV0aW9uPSIxNDM5OTI2LzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSIxNDM5OTI2LzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiB0aWZmOk5hdGl2ZURpZ2VzdD0iMjU2LDI1NywyNTgsMjU5LDI2MiwyNzQsMjc3LDI4NCw1MzAsNTMxLDI4MiwyODMsMjk2LDMwMSwzMTgsMzE5LDUyOSw1MzIsMzA2LDI3MCwyNzEsMjcyLDMwNSwzMTUsMzM0MzI7MEY4NzIzNDIzRkY1RkFFMkU4Rjc4ODg5NTkyRTI2OUEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzMjAiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMzIiIGV4aWY6Q29sb3JTcGFjZT0iNjU1MzUiIGV4aWY6TmF0aXZlRGlnZXN0PSIzNjg2NCw0MDk2MCw0MDk2MSwzNzEyMSwzNzEyMiw0MDk2Miw0MDk2MywzNzUxMCw0MDk2NCwzNjg2NywzNjg2OCwzMzQzNCwzMzQzNywzNDg1MCwzNDg1MiwzNDg1NSwzNDg1NiwzNzM3NywzNzM3OCwzNzM3OSwzNzM4MCwzNzM4MSwzNzM4MiwzNzM4MywzNzM4NCwzNzM4NSwzNzM4NiwzNzM5Niw0MTQ4Myw0MTQ4NCw0MTQ4Niw0MTQ4Nyw0MTQ4OCw0MTQ5Miw0MTQ5Myw0MTQ5NSw0MTcyOCw0MTcyOSw0MTczMCw0MTk4NSw0MTk4Niw0MTk4Nyw0MTk4OCw0MTk4OSw0MTk5MCw0MTk5MSw0MTk5Miw0MTk5Myw0MTk5NCw0MTk5NSw0MTk5Niw0MjAxNiwwLDIsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMjAsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMzA7RkJBMEIzNDE4RjIwNUQwOUZGNTRGN0JFNTVGNzVDOEMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyNUQ0QzgyNEM1NkVBMTE4MkFERThBNzQxRDEzQzVFIiBzdEV2dDp3aGVuPSIyMDIwLTAyLTIzVDE1OjU1OjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M0IFdpbmRvd3MiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjczNUQ0QzgyNEM1NkVBMTE4MkFERThBNzQxRDEzQzVFIiBzdEV2dDp3aGVuPSIyMDIwLTAyLTIzVDE1OjU1OjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M0IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZAAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQcHBw0MDRgQEBgUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACEAUADAREAAhEBAxEB/90ABAAo/8QBogAAAAcBAQEBAQAAAAAAAAAABAUDAgYBAAcICQoLAQACAgMBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAIBAwMCBAIGBwMEAgYCcwECAxEEAAUhEjFBUQYTYSJxgRQykaEHFbFCI8FS0eEzFmLwJHKC8SVDNFOSorJjc8I1RCeTo7M2F1RkdMPS4ggmgwkKGBmElEVGpLRW01UoGvLj88TU5PRldYWVpbXF1eX1ZnaGlqa2xtbm9jdHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4KTlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+hEAAgIBAgMFBQQFBgQIAwNtAQACEQMEIRIxQQVRE2EiBnGBkTKhsfAUwdHhI0IVUmJy8TMkNEOCFpJTJaJjssIHc9I14kSDF1STCAkKGBkmNkUaJ2R0VTfyo7PDKCnT4/OElKS0xNTk9GV1hZWltcXV5fVGVmZ2hpamtsbW5vZHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4OUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6/9oADAMBAAIRAxEAPwD1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVf//Q9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FX//0fVOKuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV//9L1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVf//T9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FX//1PSvmq9ubDyvrF9av6d1aWNzPBJQNxkjiZlNGBBow75laHHHJnhGX0znCMv6spJHN8y/8rz/ADQ/6vA/6RrX/qlnpX+hrQ/zP9nk/wCLcjw4u/5Xn+aH/V4H/SNa/wDVLH/Q1of5n+zyf8Wvhxd/yvP80P8Aq8D/AKRrX/qlj/oa0P8AM/2eT/i18OLv+V5/mh/1eB/0jWv/AFSx/wBDWh/mf7PJ/wAWvhxd/wArz/ND/q8D/pGtf+qWP+hrQ/zP9nk/4tfDi97/ACi8xax5h8k2+p6vP9YvZJpkaUIkdVR6L8MYVentnCdvaTHp9SYYxwwqP9L/AHTTMUWZ5pmDsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdir/9X0d55/5QnzB/2zbz/kw+ZvZv8AjOL/AIbj/wB3FMeb4wz2RzHYq7FXYq7FX1L+QP8A5Le0/wCM9x/ycOeYe1P+OS/qx/3LjZOb0XOda3zr58/5yq1Xyx5x1by/F5eguk024aBZ2uHVnC03KhDTMyGlEog2hJbf/nM/URMv1ryrEYa/H6d2ytT25REZI6Md6vdPy1/NLyv+YOkvfaNIyXFvxF9p81BNAzVpyAqGRqHg6/C3+t8OYuTEYHdLMMrV2KuxV2KuxV2KuxV2KuxV2KuxV5V+dP55N+Wt7pdsNHGqfpKOWTkbj0OHpMq0p6cnKvLMjDg473Vn3lDXj5h8raTrpg+rfpS0hu/q/Lnw9ZA/HlReXGvXjlM40SFTfIq7FXYq+fPzJ/5yi1Pyf531Ty3DoEF3Hpzoi3L3Doz84kk3UI1Pt065mY9MJRBtDHrb/nNDUBMv1nytEYK/H6d2wentyiIyR0Y71e5fln+a/lb8wtMku9Gd4rq14i+0+cATQl68SaEq6NQ8XU/8C2YuTEYHdLxTyN+dP5jap+eq+Vb7U1l0M6lfWxtvq8Cn0oFmMa81QSfD6a78syp4YjHfVD6dzBS7FXYqk/nHzAfLnlTVteEH1n9GWst19X5cOfpKW48qNxrTrxyUI2QFYH+S354N+Zd1qsB0caX+jEhfkLj1+frFxT+7j48eGW5sHBW6vVMoV2KuxV2Kv//W9Heef+UJ8wf9s28/5MPmb2b/AIzi/wCG4/8AdxTHm+MM9kcx6L+QttbXP5gwxXESTRG2nJSRQ61AHZgc572nnKOkJB4TxRa8nJ9L/oDQv+rda/8AImP/AJpzzb81l/nT/wBNJx7Lwn/nJ62s9Pby2bS2igD/AFv1BEipyp6NK8QOmdZ7LamdzJJl9P1H+s2Yy8WjkWRQynbO8hMSFhvBfVH5A/8Akt7T/jPcf8nDnmXtT/jkv6sf9y4+Tm9FznWt8Wamqt/zlYoYAqfMcFQen96mbMf3X+ah9U/mJZ+Sz5N1U+ZorUaULeQytMqAg8DxMZO/q1/u+Hx8/s5gYzLiFJfMn/OIC6j/AMrJvjBy+pDTZfrh/Z3lj9Ov+Vy+z/s8zdXXChl/52fn/wCaG80SeRfIAZLyKYWlzfwqJLiW5JCmC3FDw4t8DvTnz+xw48nrw4BXFJWKan5M/wCcpPLWnP5ll1XUJFgUzXUUeoNdSRoByYvAWdHVf2uHqZYJ4pGqV65/zj3+eFx59tbjRtcCL5k0+P1jNGAiXMHLiZAg2SRCyrIo+H4lZP5Vx9Rh4NxyS8c/ND82/wAwPLv5y6tHZazeNp2nX8bxaUZnFu6IqP6TIp/u3+yyjMnFiiYDZCL1vy9/zlbqli/mm5udRgTibhbC1uxbyRx9fhtInU7D9jj638y8sEZYhsqn5P8A+cpvPlp5dudEu7c635hmKQ6HfOoLh5G4lZo0AM7D/dX7bP8A3nPGeliTfIKpeaNA/wCcpdMsH82apqOpLFEvr3KW16CYE+0S1tC/BUX9sInFP28YyxHYK9W/5xy/O/UfO0dz5f8AMJWTXrCL14bxQE+sQBgjF1WiiWNmWvEcXVvs/C2UajCI7jklLP8AnIP/AJyB1Xyzqp8o+UWVNXVVOo6gVEhhMoBSKJGqvqlSGZmVuPJePx/Ylp9OJCyrz8+Sv+cqzp/+JPr2reoV9b6p9fYXPDr/ALzc/D/dXHn/AMV5bx4uWyGe/kB/zkPqnmPVovKPm7jJqswb9HamqiMytGpZopkUBRJxVijqF5fZZeX2qs+nERYV5H/zkVpHn6w85SzeaLp7iwvLm9l8vo84mEdoZqhVX/dQ4mP4MyNOYmOyvUfyB8rfnZb6p5c1XVNRmk8jNZl4bQ3gdBBJbMLcehU04sY/h/YyjPKFED6lQ350/n55sufNsnkT8vy8VxHOLK4vYQGuJrokKYYK19NUf4Gf7fP9pE+2cOAVxSViWteSf+cmvKWnP5nn1a/dLdfWuxDqD3TxIN2aSIsyui/t8fUVf9XLIzxSNUr2D/nHj87rzz5a3Wja6EHmHToxMJ4wEW5gJ4l+A2WSNiok4/D8a8cxtRh4NxyS8P8AzNCn/nJ2UNQqdY03kD0pxt+tcysX918Ch9VfmBaeRG8nat/iGOzXShbSGZ5BGCDxPExnr6vL+74/Hz+zmBjMuIUl80f84fnUP+Vj34h5fU/0ZL9b/lr60Xp1/wArlXj/ALLM3V/T8UJd+WX/AK0+n/bY1T/iNxksn918Ar23/nIf88LnyJbQaHoQU+Y9QiM31hwGW1gqVEnA7NI7BvTDfCvHk37Kti6fBxbnkl475X0D/nKDzLZr5o0zUtT9GUepbPPfeiJl8Y4JHVCh/Zqixt+zmTKWKOxpCS+d/wA8Pzfkvrew1C/vNC1fSojaajFbu1t60iuzCWSJaKsnBlU8fgfirJkoYIdNwr2T87bH8xNX/Kby/qWiX0osIdIa480H6x6Znie2hY+opP76tJdv8r/KzGwmImQe/wBKvCfyg8v/AJq6xcamv5fX0llNCkJ1AxXIteSsX9OtSOdCHzLzSgPqV9HfmL5V/O+/8oeT7XyxqM1vrdla8PMUqXghaSf0oRVnqPV/eLL8WYWOUBI3y/hS8W89v/zkR5Gsbe88xeaLq3S6kMVvEmo+pK5AqxVFYtxX9pv2eS/zZkw8OXIIevf84q61551zQtb1XzLfXmoWcs8MWmT3cjSAmMSev6fLelWjDH7PL/UbMfVRiCAEvc8xVf/X9Heef+UJ8wf9s28/5MPmb2b/AIzi/wCG4/8AdxTHm+MM9kcx6D+Rmo2Gnee0u7+4jtLWO1n9SeZgka1AA5M1AN8572mxynpCIjiPHFrycn0T/wArD8hf9THpv/SXB/zVnnX5DP8AzJ/6WTj0Xh3/ADkx5h0HWP8AD36J1G21D0frfrfVpkl4cvR48uBNOVDTOm9nMGTHx8cZQvh+ocP85nAPEoZ3iao3B6jOrx5DA2G0F9bf84+yLJ+Wlmy9DPcf8nDnBe00xLVkj+bH7mnJzekZoGD4W/MDQn8wf85CanoaXH1V9S1lbVbnjy9Mysq8+IK141/mza45VjvyQk/5pfl5qfkHzcmh6xdyX1i6R3MF7GCplgc8XKo7OFkRldOJb/iWSxZBMWFfY/5PeRvJHlfynbzeUy1xbatHHdyalMQ09wGWqcyAoUIG2jVfg+L9vlmtzTlI7pfHvk+DzvN+bjReW54rfzYby99CW69PiJQJTLX1VdOZX1KfD9rNjPh4N/pQ92Oj/wDOYJQq2r6eVIPIEWVKf8iMxbw9ypZ+Rv5G/mF5Q/Ma113VfqaWCQ3EdwLe4WRj6kZCgIoG3qcTks+eMo0FYB5yiim/5yiMUqh438wWKujbggvDUHLYf3XwV9sZrEviX8ubW3H/ADk3FAIl9GLW9Q9OOnwr6frlKD/JKrxzZ5D+6+CH2ZryJJoeoxuoZHtZlZT0IMZBBzWx5pfHf/OJn/k2V/7Z9z+tM2Oq+hChB6J/5ykb9OUMf+JJK+r9mvrN9X69uXpccP8Aktv5qvtnNYl8OwmH/oZlDoNPR/xMPR9P7PH6z+940/Y/vP8AY5tP8lv/ADUM5/5zQ/47Plf/AJh7r/iceVaPkVe+flH/AOSu8p/9sqz/AOTK5iZfrPvS+NvLsfnR/wA6LmLy3PDbeam1C/W2mufT4CWsvqf3qunIrzC/D9r7ObKXDwb/AEoe2zaH/wA5fSwSQzarp7wyKySKwsqFWFCD+48MxeLD3KgvyH/Izz95O/MGDW9WNolgltPFKILgSu3qLRRxA6cqN/scOfPGUaCvL/zs0x9V/wCcgNW0uOQRPf39napKwJCmaGFAxA3+HlXL8JrGCrPrf/nDLW2mUXXmi3WCvxmO3kdqewZ1H45V+cHcr3L8r/yk8sfl3p09vpPqXF5eFTe6hcEGWThXioCgKka1big/2TNmLlymZ3S+YPyy/wDWn0/7bGqf8RuMzsn918AhZ/zk0GH52XZv+RszFZFB/wAUekvPj/svUx030K+0bA2TWNs1jwNkYkNqY6cPS4jhwptx4045rSl8e/8AOXh0s/mbbC14/XBpsP6Q49fU9ST0+X+X6XD/AGHDNjpL4UPffNH/AKzpd/8AgML/ANQa5iR/vP8AOS8l/wCcLv8Ajqeav+MFn/xOXMjWcggPpfXtd0vQdGvNZ1WcW+n2MZmuJW7KOwHdmPwov7TfDmDGJJoJfHMUXmX/AJyA/NdpGD2ejQAcyPiWzsEbZRWqm4mP/BSt/vpPh2W2KHmh9kaJo2naJpFppGmwiCwsYlht4l7Kgpv4serN+02a2UiTZSjcCv8A/9D0d55/5QnzB/2zbz/kw+ZvZv8AjOL/AIbj/wB3FMeb4wz2RzHov5C28Fz5+W3uI1mt5rO5SWGQBkdWUAqynYg5zvtRIjSWOfHBry8lL85/yauvK93LrWiQtL5cnbk8ags1ox/ZbqfSJ+w/7P2H/Z56rsjtcZxwTP70f9LP+PNcZW8nzfM3Yq+tf+cdP/JX2f8AzEXP/Jw5wPb/APjR90fuaZ83puaVi+Tb/wDL7zy//OSS66mg3zaMNehuP0gIH9D0VlUmTnTjwAH2s2AyR8Kr3pD2H/nIT8sP8ceSpJLCD1PMGkcrnTeI+ORafvbcf8ZVFUH+/UTMbT5eGXkUsX/5xiuPzB0exufKXmnRNQs7CEG50i9uYJEjSp/e25ZhQVJ9WL/nr/k5ZqeE7gqkv54fkB5kk8zP548g8jfSSC5u7CB/SnS4Bqbi3aq15H43Tlz5/EnPnxWWHOK4ZIYXqvmH/nKbzNpp8s3enap6Mw9K5ZbH6q0q9CstxwjXgf2/jRX/AG8tEcUTeyvaf+cf/wAlZ/IWnz6nrbLL5l1FRHIqNzS2gB5ekrftO7ANKw+H4VVfs8nxdRm49hyS8o8zfl955n/5yNGtw6DfSaP+nLOf6+sDmD0keItJzpx4LxNTmRHJHw6vekPrXNel8leRPy+882n/ADkSNbutBvoNI/S+oTfX3gkWH05PX4PzI48W5LxObCeSPh1fRD6q1dHk0m9jRSzvBKqqBUklCAAMwBzS+U/+cY/I/nLRvzNF7q+h3+n2n1G4T6xc20sUfJilF5OoFTTM/UziY7FDM/8AnIb8gtX8yaoPN3lCNZNWKqupWAYRvMYwBHNExovqhRxdSy8uKcfj+1Xp84iKKXnLebv+cqW00eXfq2tABfR9cWDC4K9N7r0+f/PT1OX+Xl3Biu9kPRP+cfv+cetT8uaonm7zcqpqsat+jdNDCQwtIKNLMykr6nElURS3H7TfH9mnUagEUEpx/wA5N/lPr3nTS9M1Xy9D9a1LSfVSWyDBWlgl4msfKgLoyfZr8St/N8OR02URNFWL/kLffnzY+ZtG8v8AmCy1C38n2sU0TC6s1RI1jhf0V9dkEnESBFT4/wDJ+zk84xkEj6kLvzu/5x/8yv5nfzx5Bqb2SUXV3YQuIp47lTyNxbsSobmw5slefqfEnPlxRw5xXDJWGatr/wDzlL5p00+WLzTdT9CYelcstj9UaVehWWfhGoRv2/jRX/by0RxRN7K9q/5x/wDyXufIGnXWoa1Ik3mLUlVJFjPNbeBTy9JX/aZm+KVl+H4U4/Z5Ni6jNxmhyS8h/MHyN50u/wDnIp9WtdCv59LOrafKL6O2laD04xBzf1AvDivFuRrmRjnHw6voh9d5r0uxV8kfl75D87Wn/ORK6xdaFfwaV+ldRlN/JbyrB6ciz8H9Qrx4tyXia5sMk4+HV9EPVP8AnIT8kpvPthb6tonBPMmnIY0jchVuoK8vSLnZXRizRM3w/E6t/MtGnzcGx5JeI+XJv+co/Ltv/hvSbPWIbZf3cUT2omjiHSkU8qOkaf6knDMmXhHc0hK/O35Gfm3bXdreXthe69q2pwm61Ka3SS69KVnZRFJMOXOXgqs37K8uK8slDPD3K+u7Xy0dV/K638t36tbPeaLHYXKsKPE72ojao/mRu2a8yqd+aXylovkj/nIf8tdZvB5e0y8SSdfSmuLKFL23mRTVW3WRe/w8lSRcz5TxzG6HpH5+6R+Z/mX8vfJFrbaff317Nb/WPMVrbwttdCGGnrRxiilZGm4pTjyynAYxkfsV515L/wChkPJemyad5c8vX1lbzSGWY/otJJHelAXkkjZ24j7I5fDl0/DkbJ+1Xvn5C69+bmrLrn/Kw7a4tzCbX9GfWLRLTly9X1uPFE504xf6uYmeMBXCl6xmOr//0fTHmPTptT8vappsDKk99aT20TPUIHliZFLUBPGrb7ZkaTMMWaEzyhOM/wDSS4kg7vAP+ha/O3/Vw03/AJGT/wDVHO+/0Yab+bl+UP8Ai2/xQy38r/yZ8y+U/Ncer6hd2U1ukMsRS3eVnq4AGzxoP+GzU9te0OHVYDjhGYlxA+rh/wCKkwnkBD2CeCGeGSCdFlhlUpLG4DKysKFSD1BGcgCQbHNqfPfmv/nGDUptamm8s31rDpUp5x2140oeInqilI5OaD9lm+L/AIlnW6X2kiIAZRIz74V6vtbBNJ/+hXPPf/Vy0v8A5GXH/VDMj/RLg/m5P9j/AMWnjD3D8qfJ2peUPJ0GiajLDNdRSyyNJblmjpI/IULqjf8AC5zPaerjqMxnEECh9TXI2WX5r0OxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2Kv/0vVOKuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV//9P1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVf//U9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FX//1fVOKuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV//9b1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVf//X9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FX//2Q==\">" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ company_name }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    {{ owncompany_name }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ company_street_number }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    {{ owncompany_address }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ company_zip }} {{ company_city }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    {{ owncompany_zip }} {{ owncompany_city }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ company_country }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    {{ owncompany_email }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "            <% if (taxType == \"I\") { %>" +
    "                    {{ word_vat_id }}: {{ company_vat_id }}" +
    "            <% } %>" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                    {{ owncompany_website }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\">" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"8\">" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{ word_invoice_number }} : {{ invNum }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"8\">" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{ word_invoice_date }} : {{ invDate }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tbold ts back_violet twhite\" colspan=\"6\">{{ word_invoice_number_short }} :" +
    "                    {{ invNum }}</td>" +
    "                <td class=\"tright\" colspan=\"18\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"ts tbold pleft_s\" colspan=\"2\">#</td>" +
    "                <td class=\"ts tbold\" colspan=\"10\">{{ word_line_description }}</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ word_line_quantity }}</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ word_unit_price }}</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ word_line_total_price }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_xxxs back_grey\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "            <% lines.forEach(line=>{ %>" +
    "            <% var invLineNum = line.invLineNum; var lineDescription = line.lineDescription; var quantity = line.lineQuantity; var unitPrice = line.unitPrice; var lineTotal = line.lineAmount; dev_main_position = line.dev_main_position; dev_rank = line.dev_rank; billFrom = line.billFrom; billTo = line.billTo; lineType = line.lineType; var dev_first_name = line.dev_first_name %>" +
    "            <tr>" +
    "            <td class=\"ts tbold pleft_s\" colspan=\"2\"> {{ invLineNum }} </td>" +
    "             <% if(lineType == 'developerLine'){ %>" +
    "            <td class=\"ts tbold\" colspan=\"10\">{{ dev_rank }} {{ dev_main_position }} ({{ dev_first_name }})<br>({{ word_work_duration }}: {{ billFrom }} - {{ billTo }})</td>" +
    "             <% }else{ %>" +
    "            <td class=\"ts tbold\" colspan=\"10\">{{ lineDescription }}</td>" +
    "             <% } %>" +
    "            <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ quantity }}</td>" +
    "            <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ unitPrice }} €</td>" +
    "            <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ lineTotal }} €</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "" +
    "            <% }) %>" +
    "" +
    "            <tr class=\"tbold\">" +
    "                <td class=\"tm vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"18\">{{ word_total_net }}" +
    "                    </td>" +
    "                <td class=\"tright tm vmiddle ptop_xs pbottom_xs pright_s\" colspan=\"6\">{{ companyNetAmount }} €</td>" +
    "            </tr>" +
    "            <tr class=\"tbold\">" +
    "                <td class=\"tm vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"18\">{{ word_vat_rate }}" +
    "                </td>" +
    "                <td class=\"tright tm vmiddle ptop_xs pbottom_xs pright_s\" colspan=\"6\">{{ taxRateDisplay }} %</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"back_black spacer_xxxs\" colspan=\"24\"> </td>" +
    "            </tr>" +
    "            <tr class=\"tbold\">" +
    "                <td class=\"tbold tm vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"18\">{{ word_total_gross }}</td>" +
    "                <td class=\"tbold tright tm vmiddle ptop_xs pbottom_xs pright_s\" colspan=\"6\">" +
    "                    {{ companyGrossAmount }} €</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"back_violet spacer_xs\" colspan=\"24\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"ts\" colspan=\"24\">{{ para_warning }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <% if (taxType == \"I\") { %>" +
    "            <tr>" +
    "                <td class=\"ts\" colspan=\"24\">{{ vat_warning }}</td>" +
    "            </tr>" +
    "            <% } %>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "        </table>" +
    "        <footer class=\"footer_first\">" +
    "            <div class=\"pbottom_m tloc_m\">" +
    "            </div>" +
    "            <div class=\"footer ts tgrey\">" +
    "                {{ owncompany_name }} | {{ owncompany_address }} |" +
    "                {{ owncompany_zip }} {{ owncompany_city }} <br>" +
    "                {{ word_bank_connection }}: {{ word_iban }} {{ owncompany_iban }} | {{ word_bic }} " +
    "                {{ owncompany_bic }} |" +
    "                {{ owncompany_bank_name }} <br>" +
    "                {{ word_vat_id }}: {{ owncompany_vat_id }} |" +
    "                {{ word_hrb }}: {{ owncompany_hrb }} |" +
    "                {{ word_court }}: {{ owncompany_court }} <br>" +
    "                {{ owncompany_website }}" +
    "            </div>" +
    "        </footer>" +
    "    </div>" +
    "</body>" +
    "" +
    "</html>";

  var DEV_INVOICE_TEMPLATE = "<!DOCTYPE html>" +
    "<html>" +
    "" +
    "<head>" +
    "    <style>" +
    "{{ CSS }}" +
    "    </style>" +
    "</head>" +
    "" +
    "<body>" +
    "    <div class=\"page\">" +
    "        <table>" +
    "            <!-- initialize the grid -->" +
    "            <tr class=\"hide\">" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "                <td></td>" +
    "            </tr>" +
    "            <!-- initialize the grid -->" +
    "" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"8\"></td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{ dev_full_name }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"8\"> </td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{ dev_invoicing_address }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"txs tbottom\" colspan=\"8\"></td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{word_phone}}: {{ dev_phone_number }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"txs tbottom\" colspan=\"8\"></td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{word_email}}: {{ dev_email }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ owncompany_name }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ owncompany_address }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ owncompany_zip }} {{ owncompany_city }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"16\">" +
    "                    {{ company_country }}" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"8\"></td>" +
    "            </tr>" +
    "" +
    "            <tr>" +
    "                <td class=\"tm tbottom\" colspan=\"8\">" +
    "                </td>" +
    "                <td class=\"tright\" colspan=\"16\">" +
    "                    {{ word_invoice_date }} : {{ invDate }}" +
    "                </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tbold tl\" colspan=\"18\">{{ word_invoice_number }} : {{ invNum }}</td>" +
    "                <td class=\"tright\" colspan=\"6\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"back_teal twhite ts tbold pleft_s\" colspan=\"2\">#</td>" +
    "                <td class=\"back_teal twhite ts tbold\" colspan=\"10\">{{ word_line_description }}</td>" +
    "                <td class=\"back_teal twhite tright ts tbold pright_s\" colspan=\"4\">{{ word_line_quantity }}</td>" +
    "                <td class=\"back_teal twhite tright ts tbold pright_s\" colspan=\"4\">{{ word_unit_price }}</td>" +
    "                <td class=\"back_teal twhite tright ts tbold pright_s\" colspan=\"4\">{{ word_line_total_price }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_xxxs back_grey\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <% lines.forEach(line=>{ %>" +
    "                <% var invLineNum = line.invLineNum; var lineDescription = line.lineDescription; var quantity = line.lineQuantity; var unitPrice = line.unitPrice; var lineTotal = line.lineAmount;%>" +
    "            <tr>" +
    "                <td class=\"ts tbold pleft_s\" colspan=\"2\"> {{ invLineNum }} </td>" +
    "                <td class=\"ts tbold\" colspan=\"10\">{{ lineDescription }}</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ quantity }}</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ unitPrice }} €</td>" +
    "                <td class=\"tright ts tbold pright_s\" colspan=\"4\">{{ lineTotal }} €</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_s\" colspan=\"24\"></td>" +
    "            </tr>" +
    "" +
    "            <% }) %>" +
    "" +
    "            <tr>" +
    "                <td class=\"back_grey spacer_xxxs\" colspan=\"24\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_xl\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr class=\"tbold\">" +
    "                <td class=\"tbold  vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"10\"></td>" +
    "                <td class=\"tbold ttoupper tteal vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"6\">{{ word_net_amount_dev }}" +
    "                </td>" +
    "                <td class=\"tbold tright tm vmiddle ptop_xs pbottom_xs pright_s\" colspan=\"8\">{{ devNetAmount }} €</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td colspan=\"10\"> </td>" +
    "                <td class=\"back_grey spacer_xxxs\" colspan=\"14\"> </td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tbold  vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"10\"></td>" +
    "                <td class=\"tbold ttoupper tteal vmiddle ptop_xs pbottom_xs pleft_s\" colspan=\"14\">" +
    "                    {{ word_payment_terms }}: {{ paymentTerms }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td colspan=\"10\"> </td>" +
    "                <td class=\"back_grey spacer_xxxs\" colspan=\"14\"> </td>" +
    "            </tr>" +
    "" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"ts\" colspan=\"24\">{{ reverse_warning }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_l\" colspan=\"24\"></td>" +
    "            </tr>" +
    "" +
    "            <tr>" +
    "                <td class=\"tleft tbold tl\" colspan=\"24\">{{ word_payment_method }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"24\">{{ word_wire_transfer_to }}:</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"24\">{{ word_name }}: {{ dev_account_holder_name }}</td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"24\">{{ word_bank }}: {{ dev_bank_name }}</td>" +
    "            </tr>" +
    "            <% if (dev_payment_type == \"IBAN based (EUR)\") { %>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"8\">{{ word_iban }}: {{ dev_iban }}</td>" +
    "                <td class=\"tright\" colspan=\"16\"></td>" +
    "            </tr>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"8\">{{ word_bic }}: {{ dev_bic }}</td>" +
    "                <td class=\"tright\" colspan=\"16\"></td>" +
    "            </tr>" +
    "            <% }else{ %>" +
    "            <tr>" +
    "                <td class=\"tleft tm\" colspan=\"8\">{{ word_account_number }}: {{ dev_account_number }}</td>" +
    "                <td class=\"tright\" colspan=\"16\"></td>" +
    "            </tr>" +
    "            <% } %>" +
    "            <tr>" +
    "                <td class=\"spacer_m\" colspan=\"24\"></td>" +
    "            </tr>" +
    "        </table>" +
    "        <footer class=\"footer_first\">" +
    "            <div class=\"pbottom_m tloc_m\">" +
    "            </div>" +
    "            <div class=\"footer tbold ts tgrey\">" +
    "                {{ dev_full_name }}<br>" +
    "                {{ dev_invoicing_address }}<br>" +
    "                {{ dev_phone_number }} {{ dev_email }}" +
    "            </div>" +
    "        </footer>" +
    "    </div>" +
    "</body>" +
    "" +
    "</html>";

  function createTemplate(invObj, templateName) {
    invObj.CSS = CSS;
    var filledHTMLDoc = createHTMLDoc(invObj, TEMPLATES[templateName]);
    var pdfFile = createPDFFile(filledHTMLDoc, invObj);
    return pdfFile;
  }

  function createHTMLDoc(invObj, template) {
    var filledDocument = Utils.createTemplate(invObj, template);
    return filledDocument;
  }

  function createPDFFile(filledHTMLDoc, row) {
    var file = Utils.createPdfBlob(filledHTMLDoc);
    file.setName(row.company_invoice_number + '.pdf');
    return file;
  }

  TEMPLATES.createTemplate = createTemplate;
  TEMPLATES.companyInvoiceTemplate = COMPANY_INVOICE_TEMPLATE;
  TEMPLATES.devInvoiceTemplate = DEV_INVOICE_TEMPLATE;

  return TEMPLATES
})
